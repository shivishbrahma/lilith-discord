// Import libraries
// Run dotenv
import "dotenv/config";
import chalk from "chalk";
import { Client, Events, GatewayIntentBits } from "discord.js";
import winston from "winston";
// import comando from 'discord.js-commando';

import { getPlugin, plugins } from "./pluginManager.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const prefix = process.env.PREFIX;

// const sysCmd = require("./plugins/sysCmd");
// const { cli } = require("winston/lib/winston/config");

const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: "log" })],
    format: winston.format.printf((log) => `[${log.level.toUpperCase()}] - ${log.message}`)
});

client.on(Events.ClientReady, (readyClient) =>
    logger.log("info", chalk.greenBright(`🤖 ${readyClient.user.tag} is online!`))
);
client.on(Events.Debug, (m) => logger.log("debug", chalk.blue(m)));
client.on(Events.Warn, (m) => logger.log("warn", chalk.yellow(m)));
client.on(Events.Error, (m) => logger.log("error", chalk.redBright(m)));

process.on("uncaughtException", (error) => logger.log("error", error));

// Event listener when a user sends a message in the chat.
// client.on(Events.MessageCreate, (msg) => {
//     logger.info(`[${msg.author.tag}] ${msg.content}`);
//     if (!msg.content.startsWith(prefix) || msg.author.bot) return;

//     msg.args = msg.content.slice(prefix.length).trim().split(/ +/);
//     msg.cmd = msg.args.shift().toLowerCase();

//     // Command Not Present In List
//     if (!plugins.hasOwnProperty(msg.cmd)) return;

//     // console.log(msg.author.presence.member.roles.cache)
//     let reply = getPlugin(msg);
//     if (reply != "") msg.channel.send(reply);
// });

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);
