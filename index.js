const TeleBot = require('telebot');
const fetch = require('node-fetch');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');

const getFile = require('./utils/getFile');

const bot = new TeleBot({
    token: '400781870:AAE-ZRjR8XyppM8uNKo-Ev4perC1z1TW5DM', // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 1000, // Optional. How often check updates (in ms).
        timeout: 0, // Optional. Update polling timeout (0 - short polling).
    },
    allowedUpdates: [] // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
});

bot.on('text', async(msg) => {
    const id = uuidv4();
    const url = 'http://alexpenkin.world/?text=' + encodeURIComponent(msg.text);
    const filePath = path.resolve(__dirname, `./file${id}.mp3`)
    try {
        await getFile(url, filePath);
        await bot.sendVoice(msg.chat.id, filePath);
        fs.unlink(filePath, (e) => {
            if (e) {}
        });
    } catch (e) {
        msg.reply.text(e.message)
    }
});

bot.on('inlineQuery', msg => {
    const id = uuidv4();
    let query = msg.query;
    const answers = bot.answerList(msg.id, {
        cacheTime: 1000
    });
    answers.addVoice({
        id: 'maxim' + id,
        type: 'voice',
        voice_url: 'http://alexpenkin.world/?text=' + encodeURIComponent(query),
        title: 'Максим',
        description: `Мужской голос`,
        caption: query
    });
    answers.addVoice({
        id: 'tatyana' + id,
        voice_url: 'http://alexpenkin.world/?text=' + encodeURIComponent(query) + '&voice_id=Tatyana',
        title: 'Татьяна',
        description: `Женский голос`,
        caption: query,
    });
    return bot.answerQuery(answers);
});

bot.start();