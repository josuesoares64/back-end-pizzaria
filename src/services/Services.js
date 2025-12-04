const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return await database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistroPorId(id) {
    return await database[this.nomeDoModelo].findOne({ where: { id } });
  }

  async criaRegistro(dados) {
    return await database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const registro = await database[this.nomeDoModelo].findOne({ where: { id } });
    if (!registro) return false;

    await database[this.nomeDoModelo].update(dadosAtualizados, { where: { id } });
    return true;
  }
}

module.exports = Services;
