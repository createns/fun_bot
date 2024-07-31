const mongoose = require('mongoose');

const notificationConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    notificationChannelId: {
        type: String,
        required: true,
    },
    ytChannelId: {
        type: String,
        required: true,
    },
    customMessage: {
        type: String,
        required: false,
    },
    lastChecked: {
        type: Date,
        required: true,
    },
    lastCheckedVid: {
        type: {
            id: {
                type: String,
                required: true
            },
            pubDate: {
                type: Date,
                required: true,
            }
        },
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('NotificationConfig', notificationConfigSchema);