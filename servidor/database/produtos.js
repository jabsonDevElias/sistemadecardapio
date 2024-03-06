const Sequelize = require("sequelize");
const connection = require("./database");

const Produtos = connection.define('produtos',{
    prod_tx_nome:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    prod_tx_valor:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    prod_tx_status:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
 });

//  Produtos.sync({force:false}).then(() => {
//     console.log("Tabela Pedidos criada com Sucesso!")
// })

module.exports = Produtos;