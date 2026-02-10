const Controller = require('./Controller');
const ServicesEsfiha = require('../services/ServicesEsfiha.js');

const esfihaServices = new ServicesEsfiha();

class EsfihaController extends Controller {
    constructor() {
        super(esfihaServices);
    }
}

module.exports = EsfihaController;