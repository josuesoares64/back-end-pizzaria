const Controller = require('./Controller.js');
const PizzaServices = require('../services/ServicesPizza.js');

const pizzaServices = new PizzaServices();

class PizzaController extends Controller {
    constructor() {
        super(pizzaServices, 'pizzas'); // Passa a categoria 'pizzas' para o Controller
    }

}

module.exports = PizzaController;