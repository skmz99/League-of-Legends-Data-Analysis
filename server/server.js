const express = require('express')
const app = express()
const routes = require('./routes/home_route');
var cors = require('cors');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true, limit: '50mb', parameterLimit: 50000}))


app.all('/*', function(req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.use('/',routes);

app.listen(5000,()=>{console.log("Server started on port 5000")})