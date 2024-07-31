const { Schema, model } = require('mongoose');

const guildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    suggestionChannelIds: {
        type: [String],
        default: [],
    },
});

module.exports = model('GuildConfiguration', guildConfigurationSchema);