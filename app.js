import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY});
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

    const toolCalls = completions.choices[0].message.tool_calls
    if(!toolCalls){
        console.log(`Assistant: ${completions.choices[0].message.content}`)

        return;
    }

    for (const tool of toolCalls){
        console.log('tool: ',tool);
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        if(functionName==='webSearch'){
            const toolResult=await webSearch(JSON.parse(functionParams))
            console.log("Tool result: ", toolResult)
        }
    }


    // console.log(JSON.stringify(completions.choices[0].message, null, 2));
}
await main();

async function webSearch({query}){
    // here we will do tavily api call
    console.log('Calling web search...')
    const response = await tvly.search(query);
    console.log('Response: ', response)

    const finalResult = response.results.map((result)=> result.content);
    console.log('finalResult: ',finalResult)
    return "Iphone was launched on 20 september 2024.";
}