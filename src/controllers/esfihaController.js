const Controller = require('./Controller');
const ServicesEsfiha = require('../services/ServicesEsfiha.js');

const esfihaServices = new ServicesEsfiha();

class EsfihaController extends Controller {
    constructor() {
        super(esfihaServices);
    }

    async pegaProduto(req, res) {
        const { produtoId } = req.params;

        try {
            const listaProdutos = await pizzaServices.pegaProduto(
                Number( produtoId )
            );
            return res.status(200).json(listaProdutos);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = EsfihaController;