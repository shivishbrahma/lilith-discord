// Run dotenv
require("dotenv").config();

// Import libraries
const discord = require("discord.js");
const winston = require("winston");
const chalk = require("chalk");
const commando = require("discord.js-commando");
const client = new discord.Client();
const prefix = process.env.PREFIX;

const { getPlugin, plugins } = require("./pluginManager");
const sysCmd = require("./plugins/sysCmd");

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "log" }),
	],
	format: winston.format.printf(
		(log) => `[${log.level.toUpperCase()}] - ${log.message}`
	),
});

client.on("ready", () =>
	logger.log("info", chalk.greenBright("\u{1F916} Lilith is online!"))
);
client.on("debug", (m) => logger.log("debug", chalk.blue(m)));
client.on("warn", (m) => logger.log("warn", chalk.yellow(m)));
client.on("error", (m) => logger.log("error", chalk.redBright(m)));

process.on("uncaughtException", (error) => logger.log("error", error));

// Event listener when a user sends a message in the chat.
client.on("message", (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	msg.args = msg.content.slice(prefix.length).trim().split(/ +/);
	msg.cmd = msg.args.shift().toLowerCase();
	// Command Not Present In List
	if (!plugins.hasOwnProperty(msg.cmd)) return;

	// console.log(msg.author.presence.member.roles.cache)
	msg.channel.send(getPlugin(msg));
});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);
