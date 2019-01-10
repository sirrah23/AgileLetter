const express = require('express');
const app = express();
const db = require("./db.js");


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
  
    const emailToStore = {email: inputEmail}
    
    //TODO: Hide this logic in another function
    db.find(emailToStore)
      .then((emailDocsDB) => {
        if(emailDocsDB.length > 0){
          console.log(`${inputEmail} already exists in database, quitting`);
          res.sendStatus(400);
          return Promise.resolve(null)
        } else {
          return db.insert(emailToStore)
        }
      })
      .then((emailInsertRes) => {
        if(emailInsertRes !== null){
            console.log(`${inputEmail} inserted into database with id ${emailInsertRes._id}`);                                          
            res.sendStatus(200);
        }
      })
      .catch((e) => {
        console.log(`Something went wrong: ${e}`);
        res.sendStatus(500)
      });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});