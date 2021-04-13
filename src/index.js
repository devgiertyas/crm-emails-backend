const express  = require ('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('../src/routes')

const app = express();

mongoose.connect('mongodb+srv://lojamix:l0j4m1x@crm.dnn1f.mongodb.net/test',{
useUnifiedTopology:true,
useNewUrlParser:true,
useFindAndModify:false
}, function(err){
    if(err)
    console.log(err);
    else
    console.log('Conexão feita com suecesso');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use(routes);

app.listen(3000, function(){
    console.log('Server rodando na porta 3000')
});

