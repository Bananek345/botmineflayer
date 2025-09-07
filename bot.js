const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'ziemniaczkimc.falixsrv.me',
  username: 'Ziemniaczki_Bot',
  auth: 'offline', // <-- A comma was missing here
  port: 31888,
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)
