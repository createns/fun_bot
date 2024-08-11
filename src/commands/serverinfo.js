const { EmbedBuilder } = require('discord.js');

module.exports ={
    
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "You can only run this command inside a server.",
                ephemeral: true,
            });
            return;
        }

        const { guild } = interaction;

        const serverInfoEmbed = new EmbedBuilder({
            author: { name: guild.name, iconURL: guild.iconURL({ size: 256 }) },

            fields: [
                { name: 'Owner', value: (await guild.fetchOwner()).user.tag, inline: true },
                { name: 'Text Channels', value: await guild.channels.cache.filter((c) => c.type === 0).toJSON().length, inline: true },
                { name: 'Voice Channels', value: await guild.channels.cache.filter((c) => c.type === 2).toJSON().length, inline: true },
                { name: 'Category Channels', value: await guild.channels.cache.filter((c) => c.type === 4).toJSON().length, inline: true },
                { name: 'Members', value: guild.memberCount, inline: true },
                { name: 'Roles', value: guild.roles.cache.size, inline: true },
                { name: 'Role List', value: guild.roles.cache.toJSON().join(', ') }
            ],

            footer: { text: `ID: ${guild.id} | Server Created: ${guild.createdAt.toDateString()}` }
        });

        interaction.reply({ embeds: [serverInfoEmbed] });
    },

    data: {
        name: 'serverinfo',
        description: "Get information about this server."
    },
};

