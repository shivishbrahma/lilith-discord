const countdown = require('countdown');
const { bold } = require('../helpers/msgManager');
const bootTime = new Date();

module.exports = {
	name: 'uptime',
	aliases: ['wakeuntil'],
	description: 'Gets uptime of the server',
	run: function (msg, args) {
		msg.channel.send(
			`Lilith is serving since ${bold(countdown(bootTime))} ago!`
		);
	},
	usage: 'serverinfo',
};
