const Services = require("./Services");

class ServicesPizza extends Services {
  constructor() {
    super("Pizza"); // nome do model
  }
}

module.exports = new ServicesPizza();
