// const dateFormat = require("dateformat");
const moment = require('moment');
const embedMsg = require('../msgManager');
const { bold, inline, italic, titleCase, objectPrint } = embedMsg.stringHandler;
const sysCmd = {};

/**
 * * Common Getters
 */

/**
 * Returns discord entity id
 * @param {Discord.(User|Server|Channel)} user
 */
sysCmd.getId = function (entity) {
	return entity.id;
};

sysCmd.getName = function (entity) {
	return entity.name;
};

sysCmd.getCreationDate = function (entity) {
	const { createdAt, createdTimestamp } = entity;
	return [
		moment(createdTimestamp).format('ddd, MMM D, YYYY h:mm A'),
		moment(createdTimestamp).fromNow(),
	];
};

/**
 * * User Getters
 */

sysCmd.getUsername = function (user) {
	return user.username || '';
};

sysCmd.getNickname = function (member) {
	return member.nickname || '';
};

sysCmd.getJoinedDate = function (member) {
	const { joinedTimestamp } = member;
	return [
		moment(joinedTimestamp).format('ddd, MMM D, YYYY h:mm A'),
		moment(joinedTimestamp).fromNow(),
	];
};

sysCmd.getBotStat = function (user) {
	return user.bot ? 'Yes' : 'No';
};

sysCmd.getHighestRole = function (member) {
	return member.roles.highest.name || '';
};

sysCmd.getRoles = function (member) {
	let roles = member.roles.cache || [],
		r = [];
	for (let role of roles) {
		if (role[1].name !== '@everyone') r.push(role[1].name);
	}
	return r;
};

sysCmd.getPresenceStatus = function (member) {
	const psMap = {
		online: 'Online',
		idle: 'Idle',
		offline: 'Offline',
		dnd: 'Do Not Disturb',
	};
	return psMap[member.presence.status];
};

/**
 * * Channel Getters
 */

sysCmd.getTopic = function (channel) {
	return !!channel.topic ? `${channel.topic}` : 'No description';
};

sysCmd.getNSFW = function (channel) {
	return channel.nsfw ? 'Yes' : 'No';
};

/**
 * * Server Getters
 */
sysCmd.getExplicitContentFilter = function (server) {
	const ecfMap = {
		DISABLED: 'Disabled',
		MEMBERS_WITHOUT_ROLES: 'No role',
		ALL_MEMBERS: 'All',
	};
	return ecfMap[server.explicitContentFilter];
};

sysCmd.getSysRoles = function (server) {
	const roles = server.roles.cache;
	r = [];
	for (let role of roles) {
		if (role[1].name !== '@everyone') r.push(role[1].name);
	}
	return r;
};

sysCmd.getVerificationLevel = function (server) {
	return titleCase(server.verificationLevel.replace('_', ' '));
};

sysCmd.getChannelTypes = function (channels) {
	r = {};
	for (let channel of channels) {
		if (r.hasOwnProperty(channel[1].type)) r[channel[1].type]++;
		else r[channel[1].type] = 1;
	}
	return r;
};

sysCmd.getUserTypes = function (users) {
	r = { 'cached human': 0, bots: 0 };
	for (let user of users) {
		if (user[1].user.bot) r.bots++;
		else r['cached human']++;
	}
	return r;
};

/**
 *
 * @param {*} msg
 */
sysCmd.userInfo = async function (msg, args) {
	if (args[0] == 'help') {
		msg.channel.send(
			embedMsg.getHelpMessage('user info', 'userinfo (blank)|<user-mention>')
		);
		return;
	}
	let member = msg.member;
	if (!!msg.mentions.members.first()) member = msg.mentions.members.first();
	embedMsg.color = 'info';
	let fields = [];

	const user = member.user;
	let user_info = `
	🔹 ID: ${bold(sysCmd.getId(user))}
	🔹 Name: ${inline(sysCmd.getUsername(user))}
	🔹 Created:
	${inline(sysCmd.getCreationDate(user)[0])} (${bold(
		sysCmd.getCreationDate(user)[1]
	)})
	🔹 Status: ${bold(sysCmd.getPresenceStatus(user))}
	🔹 Is Bot: ${bold(sysCmd.getBotStat(user))}
	`;
	fields.push({
		name: 'User Information',
		value: user_info,
	});

	let roles = sysCmd.getRoles(member);
	roles.forEach((e, i) => {
		roles[i] = inline(e);
	});
	let member_info = `
	${
		!!sysCmd.getNickname(member)
			? `🔹 Nickname: ${bold(sysCmd.getNickname(member))}`
			: ''
	}
	🔹 Joined Server:
	${inline(sysCmd.getJoinedDate(member)[0])} (${bold(
		sysCmd.getJoinedDate(member)[1]
	)})
	🔹 Highest Role: ${bold(sysCmd.getHighestRole(member))}
	🔹 Roles[${bold(roles.length)}]:
	${roles.join(' | ')}
	`;
	fields.push({
		name: 'Member Information',
		value: member_info,
	});

	embedMsg.fields = fields;
	embedMsg.thumbnail = user.avatarURL();
	embedMsg.footer.text = msg.author.tag;
	embedMsg.footer.icon_url = msg.author.avatarURL();
	return embedMsg.getEmbedMessage();
};

