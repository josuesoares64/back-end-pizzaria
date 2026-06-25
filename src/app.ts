import express from 'express';
import cors from 'cors';
import './database/models/index';
import authRoutes from './routes/auth.routes';
import pizzaria from './routes/pizzaria.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pizzarias", pizzaria)

export default app;