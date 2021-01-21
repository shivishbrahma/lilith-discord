const {
	italic,
	inline,
	bold,
	titleCase,
	options,
	getEmbedMessage,
} = require('../helpers/msgManager');
const {
	getCreationDate,
	getId,
	getName,
	getNSFW,
	getTopic,
} = require('../helpers/sysManager');

module.exports = {
	name: 'channelinfo',
	aliases: ['whereis', 'channel-info'],
	description: 'Gets information about the mentioned channel',
	run: function (msg) {
		let channel = msg.channel;
		if (!!msg.mentions.channels.first())
			channel = msg.mentions.channels.first();
		let fields = [];
		let channel_info = `
        🔹 ID: ${bold(getId(channel))}
        🔹 Name: ${inline(getName(channel))}
        🔹 Created: 
        ${inline(getCreationDate(channel)[0])} (${bold(
			getCreationDate(channel)[1]
		)})
        🔹 Type: ${bold(titleCase(channel.type))}
        🔹 Parent: ${bold(italic(channel.parent.name))} 
        🔹 Topic: ${italic(getTopic(channel))}
        🔹 Is NSFW: ${bold(getNSFW(channel))}
        `;
		fields.push({
			name: 'Channel Information',
			value: channel_info,
		});

		let newOptions = new Object(options);
		(newOptions.fields = fields),
			(newOptions.thumbnail = msg.guild.iconURL()),
			(newOptions.footer = {
				text: msg.author.tag,
				icon_url: msg.author.avatarURL(),
			}),
			(newOptions.color = 'green');
		msg.channel.send(getEmbedMessage(newOptions));
	},
	usage: 'channelinfo <blank/#channel-name>',
};
