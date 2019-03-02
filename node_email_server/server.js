var nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();

var email = '';
var passcode = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post('/recover', function (req, res) {
  res.send(req.body);
  email = req.body.email;
  passcode = req.body.passcode;
  sendmail(email, passcode);
})

app.post('/bookavailable', function (req, res) {
  res.send(req.body);
  email = req.body.email;
  bookname = req.body.bookname;
  notify(email, bookname);
})

app.listen(3245, function () {
  console.log('Example app listening on port 3245!');
})


function sendmail(email, passcode){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'turnthepage.care@gmail.com',
      pass: 'grand4741'
    }
  });

  var mailOptions = {
    from: 'turnthepage.care@gmail.com',
    to: email,
    subject: 'Password reset code',
    text: 'Your one time passcode to reset the passowrd is '+passcode+' . Please note that this passcode is valid only for 5 minutes.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }
  });
}

function notify(email, bookname){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'turnthepage.care@gmail.com',
      pass: 'grand4741'
    }
  });

  var mailOptions = {
    from: 'turnthepage.care@gmail.com',
    to: email,
    subject: 'Book available to buy',
    text: 'Your requested book "'+bookname+'" is available online. Please visit our website.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }
  });
}

//server.listen(8080);