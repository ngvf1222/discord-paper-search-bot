const { SlashCommandBuilder } = require('@discordjs/builders');
const arxiv = require('arxiv-api');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('arxiv')
		.setDescription('search arxiv')
		.addStringOption(option =>
			option.setName('data')
				.setDescription('search word')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('start')
				.setDescription('search start number')
				.setRequired(true)),
	async execute(interaction) {
		const papers = await arxiv.search({
			searchQueryParams: [
				{
					include: [{ name: interaction.options.getString('data') }],
				}
			],
			start: interaction.options.getInteger('start'),
			maxResults: 7,
		});
		let p=''
		for (let d of papers) {
			p = p + '**title:' + d.title + '**\n*link:' + d.id + '*\nsummary:' + d.summary.slice(0, 29)+'...\n*updated:' + d.updated+'*\n=====================================\n'
		}

		await interaction.reply(p);
	},
};