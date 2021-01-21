const {
	inline,
	bold,
	titleCase,
	options,
	getEmbedMessage,
	objectPrint,
} = require('../helpers/msgManager');
const {
	getChannelTypes,
	getCreationDate,
	getExplicitContentFilter,
	getId,
	getName,
	getSysRoles,
	getUserTypes,
	getVerificationLevel,
} = require('../helpers/sysManager');

module.exports = {
	name: 'serverinfo',
	aliases: ['whichworld', 'server-info'],
	description: 'Gets information about the current server',
	run: function (msg) {
		let server = msg.guild;
		let fields = [];
		let roles = getSysRoles(server);
		roles.forEach((e, i) => {
			roles[i] = inline(e);
		});
		let chTypes = getChannelTypes(server.channels.cache),
			uTypes = getUserTypes(server.members.cache);
		let server_info = `
        🔹 ID: ${bold(getId(server))}
        🔹 Name: ${inline(getName(server))}
        🔹 Owner: ${server.owner}
        🔹 Created: 
        ${inline(getCreationDate(server)[0])} (${bold(
			getCreationDate(server)[1]
		)})
        🔹 Region: ${bold(
					titleCase(server.region)
				)} :flag_${server.region.slice(0, 2)}:
        🔹 Members: ${bold(server.memberCount)} (${objectPrint(uTypes)})
        🔹 Channels: ${bold(server.channels.cache.size)} (${objectPrint(
			chTypes
		)})
        🔹 Premium: ${bold(server.premiumTier)} (${
			server.premiumSubscriptionCount
		} boosts)
      🔹 Verification: ${bold(getVerificationLevel(server))}
        🔹 Explicit Filter: ${bold(getExplicitContentFilter(server))}
      🔹 Roles: [${bold(roles.length)}]
      ${roles.join(' | ')}
        `;
		fields.push({
			name: 'Server Information',
			value: server_info,
		});

		let newOptions = new Object(options);
		(newOptions.fields = fields),
			(newOptions.thumbnail = server.iconURL()),
			(newOptions.footer = {
				text: msg.author.tag,
				icon_url: msg.author.avatarURL(),
			}),
			(newOptions.color = 'fact');
		msg.channel.send(getEmbedMessage(newOptions));
	},
	usage: 'serverinfo',
};
