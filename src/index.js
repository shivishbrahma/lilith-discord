// Import libraries
// Run dotenv
const dotenv = require("dotenv");
const chalk = require("chalk");
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const winston = require("winston");
const fs = require("node:fs");
const path = require("node:path");
// import comando from 'discord.js-commando';

// import { getPlugin, plugins } from "./manager/pluginManager.js";

dotenv.config();
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

client.commands = new Collection();
const folderPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Event listener when a user sends a message in the chat.
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        logger.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true
            });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN).catch((error) => logger.error(error));
