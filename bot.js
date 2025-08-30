const mineflayer = require('mineflayer');
const http = require('http');

const options = {
  host: 'paintballmc.falixsrv.me',
  port: 38839,
  username: 'ProBot',
  version: '1.20.5'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(options);

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
    setTimeout(createBot, 5000);
  });
}

createBot();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot działa\n');
});

server.listen(port, () => {
  console.log(`Serwer HTTP działa na porcie ${port}`);
});

