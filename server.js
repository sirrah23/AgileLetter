const express = require('express');
const app = express();
const {storeEmail} = require("./emailStore.js");


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
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

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});