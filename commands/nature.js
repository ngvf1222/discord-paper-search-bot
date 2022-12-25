const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
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
		let index=0;
		let row;
		const filter = i => i.customId === 'hehind';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 6000000 });
		const filter2 = i => i.customId === 'next';
		const collector2 = interaction.channel.createMessageComponentCollector({ filter2, time: 6000000 });
		let d=papers[index]
        	let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.url)
				.setAuthor({ name: d.authorlist.join()==''?'none':d.authorlist.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.url })
				.setDescription(d.description==''?'none':d.description)
				.addFields(
					{ name: 'updated', value: d.date },
					{ name: 'Openaccess', value: d.Openaccess+"" },
					{ name: 'Articletype', value: d.Articletype==''?'none':d.Articletype},
					{ name: 'journal', value: d.journal==''?'none':d.journal},
				)
				.addFields({ name: 'volumeandpageinfo', value: d.volumeandpageinfo==''?'none':d.volumeandpageinfo})
				.setImage(d.image_url=='https:undefined'?'https://i.ibb.co/rf1qByR/GZWnD1mV.png':d.image_url);
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
				.setURL(d.url)
				.setAuthor({ name: d.authorlist.join()==''?'none':d.authorlist.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.url })
				.setDescription(d.description==''?'none':d.description)
				.addFields(
					{ name: 'updated', value: d.date },
					{ name: 'Openaccess', value: d.Openaccess+"" },
					{ name: 'Articletype', value: d.Articletype==''?'none':d.Articletype},
					{ name: 'journal', value: d.journal==''?'none':d.journal},
				)
				.addFields({ name: 'volumeandpageinfo', value: d.volumeandpageinfo==''?'none':d.volumeandpageinfo})
				.setImage(d.image_url=='https:undefined'?'https://i.ibb.co/rf1qByR/GZWnD1mV.png':d.image_url);
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
				.setURL(d.url)
				.setAuthor({ name: d.authorlist.join()==''?'none':d.authorlist.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.url })
				.setDescription(d.description==''?'none':d.description)
				.addFields(
					{ name: 'updated', value: d.date },
					{ name: 'Openaccess', value: d.Openaccess+"" },
					{ name: 'Articletype', value: d.Articletype==''?'none':d.Articletype},
					{ name: 'journal', value: d.journal==''?'none':d.journal},
				)
				.addFields({ name: 'volumeandpageinfo', value: d.volumeandpageinfo==''?'none':d.volumeandpageinfo})
				.setImage(d.image_url=='https:undefined'?'https://i.ibb.co/rf1qByR/GZWnD1mV.png':d.image_url);
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
		/*let d=papers[i]
		let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.url)
				.setAuthor({ name: d.authorlist.join()==''?'none':d.authorlist.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.url })
				.setDescription(d.description==''?'none':d.description)
				.addFields(
					{ name: 'updated', value: d.date },
					{ name: 'Openaccess', value: d.Openaccess+"" },
					{ name: 'Articletype', value: d.Articletype==''?'none':d.Articletype},
					{ name: 'journal', value: d.journal==''?'none':d.journal},
				)
				.addFields({ name: 'volumeandpageinfo', value: d.volumeandpageinfo==''?'none':d.volumeandpageinfo})
				.setImage(d.image_url=='https:undefined'?'https://i.ibb.co/rf1qByR/GZWnD1mV.png':d.image_url);
		await interaction.editReply();*/
		/*for (let d of papers) {
			console.log(d)
			let pEmbed = new EmbedBuilder()
				.setColor(0x00FFFF)
				.setTitle(d.title)
				.setURL(d.url)
				.setAuthor({ name: d.authorlist.join()==''?'none':d.authorlist.join(), iconURL: 'https://i.ibb.co/rf1qByR/GZWnD1mV.png', url: d.url })
				.setDescription(d.description==''?'none':d.description)
				.addFields(
					{ name: 'updated', value: d.date },
					{ name: 'Openaccess', value: d.Openaccess+"" },
					{ name: 'Articletype', value: d.Articletype==''?'none':d.Articletype},
					{ name: 'journal', value: d.journal==''?'none':d.journal},
				)
				.addFields({ name: 'volumeandpageinfo', value: d.volumeandpageinfo==''?'none':d.volumeandpageinfo})
				.setImage(d.image_url=='https:undefined'?'https://i.ibb.co/rf1qByR/GZWnD1mV.png':d.image_url);
			await interaction.followUp({ embeds: [pEmbed] });
		}
		await interaction.followUp('end, papers count:'+papers.length)*/
	},
};//어이 거기 미래에 나! 글자수 제한 때문에 에러난건 내가 해결햇다구!