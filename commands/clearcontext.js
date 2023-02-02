const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearcontext')
		.setDescription('Clear the context of your conversation with the bot'),
	async execute(interaction) {
		const contextFileName = `${interaction.user.username}-${interaction.user.discriminator}.log`;
		
		await interaction.reply("Clearing context...")
			.then(async () => {
				await fs.rm(contextFileName);
			})
			.then(async () => {
				await interaction.editReply("Successfully cleared your context file.");
			})
			.catch(error => {
				console.error(error);
				interaction.editReply("Error occured when attempting to clear your context file. (Your context file may not exist.");
			});
	},
};