import db from "../database/models"
import { TamanhoDTO } from "../types/tamanho.dto";

class TamanhoService {
    async getTamanho(pizzariaId: string) {
        const tamanho = await db.Tamanho.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ["id", "nome", "ordem"]
        });
        return tamanho;
    }

    async createTamanho(tamanho: TamanhoDTO) {
        if (!tamanho.pizzaria_id) throw new Error("Pizzaria não vinculada");

        const tamanhoExistente = await db.Tamanho.findOne({
            where: { nome: tamanho.nome, pizzaria_id: tamanho.pizzaria_id }
        });
        if (tamanhoExistente) throw new Error("Tamanho já existente");

        const totalTamanhos = await db.Tamanho.count({
            where: { pizzaria_id: tamanho.pizzaria_id }
        });

        const novoTamanho = await db.Tamanho.create({
            nome: tamanho.nome,
            pizzaria_id: tamanho.pizzaria_id,
            ordem: totalTamanhos + 1,
        });

        return novoTamanho;
    }
}

export default new TamanhoService();