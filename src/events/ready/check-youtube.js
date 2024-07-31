const Parser = require('rss-parser');
const NotificationConfig = require('../../models/NotificationConfig');

const parser = new Parser();

/** * @param {import('discord.js').Client} client */
module.exports = (client) => {
    checkYouTube();
    setInterval(checkYouTube , 60000);

    async function checkYouTube() {
        try {
            const notificationConfigs = await NotificationConfig.find();

            for (const notificationConfig of notificationConfigs) {
                const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${notificationConfig.ytChannelId}`;

                const feed = await parser.parseURL(YOUTUBE_RSS_URL).catch((e) => null);

                if (!feed.items.length) continue;

                const latestVideo = feed.items[0];
                const lastCheckedVid = notificationConfig.lastCheckedVid;

                if (
                    !lastCheckedVid ||
                    (lastCheckedVideo.id.split(':')[2] !== lastCheckedVid.id &&
                        new Date(latestVideo.pubDate) > new Date(lastCheckedVid.pubDate)
                    )
                ) {
                    const targetGuild = 
                        client.guilds.cache.get(notificationConfig.guildId) || 
                        (await ckient.guilds.fetch(notificationConfig.guildId));

                    if (!targetGuild) {
                        await NotificationConfig.findOneAndDelete({ _id: notificationConfig._id });

                        const targetChannel = 
                            targetGuild.channels.cache.get(notificationConfig.notificationChannelId) ||
                            (await targetGuild.channels.fetch(notificationConfig.notificationChannelId));

                        if (!targetChannel) {
                            await NotificationConfig.findOneAndDelete({ _id: notificationConfig._id });
                            continue;
                        }

                        notificationConfig.lastCheckedVid = {
                            id: latestVideo.id.split(':')[2],
                            pubDate: latestVideo.pubDate,

                        };

                        notificationConfig.save()
                            .then(() => {
                                const targetMessage = 
                                    notificationConfig.customMessage
                                        ?.replace('{VIDEO_URL}', latestVideo.link)
                                        ?.replace('{VIDEO_TITLE}', latestVideo.title)
                                        ?.replace('{CHANNEL_URL}', feed.link)
                                        ?.replace('{CHANNEL_NAME}', feed.title) ||
                                    `New upload by ${feed.title}\n${latestVideo.link}`;

                                targetChannel.send(targetMessage);
                            }).catch((e) => null);
                    }
                }


            }
        } catch (error) {
            console.log(`Error in ${__filename}:\n`, error);
        }
    }
}