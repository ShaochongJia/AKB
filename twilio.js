// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "ACca4f4761c0abed27237855081e8e957f";
const authToken = "40e0af57252bf7fd0f1f62449c5d59a6";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19108983524',
     to: '+13107295697'
   })
  .then(message => console.log(message.sid));
