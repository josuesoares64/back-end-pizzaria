import { Request, Response } from "express";
import db from "../database/models";
import BordaService from "../services/BordaService";

class BordaController {
    async getBorda(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
            }

            if (vinculo.role !== 'dono' && vinculo.role !== 'funcionario') {
                return res.status(403).json({ error: "Usuário sem permissão para esta ação" });
            }

            const borda = await BordaService.getBorda(vinculo.pizzaria_id);
            res.status(200).json(borda)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async createBorda(req: Request, res: Response) {

        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }

            const borda = await BordaService.createBorda({
                nome: req.body.nome,
                preco: req.body.preco,
                pizzaria_id: vinculo.pizzaria_id,
            })
            res.status(201).json(borda)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateBorda(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        try {
            const id = req.params.id as string;

            const vinculo = await db.PizzariaUser.findOne({
                where: {
                    user_id: req.userId,
                    role: 'dono'
                }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria." });
            }

            const bordaAtualizada = await BordaService.updateBorda(id, {
                nome: req.body.nome,
                preco: req.body.preco,
            }, vinculo.pizzaria_id);

            res.status(200).json(bordaAtualizada);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async toggleStatusBorda(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        try {
            const id = req.params.id as string;

            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId }
            });

            if (!vinculo) {
                return res.status(403).json({ error: 'Usuário não tem acesso a nenhuma pizzaria' });
            }

            if (vinculo.role !== 'dono' && vinculo.role !== 'funcionario') {
                return res.status(403).json({ error: 'Usuário sem permissão para esta ação' });
            }

            const bordaAtualizada = await BordaService.toggleStatusBorda(id, req.body.ativo, vinculo.pizzaria_id);
            res.status(200).json(bordaAtualizada);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async deleteBorda(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" })
        }

        const { id } = req.params;

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" })
            }

            const resultado = await BordaService.deleteBorda(id as string, vinculo.pizzaria_id);
            return res.status(200).json(resultado)
        } catch (error) {
            console.log("Error ao excluir a borda:", error);
            return res.status(400).json({
                error: "Error ao excluir borda.",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido.",
            })
        }
    }
}

export default new BordaController();