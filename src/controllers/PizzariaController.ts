import { Request, Response } from "express"
import PizzariasService from "../services/PizzariasService"
import StorageService from "../services/StorageService";

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

    getSlug = async (req: Request<{ slug: string }, {}, {}>, res: Response) => {
        const { slug } = req.params;

        try {
            const pizzaria = await PizzariasService.getSlug(slug);
            return res.status(200).json(pizzaria);
        } catch (error) {
            console.log("Erro ao buscar pizzaria pelo slug:", error);
            return res.status(404).json({
                error: "Erro ao buscar pizzaria pelo slug",
                detalhes: error instanceof Error ? error.message : "Error desconhecido",
            })
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
                detalhes: error instanceof Error ? error.message : "Error desconhecido",
            });
        }
    }

    editarPizzaria = async (req: Request, res: Response) => {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }

        const { nome, slug, telefone, endereco, logo_url, largura_cupom } = req.body;
        const dados = { nome, slug, telefone, endereco, logo_url, largura_cupom };

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

    uploadLogo = async (req: Request, res: Response) => {
        if (!req.userId) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        try {
            if (!req.file) {
                return res.status(400).json({ error: "Nenhuma imagem enviada" });
            }
            const pizzariaAtual = await PizzariasService.getMe(req.userId);

            if (!pizzariaAtual) {
                return res.status(404).json({ error: "Pizzaria não encontrada" });
            }

            const logo_url = await StorageService.uploadImagem(
                req.file,
                pizzariaAtual.id,
                "logo"
            );

            const pizzaria = await PizzariasService.editarPizzaria(req.userId, { logo_url });
            return res.status(200).json(pizzaria);
        } catch (error) {
            return res.status(400).json({
                error: "Erro ao subir logo",
                detalhes: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    }
}

export default new PizzariaController;