const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { card } = require('./download_card_data.json');
const { skill } = require('./download_skill_data.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready.')
})

atts = {
    '-1': 'None',
    0: 'Fire',
    1: 'Water',
    2: 'Wood',
    3: 'Light',
    4: 'Dark',
    5: 'Heart',
    6: 'Jammer',
    7: 'Poison',
    8: 'Mortal Poison'
};

function attributeMapping(attribute_int) {
    return atts[attribute_int]
}

types = {
    '-1': 'None',
    0: 'Evo Material',
    1: 'Balanced',
    2: 'Physical',
    3: 'Healer',
    4: 'Dragon',
    5: 'God',
    6: 'Attacker',
    7: 'Devil',
    8: 'Machine',
    
    12: 'Awaken Material',
    
    14: 'Enhance Material',
    15: 'Redeemable Material'
}

function typesMapping(types_ints) {
    types_mapping = []
    for (i = 0; i < types_ints.length; i++) {
        temp = types[types_ints[i]];
        if (temp != "None") { types_mapping.push(temp); }
    }
    return types_mapping
}

awakensDict = {
    // 0: None,  // No need.
    1: 'Enhanced HP',
    2: 'Enhanced Attack',
    3: 'Enhanced Heal',
    4: 'Reduced Fire Damage',
    5: 'Reduced Water Damage',
    6: 'Reduced Wood Damage',
    7: 'Reduced Light Damage',
    8: 'Reduced Dark Damage',
    9: 'Auto-Recover',
    10: 'Resistance-Bind',
    11: 'Resistance-Dark',
    12: 'Resistance-Jammers',
    13: 'Resistance-Poison',
    14: 'Enhanced Fire Orbs',
    15: 'Enhanced Water Orbs',
    16: 'Enhanced Wood Orbs',
    17: 'Enhanced Light Orbs',
    18: 'Enhanced Dark Orbs',
    19: 'Extended Move Time',
    20: 'Recover Bind',
    21: 'Skill Boost',
    22: 'Enhanced Fire Att.',
    23: 'Enhanced Water Att.',
    24: 'Enhanced Wood Att.',
    25: 'Enhanced Light Att.',
    26: 'Enhanced Dark Att.',
    27: 'Two-Pronged Attack',
    28: 'Resistance-Skill Bind',
    29: 'Enhanced Heart Orbs',
    30: 'Multi Boost',
    31: 'Dragon Killer',
    32: 'God Killer',
    33: 'Devil Killer',
    34: 'Machine Killer',
    35: 'Balanced Killer',
    36: 'Attacker Killer',
    37: 'Physical Killer',
    38: 'Healer Killer',
    // 39: 'Evo Material Killer',
    // 40: 'Awaken Material Killer',
    // 41: 'Enhance Material Killer',
    // 42: 'Redeemable Material Killer',
    39: 'Evo Killer',
    40: 'Awaken Killer',
    41: 'Enhance Killer',
    42: 'Redeemable Killer',
    43: 'Enhanced Combos',
    44: 'Guard Break',
    45: 'Bonus Attack',
    46: 'Enhanced Team HP',
    47: 'Enhanced Team Recovery',
    48: 'Damage Void Piercer',
    49: 'Awoken Assist',
    50: 'Super Bonus Attack',
    51: 'Skill Charge',
    52: 'Resistance-Bind+',
    53: 'Extended Move Time+',
    54: 'Resistance-Clouds',
    55: 'Resistance-Immobility',
    56: 'Skill Boost+',
    57: '80% or more HP Enhanced',
    58: '50% or less HP Enhanced',
    59: '[L] Heal Matching',
    60: '[L] Increased Attack',
    61: 'Super Enhanced Combos',
    62: 'Combo Orbs',
    63: 'Skill Voice',
    64: 'Dungeon Bonus',
    65: 'Reduced HP',
    66: 'Reduced Attack',
    67: 'Reduced Recovery',
    68: 'Resistance-Blind+',
    69: 'Resistance-Jammers+',
    70: 'Resistance-Poison+',
    71: 'Blessing of Jammers',
    72: 'Blessing of Poison Orbs',
}

awakensEmoteDict = {
    1: '<:01_:744007511102717952>',
    2: '<:02:744007511027220500>', 
    3: '<:03:744007510842671115>',
    4: '<:04:744007511081877614>', 
    5: '<:05:744007511111237755>', 
    6: '<:06:744007510897328129>', 
    7: '<:07:744007511098523762>',
    8: '<:08:744007511081877654>', 
    9: '<:09:744007511077814373>', 
    10: '<:10:744007510872031285>', 
    11: '<:11:744007511149117541>',
    12: '<:12:744007511169826987>', 
    13: '<:13:744007511333404692>', 
    14: '<:14:744007511140597771>', 
    15: '<:15:744007511274684446>', 
    16: '<:16:744007511224352788>', 
    17: '<:17:744007511257907250>', 
    18: '<:18:744007511304044628>', 
    19: '<:19:744007511002316831>', 
    20: '<:20:744007511253713036>', 
    21: '<:21:744294973142204578>',
    22: '<:22:744007511111237756>', 
    23: '<:23:744007511337861190>', 
    24: '<:24:744007510863773769>', 
    25: '<:25:744007511404970064>', 
    26: '<:26:744007511354507264>', 
    27: '<:27:744007511023288404>', 
    28: '<:28:744007510939271200>', 
    29: '<:29:744007511329472542>', 
    30: '<:30:744007511383998495>', 
    31: '<:31:744007511375478865>', 
    32: '<:32:744007511337599047>', 
    33: '<:33:744007511425679561>', 
    34: '<:34:744007511341793341>', 
    35: '<:35:744007511006511176>', 
    36: '<:36:744295130877526026>',
    37: '<:37:744007511413358632>',
    38: '<:38:744007511438262362>', 
    39: '<:39:744007511400644660>', 
    40: '<:40:744007511035609190>', 
    41: '<:41:744007510989602848>', 
    42: '<:42:744295409391763537>',
    43: '<:43:744295409530306580>',
    44: '<:44:744007511434199160>',
    45: '<:45:744007511186735115>', 
    46: '<:46:744007511392256052>', 
    47: '<:47:744007511388061746>', 
    48: '<:48:744007511442456706>',
    49: '<:49:744007511182671885>', 
    50: '<:50:744007511169826989>', 
    51: '<:51:744295409178116138>',
    52: '<:52:744007511429873674>',
    53: '<:53:744295409480106174>',
    54: '<:54:744007511442718731>',
    55: '<:55:744295409228447796>',
    56: '<:56:744295409723113472>',
    57: '<:57:744295409576575076>',
    58: '<:58:744295409605804112>',
    59: '<:59:744295409580638360>',
    60: '<:60:744007511345987675>',
    61: '<:61:744295409773576344>',
    62: '<:62:744295409207214182>',
    63: '<:63:744295409601478687>',
    64: '<:64:744295409312202763>',
    65: '<:65:744007511438524507>',
    66: '<:66:744295409622581379>',
    67: '<:67:744295409949736993>',
    68: '<:68:744295409773707406>',
    69: '<:69:744295409421254778>',
    70: '<:70:744295409513660467>',
    71: '<:71:744295409488232527>',
    72: '<:72:744297605265096725>'
}

function awakensEmoteMapping(awakens_list) {
    
    emote_mapping = ""
    for (i = 0; i < awakens_list.length; i++) {
        if (awakens_list[i] === "") {
            return "No Awakenings";
        }
        temp = awakensEmoteDict[awakens_list[i]];
        if (temp != "None") { emote_mapping += " " + temp; }
    }
    // console.log(emote_mapping);
    if (emote_mapping === ""){
        return "No Awakenings"
    }
    return emote_mapping;
    
    // return "<:48:744007511442456706>";

}

killerMapping = {
    '-1': '-1',
    0: '-1'
    // whatever, get back to this later
}

