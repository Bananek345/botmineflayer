// --- Start of Web Server code ---

// Import the http module for the web server
const http = require('http');

// Use the port provided by the environment, or default to 10000
const webPort = process.env.PORT || 10000;

// Create the web server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World! The bot and web server are both running.\n');
});

// Start the web server and listen for connections
server.listen(webPort, () => {
  console.log(`Web server is running and listening on port ${webPort}.`);
});

// --- End of Web Server code ---

// --- Start of Minecraft Bot code ---

// Import the mineflayer module for the Minecraft bot
const mineflayer = require('mineflayer');

// Create the Minecraft bot
const bot = mineflayer.createBot({
  host: 'ziemniaczkimc.falixsrv.me',
  username: 'Ziemniaczki_Bot',
  auth: 'offline',
  port: 31888
});

// Log errors and kick reasons from the Minecraft bot
bot.on('kicked', console.log);
bot.on('error', console.log);

console.log('Minecraft bot is attempting to connect...');
