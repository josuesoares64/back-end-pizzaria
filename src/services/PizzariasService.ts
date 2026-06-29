import db from "../database/models";
import { PizzariaUpdateDTO } from "../types/auth.dto";

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
        const slug
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
}

export default new PizzariaService;