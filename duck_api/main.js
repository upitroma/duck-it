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
    else{
        //fix sql injection
        if (req.query.id.match(/^[0-9a-zA-Z]+$/)){

            //select duck
            con.query("SELECT * FROM duck_it.ducks WHERE id = '"+req.query.id+"'", function (err, result, fields) {
                if (err) throw err;

                //if duck exists
                if (result.length==1){
                    duckName=result[0].name
                    owner_email=result[0].owner_email
                    strength=result[0].strength
                    perception=result[0].perception
                    endurance=result[0].endurance
                    charisma=result[0].charisma
                    intelligence=result[0].intelligence
                    agility=result[0].agility
                    luck=result[0].luck

                    res.send({
                        "duckName":duckName,
                        "owner_email":owner_email,
                        "strength":strength,
                        "perception":perception,
                        "endurance":endurance,
                        "charisma":charisma,
                        "intelligence":intelligence,
                        "agility":agility,
                        "luck":luck
                    });
                }
                else{
                    res.status(404).send({"duckName":"ERR: DUCK_DOES_NOT_EXIST"})
                }                
            });
        }
        else{
            res.status(404).send({"duckName":"ERR: MALFORMED_ID"})
        }

    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })
