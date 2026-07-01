import { app } from './app';
import categoria from './routes/categoria.routes';

app.use("/categorias", categoria);
