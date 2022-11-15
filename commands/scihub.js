const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const cheerio = require('cheerio');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('scinub')
		.setDescription('view scihub')
		.addStringOption(option =>
			option.setName('doi')
				.setDescription('doi')
				.setRequired(true)),
	async execute(interaction) {
		const getHtml = async () => {
			try {
				return await axios.get('https://sci-hub.se/'+interaction.options.getString('doi'));
			} catch (error) {
				console.error(error);
			}
		};
		let pdata;
		await getHtml()
			.then((html) => {
				// axios ���� ��Ű�� `data`�� ������ ������ ����(������)�� �޴´�.
				// load()�� ���ڷ� html ���ڿ��� �޾� cheerio ��ü ��ȯ
				
				const $ = cheerio.load(html.data);
				pdata = $('#pdf').attr('src');
			})
		await interaction.reply('https:'+pdata);
	},
};