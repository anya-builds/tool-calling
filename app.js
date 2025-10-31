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
                content: 'When was iphone 16 launched?',
            },
        ],
    });
    console.log(completions.choices[0].message);
}