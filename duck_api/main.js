const express = require('express');
var mysql = require('mysql');
// var cors = require('cors');

const PORT = 3000;


var con = mysql.createConnection({
    host: "10.60.91.50",
    user: "duck",
    password: "duck-it2"
});

function randomId(){
    possible="abcdefghijklmnopqrstuvwxyz0123456789";
    id="";
    for(j=0;j<20;j++){
        id+=possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return id;
}

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});



var app = express();
// app.use(cors());

app.get("/api/",function(req,res){
    if(!req.query.id || req.query.id=="null"){

        // count total ducks
        con.query("SELECT COUNT(*) AS count FROM duck_it.ducks", function (err, result) {
            if(err) throw err;

            // console.log(result[0].count)
            totalCount = result[0].count;

            res.send({"duckCount":totalCount});
                
        });
    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })
