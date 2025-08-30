const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'paintballmc.falixsrv.me',
  port: 38839,
  username: 'ProBot',
  version: '1.20.5',
  auth: 'offline' // wymusza tryb offline
});

bot.on('spawn', () => {
  console.log('Bot się połączył i pojawił na serwerze!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  console.log(`<${username}> ${message}`);
});

bot.on('error', err => console.log('Błąd:', err));

bot.on('end', () => {
  console.log('Bot został rozłączony. Próba ponownego połączenia za 5 sekund...');
  setTimeout(() => {
    bot = mineflayer.createBot({
      host: 'paintballmc.falixsrv.me',
      port: 38839,
      username: 'ProBot',
      version: '1.20.5',
      auth: 'offline'
    });
  }, 5000);
});
