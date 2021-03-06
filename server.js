const express = require('express');
const port = 3000;
const app = express();

//faire communication entre frontend et backend

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //pour résoudre prb des méthodes 
  next();
});

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const auth = require('./Server/Routes/auth');
app.use('/auth', auth);

const todo = require('./Server/Routes/todo');
app.use('/todo',todo);

app.listen(port, err => {
    console.log(`hani namsa3 fik 3al ${port}`)
})

// 192.168.0.2
