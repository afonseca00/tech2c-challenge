import { Router } from 'express';
import { readExcelData } from '../utils/excelReader';
import { Emission } from '../models/Emission';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';

const router = Router();

// Configure multer to store uploaded files in /uploads
const upload = multer({ dest: 'uploads/' });

// Interface for Excel data
interface ExcelData {
  Empresa: string;
  Ano: number;
  Setor: string;
  'Consumo de Energia (MWh)': number;
  'Emissões de CO2 (toneladas)': number;
}

// POST /data/upload - Route to upload the file
router.post('/upload', upload.single('file'), async (req, res): Promise<void> => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded.' });
      return;
    }

    const filePath = file.path;

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: any[] = xlsx.utils.sheet_to_json(sheet); // Temporarily 'any' for debugging
    console.log('Data read from Excel:', data);  // Check the data read

    // Check if the file has the required columns
    if (!data.length || !data[0].hasOwnProperty('Empresa') || !data[0].hasOwnProperty('Ano') || !data[0].hasOwnProperty('Setor') ||
        !data[0].hasOwnProperty('Consumo de Energia (MWh)') || !data[0].hasOwnProperty('Emissões de CO2 (toneladas)')) {
      res.status(400).json({ message: 'Invalid file format. Missing required columns.' });
      fs.unlinkSync(filePath); // Remove the file after the error
      return;
    }

    // Clear the old data in the database
    await Emission.deleteMany({});

    // Filter valid data (where "Emissões de CO2 (toneladas)" is not undefined or null)
    const validData = data.filter((item) => item['Emissões de CO2 (toneladas)'] !== undefined && item['Emissões de CO2 (toneladas)'] !== null);
    console.log('Valid data after filter:', validData); // Check valid data after filtering

    if (validData.length === 0) {
      res.status(400).json({ message: 'No valid data to upload. Missing "Emissões de CO2 (toneladas)" values.' });
      fs.unlinkSync(filePath); // Remove the file after the error
      return;
    }

    // Insert the valid data into the database
    for (const item of validData) {
      await Emission.create(item);
    }

    // Remove the file after processing
    fs.unlinkSync(filePath);

    // Respond with success
    res.status(201).json({
      message: 'File uploaded and data inserted successfully',
      inserted: validData.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload and process file' });
  }
});

// GET /data/read - Route to read the Excel data
router.get('/read', (_req, res) => {
  const data = readExcelData();
  res.json(data);
});

// POST /data/save - Route to save data in MongoDB
router.post('/save', async (_req, res) => {
  try {
    const data = readExcelData();

    // Clear the old data in the database
    await Emission.deleteMany({});

    // Insert the new data into the database
    for (const item of data) {
      await Emission.create(item);
    }

    res.status(201).json({
      message: 'Data saved to MongoDB successfully',
      inserted: data.length
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data to database' });
  }
});

export default router;