const express =   require('express');
const path = require('path');

//LOWDB
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('books.json');
const books = low(adapter);

// SET SOME DEFAULTS
books.defaults({ posts: [], user: []})


//FIN

const morgan = require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/', require('./routes/routes'));

app.set("port",5001);
app.listen(app.get("port"), ()=>{
    console.log(`Servidor corriendo en el puerto 5001`);
});