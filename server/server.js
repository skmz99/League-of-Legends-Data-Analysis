const express = require('express')
const app = express()
const routes = require('./routes/home_route');
app.use(express.json());
// const sqlite3 = require('sqlite3');

// let db = new sqlite3.Database(":memory:", (err) =>{
//     if(err){
//         console.log("Error Occurred - " + err.message);
//     }else{
//         console.log("DataBase Connected");
//     }
// })

app.all('/*', function(req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.use('/',routes);

app.listen(5000,()=>{console.log("Server started on port 5000")})