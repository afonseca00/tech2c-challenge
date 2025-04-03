import mongoose from 'mongoose';

const EmissionSchema = new mongoose.Schema({
  Empresa: { type: String, required: true },
  Ano: { type: Number, required: true },
  Setor: { type: String, required: true },
  'Consumo de Energia (MWh)': { type: Number, required: true },
  'Emissões de CO2 (toneladas)': { type: Number, required: true }
});

export const Emission = mongoose.model('Emission', EmissionSchema);