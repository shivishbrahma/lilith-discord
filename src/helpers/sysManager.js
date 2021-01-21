const moment = require('moment');
const { titleCase } = require('../helpers/msgManager');

/**
 * * Common Getters
 */

/**
 * Returns discord entity id
 * @param {Discord.(User|Server|Channel)} user
 */
function getId(entity) {
	return entity.id;
}

function getName(entity) {
	return entity.name;
}

function getCreationDate(entity) {
	const { createdTimestamp } = entity;
	return [
		moment(createdTimestamp).format('ddd, MMM D, YYYY h:mm A'),
		moment(createdTimestamp).fromNow(),
	];
}

/**
 * * User Getters
 */

function getUsername(user) {
	return user.username || '';
}

function getNickname(member) {
	return member.nickname || '';
}

function getJoinedDate(member) {
	const { joinedTimestamp } = member;
	return [
		moment(joinedTimestamp).format('ddd, MMM D, YYYY h:mm A'),
		moment(joinedTimestamp).fromNow(),
	];
}

function getBotStat(user) {
	return user.bot ? 'Yes' : 'No';
}

function getHighestRole(member) {
	return member.roles.highest.name || '';
}

function getRoles(member) {
	let roles = member.roles.cache || [],
		r = [];
	for (let role of roles) {
		if (role[1].name !== '@everyone') r.push(role[1].name);
	}
	return r;
}

function getPresenceStatus(member) {
	const psMap = {
		online: 'Online',
		idle: 'Idle',
		offline: 'Offline',
		dnd: 'Do Not Disturb',
	};
	return psMap[member.presence.status];
}

/**
 * * Channel Getters
 */

function getTopic(channel) {
	return !!channel.topic ? `${channel.topic}` : 'No description';
}

function getNSFW(channel) {
	return channel.nsfw ? 'Yes' : 'No';
}

/**
 * * Server Getters
 */
function getExplicitContentFilter(server) {
	const ecfMap = {
		DISABLED: 'Disabled',
		MEMBERS_WITHOUT_ROLES: 'No role',
		ALL_MEMBERS: 'All',
	};
	return ecfMap[server.explicitContentFilter];
}

function getSysRoles(server) {
	const roles = server.roles.cache;
	r = [];
	for (let role of roles) {
		if (role[1].name !== '@everyone') r.push(role[1].name);
	}
	return r;
}

function getVerificationLevel(server) {
	return titleCase(server.verificationLevel.replace('_', ' '));
}

function getChannelTypes(channels) {
	r = {};
	for (let channel of channels) {
		if (r.hasOwnProperty(channel[1].type)) r[channel[1].type]++;
		else r[channel[1].type] = 1;
	}
	return r;
}

function getUserTypes(users) {
	r = { 'cached human': 0, bots: 0 };
	for (let user of users) {
		if (user[1].user.bot) r.bots++;
		else r['cached human']++;
	}
	return r;
}

module.exports = {
	getBotStat,
	getChannelTypes,
	getCreationDate,
	getExplicitContentFilter,
	getHighestRole,
	getId,
	getJoinedDate,
	getName,
	getNickname,
	getNSFW,
	getPresenceStatus,
	getRoles,
	getSysRoles,
	getTopic,
	getUserTypes,
	getUsername,
	getVerificationLevel,
};
