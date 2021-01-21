// const cmds = {
// 	userinfo: require('./plugins/sysCmd').userInfo,
// 	channelinfo: require('./plugins/sysCmd').channelInfo,
// 	serverinfo: require('./plugins/sysCmd').serverInfo,
// 	clear: require('./plugins/clear').clear,
// 	help: require('./plugins/help'),
// 	metart: require('./plugins/metart.premium').metart,
// };

module.exports = {
	commandHandler: function (msg) {
		if (!msg.content.startsWith(msg.client.prefix) || msg.author.bot) return;

		const args = msg.content.slice(msg.client.prefix.length).trim().split(/ +/);
		const cmd = args.shift().toLowerCase();

		if (msg.client.commands.has(cmd)) {
			try {
				msg.client.commands.get(cmd).run(msg, args);
			} catch (error) {
				console.error(error);
			}
		}
	},
};
