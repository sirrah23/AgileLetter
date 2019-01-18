const app = require("./server.js");
const {runWeekly} = require("./scheduler.js")
const agileMailer = require("./agileMailer")

//Send an agile email to subscribers every Monday morning
runWeekly(1, 8, 0, agileMailer)


//Start the web server
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});