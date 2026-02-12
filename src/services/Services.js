const dataSource = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.model = dataSource[nomeDoModelo];
  }

  async pegaTodosOsProdutos(where = {}) {
    return await this.model.findAll({ where });
  }

  async pegarPorId(id) {
    return await this.model.findOne({
      where: { id },
    });
  }

  async criaProduto(dadosDoProduto) {
    return await this.model.create(dadosDoProduto);
  }

  async findOne(id) {
    return await this.model.findByPk(id);
  }

  atualizaProduto = async (dadosAtualizados, id) => {
    // 1. Usamos o this.model que já foi definido no constructor
    const registro = await this.model.findOne({
      where: { id },
    });

    if (!registro) return false;

    // 2. Atualiza o registro encontrado
    await this.model.update(dadosAtualizados, {
      where: { id },
    });

    return true;
  };

  async deletaProduto(id) {
    const registro = await this.findOne(id);

    if (!registro) return null;

    await registro.destroy();

    return registro;
  }
}

module.exports = Services;
