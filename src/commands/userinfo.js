const {
	inline,
	bold,
	options,
	colors,
	getEmbedMessage,
} = require('../helpers/msgManager');
const {
	getId,
	getUsername,
	getCreationDate,
	getPresenceStatus,
	getBotStat,
	getRoles,
	getNickname,
	getHighestRole,
	getJoinedDate,
} = require('../helpers/sysManager');

module.exports = {
	name: 'userinfo',
	aliases: ['whois', 'user-info'],
	description: 'Gets information about the mentioned user',
	run: function (msg, args) {
		let member = msg.member;
		if (!!msg.mentions.members.first()) member = msg.mentions.members.first();
		let fields = [];

		const user = member.user;
		let user_info = `
        🔹 ID: ${bold(getId(user))}
        🔹 Name: ${inline(getUsername(user))}
        🔹 Created:
        ${inline(getCreationDate(user)[0])} (${bold(getCreationDate(user)[1])})
        🔹 Status: ${bold(getPresenceStatus(user))}
        🔹 Is Bot: ${bold(getBotStat(user))}
        `;
		fields.push({
			name: 'User Information',
			value: user_info,
		});

		let roles = getRoles(member);
		roles.forEach((e, i) => {
			roles[i] = inline(e);
		});
		let member_info = `
        ${
					!!getNickname(member)
						? `🔹 Nickname: ${bold(getNickname(member))}`
						: ''
				}
        🔹 Joined Server:
        ${inline(getJoinedDate(member)[0])} (${bold(getJoinedDate(member)[1])})
        🔹 Highest Role: ${bold(getHighestRole(member))}
        🔹 Roles[${bold(roles.length)}]:
        ${roles.join(' | ')}
        `;
		fields.push({
			name: 'Member Information',
			value: member_info,
		});
		let newOptions = new Object(options);
		(newOptions.fields = fields),
			(newOptions.thumbnail = user.avatarURL()),
			(newOptions.footer = {
				text: msg.author.tag,
				icon_url: msg.author.avatarURL(),
			}),
			(newOptions.color = 'info');
		msg.channel.send(getEmbedMessage(newOptions));
	},
	usage: 'channelinfo <blank/#channel-name>',
};
