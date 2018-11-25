const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const LoginTest = mongoose.model(
  'LoginTest', {
    userid: String,
    password: String 
  }
);


// Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {isRegistered: null});
})


app.post('/', function (req, res) {
  let inputUserName = req.body.username;
  let inputPassword = req.body.password;

  // console debug
  console.log("Username: "+inputUserName);
  console.log("User Password: "+inputPassword);
  
  let newUser = new LoginTest({ userid: inputUserName, password: inputPassword });
  newUser.save();

  res.render('index', {isRegistered: "Registered OK"});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})