class Monster {
    constructor(id) { // constructor populates the object from values
        
        if (isNaN(id - parseFloat(id))) {
            return null;
        }
        if (id > card.length || id < 1){
            return null;
        }
        
        var rawdata = card[id];
        
        this.id = rawdata[0];
        this.name = rawdata[1];
        this.aliases = [];
        this.attribute = rawdata[2];
        this.subattribute = rawdata[3];
        this.isEvoReversable = rawdata[4];
        this.types = [rawdata[5], rawdata[6]]; // come back to this for type 3
        this.starCount = rawdata[7]; // rarity
        this.cost = rawdata[8];
        //this.evoType = EvolutionType.Normal; // idk about this
        this.maxLevel = rawdata[10];
        this.feedExpPerLevel = rawdata[11] / 4;
        this.sellPricePerLevel = rawdata[13] / 10; // ?
        this.minHp = rawdata[14];
        this.maxHp = rawdata[15];
        this.Hp_growth_exponent = rawdata[16]; // ?
        this.minAtk = rawdata[17];
        this.maxAtk = rawdata[18];
        this.Atk_growth_exponent = rawdata[19]; // ?
        this.minRcv = rawdata[20];
        this.maxRcv = rawdata[21];
        this.Rcv_growth_exponent = rawdata[22]; // ?
        this.expCurve = rawdata[23];
        this.exp_exponent = rawdata[24]; // ?
        this.activeSkillId = rawdata[25];
        this.leaderSkillId = rawdata[26];
        this.turnTimer = rawdata[27];
                                        // 28 through 39 seem to be enemy data
        this.evoFromId = rawdata[40];
        this.evoMaterials = [rawdata[41], rawdata[42], rawdata[43], rawdata[44], rawdata[45]]; // list of evo mats to get this
        this.devoMaterials = [rawdata[46], rawdata[47], rawdata[48], rawdata[49], rawdata[50]]; // list of evo mats to unult
        
        
        this.enemySkills = [];
        var skillCount = rawdata[57]; // number of skills to push
        var iter = 58;
        for (var i = 0; i < skillCount * 3; i++) { // each skill is a triple or something
            this.enemySkills.push(rawdata[iter]);
            iter++;
        }
        
        this.awakenings = [];
        var awakeningCount = rawdata[iter]; // number of awakenings to push
        iter++;
        for (var i = 0; i < awakeningCount; i++) {
            this.awakenings.push(rawdata[iter]);
            iter++;
        }
        
        this.superAwakenings = rawdata[iter].split(',');
        this.evoTreeBaseId = rawdata[iter + 1];
        
        this.gkey = rawdata[iter + 2]; // grouping key thing?
        
        this.types.push(rawdata[iter + 3]); // hopefully this is right
        
        this.monsterPoints = rawdata[iter + 4];
        
        this.latents = rawdata[iter + 5]; // Says what latent it gives when fed. Non latent tamas should give no latents when fed, and have value 0.
        this.collab = rawdata[iter + 6];

        this.latentKillers = []; // idk
        
        this.inheritanceType = rawdata[iter + 7];
        this.isInheritable = ((this.inheritanceType & 1) == 1); // idk, this tells us Supergirl is inheritable so I assume we're good
        this.extraSlottable = ((this.inheritanceType & 32) == 32); // this tells us Supergirl can't take 8latents so I assume we're good
        
        
        this.japaneseName = rawdata[iter + 8]; // getting blank value on Supergirl
        
        this.limitBreakStatGain = rawdata[iter + 9]; // this lines up with Supergirl
        this.isLimitBreakable = (this.limitBreakStatGain > 0);
        
        this.isAlt = false; // fuck it idk
        this.alternateVersions = [];
        this.exchangesTo = [];
        this.exchangesFrom = [];
        this.voiceId = 0;
        this.orbSkin = 0;
        this.charges = 0;
        this.chargeGain = 0;
        this.enemyHpAtLv1 = 0;
        this.enemyHpAtLv10 = 0;
        this.enemyHpCurve = 0;
        this.enemyAtkAtLv1 = 0;
        this.enemyAtkAtLv10 = 0;
        this.enemyAtkCurve = 0;
        this.enemyDefAtLv1 = 0;
        this.enemyDefAtLv10 = 0;
        this.enemyDefCurve = 0;
        this.maxEnemyLevel = 0;
        this.enemyCoinsAtLv2 = 0;
        this.enemyExpAtLv2 = 0;
        this.groups = []; // hmmm
    }
    
