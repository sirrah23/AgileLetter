/**
* Send an email using the Sendgrid API.
*/

const helper = require('sendgrid').mail;
const API_KEY = process.env.SENDGRID_API_KEY;

if(!API_KEY){
  throw "SENDGRID_API_KEY not defined in .env file"
}

const sg = require('sendgrid')(API_KEY);

function sendEmail(fromEmail, toEmail, subject, content){
  const sgFrom = new helper.Email(fromEmail);
  const sgTo = new helper.Email(toEmail);
  const sgContent = new helper.Content('text/plain', content);
  const sgMail = new helper.Mail(sgFrom, subject, sgTo, sgContent)
  const sgRequest = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: sgMail.toJSON()
  });
  return new Promise((resolve, reject) => {
    sg.API(sgRequest, (error, response) => {
      if(error)
        reject(error)
      resolve(true)
    });
  })
}

module.exports = sendEmail;