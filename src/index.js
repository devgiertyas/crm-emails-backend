require("dotenv").config();

const express  = require ('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('../src/routes')

const app = express();

const url = process.env.MONGO_URL;

console.log(url);

mongoose.connect(process.env.MONGO_URL,{
useUnifiedTopology:true,
useNewUrlParser:true,
useFindAndModify:false
}, function(err){
    if(err)
    console.log(err);
    else
    console.log('Conexão feita com sucesso');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server rodando na porta {process.env.PORT}')
});

