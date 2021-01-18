const cmds = {
	userinfo: require('./plugins/sysCmd').userInfo,
	channelinfo: require('./plugins/sysCmd').channelInfo,
	serverinfo: require('./plugins/sysCmd').serverInfo,
	clear: require('./plugins/clear').clear,
	help: require('./plugins/help'),
	metart: require('./plugins/metart.premium').metart,
};

module.exports = async function (msg) {
	const prefix = process.env.PREFIX || 'li!';
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();
	let reply = '';

	if (Object.keys(cmds).includes(cmd)) {
		try {
			reply = await cmds[cmd](msg, args);
		} catch (error) {
			console.error(error);
		}
	}
	if (reply && reply !== '') msg.channel.send(reply);
};
