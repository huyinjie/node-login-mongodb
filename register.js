const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const LoginTest = mongoose.model(
  'LoginTest', {
    userEmail: String,
    password: String 
  }
);


// Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {isRegistered: null, error: null});
})


app.post('/', function (req, res) {
  let inputUserEmail = req.body.userEmail;
  let inputPassword = req.body.password;

  // console debug
  console.log("userEmail: "+inputUserEmail);
  console.log("User Password: "+inputPassword);
  
  let newUser = new LoginTest({ userEmail: inputUserEmail, password: inputPassword });
  // Test If userEmail Exist
  LoginTest.findOne({'userEmail': inputUserEmail}, (err,docs) => {
    if(err){
      res.render('index', {isRegistered: null, error: 'Error, please try again'});
    } else {
      if(docs !== null ){
        res.render('index', {isRegistered: null, error: 'Error, The user name already exists!'});
      } else {
        newUser.save();
        res.render('index', {isRegistered: "Registered Successfully", error: null});
      }
    }
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})