const discord = require("discord.js");

/*
  .setColor('#0099ff')
  .setTitle('Some title')
  .setURL('https://discord.js.org/')
  .setAuthor(
    'Some name',
    'https://i.imgur.com/wSTFkRM.png',
    'https://discord.js.org',
  )
  .setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/wSTFkRM.png')
  .addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
  )
  .addField('Inline field title', 'Some value here', true)
  .setImage('https://i.imgur.com/wSTFkRM.png')
  .setTimestamp()
  .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png')
*/

const embedMsg = {
	color: "",
	title: "",
	thumbnail: "",
	url: "",
	author: {
		name: "Lilith",
		icon_url: "https://i.imgur.com/nEddK08t.jpg",
		url: "https://shivishbrahma.github.io",
	},
	fields: [],
	footer: {
		text: "",
		icon_url: "",
	},
};

embedMsg.colors = {
	info: "#086788",
	fact: "#07a0c3",
	success: "#7fb800",
	danger: "#dd1c1a",
	warning: "#f0c808",
	light: "#fff1d0",
};

embedMsg.getEmbedMessage = function () {
	exampleEmbed = new discord.MessageEmbed()
		.setColor(this.colors[this.color])
		.setTitle(this.title)
		.setURL(this.url)
		.setThumbnail(this.thumbnail);

	exampleEmbed.fields = this.fields;
	exampleEmbed.author = this.author;
	exampleEmbed.footer = this.footer;
	exampleEmbed.setTimestamp();
	return exampleEmbed;
};

module.exports = embedMsg;
