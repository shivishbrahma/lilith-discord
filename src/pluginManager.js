export const plugins = {
    userinfo: import("./plugins/sysCmd.js").userInfo,
    channelinfo: import("./plugins/sysCmd.js").channelInfo,
    serverinfo: import("./plugins/sysCmd.js").serverInfo
    // metart: import("./plugins/metart.premium").metart,
};

export function getPlugin(msg) {
    return plugins[msg.cmd](msg);
}
