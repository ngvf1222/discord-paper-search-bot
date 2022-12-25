const { SlashCommandBuilder } = require('@discordjs/builders');
const arxiv = require('arxiv-api');
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
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
				.setRequired(true))
				.addIntegerOption(option =>
					option.setName('maxresults')
						.setDescription('max results')
						.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const papers = await arxiv.search({
			searchQueryParams: [
				{
					include: [{ name: interaction.options.getString('data') }],
				}
			],
			start: interaction.options.getInteger('start'),
			maxResults: interaction.options.getInteger('maxresults'),
		});
		let index=0;
		let row;
		const filter = i => i.customId === 'hehind';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000*interaction.options.getInteger('results') });
		const filter2 = i => i.customId === 'next';
		const collector2 = interaction.channel.createMessageComponentCollector({ filter2, time: 100000*interaction.options.getInteger('results') });
		let d=papers[index]
		let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.id)
				.setAuthor({ name: d.authors.join()==''?'none':d.authors.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.id })
				.setDescription(d.summary==''?'none':d.summary)
				.addFields(
					{ name: 'updated', value: d.updated },
				);
				if(index===0){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary),
					);
				}else if(index===papers.length-1){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
					);
				}else{
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary)
					);
				}
				await interaction.editReply({ embeds: [pEmbed] , components: [row] });
				collector.on('collect', async i => {
					index-=1
					let d=papers[index]
		let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.id)
				.setAuthor({ name: d.authors.join()==''?'none':d.authors.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.id })
				.setDescription(d.summary==''?'none':d.summary)
				.addFields(
					{ name: 'updated', value: d.updated },
				);
				if(index===0){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary),
					);
				}else if(index===papers.length-1){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
					);
				}else{
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary)
					);
				}
					await i.update({ embeds: [pEmbed] , components: [row] });
				});
				collector2.on('collect', async i => {
					index+=1
					let d=papers[index]
		let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.id)
				.setAuthor({ name: d.authors.join()==''?'none':d.authors.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.id })
				.setDescription(d.summary==''?'none':d.summary)
				.addFields(
					{ name: 'updated', value: d.updated },
				);
				if(index===0){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary),
					);
				}else if(index===papers.length-1){
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
					);
				}else{
					row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('behind')
							.setLabel('◀')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('next')
							.setLabel('▶')
							.setStyle(ButtonStyle.Primary)
					);
				}
					await i.update({ embeds: [pEmbed] , components: [row] });
				});
		/*
		let p=''
		for (let d of papers) {
			console.log(d)
			p = p + '**title:' + d.title + '**\n*link:' + d.id + '*\nsummary:' + d.summary.slice(0, 29)+'...\n*updated:' + d.updated+'*\n=====================================\n'
		}

		await interaction.reply(p);*/
	},
};