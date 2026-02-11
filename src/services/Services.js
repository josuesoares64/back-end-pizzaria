const dataSource = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.model = dataSource[nomeDoModelo];
  }

  async pegaTodosOsProdutos(where = {}) {
    return await this.model.findAll({ where });
  }

  async criaProduto(dadosDoProduto) {
    return await this.model.create(dadosDoProduto);
  }

  async findOne(id) {
  return await this.model.findByPk(id);
}

  async deletaProduto(id) {
    const registro = await this.findOne(id);

    if (!registro) return null;

    await registro.destroy();

    return registro;
  }
}

module.exports = Services;
