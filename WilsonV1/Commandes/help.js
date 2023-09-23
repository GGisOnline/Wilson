const Discord = require("discord.js")

module.exports = {

    name: "help",

    description: "Return a list of command that can be done by users",


    async run(bot, message) {

        //TODO
        const exampleEmbed = {
            color: 0x6BFF33,
            title: 'User Panel Control',
            author: {
                name: 'Wilson',
                icon_url: 'https://cdn.discordapp.com/attachments/778253840214392832/778660944783736864/TheQG_LOGO_SF_1.png',
            },
            description: 'User commands available',
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
                    name: 'Play * Song Name * / Pause / Resume / Skip',
                    value: 'Play the song you want.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Volume * Value *',
                    value: 'Adjust the volume value of the song.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Poll * Question *',
                    value: 'Create a poll.',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Assistance [COMING SOON]',
                    value: 'Need more help? A suggestion? Do not hesitate!',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: '... and more!',
                    value: 'More coming soon!',
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