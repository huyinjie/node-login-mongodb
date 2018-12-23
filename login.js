const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const isEmail = require('./app/isEmail')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-login');

// Init database document model
const LoginTest = mongoose.model(
  'LoginTest', {
    userEmail: String,
    password: String 
  }
);

// Init Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Express Router
app.get('/', function (req, res) {
  res.render('login', {isLogined: null, error: null});
})

app.post('/', function (req, res) {
  let inputUserEmail = req.body.userEmail;
  let inputPassword = req.body.password;

  // console debug
  console.log("userEmail: "+inputUserEmail);
  console.log("User Password: "+inputPassword);
  
  // let newUser = new LoginTest({ userEmail: inputUserEmail, password: inputPassword });

  // Test If userEmail Exist
  LoginTest.findOne({'userEmail': inputUserEmail, password: inputPassword },(err,docs) => {
    if(err){
      res.render('login', {isLogined: null, error: 'Error, please try again'});
    } else {
      if(docs !== null ){
        res.render('login', {isLogined: "Logined Successfully", error: null});
      } else {
        res.render('login', {isLogined: null, error: 'Sorry, The username or password error!'});
      }
    }
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})