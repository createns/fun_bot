const { Client, ActivityType } = require('discord.js');
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');
require('dotenv/config');

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  bulkRegister: true,
  devGuildIds: ['1213418575227002880'],
  devUserIds: ['1265184246633463879']
});

client.on('ready', (c) => {
   

  client.user.setActivity({
      name: "Listening to Reports...",
      type: ActivityType.Custom,
  })
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to DB');
  client.login(process.env.TOKEN);
});


// Define your commands in an array


/*client.on('messageCreate', message => {
  if (message.content.startsWith('!help')) {
      const helpEmbed = new MessageEmbed()
          .setTitle('Help Menu')
          .setDescription('Here are all the available commands:')
          .setColor('#00FF00');

      // Iterate over each command and add it to the embed
      commands.forEach(command => {
          helpEmbed.addField(`!${command.name}`, `**Description:** ${command.description}\n`, false);
      });

      // Send the embed to the channel
      message.channel.send({ embeds: [helpEmbed] });
  }

  // Example command handling
  if (message.content.startsWith('?ping')) {
      message.channel.send('Pong!');
  }*/
  /*if (message.content.startsWith('?help?')) {
    message.channel.send('# **Here are all my supported commands:**\n**• /config-suggestion add\n• /config-suggestion remove\n• /notification-setup\n• /notification-remove\n• /rps-multiplayer\n• /suggest**');
  }*/

  // Add more command handlers as needed
//});