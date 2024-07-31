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
      name: "Listening to Delivery services...",
      type: ActivityType.Custom,
  })
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to DB');
  client.login(process.env.TOKEN);
});
