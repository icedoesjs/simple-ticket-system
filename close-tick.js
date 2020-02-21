const { RichEmbed } = require('discord.js')
module.exports = {
    name: "rem-tick",
    category: "misc",
    aliases: ["ctick"],
    description: "Deletes a public ticket",
    run: async(client, message, args) => {
        await message.delete()
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`No permission`)
        }
        var id = args[0]
        var attemptcheck = message.guild.channels.find(c => c.name === `${id}-ticket`)
        if (!attemptcheck) {
            return message.reply(`It seems the ticket id **${id}** was not found, remembers to use the user's id!`)
        } else if (attemptcheck) {
            var finduser = message.guild.members.get(id)
            finduser.send(`Your **ticket** was closed by ${message.author.username}, if you believe this was an **error**, please contact staff!`)
            attemptcheck.delete().catch(e => console.log(e))
            message.channel.send(`The ticket ID **${id}** was closed!`)
        } else {
            return message.reply(`An unknown **error** occured!`)
        }
    }
}
