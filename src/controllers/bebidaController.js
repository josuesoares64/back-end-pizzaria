const Controller = require('./Controller.js');
const BebidaServices = require('../services/ServicesBebida.js');

const bebidaServices = new BebidaServices();

class BebidaController extends Controller {
    constructor() {
        super(bebidaServices, 'bebidas'); // Passa a categoria 'bebidas' para o Controller
    }

}

module.exports = BebidaController;