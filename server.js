const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const ChatHistory = require('../CodePilot/src/models/ChatHistory')
const ChatHistory = require('../CodePilot/src/models/ChatHistory')
const ChatHistory = require('../CodePilot/src/models/ChatHistory')

app.use(express.json())
app.use(cors())
require('dotenv').config();


const API_KEY = process.env.OPENAI_API_KEY

mongoose.connect('mongodb+srv://gorock397:091560397@test.vriqyqc.mongodb.net/?retryWrites=true&w=majority', {
     useNewUrlParser: true, 
     useUnifiedTopology: true

})
mongoose.connection.on('error', console.error.bind(console,'MongoDB connection error:'));



function constructPrompt(userMessage) {
    const scenario = "You are a sophisticated AI coding assistant with extensive knowledge in software development, debugging, and algorithm design. Your role is to assist with programming queries, provide code examples, explain complex concepts in simple terms, and guide users towards best practices in software development.";
    const combinedPrompt = `${scenario} A user has asked: ${userMessage}`;
    return combinedPrompt;
}

app.post('/completions', async (req, res) => {

    //using constructPrompt to process the user message
    const prompt = constructPrompt(req.body.message);

    const options = {
        method:"POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            max_tokens: 200,
        })
    }

    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    }
    catch (error) { 
        console.error(error)
    }
}
)

app.post('/save-message', async (req,res) =>{
    const {userId, sender, content} = req.body;

    try{
        let chatHistory = await ChatHistory.findOne({userId:userId});
        if(!chatHistory){
            chatHistory = new ChatHistory({userId, messages:[]});
        }
        chatHistory.messages.push({sender, content});
        chatHistory.lastUpdated = new Date();
        await chatHistory.save();

        res.status(200).send({message:'Message saved'});

    }catch (error){
        console.error(error);
        res.status(500).send('Error saving message');
    }
})

app.get('/chat-history/:userId', async(req, res) =>{
    const userId = req.params.userId;

     try {
        const chatHistory = await ChatHistory.findOne({ userId: userId });
        res.status(200).json(chatHistory);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving chat history');
    }
})

app.listen(PORT ,()=> console.log('Your server is running on PORT ' + PORT))