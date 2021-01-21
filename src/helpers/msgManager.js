const { MessageEmbed } = require('discord.js');

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

const options = {
	color: 'RANDOM',
	title: '',
	thumbnail: '',
	url: '',
	author: {
		name: 'Lilith',
		icon_url: 'https://imgur.com/nEddK08.jpg',
		url: 'https://shivishbrahma.github.io',
	},
	fields: [],
	footer: {
		text: '',
		icon_url: '',
	},
};

const colors = {
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

function getEmbedMessage(options) {
	exampleEmbed = new MessageEmbed()
		.setColor(colors[options.color])
		.setTitle(options.title)
		.setURL(options.url)
		.setThumbnail(options.thumbnail);

	exampleEmbed.fields = options.fields;
	exampleEmbed.author = options.author;
	exampleEmbed.footer = options.footer;
	exampleEmbed.setTimestamp();
	return exampleEmbed;
}

function getErrorMessage() {}

function getHelpMessage(cmd, usage) {
	const prefix = process.env.PREFIX || 'li!';
	const helpEmbed = new MessageEmbed().setColor(colors['pink']);
	helpEmbed.fields = [
		{
			name: `${titleCase(cmd)} Command`,
			value: `Usage: ${prefix}${usage}`,
		},
	];
	return helpEmbed;
}

function titleCase(str) {
	str = str.toLowerCase();
	str = str.split(' ');
	for (let i = 0; i < str.length; i++)
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	return str.join(' ');
}

function sentenceCase(str) {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function bold(str) {
	return `**${str}**`;
}

function italic(str) {
	return `*${str}*`;
}

function underline(str) {
	return `__${str}__`;
}

function strikethrough(str) {
	return `~~${str}~~`;
}

function inline(str) {
	return `\`${str}\``;
}

function spoiler(str) {
	return `||${str}||`;
}

function quote(str) {
	return `>${str}`;
}

function quoteblock(str) {
	return `>>>${str}`;
}

function objectPrint(col) {
	r = [];
	for (let i in col) {
		r.push(`${bold(col[i])} ${italic(i)}`);
	}
	return r.join(', ');
}

function formatCommand(command, prefix) {
	let cmdEmbed = new MessageEmbed()
		.setColor(colors.success)
		.addField(
			`${titleCase(command.name + ' command')}`,
			`${
				inline(command.description) +
				'\n' +
				`Usage: ${inline(`${prefix}${command.usage}`)}`
			}`
		)
		.setThumbnail('https://i.imgur.com/nEddK08.jpg');
	cmdEmbed.author = options.author;
	return cmdEmbed;
}

function formatUsage(command, prefix) {
	let cmdEmbed = new MessageEmbed()
		.setColor(colors.success)
		.addField(`${command.name} Usage`, `${inline(`${prefix}${command.usage}`)}`)
		.setThumbnail('https://i.imgur.com/nEddK08.jpg');
	cmdEmbed.author = options.author;
	return cmdEmbed;
}

module.exports = {
	options,
	colors,
	getEmbedMessage,
	getErrorMessage,
	getHelpMessage,
	titleCase,
	sentenceCase,
	bold,
	italic,
	underline,
	strikethrough,
	inline,
	spoiler,
	quote,
	quoteblock,
	objectPrint,
	formatCommand,
	formatUsage,
};
