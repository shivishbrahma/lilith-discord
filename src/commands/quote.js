module.exports = {
	name: 'quote',
	description: 'Get quote as message',
	run: function (msg, args) {
		msg.reply('Quote!');
	},
	usage: 'quote',
};
