module.exports = {
	name: 'ping',
	description: 'Send Ping to Lilith!',
	run: function (msg, args) {
		msg.reply('Pong!');
	},
	usage: 'ping',
};
