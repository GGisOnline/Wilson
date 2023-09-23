const Discord = require("discord.js")

module.exports = {

    name: "admin",

    description: "Return a list of command that can be done by admins only",


    async run(bot, message) {

        //TODO
        const exampleEmbed = {
            color: 0xff0000,
            title: 'Admin Panel Control',
            author: {
                name: 'Wilson',
                icon_url: 'https://cdn.discordapp.com/attachments/778253840214392832/778660944783736864/TheQG_LOGO_SF_1.png',
            },
            description: 'Admin commands available',
            thumbnail: {
                url: 'https://i.imgur.com/ZAcETHe.jpg',
            },
            fields: [
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Status',
                    value: 'Give the complete status of Wilson itself, the Discord server and the local server.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Error [UNAVAILABLE]',
                    value: 'Give all the details of an error that occurred.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Mute/Unmute @username',
                    value: 'Mute/Unmute the user.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Mute/Unmute',
                    value: 'Mute/Unmute all the players in the voice channel.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Kick @username * Reason *',
                    value: 'Kick the user.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Reset',
                    value: 'Reset itself if necessary.',
                    inline: true,
                }
            ],
            timestamp: new Date(),
        };
        

        await message.reply({
            embeds: [exampleEmbed],
            
            //ephemeral : true,
        })
    }
}