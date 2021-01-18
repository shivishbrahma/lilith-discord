const plugins = {
	userinfo: require("./plugins/sysCmd").userInfo,
	channelinfo: require("./plugins/sysCmd").channelInfo,
	serverinfo: require("./plugins/sysCmd").serverInfo,
	metart: require("./plugins/metart.premium").metart,
};

function getPlugin(msg) {
	return plugins[msg.cmd](msg);
}

module.exports = { getPlugin, plugins };
