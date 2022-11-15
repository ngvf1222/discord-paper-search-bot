const { SlashCommandBuilder } = require('@discordjs/builders');
const natureparsing = require('../n');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nature')
		.setDescription('search nature')
		.addStringOption(option =>
			option.setName('query')
			.setDescription('query')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('author')
			.setDescription('author'))
			.addStringOption(option =>
				option.setName('title')
				.setDescription('title'))
				.addStringOption(option =>
					option.setName('journals')
					.setDescription('journals'))
					.addStringOption(option =>
						option.setName('volume')
						.setDescription('volume'))
						.addIntegerOption(option =>
							option.setName('spage')
							.setDescription('spage'))
							.addStringOption(option =>
								option.setName('order')
								.setDescription('order')
								.addChoices(
									{ name: 'Relevance', value: 'relevance' },
									{ name: 'Date published (new to old)', value: 'date_desc' },
									{ name: 'Date published (old to new)', value: 'date_asc' },
								))
								.addIntegerOption(option =>
									option.setName('date_rangestart')
									.setDescription('date_rangestart'))
									.addIntegerOption(option =>
										option.setName('date_rangeend')
										.setDescription('date_rangeend'))
										.addIntegerOption(option =>
											option.setName('page')
											.setDescription('page')),
	async execute(interaction) {
		await interaction.deferReply();
		const papers = await natureparsing(interaction.options.getString('query'),interaction.options.getString('author') ?? '',interaction.options.getString('title') ?? '',interaction.options.getString('journals') ?? '',interaction.options.getString('volume') ?? '',interaction.options.getInteger('spage') ?? 0,interaction.options.getString('order') ?? 'relevance',interaction.options.getInteger('date_rangestart') ?? 0,interaction.options.getInteger('date_rangeend') ?? 0,interaction.options.getInteger('page') ?? 1)
		await interaction.editReply('Ready!');
		for (let d of papers) {
			await interaction.followUp('**title:' + d.title + '**\n*description:'+d.description+'\n\nauthors:'+d.authorlist.join()+'\nlink:' + d.url + '\nupdated:' + d.date+'\nOpenaccess:'+d.Openaccess+'*\n=====================================\n');
		}
		await interaction.followUp('end, papers count:'+papers.length)
	},
};//어이 거기 미래에 나! 글자수 제한 때문에 에러난건 내가 해결햇다구!