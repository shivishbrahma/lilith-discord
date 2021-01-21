const { formatCommand, formatUsage } = require('../helpers/msgManager');

module.exports = {
	name: 'help',
	description: 'Get extra info for command',
	run: function (msg, args) {
		if (msg.client.commands.has(args[0])) {
			msg.channel.send(
				formatCommand(msg.client.commands.get(args[0]), msg.client.prefix)
			);
		} else msg.reply('Invalid Command');
	},
	usage: 'help <command-name>',
};
