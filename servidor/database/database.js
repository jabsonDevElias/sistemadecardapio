const Sequelize = require("sequelize");
const connection = new Sequelize('sistemarestaurantes','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;