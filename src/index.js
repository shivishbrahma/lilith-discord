// Run dotenv
require('dotenv').config();

// Import libraries
const winston = require('winston');
const fs = require('fs');
const chalk = require('chalk');
const { Client, Collection } = require('discord.js');

const { commandHandler } = require('./helpers/pluginManager');
require('./api');

// Create Discord Client
const client = new Client();
client.commands = new Collection();

client.prefix = process.env.PREFIX || '$';

const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.printf(
		(log) => `[${log.level.toUpperCase()}] - ${log.message}`
	),
});

client.on('ready', () =>
	logger.log('info', chalk.greenBright('👼 Lilith serving online!'))
);
client.on('debug', (m) => logger.log('debug', chalk.blue(m)));
client.on('warn', (m) => logger.log('warn', chalk.yellow(m)));
client.on('error', (m) => logger.log('error', chalk.redBright(m)));

process.on('uncaughtException', (error) =>
	logger.log('error', chalk.redBright(error))
);

const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	if (command.aliases)
		for (let alias of command.aliases) client.commands.set(alias, command);
}

// Event listener when a user sends a message in the chat.
client.on('message', commandHandler);

// Initialize bot by connecting to the server
// client.login(process.env.DISCORD_TOKEN);
