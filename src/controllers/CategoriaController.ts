import { Request, Response } from 'express';
import CategoriaService from '../services/CategoriaServices';
import db from '../database/models';
import { Op } from 'sequelize';

class CategoriaController {

    async getCategoria(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [Op.in]: ['dono', 'funcionario'] }
                }
            });

            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }

            const categorias = await CategoriaService.getCategorias(vinculo.pizzaria_id);
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async createCategoria(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não é dono de nenhuma pizzaria' });
            }

            const categoria = await CategoriaService.createCategoria({
                nome: req.body.nome,
                pizzaria_id: vinculo.pizzaria_id,
                ativo: req.body.ativo,
            });

            res.status(201).json(categoria);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: 'dono'
                }
            });

            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }

            const categoriaAtualizada = await CategoriaService.updateCategoria(id, {
                nome: req.body.nome,
                ativo: req.body.ativo,
            }, vinculo.pizzaria_id);
            res.status(200).json(categoriaAtualizada);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateCategoriaStatus(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: { [Op.in]: ['dono', 'funcionario'] }
                }
            });

            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }

            const categoriaAtualizada = await CategoriaService.updateCategoriaStatus(id, req.body.ativo, vinculo.pizzaria_id);
            res.status(200).json(categoriaAtualizada);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default new CategoriaController();