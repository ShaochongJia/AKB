
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "your-api-key",
});

// for twilio
const accountSid = "your-acct";
const authToken = "your-token";
const client = require('twilio')(accountSid, authToken);

const openai = new OpenAIApi(config);

const runPrompt = async () => {


  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a robot who compliments me every day, and it's important because it brings me good feelings."},
              { role: "user", content: "compliment me today! Directly start." }],
  });


  console.log(response.data.choices[0].message.content)

  client.messages
  .create({
     body: response.data.choices[0].message.content,
     from: 'your-number',
     to: 'your-number'
   })
  .then(message => console.log(message.sid));

};

runPrompt();


