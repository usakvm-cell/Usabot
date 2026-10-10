const { Telegraf } = require('telegraf');
const gplay = require('google-play-scraper');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // твой ID из @userinfobot

const bot = new Telegraf(BOT_TOKEN);
const seen = new Set();

const REGIONS = ['us', 'gb', 'de', 'jp', 'kr', 'in', 'br', 'ru', 'fr', 'ca', 'au', 'it', 'es', 'mx', 'id'];

async function checkNewGames() {
  for (const country of REGIONS) {
    try {
      const games = await gplay.list({
        category: gplay.category.GAME,
        collection: gplay.collection.NEW_FREE,
        country: country,
        num: 10
      });
      
      for (const game of games) {
        if (!seen.has(game.appId)) {
          seen.add(game.appId);
          const text = `🎮 *NEW GAME* [${country.toUpperCase()}]\n\n*${game.title}*\n_${game.developer}_\n\n📲 https://play.google.com/store/apps/details?id=${game.appId}\n\n#${country} #newgame`;
          
          await bot.telegram.sendPhoto(CHAT_ID, game.icon, {
            caption: text,
            parse_mode: 'Markdown'
          });
          console.log(`Sent: ${game.title} from ${country}`);
          await new Promise(r => setTimeout(r, 2000)); // чтоб не забанили
        }
      }
    } catch (e) {
      console.log(`Error ${country}:`, e.message);
    }
  }
}

bot.launch();
console.log("Radar started...");

// чекаем каждые 2 минуты
setInterval(checkNewGames, 2 * 60 * 1000);
checkNewGames();
