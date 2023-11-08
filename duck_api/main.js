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
app.use(express.json());
// app.use(cors());


app.post('/api/modify/', (req, res) => {
    let data = req.body;
    // check if duck exists
    con.query("SELECT * FROM duck_it.ducks WHERE id = '"+data.id+"'", function (err, result, fields) {
        if (err) throw err;
        //if duck exists
        if (result.length==1){
            //make sure all fields are present and valid integers
            if (
            data.ownerEmail &&
            Number.isInteger(data.strength) && 
            Number.isInteger(data.perception) && 
            Number.isInteger(data.endurance) && 
            Number.isInteger(data.charisma) && 
            Number.isInteger(data.intelligence) && 
            Number.isInteger(data.agility) && 
            Number.isInteger(data.luck)){
                //update duck
                con.query("UPDATE duck_it.ducks SET owner_email= '"+data.ownerEmail+
                "', strength = '"+data.strength+
                "', perception = '"+data.perception+
                "', endurance = '"+data.endurance+
                "', charisma = '"+data.charisma+
                "', intelligence = '"+data.intelligence+
                "', agility = '"+data.agility+
                "', luck = '"+data.luck+
                "' WHERE id = '"+data.id+"'", 
                function (err, result, fields) {
                    if (err) throw err;
                    res.send('duck updated: ' + JSON.stringify(data));
                });
            }
            else{
                res.status(400).send({"duckName":"ERR: MALFORMED_DATA"})
            }


            
        }
        else{
            res.status(400).send({"duckName":"ERR: DUCK_DOES_NOT_EXIST"})
        }                
    });
})


app.get("/api/",function(req,res){
    if(!req.query.id || req.query.id=="null" || req.query.id=="undefined" || req.query.id==""){
        res.status(400).send({"duckName":"ERR: DUCK_DOES_NOT_EXIST"})
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
                    ownerEmail=result[0].owner_email
                    strength=result[0].strength
                    perception=result[0].perception
                    endurance=result[0].endurance
                    charisma=result[0].charisma
                    intelligence=result[0].intelligence
                    agility=result[0].agility
                    luck=result[0].luck

                    res.send({
                        "duckName":duckName,
                        "ownerEmail":ownerEmail,
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
                    res.status(400).send({"duckName":"ERR: DUCK_DOES_NOT_EXIST"})
                }                
            });
        }
        else{
            res.status(400).send({"duckName":"ERR: MALFORMED_ID"})
        }

    }
});




var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })
