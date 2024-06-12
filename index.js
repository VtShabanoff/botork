const TelegramBot = require('node-telegram-bot-api');

const Koa = require('koa');

const Router = require('koa-router');


const TOKEN = '7299696836:AAEOiWFNiHMAUj-skizcHYug34ehG1q8g9A';
const TOKEN_U_KASSA_TEST = '381764678:TEST:87181';

console.log('диванный бот был успешно запущен...');

const bot = new TelegramBot(TOKEN, {
   polling: {
      interval: 300,
      autoStart: true,
      params: {
         timeout: 10
      }
   }
});

// блокировка ботов ----------------------------------------------------------

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Проверяем, является ли добавляющий пользователя ботом
  if (msg.new_chat_members && msg.new_chat_members.some(user => user.is_bot)) {
    bot.banChatMember(chatId, userId).then(() => {
      bot.sendMessage(chatId, 'Боты не допускаются на этот канал.');
    }).catch((error) => {
      console.log(`Ошибка при блокировке ботов: ${error}`);
    });
  }

 

});


bot.onText(/привет/i, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || msg.from.id;

  await bot.sendSticker(chatId, 'https://data.chpic.su/stickers/k/katishko/katishko_004.webp');
});

// ---------------------------------------------------------------------------



bot.on('polling_error', console.log);
bot.on('message', (msg) => {

   const chatId = msg.chat.id;

   console.log(msg);

   // bot.sendMessage(chatId, `Привет ${msg.chat.first_name} - ${msg.from.username}`);
});



