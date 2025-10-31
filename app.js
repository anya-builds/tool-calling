import Groq from "groq-sdk";

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main(){
    const completions = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature:0,
        messages:[
            {
                role: 'system',
                content: `You are a smart personal assistant who answers the asked question.`,
            },
            {
                role:'user',
                content: 'What is the current weather in mumbai?',
                // When was iphone 16 launched?
            },
        ],
        tools:[
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
    });
    console.log(completions.choices[0].message);
}
await main();

async function webSearch({query}){
    // here we will do tavily api call

    return "Iphone was launched on 20 september 2024.";
}