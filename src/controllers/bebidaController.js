const Controller = require('./Controller.js');
const BebidaServices = require('../services/ServicesBebida.js');

const bebidaServices = new BebidaServices();

class BebidaController extends Controller {
    constructor() {
        super(bebidaServices);
    }

}

module.exports = BebidaController;