import { Request, Response } from "express"
import PizzariasService from "../services/PizzariasService"

class PizzariaController {
    getMe = async (req: Request, res: Response) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ error: "Não autenticado" });
            }

            const pizzaria = await PizzariasService.getMe(req.userId);
            return res.status(200).json(pizzaria);
        } catch (error) {
            console.log("Erro ao buscar pizzaria:", error);
            return res.status(404).json({
                error: "Erro ao buscar pizzaria",
                detalhes: error instanceof Error ? error.message : "Error desconhecido",
            });
        }
    }

    listaPizzarias = async (req: Request, res: Response) => {
        try {
            const pizzarias = await PizzariasService.listaPizzarias();
            return res.status(200).json(pizzarias)
        } catch (error) {
            console.log("Erro ao listar pizzarias:", error);
            return res.status(500).json({
                error: "Erro ao lista pizzarias",
                detalhes: error instanceof Error ? error.message: "Error desconhecido",
            });
        }
    }

    editarPizzaria = async (req: Request, res: Response) => {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        const { nome, slug, telefone, endereco, logo_url } = req.body;
        const dados = { nome, slug, telefone, endereco, logo_url };

        try {
            const pizzaria = await PizzariasService.editarPizzaria(req.userId, dados);
            return res.status(200).json(pizzaria);
        } catch (error) {
            console.log("Erro ao editar pizzaria:", error);
            return res.status(400).json({
                error: "Erro ao editar pizzaria",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
}

export default new PizzariaController;