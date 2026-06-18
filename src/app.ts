import express from 'express';
import cors from 'cors';
import './database/models/index';

const app = express();

app.use(cors());
app.use(express.json());

export default app;