const sendEmail = require("./mailer.js");
const emailStore = require("./emailStore.js");
const {getRandomPrinciple} = require("./agile.js")

function sendAgileEmailToSubs(){
  console.log("Begin email send process");
  return emailStore.getAllEmail()
    .then(emails => {
      const numEmails = emails.length;
      if(numEmails === 0){
         console.log("No subscribers to email, quitting");
        return Promise.resolve(true);
      }
      console.log(`Sending emails to ${numEmails} subscribers`); 
      const principle = getRandomPrinciple()
      const promises = emails.map(e => sendEmail("test@example.com", e.email, "Agile Principle of the Day", principle));
      return Promise.all(promises)
    })
}

module.exports = sendAgileEmailToSubs