const Controller = require('./Controller');
const ServicesSobremesas = require('../services/ServicesSobremesas');

class SobremesasController extends Controller {
    constructor() {
        const service = new ServicesSobremesas();
        super(service);
    }
}

module.exports = SobremesasController; // Exporta a CLASSE