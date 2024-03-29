const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./database/database");
const { Op } = require('sequelize');

//model
const Mesas = require("./database/mesas");
const Pedidos = require("./database/pedidos");
const Produtos = require("./database/produtos");
//model

connection.authenticate().then(() => {
    console.log("Conexão feita com o BD");
}).catch((msgErro) =>{
    console.log("Failha na Conexão com o BD");
})

app.use(cors());

app.use(bodyParser.urlencoded({elevation: false}));
app.use(bodyParser.json());

// var DB = {
//     games:[
//         {
//             id:23,
//             title:"Call od Duty MW",
//             year:2019,
//             price:60
//         },
//         {
//             id:65,
//             title:"Sea of Thifes",
//             year:2018,
//             price:60
//         },
//         {
//             id:2,
//             title:"Minecraft",
//             year:2019,
//             price:60
//         }
//     ]
// }

//GET SEMPRE RETORNA DADOS E POST SEM CADASTRA DADOS

app.post("/produtos",(req,res) => {
    res.statusCode = 200;

    Produtos.findAll({raw: true,order:[['id','DESC']]}).then(item => {
        res.json(item);
    });

});

app.get("/produto/:id",(req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        
        Produtos.findAll({raw: true,order:[['id','DESC']],where:{id:id}}).then(item => {
            
            if(item != undefined){
                res.statusCode = 200;
                res.json(item);
            }else{
                res.sendStatus(404);
            }
        });


    }

});
app.get("/produtos/:query",(req,res) => {
    var query = req.params.query;

    if(!query.length){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        
        Produtos.findAll({raw: true,order:[['id','DESC']],where:{
          prod_tx_nome: {
            [Op.like]: `%${query}%`,
          }}}).then(item => {
            
            if(item != undefined){
                res.statusCode = 200;
                res.json(item);
            }else{
                res.sendStatus(404);
            }
        });


    }

});

app.get("/mesas",(req,res) => {
    res.statusCode = 200;

    Mesas.findAll({raw: true,order:[['id','DESC']]}).then(item => {
        res.json(item);
    });

});

app.get("/mesas/:id",(req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        
        Mesas.findAll({raw: true,order:[['id','DESC']],where:{id:id}}).then(item => {
            
            if(item != undefined){
                res.statusCode = 200;
                res.json(item);
            }else{
                res.sendStatus(404);
            }
        });


    }

});

app.post("/pedido/cadastrar",(req,res) => {
    var {title,price,year} = req.body;

    Pedidos.create({
        pedi_tx_cliente:'Jabson Elias da Silva',
        pedi_nb_mesa:1,
        pedi_tx_valorTotalSemDesconto:10.56,
        pedi_tx_qtdCardapio:1,
        pedi_tx_desconto:(10.56*5.00)/100,
        pedi_tx_valorTotalComDesconto:10.56 - (10.56*5.00)/100,
        pedi_tx_status:'ativo'    
      });


    res.sendStatus(200);
});

app.delete("/game/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }

    }

});

app.put("/game/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            var {title,price,year} = req.body;
             
            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }

});

app.listen(3003,() => {
    console.log("API RODANDO!");
})
