const { ApplicationCommandOptionType, ChatInputCommandInteraction, MessageComponentInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const choices = [
    { name: 'Rock', emoji: '🪨', beats: 'Scissors' },
    { name: 'Scissors', emoji: '✂️', beats: 'Paper' },
    { name: 'Paper', emoji: '📄', beats: 'Rock' },
];
module.exports = {

    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    run: async ({ interaction }) => {
        try {
            const targetUser = interaction.options.getUser('user');

            if (interaction.user.id === targetUser.id) {
                interaction.reply({
                    content: 'You cannot play rock paper scissors with yourself\nYou must play with another player.',
                    ephemeral: true,
                });

                return;
            };

            if (targetUser.bot) {
                interaction.reply({
                    content: 'You cannot play rock paper scissors with a bot.',
                    ephemeral: true,
                });

                return;
            };

            const embed = new EmbedBuilder()
                .setTitle(`Rock Paper Scissors`)
                .setDescription(`It's currently ${targetUser}'s turn.`)
                .setColor('Green')
                .setTimestamp(new Date());

            const buttons = choices.map((choice) => {
                return new ButtonBuilder()
                    .setCustomId(choice.name)
                    .setLabel(choice.name)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(choice.emoji)
            });


            const row = new ActionRowBuilder().addComponents(buttons);

            const reply = await interaction.reply({
                content: `# **${targetUser}, you have been challenged to the rock paper scissor game by ${interaction.user}**. **To start playing, click one of the buttons below**.\n**## Have a great time!**`,
                embeds: [embed],
                components: [row],
            });

            const targetUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === targetUser.id,
                time: 30_000,
            }).catch(async (error) => {
                embed.setDescription(`## Game ended. ${targetUser} did not responded in time.`);
                await reply.edit({ embeds: [embed], components: [] });
            });

            if (!targetUserInteraction) return;

            const targetUserChoice = choices.find(
                (choice) => choice.name === targetUserInteraction.customId,
            );


            await targetUserInteraction.reply({content: `You picked ${targetUserChoice.name + targetUserChoice.emoji}`, ephemeral: true,});

            // Edit embed with the updated user turn

            embed.setDescription(`## It's currently ${interaction.user}'s turn.`);
            await reply.edit({
                content: `${interaction.user} it's your turn now.`,
                embeds: [embed],
            });

            const initialtUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 30000,
            }).catch(async (error) => {
                embed.setDescription(`## Game ended. ${interaction.user} did not responded in time.`);
                await reply.edit({ embeds: [embed], components: [] });
            });

            if (!initialtUserInteraction) return;

            const initialUserChoice = choices.find(
                (choice) => choice.name === initialtUserInteraction.customId
            );

            let result;

            if(targetUserChoice.beats === initialUserChoice.name) {
                result = `# ${targetUser} won! 🎉`;
            }
            
            if (initialUserChoice.beats === targetUserChoice.name) {
                result = `# ${interaction.user} won! 🎉`;
            }

            if (targetUserChoice.name === initialUserChoice.name) {
                result = "# It was a tie!";
            }

            embed.setDescription(
                `## ${targetUser} picked ${targetUserChoice.name + targetUserChoice.emoji}\n
                ## ${interaction.user} picked ${initialUserChoice.name + initialUserChoice.emoji}\n\n
                ${result}`
            );

            reply.edit({ embeds: [embed], components: []});

            
        } catch (error) {
            console.log(`Error with /rps: ${error}.`);
        }
    },

    data:  {
        name: 'rps-multiplayer',
        description: 'Play rock paper scissors with another member in the server.',
        dm_permission: false,
        options: [
            {
                name: 'user',
                description: 'The member you want to play with.',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ],
    },
    
};
