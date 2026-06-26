import sequelize from "../../config/database";
import Endereco from "./Endereco";
import Order from "./Order";
import OrderItem from "./OrderItem";
import Pizzaria from "./Pizzaria";
import PizzariaUser from "./PizzariaUser";
import Produto from "./Produto";
import User from "./User";

Pizzaria.initModel(sequelize);
User.initModel(sequelize);    
PizzariaUser.initModel(sequelize);
Produto.initModel(sequelize);
Order.initModel(sequelize); 
OrderItem.initModel(sequelize);
Endereco.initModel(sequelize); 

PizzariaUser.belongsTo(Pizzaria, { foreignKey: 'pizzaria_id', as: 'pizzaria' });
PizzariaUser.belongsTo(User, { foreignKey: 'user_id', as: 'usuario' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'pedido' });
OrderItem.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });

Pizzaria.hasMany(PizzariaUser, { foreignKey: 'pizzaria_id', as: 'vinculos' });
User.hasMany(PizzariaUser, { foreignKey: 'user_id', as: 'vinculos' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'itens'});

( async () => {
    try {
        await sequelize.authenticate();
        console.log('Banco conectado');
        await sequelize.sync({alter: true});
        console.log('Modelos sincronizados');
    } catch (err) {
        console.error('Erro ao conectar', err)
    }
})()

const db = { Pizzaria, User, Endereco, Order, OrderItem, PizzariaUser, Produto };

export default db;