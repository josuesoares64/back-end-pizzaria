"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const Endereco_1 = __importDefault(require("./Endereco"));
const Order_1 = __importDefault(require("./Order"));
const Order_2 = __importDefault(require("./Order"));
const Pizzaria_1 = __importDefault(require("./Pizzaria"));
const PizzariaUser_1 = __importDefault(require("./PizzariaUser"));
const Produto_1 = __importDefault(require("./Produto"));
const User_1 = __importDefault(require("./User"));
Pizzaria_1.default.initModel(database_1.default);
User_1.default.initModel(database_1.default);
PizzariaUser_1.default.initModel(database_1.default);
Produto_1.default.initModel(database_1.default);
Order_1.default.initModel(database_1.default);
Order_2.default.initModel(database_1.default);
Endereco_1.default.initModel(database_1.default);
PizzariaUser_1.default.belongsTo(Pizzaria_1.default, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
PizzariaUser_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'usuario' });
Pizzaria_1.default.hasMany(PizzariaUser_1.default, { foreignKey: 'pizzaria_id', as: 'vinculos' });
User_1.default.hasMany(PizzariaUser_1.default, { foreignKey: 'user_id', as: 'vinculos' });
(async () => {
    try {
        await database_1.default.authenticate();
        console.log('Banco conectado');
        await database_1.default.sync({ alter: true });
        console.log('Modelos sincronizados');
    }
    catch (err) {
        console.error('Erro ao conectar', err);
    }
})();
const db = { Pizzaria: Pizzaria_1.default, User: User_1.default, Endereco: Endereco_1.default, Order: Order_1.default, OrderItem: Order_2.default, PizzariaUser: PizzariaUser_1.default, Produto: Produto_1.default };
exports.default = db;
