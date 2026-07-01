import { Request, Response } from 'express';
import CategoriaService from '../services/CategoriaServices';
import db from '../database/models';

class CategoriaController {
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
}

export default new CategoriaController();