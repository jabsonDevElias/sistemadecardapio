const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({elevation: false}));
app.use(bodyParser.json());

var DB = {
    games:[
        {
            id:23,
            title:"Call od Duty MW",
            year:2019,
            price:60
        },
        {
            id:65,
            title:"Sea of Thifes",
            year:2018,
            price:60
        },
        {
            id:2,
            title:"Minecraft",
            year:2019,
            price:60
        }
    ]
}

//GET SEMPRE RETORNA DADOS E POST SEM CADASTRA DADOS
app.get("/mesas",(req,res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/games/:id",(req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        res.statusCode = 200;
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }

});

app.post("/game",(req,res) => {
    var {title,price,year} = req.body;

    DB.games.push({
        id:2323,
        title,
        price,
        year
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
