import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import dataRoutes from './routes/data.routes';
import indicatorRoutes from './routes/indicators.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/data', dataRoutes);
app.use('/indicators', indicatorRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;