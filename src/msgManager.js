const discord = require('discord.js');

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
	color: 'RANDOM',
	title: '',
	thumbnail: '',
	url: '',
	author: {
		name: 'Lilith',
		icon_url: 'https://i.imgur.com/nEddK08.jpg',
		url: 'https://shivishbrahma.github.io',
	},
	fields: [],
	footer: {
		text: '',
		icon_url: '',
	},
};

embedMsg.colors = {
	info: '#086788',
	fact: '#07a0c3',
	success: '#7fb800',
	danger: '#dd1c1a',
	warning: '#f0c808',
	light: '#f7f3e3',
	blue: '#00a8e8',
	red: '#e54b4b',
	pink: '#ff47da',
	yellow: '#f6ae2d',
	green: '#285943',
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

embedMsg.getErrorMessage = function () {};

embedMsg.getHelpMessage = function (cmd, usage) {
	const prefix = process.env.PREFIX || 'li!';
	return new discord.MessageEmbed()
		.setColor(this.colors['pink'])
		.addField(
			`${this.stringHandler.titleCase(cmd)} Command`,
			`Usage: ${prefix}${usage}`
		);
};

embedMsg.stringHandler = {};

embedMsg.stringHandler.titleCase = function (str) {
	str = str.toLowerCase();
	str = str.split(' ');
	for (let i = 0; i < str.length; i++)
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	return str.join(' ');
};

embedMsg.stringHandler.sentenceCase = function (str) {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

embedMsg.stringHandler.bold = function (str) {
	return `**${str}**`;
};

embedMsg.stringHandler.italic = function (str) {
	return `*${str}*`;
};

embedMsg.stringHandler.underline = function (str) {
	return `__${str}__`;
};

embedMsg.stringHandler.strikethrough = function (str) {
	return `~~${str}~~`;
};

embedMsg.stringHandler.inline = function (str) {
	return `\`${str}\``;
};

embedMsg.stringHandler.spoiler = function (str) {
	return `||${str}||`;
};

embedMsg.stringHandler.quote = function (str) {
	return `>${str}`;
};

embedMsg.stringHandler.quoteblock = function (str) {
	return `>>>${str}`;
};

embedMsg.stringHandler.objectPrint = function (coll) {
	r = [];
	for (let i in coll) {
		r.push(
			`${embedMsg.stringHandler.bold(coll[i])} ${embedMsg.stringHandler.italic(
				i
			)}`
		);
	}
	return r.join(', ');
};

module.exports = embedMsg;
