
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

// for twilio
const accountSid = "ACca4f4761c0abed27237855081e8e957f";
const authToken = "40e0af57252bf7fd0f1f62449c5d59a6";
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
     from: '+19108983524',
     to: '+13107295697'
   })
  .then(message => console.log(message.sid));

};

runPrompt();


