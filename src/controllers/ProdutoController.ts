import { Request, Response } from 'express';
import db from '../database/models';
import ProdutoServices from '../services/ProdutoServices';
import { Op } from 'sequelize';
import StorageService from '../services/StorageService';
class ProdutoController {
    async getProduto(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }
            const produtos = await ProdutoServices.getProduto(vinculo.pizzaria_id);
            res.status(200).json(produtos);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async uploadImagem(req: Request, res: Response) {
    try {
        const vinculo = await db.PizzariaUser.findOne({
            where: { user_id: req.userId, role: 'dono' }
        });
        if (!vinculo) {
            return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
        }
        const { id } = req.params as { id: string };
        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma imagem enviada" });
        }

        const imagem_url = await StorageService.uploadImagem(
            req.file,
            vinculo.pizzaria_id,
            `produtos/${id}`
        );

        const produto = await ProdutoServices.updateProduto(id, { imagem_url }, vinculo.pizzaria_id);
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

    async createProduto(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const produto = await ProdutoServices.createProduto({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                tipo: req.body.tipo,
                categoria_id: req.body.categoria_id,
                imagem_url: req.body.imagem_url
            }, vinculo.pizzaria_id);
            res.status(201).json(produto);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateProduto(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { id } = req.params as { id: string };
            const produto = await ProdutoServices.updateProduto(id, req.body, vinculo.pizzaria_id);
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateStatusProduto(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [Op.in]: ['dono', 'funcionario'] }
                }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }
            const { id } = req.params as { id: string };
            const { disponivel } = req.body as { disponivel: boolean };
            const produto = await ProdutoServices.updateStatusProduto(id, disponivel, vinculo.pizzaria_id);
            res.status(200).json(produto);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async deleteProduto(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });
            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono de nenhuma pizzaria" });
            }
            const { id } = req.params as { id: string };
            const resultado = await ProdutoServices.deleteProduto(id, vinculo.pizzaria_id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default new ProdutoController();