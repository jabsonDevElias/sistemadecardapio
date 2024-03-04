const Sequelize = require("sequelize");
const connection = require("./database");

const Pedidos = connection.define('pedidos',{
    pedi_tx_cliente:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    pedi_nb_mesa:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pedi_tx_valorTotalSemDesconto:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    pedi_tx_qtdCardapio:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pedi_tx_desconto:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    pedi_tx_valorTotalComDesconto:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    pedi_tx_status:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
 });

 Pedidos.sync({force:false}).then(() => {
    console.log("Tabela Pedidos criada com Sucesso!")
})

module.exports = Pedidos;