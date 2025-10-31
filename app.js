import Groq from "groq-sdk";

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main(){
    const completions = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature:0,
        messages:[
            {
                role: 'system',
                content: `You are a smart personal assistant who answers the asked question.
                You have access to following tools:
                1. searchWeb({query}: {query: string}) //Search the latest information and realtime data on the internet.`,
            },
            {
                role:'user',
                content: 'When was iphone 16 launched?',
                // When was iphone 16 launched?
            },
        ],
        tools:[
    {
      "type": "function",
      "function": {
        "name": "webSearch",
        "description": "Search the latest information and real time data on internet.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "The search query to perform search on."
            },
          },
          "required": ["query"]
        }
      }
    }
  ],
    tool_choice:'auto',
    });
    console.log(completions.choices[0].message);
}
await main();

async function webSearch({query}){
    // here we will do tavily api call

    return "Iphone was launched on 20 september 2024.";
}