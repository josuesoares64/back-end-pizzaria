"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../database/models"));
class PizzariaService {
    async listaPizzarias() {
        const pizzarias = await models_1.default.Pizzaria.findAll({
            where: { bloqueado: false },
            attributes: ['nome', 'slug', 'telefone', 'endereco', 'logo_url']
        });
        return pizzarias;
    }
    async getMe(userId) {
        const vinculo = await models_1.default.PizzariaUser.findOne({
            where: { user_id: userId },
            include: [{ model: models_1.default.Pizzaria, as: 'pizzaria' }]
        });
        if (!vinculo)
            throw new Error("Pizzaria não encontrada para este usuário");
        return vinculo.pizzaria;
    }
    async getSlug(slug) {
        const pizzaria = await models_1.default.Pizzaria.findOne({
            where: { slug, bloqueado: false },
            attributes: ['id', 'nome', 'slug', 'telefone', 'endereco', 'logo_url', 'taxa_entrega'],
            include: [
                {
                    model: models_1.default.Categoria, as: 'categorias',
                    where: { ativo: true },
                    required: false,
                    attributes: ['id', 'nome'],
                    include: [{
                            model: models_1.default.Produto, as: 'produtos',
                            where: { disponivel: true, excluido: false },
                            required: false,
                            attributes: ['id', 'nome', 'descricao', 'preco', 'tipo', 'imagem_url'],
                            include: [{
                                    model: models_1.default.ProdutoPreco, as: 'precos',
                                    required: false,
                                    attributes: ['id', 'preco'],
                                    include: [{
                                            model: models_1.default.Tamanho, as: 'tamanho',
                                            attributes: ['id', 'nome', 'ordem']
                                        }]
                                }]
                        }]
                },
                {
                    model: models_1.default.Borda, as: 'bordas',
                    where: { ativo: true },
                    required: false,
                    attributes: ['id', 'nome', 'preco']
                }
            ]
        });
        if (!pizzaria)
            throw new Error("Pizzaria não encontrada");
        const pizzariaJson = pizzaria.toJSON();
        pizzariaJson.categorias = pizzariaJson.categorias.map((categoria) => ({
            ...categoria,
            produtos: categoria.produtos.map((produto) => {
                const { tipo, preco, precos, ...resto } = produto;
                if (tipo === 'pizza') {
                    return { ...resto, precos };
                }
                return { ...resto, preco };
            })
        }));
        return pizzariaJson;
    }
    async editarPizzaria(userId, dados) {
        const vinculo = await models_1.default.PizzariaUser.findOne({
            where: { user_id: userId },
            include: [{ model: models_1.default.Pizzaria, as: 'pizzaria' }]
        });
        if (!vinculo || !vinculo.pizzaria)
            throw new Error("Pizzaria não encontrada para este usuário");
        if (vinculo.role !== 'dono')
            throw new Error("Apenas o dono pode editar a pizzaria");
        if (dados.slug) {
            const existente = await models_1.default.Pizzaria.findOne({
                where: { slug: dados.slug }
            });
            if (existente && existente.id !== vinculo.pizzaria.id) {
                throw new Error("Slug já está em uso por outra pizzaria");
            }
        }
        await vinculo.pizzaria.update(dados);
        return vinculo.pizzaria;
    }
}
exports.default = new PizzariaService;
