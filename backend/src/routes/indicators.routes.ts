import { Router } from 'express';
import { Emission } from '../models/Emission';

const router = Router();

/**
 * GET /indicators/yearly-emissions
 * Returns total CO₂ emissions grouped by year.
 */
router.get('/yearly-emissions', async (_req, res) => {
  try {
    const emissions = await Emission.aggregate([
      {
        $group: {
          _id: '$Ano',
          totalCO2: { $sum: '$Emissões de CO2 (toneladas)' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(emissions);
  } catch (error) {
    console.error('Error fetching yearly emissions:', error);
    res.status(500).json({ message: 'Failed to calculate yearly emissions' });
  }
});

/**
 * GET /indicators/average-consumption
 * Returns average energy consumption grouped by sector.
 */
router.get('/average-consumption', async (_req, res) => {
  try {
    const result = await Emission.aggregate([
      {
        $group: {
          _id: '$Setor',
          averageEnergyConsumption: { $avg: '$Consumo de Energia (MWh)' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (error) {
    console.error('Error calculating average consumption:', error);
    res.status(500).json({ message: 'Failed to calculate average consumption' });
  }
});

/**
 * GET /indicators/top-efficient
 * Returns top 5 most energy-efficient companies (lowest CO2 per MWh).
 */
router.get('/top-efficient', async (_req, res) => {
  try {
    const result = await Emission.aggregate([
      {
        $addFields: {
          efficiency: {
            $divide: [
              '$Emissões de CO2 (toneladas)',
              '$Consumo de Energia (MWh)'
            ]
          }
        }
      },
      {
        $group: {
          _id: '$Empresa',
          avgEfficiency: { $avg: '$efficiency' }
        }
      },
      { $sort: { avgEfficiency: 1 } },
      { $limit: 5 }
    ]);

    res.json(result);
  } catch (error) {
    console.error('Error calculating efficiency:', error);
    res.status(500).json({ message: 'Failed to calculate energy efficiency' });
  }
});

export default router;