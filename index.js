const Discord = require("discord.js");
const bot = new Discord.Client();
let prefix = 'dzp.';
let shop = {
  'status': 1
};
let time = '18:00-22:00';
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
    bot.channels.get('493277979074363394').fetchMessage('496976005903417344').then(message => {scoreStores = message.content;});
    let args = scoreStores.split(',,');
    for (let i = 1; i < args.length; i++)
    {
      setScore(args,i);
    }
    scoreStore.ready = true;
    scores = scoreStore.score;
    console.log(scoreStore);
    chakung.send('__Dzp Shop Online__ '+(new Date));
    setInterval(function(){
      let store = scoreStore.score+',,'+scoreStore.us1+',,'+scoreStore.us2+',,'+scoreStore.us3+',,'+scoreStore.us4+',,'+scoreStore.us5;
      bot.channels.get('493277979074363394').fetchMessage('496976005903417344').then(message => message.edit(store));
    }, 30000);
    
    
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
        '**dzp.ping** : คำสั่งดูความเร็วของบอท\n'+
        '**dzp.time** : คำสั่งดูเวลาเปิดร้าน\n'+
        '**dzp.status** : คำสั่งดูสถานะว่าร้านเปิดหรือปิด\n'+
        '**dzp.score** __[คะแนน]__ : คำสั่งสำหรับลูกค้าสามารถเพิ่มคะแนนให้ร้าน\n__ตัวอย่าง__ `dzp.score 100`\n'+
        '**dzp.credit** : ตรวจสอบข้อมูลคนสร้างบอท\n')
        .setColor(0x00ccff)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'ping')
    {
        const embed = new Discord.RichEmbed()
        .addField('ปิง','ตอนนี้อยู่ที่ '+parseInt(bot.ping)+' ms')
        .setColor(0x00ffff)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
    }
    if (command === 'time')
    {
        const embed = new Discord.RichEmbed()
        .addField('เวลาทำการ','เวลา : '+time)
        .setColor(0x00ff00)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
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
        let ss = args.join(' ');
        let no = false;
        let ab = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' , 'k' , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' , 'u' , 'v' , 'w' , 'x' , 'y' , 'z' ];
        ab.forEach((txt)=>{
            if (ss.includes(txt)) no = true;
        });
        let score = parseInt(ss);
        if (score === undefined) return message.reply('กรุณาใส่คะแนนให้ถูกต้อง');
        if (no) return message.reply('❌ ห้ามใส่ตัวอักษรในคำสั่งนี้!');
        if (ss.includes('+') || ss.includes('-') || ss.includes('*') || ss.includes('/')) return message.reply('❌ ใส่ตัวเลขผิด');
        if (score > 100) return message.reply('❌ คุณไม่สามารถให้คะแนนเกิน 100 ได้');
        scores += score;
        updateScore();
        let a2 = scoreStore.us2.split('=');
        let a3 = scoreStore.us3.split('=');
        let a4 = scoreStore.us4.split('=');
        let a5 = scoreStore.us5.split('=');
        scoreStore.us1 = `${message.author.username}=${score}`;
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username+' ให้คะแนนร้าน '+score+' คะแนน', message.author.avatarURL)
        .setTitle('Score ของร้าน DZP Shop รวม ('+scores+') คะแนน')
        .setColor(0xff1689)
        .setImage(bot.user.avatarURL)
        .addField('ขอบคุณที่เพิ่มคะแนนให้ร้านของเรา',`__ผู้ที่ให้คะแนนล่าสุด__ \n[1] ${message.author.username} (${score}) คะแนน!\n[2] ${a2[0]} (${a2[1]}) คะแนน!\n[3] ${a3[0]} (${a3[1]}) คะแนน!\n[4] ${a4[0]} (${a4[1]}) คะแนน!\n[5] ${a5[0]} (${a5[1]}) คะแนน!`)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if(command === 'credit') {
        let chakung = bot.users.get('291149768397422593');
        const embed = new Discord.RichEmbed()
        .setAuthor(chakung.username+' ผู้สร้างบอท', chakung.avatarURL)
        .setDescription('พัฒนาบอท Discord ด้วยภาษา Javascript รับเปิดบอท online 24 ชั่วโมง ราคาเริ่มต้นที่ 100 บาท')
        .setColor(0x3399ff)
        .setImage(url=chakung.avatarURL)
        .setURL('https://www.facebook.com/polite.cha')
        .addField('ติดต่อสอบถาม','Discord: Chakung#0785\nFacebook: [Polite Cha](https://fb.com/polite.cha)\nYoutube: [FriendRPG TV](https://www.youtube.com/c/friendrpgth)')
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
    if (command === 'settime')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== cha) return message.reply(`❌ คุณไม่ได้รับอนุญาติให้ใช้คำสั่ง ~~${message.content}~~`);
        time = args.join(' ');
        const embed = new Discord.RichEmbed()
        .addField('ตั้งเวลา','เวลา : '+time)
        .setColor(0xffffff)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
    }
    if (command === 'restart')
    {
      if (!message.member.hasPermission(['ADMINISTRATOR']) && message.author.id !== admin) return message.reply('⚠ คุณไม่สามารถใช้คำสั่งนี้ได้');
      message.channel.send('ขอ Restart ก่อนนะครับ')
      .then(message => bot.users.get(cha).send(scoreStore))
      .then(message => bot.destroy())
      .then(message => bot.login(process.env.token));
    }
    if (command === 'setscore')
    {
        message.delete()
        scores = args.join(' ');
    }
    if (command === 'stock') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        let pet = args.join(' ');
        const embed = new Discord.RichEmbed()
        .setColor(0x886688)
        .addField(`StockPet ทั้งหมด ${pet} ตัว`,`ร้านเปิดเเล้วนะครับ ถ้าจะซื้อPet ติดต่อ <@${admin}> เพื่อความรวดเร็ว ตอบเร็วๆเเละส่งชื่อมานะครับ`)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send(`ตอนนี้StockPet มีอยู่ ${pet} @everyone`);
        });
    }
    if (command === 'everyone') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        message.guild.members.forEach(member=>{
            bot.users.get(member.id).send(args.slice(0).join(' '));
        })
    }
    if (command === 'admin') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        const embed = new Discord.RichEmbed()
        .setColor(0xfff000)
        .addField('รายการคำสั่งสำหรับคนขาย',
        '**dzp.open** : คำสั่งเปิดร้าน\n\n'+
        '**dzp.close** : คำสั่งปิดร้าน\n\n'+
        '**dzp.say** __[ข้อความ]__ : บอทพิมพ์ข้อความตามที่เราพิมพ์\n'+
        '__-ตัวอย่าง__ `dzp.say สวัสดี`\n\n'+
        '**dzp.embed** __[สีเลข6ตัว]__ __[หัวข้อ]__ __[เนื้อหา]__ : บอทจะส่งข้อความแบบมีกรอบ\n'+
        '__-ตัวอย่าง__ `dzp.embed ff5500 ประกาศ วันนี้แอดมินไม่อยู่ ` *(กรุณาเว้นวรรคให้ถูกต้อง)*\n\n'+
        '**dzp.stock** __[จำนวน]__ : คำสั่ง Stock ที่เหลือในร้าน\n'+
        '__-ตัวอย่าง__ `dzp.stock 99`\n\n'+
        '**dzp.role** __[1|2|3]__ @member : คำสั่งเพิ่มยศให้ 1.ผู้ซื้อ 2.ผู้ซื้อระดับสูง 3.คนรวยสายเปย์\n'+
        '__-ตัวอย่าง__ `dzp.role 1 @Chakung`\n\n'+
        '**dzp.settime __[เวลาเปิดปิด]__ : คำสั่งตั้งเวลาเปิด/ปิดร้าน\n'+
        '__-ตัวอย่าง__ `dzp.settime 18:00-22:00`\n\n'+
        '**dzp.everyone __[ข้อความ1-2000ตัวอักษร]__ : คำสั่งส่งข้อความหาสมาชิกทุกคน\n'+
        '__-ตัวอย่าง__ `dzp.everyone สวัสดีครับ วันนี้ร้านเปิดเวลา 20:00 น. เข้าร้านที่นี้ #แชแนลร้าน`'+
        '')
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'open')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        shop.status = 1;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ตอนนี้ร้านเปิดแล้ว!')
        .setColor(0x00ff00)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send("@everyone"+` ร้านเปิดแล้ว ทักหา <@${admin}> เพื่อซื้อได้เลย! ตรวจสอบสถานะร้านโดย **dzp.status** `);
        })
    }
    if (command === 'close')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        shop.status = 0;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ร้านปิดแล้ว!')
        .setColor(0xff0000)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed)
        .then(message => {
            message.channel.send("ร้านปิดแล้วไม่ควรโอนหรือทักมา สามารถตรวจสอบสถานะร้าน โดย **dzp.status** @everyone");
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
        if(owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
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
    if (command === 'test')
    {
        console.log(message.guild.roles);
    }
    if (command === 'role')
    {
        message.delete()
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply('คุณไม่สามารถใช้คำสั่งให้ยศได้ครับ');
        let role = message.content.split(' ')[1];
        let roles = '';
        let number = parseInt(role);
        if (role === '') return;
        if (number > 3 || number < 1) return message.reply(`❌ ไม่พบ role ${number}`);
        let user_m = message.mentions.members.first();
        if (number === 1) roles = '470477455564603393';
        if (number === 2) roles = '470477591510384650';
        if (number === 3) roles = '477645205479096320';
        let roleID = message.guild.roles.get(roles);
        user_m.addRole(roleID).catch(message.error);
        const mm = new Discord.RichEmbed()
        .setAuthor(`${user_m.displayName}`, user_m.avatarURL)
        .setDescription(`คุณ <@${user_m.id}> ได้รับยศ ${roleID.name} แล้วครับ`)
        .setColor(0xff0000)
        .setFooter('DZP Shop | สร้างโดย Chakung', bot.user.avatarURL);
        message.channel.send({embed:mm});
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