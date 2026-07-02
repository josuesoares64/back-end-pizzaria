import db from "../database/models";
import { CategoriaDTO } from "../types/auth.dto";

class CategoriaServices {
    async getCategorias(pizzariaId: string) {
        const categorias = await db.Categoria.findAll({
            where: { pizzaria_id: pizzariaId },
            attributes: [ 'id', 'nome', 'ativo'],
        });
        return categorias;
    }

    async createCategoria(categoria: CategoriaDTO) {
        const categoriaExistente = await db.Categoria.findOne({ where: { nome: categoria.nome, pizzaria_id: categoria.pizzaria_id } });
        if (categoriaExistente) throw new Error("Categoria já existente");

        const novaCategoria = await db.Categoria.create({
            nome: categoria.nome,
            pizzaria_id: categoria.pizzaria_id,
            ativo: categoria.ativo,
        });
        return novaCategoria;
    }
}

export default new CategoriaServices();