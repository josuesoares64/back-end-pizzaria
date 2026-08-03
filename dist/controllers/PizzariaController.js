"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzariasService_1 = __importDefault(require("../services/PizzariasService"));
const StorageService_1 = __importDefault(require("../services/StorageService"));
class PizzariaController {
    constructor() {
        this.getMe = async (req, res) => {
            try {
                if (!req.userId) {
                    return res.status(401).json({ error: "Não autenticado" });
                }
                const pizzaria = await PizzariasService_1.default.getMe(req.userId);
                return res.status(200).json(pizzaria);
            }
            catch (error) {
                console.log("Erro ao buscar pizzaria:", error);
                return res.status(404).json({
                    error: "Erro ao buscar pizzaria",
                    detalhes: error instanceof Error ? error.message : "Error desconhecido",
                });
            }
        };
        this.getSlug = async (req, res) => {
            const { slug } = req.params;
            try {
                const pizzaria = await PizzariasService_1.default.getSlug(slug);
                return res.status(200).json(pizzaria);
            }
            catch (error) {
                console.log("Erro ao buscar pizzaria pelo slug:", error);
                return res.status(404).json({
                    error: "Erro ao buscar pizzaria pelo slug",
                    detalhes: error instanceof Error ? error.message : "Error desconhecido",
                });
            }
        };
        this.listaPizzarias = async (req, res) => {
            try {
                const pizzarias = await PizzariasService_1.default.listaPizzarias();
                return res.status(200).json(pizzarias);
            }
            catch (error) {
                console.log("Erro ao listar pizzarias:", error);
                return res.status(500).json({
                    error: "Erro ao lista pizzarias",
                    detalhes: error instanceof Error ? error.message : "Error desconhecido",
                });
            }
        };
        this.editarPizzaria = async (req, res) => {
            if (!req.userId) {
                return res.status(401).json({ error: "Não autenticado" });
            }
            const { nome, slug, telefone, endereco, logo_url } = req.body;
            const dados = { nome, slug, telefone, endereco, logo_url };
            try {
                const pizzaria = await PizzariasService_1.default.editarPizzaria(req.userId, dados);
                return res.status(200).json(pizzaria);
            }
            catch (error) {
                console.log("Erro ao editar pizzaria:", error);
                return res.status(400).json({
                    error: "Erro ao editar pizzaria",
                    detalhes: error instanceof Error ? error.message : "Erro desconhecido",
                });
            }
        };
        this.uploadLogo = async (req, res) => {
            if (!req.userId) {
                return res.status(401).json({ error: "Não autenticado" });
            }
            try {
                if (!req.file) {
                    return res.status(400).json({ error: "Nenhuma imagem enviada" });
                }
                const pizzariaAtual = await PizzariasService_1.default.getMe(req.userId);
                if (!pizzariaAtual) {
                    return res.status(404).json({ error: "Pizzaria não encontrada" });
                }
                const logo_url = await StorageService_1.default.uploadImagem(req.file, pizzariaAtual.id, "logo");
                const pizzaria = await PizzariasService_1.default.editarPizzaria(req.userId, { logo_url });
                return res.status(200).json(pizzaria);
            }
            catch (error) {
                return res.status(400).json({
                    error: "Erro ao subir logo",
                    detalhes: error instanceof Error ? error.message : "Erro desconhecido",
                });
            }
        };
    }
}
exports.default = new PizzariaController;
