import { Request, Response } from "express";
import db from "../database/models";
import TamanhoService from "../services/TamanhoService";

class TamanhoController {
    async getTamanho(req: Request, res: Response) {
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

            const tamanhos = await TamanhoService.getTamanho(vinculo.pizzaria_id);
            res.status(200).json(tamanhos)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async createTamanho(req: Request, res: Response) {
        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }

            const tamanho = await TamanhoService.createTamanho({
                nome: req.body.nome,
                pizzaria_id: vinculo.pizzaria_id
            });

            res.status(201).json(tamanho);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async reorganizarOrdem(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        const { id } = req.params as { id: string };
        const { ordemNova } = req.body;

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }

            const tamanho = await TamanhoService.reordenarTamanho(id, ordemNova, vinculo.pizzaria_id);
            return res.status(200).json(tamanho);

        } catch (error) {
            console.log("Erro ao mudar ordem:", error);
            return res.status(400).json({
                error: "Erro ao mudar ordem",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }

    async upadateTamanho(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não aunteticado " });
        }

        const { id } = req.params as { id: string };
        const { nome } = req.body;

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" })
            }

            const Novonome = await TamanhoService.updateTamanho(id, nome, vinculo.pizzaria_id);
            return res.status(200).json(Novonome);

        } catch (error) {
            console.log("Erro ao mudar nome:", error);
            return res.status(400).json({
                error: "Erro ao mudar nome",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }

    async deleteTamanho(req: Request, res: Response) {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        const { id } = req.params;

        try {
            const vinculo = await db.PizzariaUser.findOne({
                where: { user_id: req.userId, role: 'dono' }
            });

            if (!vinculo) {
                return res.status(403).json({ error: "Usuário não é dono desse estabelecimento" });
            }

            const resultado = await TamanhoService.deleteTamanho(id as string, vinculo.pizzaria_id);
            return res.status(200).json(resultado);

        } catch (error) {
            console.log("Erro ao excluir tamanho:", error);
            return res.status(400).json({
                error: "Erro ao excluir tamanho",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
}

export default new TamanhoController();