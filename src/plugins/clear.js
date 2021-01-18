const discord = require('discord.js');

const embedMsg = require('../msgManager');
const { bold, underline, italic, inline } = embedMsg.stringHandler;

module.exports.clear = async function (msg, args) {
	if (args[0] == 'help') {
		msg.channel.send(embedMsg.getHelpMessage('clear', 'clear <amount>'));
		return;
	}

	msg.delete();

	if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
		return "You don't have permissions to do that!";
	}
	if (!args[0]) {
		return `Please enter a number of messages to clear!\n${inline(
			`Usage: ${prefix}clear <amount>`
		)}`;
	}
	let deleteNum = parseInt(args[0]);
	if (isNaN(deleteNum)) {
		return 'That is not a number';
	}
	if (msg.channel.type !== 'text') {
		return 'This is not a Text channel';
	}

	try {
		let messages = await msg.channel.bulkDelete(deleteNum);

		let pmsg = await msg.channel.send(
			`${italic(bold(`Cleared ${messages.size} messages.`))}`
		);
		await pmsg.delete({ timeout: 2000 });
	} catch (err) {
		console.log('Error while doing Bulk Delete');
		console.log(err);
	}
};
