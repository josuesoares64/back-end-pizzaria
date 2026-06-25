import { Request, Response } from "express"
import PizzariasService from "../services/PizzariasService"

class PizzariaController {
    getMe = async (req: Request, res: Response) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ error: "Não autenticado"});
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
}

export default new PizzariaController;