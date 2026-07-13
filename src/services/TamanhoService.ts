import { Op } from "sequelize";
import db from "../database/models"
import { TamanhoDTO } from "../types/tamanho.dto";

class TamanhoService {
    async getTamanho(pizzariaId: string) {
        const tamanho = await db.Tamanho.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ["id", "nome", "ordem"],
            order: [["ordem", "ASC"]]
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

    async reordenarTamanho(id: string, ordemNova: number, pizzaria_id: string) {
        const transaction = await db.sequelize.transaction();

        try {
            const tamanho = await db.Tamanho.findOne({
                where: { id, pizzaria_id },
                transaction
            });

            if (!tamanho) {
                throw new Error("Tamanho não encontrado");
            }

            const ordemAntiga = tamanho.ordem;

            if (ordemNova === ordemAntiga) {
                await transaction.commit();
                return tamanho;
            }

            if (ordemNova > ordemAntiga) {
                await db.Tamanho.increment(
                    { ordem: -1 },
                    {
                        where: {
                            pizzaria_id,
                            ordem: { [Op.gt]: ordemAntiga, [Op.lte]: ordemNova }
                        },
                        transaction
                    }
                );
            } else {
                await db.Tamanho.increment(
                    { ordem: 1 },
                    {
                        where: {
                            pizzaria_id,
                            ordem: { [Op.gte]: ordemNova, [Op.lt]: ordemAntiga }
                        },
                        transaction
                    }
                );
            }

            tamanho.ordem = ordemNova;
            await tamanho.save({ transaction });

            await transaction.commit();
            return tamanho;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new TamanhoService();