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
				// axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
				// load()는 인자로 html 문자열을 받아 cheerio 객체 반환
				
				const $ = cheerio.load(html.data);
				pdata = $('#pdf').attr('src');
			})
		await interaction.reply('https:'+pdata);
	},
};