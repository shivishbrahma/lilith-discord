const plugins = {
    // userinfo: import("../plugins/sysCmd.js").userInfo,
    userinfo: require("../plugins/sysCmd.js").userinfo,
    channelinfo: import("../plugins/sysCmd.js").channelInfo,
    serverinfo: import("../plugins/sysCmd.js").serverInfo
};

function getPlugin(msg) {
    return plugins[msg.cmd](msg);
}

module.exports = { plugins, getPlugin };
