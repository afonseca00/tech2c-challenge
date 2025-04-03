import xlsx from 'xlsx';
import path from 'path';

export const readExcelData = () => {
  const filePath = path.join(__dirname, '../../data/Dados DGEG Challenge.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData;
};