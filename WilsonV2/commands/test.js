exports.run = async (bot, message, args, ops) => {

    message.delete();

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "Sorry, only GGisOnline and Admins can use this command."
            }
        });
    } else {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "Sorry, it is currently under maintenance"
            }
        });
    }

    //message.channel.send("There aren't currently any test, please try again later.")

    const user = message.mentions.members.first();
    if (!user) return message.reply('Please use a proper mention if you want to mute someone.');
    if (!user.voice.channel) return message.channel.send('Not connected to a voice channel');

    const connection = user.voice.channel.join();
}