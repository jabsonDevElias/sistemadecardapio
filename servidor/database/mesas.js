const Sequelize = require("sequelize");
const connection = require("./database");

const Mesas = connection.define('mesas',{
    mesa_tx_status:{
        type: Sequelize.TEXT,
        allowNull: false,
    }, 
    
 });

 //ESSE {force:false}. PERMITE QUE SÓ CRIE A TABELA SE ELA NÃO EXISTIR
//  Mesas.sync({force:false}).then(() => {
//     console.log("Tabela Mesas criada com Sucesso!")
// })

module.exports = Mesas;