    availableKillers() {
        return "(I'll get back to this later)";
    }

    info() {
        var info = "";
        info += `${typesMapping(this.types)}\n`;
        info += `Rarity: ${this.starCount}\n`;
        info += `Cost: ${this.cost}\n`;
        info += `MP: ${this.monsterPoints}\n`;
        info += `Inheritable: ${this.isInheritable}`;

        return info;
    }

    stats() {
        var stats = "";
        if (!this.isLimitBreakable) {
            stats += `HP: ${this.maxHp}\n`;
            stats += `ATK: ${this.maxAtk}\n`;
            stats += `RCV: ${this.maxRcv}`;
            return stats;
        }
        stats += `HP: ${this.maxHp} (${Math.round(this.maxHp * (1 + this.limitBreakStatGain/100))})\n`;
        stats += `ATK: ${this.maxAtk} (${Math.round(this.maxAtk * (1 + this.limitBreakStatGain/100))})\n`;
        stats += `RCV: ${this.maxRcv} (${Math.round(this.maxRcv * (1 + this.limitBreakStatGain/100))})`;

        return stats;
    }

    leaderSkill() {
        if (this.leaderSkillId === 0) {
            return "None";
        }
        return skill[this.leaderSkillId][1];
    }

    activeSkillHeader() {
        if (this.activeSkillId === 0) {
            return "Active Skill";
        }
        return `Active Skill (${skill[this.activeSkillId][4]} -> ${skill[this.activeSkillId][4] - skill[this.activeSkillId][3] + 1})`;
    }

    activeSkillBody() {
        if (this.activeSkillId === 0) {
            return "None";
        }
        return skill[this.activeSkillId][1];
    }

    cardInfo2() {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${this.id}: ${this.name}`)
            .setURL(`http://puzzledragonx.com/en/monster.asp?n=${this.id}`)
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            //.setDescription('Some description here')
            .setThumbnail(`http://puzzledragonx.com/en/img/book/${this.id}.png`)
            .addFields(
                { name: awakensEmoteMapping(this.awakenings), value: awakensEmoteMapping(this.superAwakenings) },
                // { name: '\u200B', value: '\u200B' },
                { name: 'Available killers', value: this.availableKillers()},
                { name: 'info', value: this.info(), inline: true},
                { name: "stats", value: this.stats(), inline: true},
                { name: this.activeSkillHeader(), value: this.activeSkillBody()},
                { name: 'Leader Skill', value: this.leaderSkill()}
            )
            /*
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            */
            //.setImage('https://ilmina.com/extract/mons/MONS_01678.PNG')
            //.setTimestamp()
            //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        return embed;
    }

