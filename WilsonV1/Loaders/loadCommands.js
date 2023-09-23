const fs = require('fs');
var number = 0;
var total = 0;

module.exports = async bot => {

    fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {

        total +=1;
    })

    fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {

        let command = require(`../Commandes/${file}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande saisie ${file.slice(0, file.length - 3)} n'existe pas !`)
        bot.commands.set(command.name, command)

        number+=1;
        console.log(`\n Commande ${file} chargée avec succès ! ${number}/${total} \n
        --------------------------------------------------------`)
    })

}