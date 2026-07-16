import db from "../database/models";
import { BordaDTO } from "../types/borda.dto";

class BordaService {
    async getBorda(pizzariaId: string) {
        const bordas = await db.Borda.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ["id", "nome", "preco", "pizzaria_id", "ativo"]
        });
        return bordas;
    }

    async createBorda(borda: BordaDTO) {
        if (!borda.pizzaria_id) throw new Error("Pizzaria não vinculada");

        const bordaExistente = await db.Borda.findOne({
            where: { nome: borda.nome, pizzaria_id: borda.pizzaria_id }
        });

        if (bordaExistente) throw new Error("Borda já existente");

        const novaBorda = await db.Borda.create({
            nome: borda.nome,
            pizzaria_id: borda.pizzaria_id,
            preco: borda.preco,
            ativo: true
        });
        return novaBorda;
    }

    async updateBorda(id: string, dados: { nome?: string; preco?: number }, pizzariaId: string) {
        const bordaExistente = await db.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente) throw new Error("Borda não encontrada.");

        await db.Borda.update(
            dados,
            { where: { id, pizzaria_id: pizzariaId } }
        );

        const bordaAtualizada = await db.Borda.findByPk(id);
        return bordaAtualizada;
    }

    async toggleStatusBorda(id: string, ativo: boolean, pizzariaId: string) {
        const bordaExistente = await db.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente) throw new Error("Borda não encontrada.");

        await db.Borda.update({
            ativo: ativo,
        }, { where: { id, pizzaria_id: pizzariaId } });

        const bordaAtualizada = await db.Borda.findByPk(id);
        return bordaAtualizada;
    }

    async deleteBorda(id: string, pizzariaId: string) {
        const bordaExistente = await db.Borda.findOne({
            where: { id, pizzaria_id: pizzariaId }
        });
        if (!bordaExistente) throw new Error("Borda não encontrada.")

        const bordaVinculados = await db.OrderItem.count({
            where: { borda_id: id }
        });

        if (bordaVinculados > 0) {
            throw new Error(
                "Não é possível excluir esta borda porque existem Ordem vinculadas."
            )
        }

        await db.Borda.destroy({
            where: { id, pizzaria_id: pizzariaId }
        });

        return { message: "Borda excluída com sucesso." }
    }

}

export default new BordaService();