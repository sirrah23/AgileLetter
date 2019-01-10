const express = require('express');
const app = express();
const {storeEmail, deleteEmail} = require("./emailStore.js");


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.redirect("/sub");
});

app.get("/sub", function (req, res) {
  res.sendFile(`${__dirname}/views/sub.html`);
});

app.get("/unsub", function(req, res){
    res.sendFile(`${__dirname}/views/unsub.html`);
});

app.post("/storeEmail", function(req, res){
    const inputEmail = req.query.email;
    
    if(!inputEmail || inputEmail.length === 0){
      console.log("No email given");
      res.sendStatus(400);
      return;
    }
  
    storeEmail(inputEmail)
      .then((emailDoc) => {
        console.log(`${inputEmail} inserted with id ${emailDoc._id}`)
        res.sendStatus(200)
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`)
        res.sendStatus(400)
      })
})

app.post("/deleteEmail", function(req, res){
    const inputEmail = req.query.email;
    
    if(!inputEmail || inputEmail.length === 0){
      console.log("No email given");
      res.sendStatus(400);
      return;
    }
  
    deleteEmail(inputEmail)
      .then((numRemoved) => {
        if(numRemoved !== 1){
           console.log(`${inputEmail} could not be deleted`)
        } else {
           console.log(`${inputEmail} deleted`) 
        }
        res.sendStatus(200)
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`)
        res.sendStatus(400)
      })
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});