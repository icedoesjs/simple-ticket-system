const { RichEmbed } = require('discord.js')
var botchanid = "660745137588273165"
module.exports = {
    name: "create-tick",
    category: "misc",
    aliases: ["ctick"],
    description: "Creates a public ticket",
    run: async(client, message, args) => {
        await message.delete()
        let embed = new RichEmbed()
        var attemptcheck = message.guild.channels.find(c => c.name === `${message.author.id}-ticket`)
        var tickettxt = args.slice(0).join(' ')
        if (!tickettxt) {
            tickettxt = "**This is your ticket, please respond accordingly**"
        }
        if (attemptcheck) return message.reply(`You already have an open ticket in <#${attemptcheck.id}>`)
        if (message.channel.id !== botchanid) return message.reply(`Please use <#${botchanid}>`)
        if (message.channel.id == botchanid && !attemptcheck) {
            message.reply(`Your **ticket** was created!`)
            embed.setAuthor(`Ticket ID: ${message.author.id}`)
            embed.setColor("BLUE")
            embed.setDescription(`**${tickettxt}**`)
            embed.setFooter(`Made By IceyyM8`)
            message.guild.createChannel(`${message.author.id}-ticket`, {
                type: 'text',
                permissionOverwrites: [{
                        allow: "VIEW_CHANNEL",
                        id: message.author.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '657501074676121601'
                    }
                ]
            }).then(c => c.send(embed))
        } else {
            return message.reply(`It seems there was an **error**`)
        }
    }
}
