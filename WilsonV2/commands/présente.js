exports.run = async (bot, message, args, ops) => {

    message.delete();

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    //Send Message
    return message.channel.send({
        embed: {
            color: 0xFF0000,
            description: "Bonjour, @everyone. Je m'appelle Wilson, je suis un bot pensé et conçu par le grand GG : fondateur de The QG & GG.StudioX."
        }
    });

}