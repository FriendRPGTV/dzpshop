const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
let prefix = 'dzp.';
let shop = {
  'status': 1
};
let admin = [
  '291149768397422593',
  '381805317241176065'
];
bot.on("ready", () => {
    bot.user.setPresence({ game: { name: `คำสั่ง ${prefix}help | สร้างโดย Chakung#0785` }, type: 0 });
    console.log("DZP Shop bot online! Created by Chakung.");
});
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    if(command === 'help') {
        const embed = new Discord.RichEmbed()
        .addField('รายการคำสั่ง','**dzp.help** : คำสั่งช่วยเหลือ\n**dzp.status** : ตรวจสอบว่าร้านเปิดหรือปิด\n**dzp.credit** : ตรวจสอบข้อมูลคนสร้างบอท')
        .setColor(0x00ccff)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'status')
    {
        if (shop.status === 1)
        {
          const embed = new Discord.RichEmbed()
          .setColor(0x00ff00)
          .addField('สถานะของร้าน','ตอนนี้ร้านเปิด')
          .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
          message.channel.sendEmbed(embed);
        }
        else
        {
          const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .addField('สถานะของร้าน','ตอนนี้ร้านปิด')
          .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
          message.channel.sendEmbed(embed);
        }
    }
    if(command === 'credit') {
        let chakung = bot.users.get('291149768397422593');
        const embed = new Discord.RichEmbed()
        .setAuthor(chakung.username+' ผู้สร้างบอท', chakung.avatarURL)
        .setDescription('พัฒนาบอท Discord ด้วยภาษา Javascript รับเปิดบอท online 24 ชั่วโมง ราคาเริ่มต้นที่ 100 บาท')
        .setColor(0x3399ff)
        .setImage(url=chakung.avatarURL)
        .setURL('https://www.facebook.com/polite.cha')
        .addField('ติดต่อสอบถาม','Discord: Chakung#0785\nFacebook: Polite Cha\nYoutube: FriendRPG TV')
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
});

bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    for (let i = 0; i < admin.length; i++)
        if(message.author.id !== admin[i]) return;
    if(command === 'admin') {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor(0xfff000)
        .addField('รายการคำสั่งสำหรับคนขาย','**dzp.open** : เปิดร้าน\n\n**dzp.close** : ปิดร้าน\n\n**dzp.say** [ข้อความ] : บอทพิมพ์ข้อความตามที่เราพิมพ์\nตัวอย่าง `d.say สวัสดี`\n\n**dzp.embed** [สีเลข6ตัว] [หัวข้อ] [เนื้อหา] : บอทจะส่งข้อความแบบมีกรอบ\nตัวอย่าง`d.embed 886688 ประกาศ วันนี้แอดมินไม่อยู่`\n\nd.give [เวลา(หน่วยเป็นนาที)] [ชื่อไอเทม] : บอทนับถอยหลังแจกของ\n`ตัวอย่างd.give 10 Pet-Eggs'+
        '')
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'open')
    {
        message.delete()
        shop.status = 1;
        const embed = new Discord.RichEmbed()
        .addField('คำสั่งเปิดร้าน','ตอนนี้ร้านเปิดแล้ว ตรวจสถานะของร้าน '+prefix+'status')
        .setColor(0x00ff00)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'close')
    {
        message.delete()
        shop.status = 0;
        const embed = new Discord.RichEmbed()
        .addField('คำสั่งปิดร้าน','ตอนนี้ร้านปิดแล้ว ตรวจสถานะของร้าน '+prefix+'status')
        .setColor(0xff0000)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'say')
    {
        message.delete()
        message.channel.send(args.slice(0).join(' '));
    }
    if (command === 'embed')
    {
        message.delete()
        let field = '';
        let content = '';
        let color = '0xffffff';
        let colors = message.content.split(' ')[1];
        let fields = message.content.split(' ')[2];
        let contents = args.slice(2).join(' ');
        if (colors !== '')
            color = '0x' + colors;
        if (fields !== '')
            field = fields;
        if (contents !== '')
            content = contents;
        if (color.length > 8)
            color = '0x000000';
        const embed = new Discord.RichEmbed()
        .addField(field, content)
        .setColor(color)
        .setFooter('DZP Shop', bot.user.avatarURL)
        .setTimestamp();
        message.channel.sendEmbed(embed);
    }
    if (command === 'give')
    {
        message.delete()
        let time = message.content.split(' ')[1];
        let item = args.slice(1).join(' ');
        const embed = new Discord.RichEmbed()
        .addField(item, `เริ่มนับถอยหลัง ${time} นาที\n`)
        .setColor(0x000000)
        .setFooter(bot.user.username+' | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(msg => msg.react('🎉'))
        .then(mReaction => { 
            const reactionFilter = (reaction, user) => reaction.emoji.name === '🎉';
            const collector = mReaction.message.createReactionCollector(reactionFilter, { time: (parseInt(time) * 60000) });
            let times = parseInt(time) * 60000;
            let winner = new Set();
            let win = '';
            const give = setInterval(function(){ 
                let embedLikeField = Object.assign({}, embed.fields[0]); // update 'field' with new value 
                if (times > 1000)
                    embedLikeField.value = 'จะเริ่มสุ่มใน '+(times / 1000)+' วินาที\n';
                else
                    embedLikeField.value = `ผู้ชนะ คือ ${win}\n`;
                
                const newEmbed = new Discord.RichEmbed({ 
                    color: 0x000000,
                    fields: [ embedLikeField ] 
                })
                .setFooter(bot.user.username+' | สร้างโดย Chakung', bot.user.avatarURL)
                mReaction.message.edit(newEmbed)
                .then(newMsg => {
                    times -= 1000;
                })
                
                if (times < 3000)
                {
                  for (let i = 0; i < winner.length; i++)
                    if (winner[i] === winner[Math.floor(Math.random() * winner.length)])
                      win = bot.users.get(winner[i]).username;
                }
                if (times <= 2000)
                {
                  mReaction.message.channel.send(`ยินดีด้วย! ${win} คุณได้รับ ${item}`);
                  console.log(`Winner: ${win}`);
                  clearInterval(give);
                }
            }, 1000);
            collector.on('collect', r => {
                if (r.emoji.name === '🎉')
                {
                    if (!winner.has(r.message.author.id))
                    {
                        winner.add(r.message.author.id);
                        console.log(winner);
                    }
                }
            });
            collector.on('end', collected => {
                clearInterval(give);
                console.log(`Give ${item} to ${win};Collected ${collected.size} reactions`)
            });
        })
    }
});

bot.login(process.env.token);
