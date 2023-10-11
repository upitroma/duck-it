const express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');

const PORT = 3000;


var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "P@ssw0rd"
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


    function sqlQuery(sql) {
        con.query(sql, function (err, result) {
            if (err){
                throw err;
            } 
            return result;
        });
    }

    function createDatabase(){

        console.log("Creating database")

        sqlQuery("CREATE DATABASE DuckDB");

        sqlQuery("USE DuckDB");

        // createDuckTable.sql
        sqlQuery("CREATE TABLE `names` (`id` varchar(200) NOT NULL,`name` varchar(200) NOT NULL,`originalLocation` varchar(200) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`),UNIQUE KEY `name_UNIQUE` (`name`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");
        
        // createFoundLog.sql
        sqlQuery("CREATE TABLE `foundLog` (`id` int NOT NULL AUTO_INCREMENT,`duckId` varchar(200) NOT NULL,`date` datetime NOT NULL,`ip` varchar(20) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");

        // read ducks.txt and insert them into ducks table
        // also keep track of the duck names and their generated ids
        var array = fs.readFileSync('/app/ducks.txt').toString().split("\n");
        var duckLookup = [];

        console.log(array)
        console.log(array.length)

        for(i=0;i<array.length;i++) {
            r=randomId();
            // r=i;
            sqlQuery("INSERT INTO names (id, name) VALUES ('" + r + "', '" + array[i] + "');");
            duckLookup.push({id: r, name: array[i]});
            console.log(i);
        }

        console.log(duckLookup);
        

        console.log("ready for requests")
    }

    //check if /var/lib/mysql/DuckDB exists
    fs.access("/var/lib/mysql/DuckDB", function(error) {
        if (error) {
            console.log("Directory does not exist.")
            createDatabase();
        } else {
            console.log("Directory exists.")

            console.log("ready for requests")
        }
    })
});



var app = express();
app.use(cors());

app.get("/api/",function(req,res){
    if(!req.query.id || req.query.id=="null"){

        // count total ducks
        con.query("SELECT COUNT(*) AS count FROM DuckDB.names", function (err, result) {

            // console.log(result[0].count)
            totalCount = result[0].count;
        
            // get found ducks
            // con.query("SELECT name FROM DuckDB.names WHERE id IN (SELECT duckId FROM DuckDB.foundLog)",function(err,result,fields){
            con.query("select distinct name from DuckDB.names right join DuckDB.foundLog on DuckDB.names.id = DuckDB.foundLog.duckId",function(err,result,fields){
                if(err) throw err;
                res.send({"ducks":result,"totalCount":totalCount});
            });
        });
        // res.send("this should redirect to some statistics page");
    }
    else{
        //fix sql injection
        if (req.query.id.match(/^[0-9a-zA-Z]+$/)){

            //select duck
            con.query("SELECT * FROM DuckDB.names WHERE id = '"+req.query.id+"'", function (err, result, fields) {
                if (err) throw err;

                //if duck exists
                if (result.length==1){
                    duckName=result[0].name

                    //get number of ducks not found yet
                    con.query("SELECT name FROM DuckDB.names WHERE id NOT IN (SELECT duckId FROM DuckDB.foundLog)", function (err, result, fields) {
                        if (err) throw err;

                        ducksNotFound=result.length;
                        

                        con.query("SELECT date FROM DuckDB.foundLog WHERE duckID = '"+req.query.id+"'", function (err, result, fields) {
                            if (err) throw err;
                            if (result.length<1){
                                res.send({"duckName":duckName,"foundLog":[],"ducksNotFound":ducksNotFound-1});                            
                            }
                            else{
                                res.send({"duckName":duckName,"foundLog":result,"ducksNotFound":ducksNotFound});
                            }

                            date=new Date().toISOString().slice(0, 19).replace('T', ' ')
                            con.query("INSERT INTO DuckDB.foundLog (duckId, date) VALUES ('" + req.query.id + "', '" + date + "');");
                        });
                    });
                }
                else{
                    res.status(404).send({"duckName":"ERR: INVALID_DUCK","foundLog":[]})
                }                
            });
        }
        else{
            res.status(404).send({"duckName":"ERR: INVALID_DUCK","foundLog":[]})
        }

        // res.send("your id is "+req.query.id);
    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })
