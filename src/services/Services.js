const dataSource = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.model = dataSource[nomeDoModelo];
    }

    async pegaTodosOsProdutos(where = {}) {
        return await this.model.findAll({ where });
    }
}

module.exports = Services;
