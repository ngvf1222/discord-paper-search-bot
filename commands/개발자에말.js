const { SlashCommandBuilder } = require('@discordjs/builders');
const natureparsing = require('../n');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('개발자에말')
		.setDescription('개발자에 진솔한 사연과 말들'),
	async execute(interaction) {
		await interaction.reply('안녕하세요 논문봇 개발자 ngvf입니다.\n저는 가끔 논문을 읽습니다.\n논문을 읽으며 힐링이 될때도 있습니다.\n하지만 논문을 찾고 읽는것은 귀찮은 일입니다.\n특히 저는 디스코드에서 이야기를 나눌때 논문을 검색,인용하러 다른사이트로 가는 것이 불편했습니다.\n그래서 디스코드 안에서 논문을 읽고 검색하며 성장하고십었습니다.\n그리하여 이봇을 만들게 되었으며 많은 연구자에게 도움이 되려합니다.\n막상 만들고 나니 별거 없지만 많이 많이 써주셨으면 하는 바람입니다. 긴글읽어주셔서 감사합니다.\n 개발자 ngvf 올림\n추신:소스코드는 https://github.com/ngvf1222/discord-paper-search-bot');
	},
};