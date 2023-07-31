const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const openWeatherMapApiKey = 'your api key';
const openAiApiKey = 'your api key';
const twilioAccountSid = 'your acct';
const twilioAuthToken = 'your token';

const config = new Configuration({
    apiKey: openAiApiKey,
});

const client = require('twilio')(twilioAccountSid, twilioAuthToken);
const openai = new OpenAIApi(config);

const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}`;
    const response = await axios.get(url);
    return response.data;
};

const generateCaringMessage = async (weatherDescription) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a caring robot who sends thoughtful messages to friends based on the weather." },
            { role: "user", content: `The weather is ${weatherDescription}. What message should I send to my friend?` }
        ],
    });
    return response.data.choices[0].message.content;
};

const sendCaringMessage = async (message, toPhoneNumber) => {
    const fromPhoneNumber = 'your-number';
    const messageResponse = await client.messages.create({
        body: message,
        from: fromPhoneNumber,
        to: toPhoneNumber
    });
    return messageResponse.sid;
};

const runPrompt = async () => {
    // Get weather data for a specific city
    const weatherData = await getWeatherData('New York');
    const weatherDescription = weatherData.weather[0].description;

    // Generate caring message based on weather conditions
    const caringMessage = await generateCaringMessage(weatherDescription);

    // Send the caring message to a friend's phone number
    const messageSid = await sendCaringMessage(caringMessage, 'your-number');
    console.log(`Message sent with SID: ${messageSid}`);
};

runPrompt();
