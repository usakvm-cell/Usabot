const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🇺🇸 Welcome to USA Bot!\nНапиши /games чтобы увидеть игры');
});

bot.command('games', (ctx) => {
  ctx.reply('🎮 USA Games:\n/states - викторина штаты\n/presidents - президенты\n/capitals - столицы');
});

bot.command('states', (ctx) => ctx.reply('Сколько штатов в США? 50! 🇺🇸'));
bot.command('presidents', (ctx) => ctx.reply('Первый президент - Джордж Вашингтон!'));
bot.command('capitals', (ctx) => ctx.reply('Столица США - Вашингтон D.C.!'));

bot.command('test', (ctx) => ctx.reply('Бот работает! 🚀'));

bot.launch();
app.get('/', (req,res) => res.send('Bot OK'));
app.listen(process.env.PORT || 3000, () => console.log('Started'));
