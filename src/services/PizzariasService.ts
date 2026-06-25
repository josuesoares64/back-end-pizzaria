import db from "../database/models";

class PizzariaService {
    async getMe(userId: string) {
        const vinculo = await db.PizzariaUser.findOne({
            where: { user_id: userId},
            include: [{ model: db.Pizzaria, as: 'pizzaria' }]
        });

        if (!vinculo) throw new Error("Pizzaria não encontrada para este usuário");

        return vinculo.pizzaria
    }
}

export default new PizzariaService;