sysCmd.channelInfo = function (msg, args) {
	if (args[0] == 'help') {
		msg.channel.send(
			embedMsg.getHelpMessage(
				'channel info',
				'channelinfo (blank)|<channel-mention>'
			)
		);
		return;
	}
	let channel = msg.channel;
	if (!!msg.mentions.channels.first()) channel = msg.mentions.channels.first();
	embedMsg.color = 'info';
	let fields = [];
	let channel_info = `
    🔹 ID: ${bold(sysCmd.getId(channel))}
    🔹 Name: ${inline(sysCmd.getName(channel))}
	🔹 Created: 
	${inline(sysCmd.getCreationDate(channel)[0])} (${bold(
		sysCmd.getCreationDate(channel)[1]
	)})
    🔹 Type: ${bold(titleCase(channel.type))}
    🔹 Parent: ${bold(italic(channel.parent.name))} 
    🔹 Topic: ${italic(sysCmd.getTopic(channel))}
    🔹 Is NSFW: ${bold(sysCmd.getNSFW(channel))}
    `;
	fields.push({
		name: 'Channel Information',
		value: channel_info,
	});
	embedMsg.fields = fields;
	embedMsg.thumbnail = msg.guild.iconURL();
	embedMsg.footer.text = msg.author.tag;
	embedMsg.footer.icon_url = msg.author.avatarURL();
	return embedMsg.getEmbedMessage();
};

/**
 * Server Options
 */

sysCmd.serverInfo = function (msg, args) {
	if (args[0] == 'help') {
		msg.channel.send(
			embedMsg.getHelpMessage(
				'server info',
				'serverinfo (blank)|<server-mention>'
			)
		);
		return;
	}
	let server = msg.guild;
	let fields = [];
	let roles = sysCmd.getSysRoles(server);
	roles.forEach((e, i) => {
		roles[i] = inline(e);
	});
	let chTypes = sysCmd.getChannelTypes(server.channels.cache),
		uTypes = sysCmd.getUserTypes(server.members.cache);
	embedMsg.color = 'info';
	let server_info = `
    🔹 ID: ${bold(sysCmd.getId(server))}
    🔹 Name: ${inline(sysCmd.getName(server))}
    🔹 Owner: ${server.owner}
	🔹 Created: 
	${inline(sysCmd.getCreationDate(server)[0])} (${bold(
		sysCmd.getCreationDate(server)[1]
	)})
    🔹 Region: ${bold(titleCase(server.region))} :flag_${server.region.slice(
		0,
		2
	)}:
    🔹 Members: ${bold(server.memberCount)} (${objectPrint(uTypes)})
	🔹 Channels: ${bold(server.channels.cache.size)} (${objectPrint(chTypes)})
    🔹 Premium: ${bold(server.premiumTier)} (${
		server.premiumSubscriptionCount
	} boosts)
  🔹 Verification: ${bold(sysCmd.getVerificationLevel(server))}
	🔹 Explicit Filter: ${bold(sysCmd.getExplicitContentFilter(server))}
  🔹 Roles: [${bold(roles.length)}]
  ${roles.join(' | ')}
    `;
	fields.push({
		name: 'Server Information',
		value: server_info,
	});
	embedMsg.fields = fields;
	embedMsg.thumbnail = server.iconURL();
	embedMsg.footer.text = msg.author.tag;
	embedMsg.footer.icon_url = msg.author.avatarURL();
	return embedMsg.getEmbedMessage();
};

module.exports = sysCmd;
