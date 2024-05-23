require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { Ollama } = require('ollama');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.emoji.name == "botGILLES") {
        const messages = await reaction.message.channel.messages.fetch({ limit: 20 });

        const message = messages.first().content;
        const author = messages.first().author.username;

        console.log('Message : ' + message);
        console.log('Author : ' + author);

        const ollama = new Ollama({ host: 'https://ollama.adthomas.net/' });
        const response = await ollama.chat({
            model: 'dolphin-mistral',
            messages: [{ role: 'user', content: 'Here is a message from ' + author + ' : ' + message + '. Make a very short response to him by insulting him with the worst curse words and insults you can, make it X rated and disgusting. Your response and insults must be in context of the message. You need to just give me the response and nothing else. Optimize for brevity. Make the response in french.' }],
        });
        const bot_response = response.message.content;
        console.log('Bot response : ' + bot_response);

		reaction.message.reply(bot_response);
	}
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);

