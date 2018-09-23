const Discord = require("discord.js");
const bot = new Discord.Client();
let prefix = 'dzp.';
let shop = {
  'status': 1
};
let scores = 0;
let scoreStore = {
  'ready': false,
  'score': 0,
  'us1': '',
  'us2': '',
  'us3': '',
  'us4': '',
  'us5': ''
};
let cha = '291149768397422593';
let admin = '381805317241176065';
let stock = '';
bot.on("ready", () => {
    bot.user.setPresence({ game: { name: `คำสั่ง ${prefix}help | สร้างโดย Chakung#0785` }, type: 0 });
    console.log("[8] DZP Shop bot online! Created by Chakung.");
    let chakung = bot.users.get(cha);
    let scoreStores = '';
    bot.channels.get('493277979074363394').fetchMessage('493281268658864153').then(message => {scoreStores = message.content;});
    let args = scoreStores.split(',,');
    for (let i = 0; i < args.length; i++)
    {
      setScore(args,i);
    }
    scoreStore.ready = true;
    scores = scoreStore.score;
    console.log(scoreStore);
    //chakung.send('__Dzp Shop Online__ '+(new Date));
    //chakung.send(chakung.lastMessage.content);
    setInterval(function(){
      let store = '';
      store += saveScore(store);
      bot.channels.get('493277979074363394').fetchMessage('493281268658864153').then(message => message.edit(store));
    }, 300000);
    
    
});
function setScore(args,s) {
    if (s === 1)
      scoreStore.score = args[s];
    if (s === 2)
      scoreStore.us1 = args[s];
    if (s === 3)
      scoreStore.us2 = args[s];
    if (s === 4)
      scoreStore.us3 = args[s];
    if (s === 5)
      scoreStore.us4 = args[s];
    if (s === 6)
      scoreStore.us5 = args[s];
}
function saveScore(s){
    let r = '';
    r += scoreStore.score+',,'+scoreStore.us1+',,'+scoreStore.us2+',,'+scoreStore.us3+',,'+scoreStore.us4+',,'+scoreStore.us5;
    s = r;
    return s;
}
function updateScore(){
    scoreStore.us5 = scoreStore.us4;
    scoreStore.us4 = scoreStore.us3;
    scoreStore.us3 = scoreStore.us2;
    scoreStore.us2 = scoreStore.us1;
}
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    if(command === 'help') {
        const embed = new Discord.RichEmbed()
        .addField('รายการคำสั่ง',
        '**dzp.help** : คำสั่งช่วยเหลือ\n'+
        '**dzp.status** : คำสั่งดูสถานะว่าร้านเปิดหรือปิด\n'+
        '**dzp.score** __[คะแนน]__ : คำสั่งสำหรับลูกค้าสามารถเพิ่มคะแนนให้ร้าน\n__ตัวอย่าง__ `dzp.score 100`\n'+
        '**dzp.credit** : ตรวจสอบข้อมูลคนสร้างบอท\n')
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
    if(command === 'score') {
        let chakung = bot.users.get('291149768397422593');
        let ss = args.join(' ');
        let score = parseInt(ss);
        if (score === undefined) return message.reply('กรุณาใส่คะแนนให้ถูกต้อง');
        if (ss.includes('-') || ss.includes('*') || ss.includes('/')) return message.reply('❌ ใส่ตัวเลขผิด');
        scores += score;
        updateScore()
        .then(message => {
        let a2 = scoreStore.us2.split('=');
        let a3 = scoreStore.us3.split('=');
        let a4 = scoreStore.us4.split('=');
        let a5 = scoreStore.us5.split('=');
        scoreStore.us1 = `${message.author.username}=${score}`;
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username+' ให้คะแนนร้าน '+score+' คะแนน', message.author.avatarURL)
        .setTitle('Score ของร้าน DZP Shop ('+scores+') คะแนน')
        .setColor(0xff1689)
        .setImage(bot.user.avatarURL)
        .addField('ขอบคุณที่เพิ่มคะแนนให้ร้านของเรา',`__ผู้ที่ให้คะแนนล่าสุด__ \n[1] ${message.author.username} (${score}) คะแนน!\n[2] ${a2[0]} (${a2[1]}) คะแนน!\n[3] ${a3[0]} (${a3[1]}) คะแนน!\n[4] ${a4[0]} (${a4[1]}) คะแนน!\n[5] ${a5[0]} (${a5[1]}) คะแนน!`)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        });
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
    let owner = message.author.id;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    
    if (command === 'restart')
    {
      if (message.author.id !== admin) return message.reply('⚠ คุณไม่สามารุใช้คำสั่งนี้ได้');
      message.channel.send('ขอ Restart ก่อนนะครับ')
      .then(message => bot.users.get(cha).send(scoreStore))
      .then(message => bot.destroy())
      .then(message => bot.login(process.env.token));
    }
    if (command === 'setscore')
    {
        message.delete()
        scores += args.join(' ');
    }
    if (command === 'stock') {
        message.delete()
        if(owner !== admin && owner !== cha) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
        let pet = args.join(' ');
        const embed = new Discord.RichEmbed()
        .setColor(0x886688)
        .addField(`StockPet ทั้งหมด ${pet} ตัว`,'รีบซื้อก่อนหมดน้า')
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send(`🐣 ร้านเปิดแล้ว! ทักหา <@${admin}> เพื่อซื้อได้เลย~ @everyone`);
        });
    }
    if (command === 'admin') {
        message.delete()
        if(owner !== admin && owner !== cha) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
        const embed = new Discord.RichEmbed()
        .setColor(0xfff000)
        .addField('รายการคำสั่งสำหรับคนขาย',
        '**dzp.open** : คำสั่งเปิดร้าน\n\n'+
        '**dzp.close** : คำสั่งปิดร้าน\n\n'+
        '**dzp.say** __[ข้อความ]__ : บอทพิมพ์ข้อความตามที่เราพิมพ์\n'+
        '__ตัวอย่าง__ `dzp.say สวัสดี`\n\n'+
        '**dzp.embed** [สีเลข6ตัว]__ __[หัวข้อ]__ __[เนื้อหา]__ : บอทจะส่งข้อความแบบมีกรอบ\n'+
        '__ตัวอย่าง__ `dzp.embed ff5500 ประกาศ วันนี้แอดมินไม่อยู่ ` *(กรุณาเว้นวรรคให้ถูกต้อง)*\n\n'+
        '**dzp.stock** __[จำนวน]__ : คำสั่ง Stock ที่เหลือในร้าน\n'+
        '__ตัวอย่าง__ `dzp.stock 99`\n\n'+
        '')
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'open')
    {
        message.delete()
        if(owner !== admin && owner !== cha) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
        shop.status = 1;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ตอนนี้ร้านเปิดแล้ว!')
        .setColor(0x00ff00)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send("@everyone"+` ร้านเปิดแล้วนะงับ ทักหา <@${admin}> เพื่อซื้อได้เลย! `);
        })
    }
    if (command === 'close')
    {
        message.delete()
        if(owner !== admin && owner !== cha) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
        shop.status = 0;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ร้านปิดแล้ว!')
        .setColor(0xff0000)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send("⚠ ร้านปิดเเล้วน่ะครับ ⚠ ห้ามโอนมานะครับหรือห้ามทัก!! สามารถ ตรวจสอบสถานะร้านได้ dzp.status นะครับ @everyone");
        })
    }
    if (command === 'say')
    {
        message.delete()
        message.channel.send(args.slice(0).join(' '));
    }
    if (command === 'embed')
    {
        message.delete()
        if(owner !== admin && owner !== cha) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
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
    if (command === 'givevvv')
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