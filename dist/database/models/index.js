"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const Borda_1 = __importDefault(require("./Borda"));
const Categoria_1 = __importDefault(require("./Categoria"));
const Endereco_1 = __importDefault(require("./Endereco"));
const Order_1 = __importDefault(require("./Order"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const Pizzaria_1 = __importDefault(require("./Pizzaria"));
const PizzariaUser_1 = __importDefault(require("./PizzariaUser"));
const Produto_1 = __importDefault(require("./Produto"));
const ProdutoPreco_1 = __importDefault(require("./ProdutoPreco"));
const Tamanho_1 = __importDefault(require("./Tamanho"));
const User_1 = __importDefault(require("./User"));
Pizzaria_1.default.initModel(database_1.default);
User_1.default.initModel(database_1.default);
PizzariaUser_1.default.initModel(database_1.default);
Produto_1.default.initModel(database_1.default);
Order_1.default.initModel(database_1.default);
OrderItem_1.default.initModel(database_1.default);
Endereco_1.default.initModel(database_1.default);
Categoria_1.default.initModel(database_1.default);
Tamanho_1.default.initModel(database_1.default);
Borda_1.default.initModel(database_1.default);
ProdutoPreco_1.default.initModel(database_1.default);
PizzariaUser_1.default.belongsTo(Pizzaria_1.default, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
Produto_1.default.belongsTo(Categoria_1.default, { foreignKey: 'categoria_id', as: 'categoria' });
Categoria_1.default.belongsTo(Pizzaria_1.default, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
PizzariaUser_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'usuario' });
OrderItem_1.default.belongsTo(Produto_1.default, { foreignKey: 'produto_id_2', as: 'produtoSegundoSabor' });
Tamanho_1.default.belongsTo(Pizzaria_1.default, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
Borda_1.default.belongsTo(Pizzaria_1.default, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
ProdutoPreco_1.default.belongsTo(Produto_1.default, { foreignKey: 'produto_id', as: 'produto' });
ProdutoPreco_1.default.belongsTo(Tamanho_1.default, { foreignKey: 'tamanho_id', as: 'tamanho' });
Endereco_1.default.belongsTo(User_1.default, { as: "cliente", foreignKey: "cliente_id" });
Order_1.default.belongsTo(User_1.default, { foreignKey: "user_id", as: "cliente" });
Order_1.default.belongsTo(Pizzaria_1.default, { foreignKey: "pizzaria_id", as: "pizzaria" });
OrderItem_1.default.belongsTo(Order_1.default, { foreignKey: "order_id", as: "pedido" });
OrderItem_1.default.belongsTo(Produto_1.default, { foreignKey: "produto_id", as: "produto" });
OrderItem_1.default.belongsTo(Tamanho_1.default, { foreignKey: "tamanho_id", as: "tamanho" });
OrderItem_1.default.belongsTo(Borda_1.default, { foreignKey: "borda_id", as: "borda" });
Pizzaria_1.default.hasMany(PizzariaUser_1.default, { foreignKey: 'pizzaria_id', as: 'vinculos' });
Categoria_1.default.hasMany(Produto_1.default, { foreignKey: 'categoria_id', as: 'produtos' });
Pizzaria_1.default.hasMany(Categoria_1.default, { foreignKey: 'pizzaria_id', as: 'categorias' });
User_1.default.hasMany(PizzariaUser_1.default, { foreignKey: 'user_id', as: 'vinculos' });
Pizzaria_1.default.hasMany(Tamanho_1.default, { foreignKey: 'pizzaria_id', as: 'tamanhos' });
Pizzaria_1.default.hasMany(Borda_1.default, { foreignKey: 'pizzaria_id', as: 'bordas' });
Produto_1.default.hasMany(ProdutoPreco_1.default, { foreignKey: 'produto_id', as: 'precos' });
User_1.default.hasOne(Endereco_1.default, { as: "endereco", foreignKey: "cliente_id" });
User_1.default.hasMany(Order_1.default, { foreignKey: "user_id", as: "pedidos" });
Pizzaria_1.default.hasMany(Order_1.default, { foreignKey: "pizzaria_id", as: "pedidos" });
Order_1.default.hasMany(OrderItem_1.default, { foreignKey: "order_id", as: "itens" });
Produto_1.default.hasMany(OrderItem_1.default, { foreignKey: "produto_id", as: "itensPedido" });
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
const db = { sequelize: database_1.default, Pizzaria: Pizzaria_1.default, User: User_1.default, Endereco: Endereco_1.default, Order: Order_1.default, OrderItem: OrderItem_1.default, PizzariaUser: PizzariaUser_1.default, Produto: Produto_1.default, Categoria: Categoria_1.default, Tamanho: Tamanho_1.default, Borda: Borda_1.default, ProdutoPreco: ProdutoPreco_1.default };
exports.default = db;
