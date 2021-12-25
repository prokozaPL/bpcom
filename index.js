const { Client, Collection, MessageEmbed } = require("discord.js");
const { inspect } = require('util');
const { readdirSync } = require("fs");
const client = new Client();
const Enmap = require("enmap")                 
const canvacord = require("canvacord")         
client.points = new Enmap({ name: "points" });
require("discord-buttons")(client);
// const leveling = require("./ranking");   

client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();

//youtube Togheder

readdirSync("./handlers").forEach(handler => {
  if (!handler.endsWith(".js")) return;
  console.log(`Załadowano ${handler}`);
  require(`./handlers/${handler}`)(client);
});
//Toghederr 
client.on('messageCreate', async message => { // 'message' for Discord.js v12
  if (message.content === 'start') {
      if(message.member.voice.channel) {
          client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {
              return message.channel.send(`${invite.code}`);
          });
      };
  };
});
client.on('guildMemberAdd', async(member) => {
  const Channel = member.guild.channels.cache.get('909868212471070800')
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`Witaj! ${member.user.tag}`)
    .setTimestamp(member.joinedTimestamp)
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`> Witaj **@${member.user.tag}** na Serwerze **${member.guild.name}** jest nas teraz **${member.guild.memberCount}**.`)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setImage(`https://media.discordapp.net/attachments/834206903843422230/913104047421136896/christmasbp.png?width=500&height=164`)
    .setFooter(`Witaj! ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
    Channel.send(`${member} was invited by ${invite.inviter} and the code was ${invite.code}`,embed);
})
client.login(client.config.token);