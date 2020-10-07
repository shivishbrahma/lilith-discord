const plugins = {
	userinfo: require("./plugins/sysCmd").userInfo,
	channelinfo: require("./plugins/sysCmd").channelInfo,
	serverinfo: require("./plugins/sysCmd").serverInfo,
};

function getPlugin(msg) {
	return plugins[msg.cmd](msg);
}

module.exports = { getPlugin, plugins };
