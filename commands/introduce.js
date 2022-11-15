const { SlashCommandBuilder } = require('@discordjs/builders');
const natureparsing = require('../n');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('introduce')
		.setDescription('Let me introdcue my self!'),
	async execute(interaction) {
		await interaction.reply('My name is paper-search-bot\nIt\'s a dissertation bot for researchers!\nI was made in Korea\nIf you would like to invite me to another server, you can use the link below.\nlink:https://discord.com/api/oauth2/authorize?client_id=987583132465246218&permissions=1239098575936&scope=bot\nFinally....\n**Thank you for using this!**');
	},
};