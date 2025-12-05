const dataSource = require('../models');

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
}

module.exports = Services;
