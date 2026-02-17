const Controller = require('./Controller');
const ServicesSobremesas = require('../services/ServicesSobremesas');

class SobremesasController extends Controller {
    constructor() {
        const service = new ServicesSobremesas();
        super(service, 'sobremesas'); // Passa a categoria 'sobremesas' para o Controller
    }
}

module.exports = SobremesasController; // Exporta a CLASSE