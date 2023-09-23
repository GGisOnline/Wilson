exports.run = (bot, message, args, ops) => {
    message.delete();
    if (args[0] === 'a' || args[0] === 'ad' || args[0] === 'admin' || args[0] === 'Admin') {

        //If the author is adminbot
        if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Sorry, only Admins can use this Command'
                }
            });
        }

        return message.channel.send({
            embed: {
                color: 0xFF0000,
                title: "Wilson's Commands [ADMIN ONLY]",
                description: "Petit récapitulatif des différentes fonctionnalités de Wilson ***disponibles uniquements aux administrateurs de TheQG*** !",
                fields: [{
                    name: "1) Wilson Status",
                    value: "Wilson affichera un tableau reprenant l'état du serveur."
                },
                    {
                        name: "2) Wilson Présente-toi",
                        value: "Wilson se présentera pour tout le monde."
                    },
                    {
                        name: "3) Wilson Mute / Unmute + ***(user.id)***",
                        value: "Wilson mutera la personne pour vous ! SI personne n'est mentionné, tout le chat sera mute ! Pratique non ?"
                    },
                    {
                        name: "4) Wilson Delete + ***(2-100)***",
                        value: "Wilson supprimera les messages pour vous !"
                    },
                    {
                        name: "5) Wilson Reset",
                        value: "Wilson n'en fait qu'à sa tête ? Redémarrez-le !"
                    },
                    {
                        name: "...and more !",
                        value: "Découvrez plein d'autres fonctionnalités cachées !"
                    },
                    {
                        name: "X) Wilson Help Admin",
                        value: "Vous ne savez plus comment utiliser Wilson ? Demandez-lui !"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© By GG.StudioX",
                }
            }
        });

    } else {
        return message.channel.send({embed: {
                color: 0xffffff,
                title: "Wilson's Commands",
                description: "Petit récapitulatif des différentes fonctionnalités de Wilson",
                fields: [{
                    name: "1) Wilson Play + ***titre de votre chanson*** / (Pause/Resume) / Skip / Leave",
                    value: "Wilson rejoindra votre channel et jouera votre musique."
                },
                    {
                        name: "2) Wilson volume + ***(valeur entre 0 & 200)***",
                        value: "Wilson ajustera la musique pour vous."
                    },
                    {
                        name: "3) Wilson Sondage +  ***sujet de votre sondage***",
                        value: "Besoin d'avoir plusieurs avis ? Wilson est là pour vous créer un sondage."
                    },
                    {
                        name: "4) Wilson assistance [**COMING SOON**]",
                        value: "Besoin d'aide ? Envie de donner un conseil ? N'hésitez pas, Wilson est là pour vous !"
                    },
                    {
                        name: "...and more !",
                        value: "Découvrez plein d'autres fonctionnalités cachées !"
                    },
                    {
                        name: "X) Wilson Help",
                        value: "Vous ne savez plus comment utiliser Wilson ? Demandez-lui !"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© By GG.StudioX",
                }
            }
        });
    }
}