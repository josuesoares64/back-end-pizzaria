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
}

export default new BordaService();