// Run dotenv
require('dotenv').config();

// Import libraries
const discord = require('discord.js');
const client = new discord.Client();

// Event listener when a user connected to the server.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', msg => {

    // We check the message content and looks for the word "ping", so we can have the bot respond "pong"
    if (msg.content === 'ping') {
        msg.reply('pong');
    }

});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);