    cardInfo() {
        var msg = "";
        
        msg += `ID: ${this.id}\n`;
        msg += `Name: ${this.name}\n`;
        msg += `Aliases: ${this.aliases}\n`;
        msg += `Attribute: ${attributeMapping(this.attribute)}\n`;
        msg += `Subattribute: ${attributeMapping(this.subattribute)}\n`;
        msg += `IsEvoReversable: ${this.isEvoReversable}\n`;
        msg += `Types: ${typesMapping(this.types)}\n`;
        msg += `Rarity: ${this.starCount}\n`;
        msg += `Cost: ${this.cost}\n`;
        msg += `Max Level: ${this.maxLevel}\n`;
        msg += `feedExpPerLevel: ${this.feedExpPerLevel}\n`;
        msg += `sellPricePerLevel: ${this.sellPricePerLevel}\n`;
        msg += `minHp: ${this.minHp}\n`;
        msg += `maxHp: ${this.maxHp}\n`;
        msg += `minAtk: ${this.minAtk}\n`;
        msg += `maxAtk: ${this.maxAtk}\n`;
        msg += `minRcv: ${this.minRcv}\n`;
        msg += `maxRcv: ${this.maxRcv}\n`;
        msg += `expCurve: ${this.expCurve}\n`;
        msg += `activeSkillId: ${this.activeSkillId}\n`;
        msg += `leaderSkillId: ${this.leaderSkillId}\n`;
        msg += `evoFromId: ${this.evoFromId}\n`;
        msg += `evoMaterials: ${this.evoMaterials}\n`;
        msg += `devoMaterials: ${this.devoMaterials}\n`;
        msg += `awakenings: ${awakensEmoteMapping(this.awakenings)}\n`;
        msg += `superAwakenings: ${awakensEmoteMapping(this.superAwakenings)}\n`;
        msg += `evoTreeBaseId: ${this.evoTreeBaseId}\n`;
        msg += `monsterPoints: ${this.monsterPoints}\n`;
        // msg += `?latents?: ${this.latents}\n`;
        msg += `collab: ${this.collab}\n`;
        msg += `isInheritable: ${this.isInheritable}\n`;
        msg += `extraSlottable: ${this.extraSlottable}\n`;
        msg += `japaneseName: ${this.japaneseName}\n`;
        msg += `limitBreakStatGain: ${this.limitBreakStatGain}`;
        
        
        return msg;
    }
    
}


var loadedCards = {};

function cardInfo(id) {
    if (!(id in loadedCards)) { // in early stage development, load cards as needed. Maybe in the future just load them all on bot start.
        console.log(`Loading ${id}`);
        temp = new Monster(id);
        if (temp === null) {return "invalid ID";}
        
        loadedCards[id] = temp;
        
        return temp.cardInfo();

    }
    
    temp = loadedCards[id];
    
    return temp.cardInfo();
}

function cardInfo2(id) {
    if (!(id in loadedCards)) { // in early stage development, load cards as needed. Maybe in the future just load them all on bot start.
        console.log(`Loading ${id}`);
        temp = new Monster(id);
        if (temp === null) {return "invalid ID";}
        
        loadedCards[id] = temp;
        
        return temp.cardInfo2();

    }
    
    temp = loadedCards[id];
    
    return temp.cardInfo2();
}

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('No. 1678 Survivor of Krypton, Supergirl (Comics)')
	.setURL('http://puzzledragonx.com/en/monster.asp?n=1678')
	//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	//.setDescription('Some description here')
	.setThumbnail('http://puzzledragonx.com/en/img/book/1678.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://ilmina.com/extract/mons/MONS_01678.PNG')
	//.setTimestamp()
	//.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');



client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); // split on spaces
    const command = args.shift().toLowerCase();

    if(command === "cardinfo" || command === "ci"){
        if(!args.length){
            message.channel.send("Reports info about card x.\nUsage: cardinfo x");
        }
        else if (isNaN(args[0] - parseFloat(args[0]))) { // checking if it's an integer or a string. Eventually try implementing string search
            message.channel.send("invalid input");
        }
        else if (args[0] > card.length || args[0] < 1){
            message.channel.send("Can't find card.");
        }
        else {
        message.channel.send(cardInfo(args[0]));
        }
    }

    if(command === "cardinfo2"){
        if(!args.length){
            message.channel.send("Reports info about card x.\nUsage: cardinfo2 x");
        }
        else if (isNaN(args[0] - parseFloat(args[0]))) { // checking if it's an integer or a string. Eventually try implementing string search
            message.channel.send("invalid input");
        }
        else if (args[0] > card.length || args[0] < 1){
            message.channel.send("Can't find card.");
        }
        else {
            message.channel.send(cardInfo2(args[0]));
        }
        
    }

    if(command === "testembed"){
        message.channel.send(exampleEmbed);
    }

    /*    
    if(message.content.startsWith(`${prefix}`)) {
        message.channel.send("<:48:744007511442456706>");
    }
    */
    
})

client.login(token);