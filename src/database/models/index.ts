import sequelize from "../../config/database";
import Borda from "./Borda";
import Categoria from "./Categoria";
import Endereco from "./Endereco";
import Order from "./Order";
import OrderItem from "./OrderItem";
import Pizzaria from "./Pizzaria";
import PizzariaUser from "./PizzariaUser";
import Produto from "./Produto";
import ProdutoPreco from "./ProdutoPreco";
import Tamanho from "./Tamanho";
import User from "./User";

Pizzaria.initModel(sequelize);
User.initModel(sequelize);
PizzariaUser.initModel(sequelize);
Produto.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);
Endereco.initModel(sequelize);
Categoria.initModel(sequelize);
Tamanho.initModel(sequelize);
Borda.initModel(sequelize);
ProdutoPreco.initModel(sequelize);

PizzariaUser.belongsTo(Pizzaria, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' })
Categoria.belongsTo(Pizzaria, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
PizzariaUser.belongsTo(User, { foreignKey: 'user_id', as: 'usuario' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'pedido' });
OrderItem.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
OrderItem.belongsTo(Produto, { foreignKey: 'produto_id_2', as: 'produtoSegundoSabor' });
OrderItem.belongsTo(Tamanho, { foreignKey: 'tamanho_id', as: 'tamanho' });
OrderItem.belongsTo(Borda, { foreignKey: 'borda_id', as: 'borda' });
Tamanho.belongsTo(Pizzaria, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
Borda.belongsTo(Pizzaria, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
ProdutoPreco.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
ProdutoPreco.belongsTo(Tamanho, { foreignKey: 'tamanho_id', as: 'tamanho' });
Endereco.belongsTo(User, { as: "cliente", foreignKey: "cliente_id" });

Pizzaria.hasMany(PizzariaUser, { foreignKey: 'pizzaria_id', as: 'vinculos' });
Categoria.hasMany(Produto, { foreignKey: 'categoria_id', as: 'produtos' })
Pizzaria.hasMany(Categoria, { foreignKey: 'pizzaria_id', as: 'categorias' })
User.hasMany(PizzariaUser, { foreignKey: 'user_id', as: 'vinculos' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'itens' });
Pizzaria.hasMany(Tamanho, { foreignKey: 'pizzaria_id', as: 'tamanhos' });
Pizzaria.hasMany(Borda, { foreignKey: 'pizzaria_id', as: 'bordas' });
Produto.hasMany(ProdutoPreco, { foreignKey: 'produto_id', as: 'precos' });
User.hasOne(Endereco, { as: "endereco", foreignKey: "cliente_id" });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Banco conectado');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados');
    } catch (err) {
        console.error('Erro ao conectar', err)
    }
})()

const db = { sequelize, Pizzaria, User, Endereco, Order, OrderItem, PizzariaUser, Produto, Categoria, Tamanho, Borda, ProdutoPreco };
export default db;