const { italic, bold, formatUsage } = require('../helpers/msgManager');

module.exports = {
	name: 'clear',
	aliases: ['purge', 'delete-chat'],
	description: 'Clears the message',
	run: function (msg, args) {
		if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
			msg.channel.reply("You don't have permissions to do that!");
			return;
		}
		if (!args[0]) {
			msg.reply('Please enter a number of messages to clear!');
			msg.channel.send(formatUsage(this, msg.channel.prefix));
			return;
		}
		let deleteNum = parseInt(args[0]);
		if (isNaN(deleteNum)) {
			msg.reply(`${args[0]} is not a Number`);
			return;
		}
		if (deleteNum < 1 || deleteNum > 100) {
			msg.reply(`Should be inclusive 1 and 100`);
			return;
		}
		if (msg.channel.type !== 'text') {
			msg.reply('This is not a Text channel');
			return;
		}

		msg.channel
			.bulkDelete(deleteNum)
			.then((messages) => {
				msg
					.reply(`${italic(bold(`Cleared ${messages.size} messages.`))}`)
					.then((omsg) => omsg.delete({ timeout: 2000 }))
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err) => {
				console.error(err);
			});
		msg.delete().catch((err) => {
			console.error(err);
		});
	},
	usage: 'clear <amount_of_messages>',
};
