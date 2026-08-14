import db from "../database/models";
import { PizzariaUpdateDTO } from "../types/pizzaria.dto";

class PizzariaService {

    async listaPizzarias() {
        const pizzarias = await db.Pizzaria.findAll({
            where: { bloqueado: false },
            attributes: ['nome', 'slug', 'telefone', 'endereco', 'logo_url']
        })

        return pizzarias
    }

    async getMe(userId: string) {
        const vinculo = await db.PizzariaUser.findOne({
            where: { user_id: userId },
            include: [{ model: db.Pizzaria, as: 'pizzaria' }]
        });

        if (!vinculo) throw new Error("Pizzaria não encontrada para este usuário");

        return vinculo.pizzaria
    }

    async getSlug(slug: string) {
        const pizzaria = await db.Pizzaria.findOne({
            where: { slug, bloqueado: false },
            attributes: ['id', 'nome', 'slug', 'telefone', 'endereco', 'logo_url', 'taxa_entrega'],
            include: [
                {
                    model: db.Categoria, as: 'categorias',
                    where: { ativo: true },
                    required: false,
                    attributes: ['id', 'nome'],
                    include: [{
                        model: db.Produto, as: 'produtos',
                        where: { disponivel: true, excluido: false },
                        required: false,
                        attributes: ['id', 'nome', 'descricao', 'preco', 'tipo', 'imagem_url'],
                        include: [{
                            model: db.ProdutoPreco, as: 'precos',
                            required: false,
                            attributes: ['id', 'preco'],
                            include: [{
                                model: db.Tamanho, as: 'tamanho',
                                attributes: ['id', 'nome', 'ordem']
                            }]
                        }]
                    }]
                },
                {
                    model: db.Borda, as: 'bordas',
                    where: { ativo: true },
                    required: false,
                    attributes: ['id', 'nome', 'preco']
                }
            ]
        })

        if (!pizzaria) throw new Error("Pizzaria não encontrada")

        const pizzariaJson: any = pizzaria.toJSON();
        pizzariaJson.categorias = pizzariaJson.categorias.map((categoria: any) => ({
            ...categoria,
            produtos: categoria.produtos.map((produto: any) => {
                const { tipo, preco, precos, ...resto } = produto;

                if (tipo === 'pizza') {
                    return { ...resto, precos };
                }

                return { ...resto, preco };
            })
        }));

        return pizzariaJson;
    }

    async editarPizzaria(userId: string, dados: Partial<PizzariaUpdateDTO>) {
        const vinculo = await db.PizzariaUser.findOne({
            where: { user_id: userId },
            include: [{ model: db.Pizzaria, as: 'pizzaria' }]
        });

        if (!vinculo || !vinculo.pizzaria) throw new Error("Pizzaria não encontrada para este usuário");

        if (vinculo.role !== 'dono') throw new Error("Apenas o dono pode editar a pizzaria")

        if (dados.slug) {
            const existente = await db.Pizzaria.findOne({
                where: { slug: dados.slug }
            });

            if (existente && existente.id !== vinculo.pizzaria.id) {
                throw new Error("Slug já está em uso por outra pizzaria");
            }
        }

        await vinculo.pizzaria.update(dados);

        return vinculo.pizzaria;
    }

    async alterarStatusPizzaria(userRole: string, id: string, bloqueado: boolean) {
        if (userRole !== 'superadmin' && userRole !== 'admin') {
            throw new Error("Apenas superadmin ou admin podem alterar o status da pizzaria");
        }

        const pizzaria = await db.Pizzaria.findOne({ where: { id } });

        if (!pizzaria) throw new Error("Pizzaria não encontrada");

        await pizzaria.update({ bloqueado });

        return pizzaria;
    }
}

export default new PizzariaService;