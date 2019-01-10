const express = require('express');
const app = express();
const Datastore = require('nedb');
const db = new Datastore({ filename: '.data/datafile', autoload: true });

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/storeEmail", function(req, res){
  //TODO: Fix callback madness with Async/Await or something
  const inputEmail = req.query.email
  if(inputEmail.length === 0){
    res.sendStatus(400)
    return
  }
  const emailData = {email: req.query.email}
  db.find(emailData, function(err, docs){
    if(err){
        console.log("There's a problem with the database: ", err);
        res.sendStatus(400);
        return;
    }
    if(docs.length > 0){
      console.log("Email already exists, skipping insert");
      res.sendStatus(200);
      return;
    }
    db.insert(emailData, function(err, emailInserted){
      if(err){
        console.log("There's a problem with the database: ", err);
        res.sendStatus(400);
        return;
      }
      else if(emailInserted){
        console.log("Email inserted into database");
        res.sendStatus(200);
        return;
      }
    });
  })
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//TODO: Use this eventually
// var helper = require('sendgrid').mail;
// var fromEmail = new helper.Email('test@example.com');
// var toEmail = new helper.Email('test@example.com');
// var subject = 'Hello World from the SendGrid Node.js Library!';
// var content = new helper.Content('text/plain', 'Hello, Email!');
// var mail = new helper.Mail(fromEmail, subject, toEmail, content);

// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON()
// });

// if(process.env.SENDGRID_API_KEY){
//   sg.API(request, function (error, response) {
//     if (error) {
//       console.log('Error response received');
//     }
//     console.log(response.statusCode);
//     console.log(response.body);
//     console.log(response.headers);
//   });
// }