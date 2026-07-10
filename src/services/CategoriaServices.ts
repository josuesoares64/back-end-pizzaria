import db from "../database/models";
import { CategoriaDTO } from "../types/categoria.dto";

class CategoriaServices {
    async getCategorias(pizzariaId: string) {
        const categorias = await db.Categoria.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: ['id', 'nome', 'ativo'],
        });
        return categorias;
    }

    async createCategoria(categoria: CategoriaDTO) {
        if (!categoria.pizzaria_id) throw new Error("Pizzaria não vínculada");

        const categoriaExistente = await db.Categoria.findOne({ where: { nome: categoria.nome, pizzaria_id: categoria.pizzaria_id } });
        if (categoriaExistente) throw new Error("Categoria já existente");

        const novaCategoria = await db.Categoria.create({
            nome: categoria.nome,
            pizzaria_id: categoria.pizzaria_id,
            ativo: categoria.ativo,
        });
        return novaCategoria;
    }

    async updateCategoria(id: string, categoria: CategoriaDTO, pizzariaId: string) {

        const categoriaExistente = await db.Categoria.findOne({ where: { id, pizzaria_id: pizzariaId } });
        if (!categoriaExistente) throw new Error("Categoria não encontrada.");

        const dadosAtualizado = await db.Categoria.update({
            nome: categoria.nome,
            ativo: categoria.ativo,
        }, {
            where: { id }
        })
        return dadosAtualizado;
    }

    async updateCategoriaStatus(id: string, ativo: boolean, pizzariaId: string) {
        const categoriaExistente = await db.Categoria.findOne({ where: { id, pizzaria_id: pizzariaId } });
        if (!categoriaExistente) throw new Error("Categoria não encontrada.");

        const dadosAtualizado = await db.Categoria.update({
            ativo: ativo,
        }, { where: { id } });
        return dadosAtualizado;
    }
}

export default new CategoriaServices();