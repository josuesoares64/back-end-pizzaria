import express from 'express';
import cors from 'cors';
import './database/models/index';
import authRoutes from './routes/auth.routes';
import pizzaria from './routes/pizzaria.routes';
import categoria from './routes/categoria.routes';
import produto from './routes/produto.routes';
import tamanho from './routes/tamanho.routes';
import borda from './routes/borda.routes';
import produtoPreco from './routes/produtoPreci.routes';
import endereco from './routes/endereco.routes'

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pizzarias", pizzaria)
app.use("/categorias", categoria);
app.use("/produtos", produto);
app.use("/tamanhos", tamanho);
app.use("/borda", borda);
app.use("/produtos", produtoPreco);
app.use("/enderecos", endereco)

export default app;