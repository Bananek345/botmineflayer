const mineflayer = require('mineflayer')

let bot
let toggle = true // Do naprzemiennego ruchu

function createBot() {
  bot = mineflayer.createBot({
    host: 'BreadMC.aternos.me',        // Zmień na IP serwera
    port: 51686,              // Domyślnie 25565
    username: 'bot',       // Nick bota
    version: '1.8.9',      // Opcjonalnie możesz określić wersję
  })

  bot.on('spawn', () => {
    console.log('✅ Bot dołączył do gry!')

    // Automatyczne logowanie/rejestracja po kilku sekundach
    setTimeout(() => {
      bot.chat('/register botxd botxd')
      bot.chat('/login botxd')
    }, 3000)

    // Naprzemienne poruszanie co 5 minut (300 000 ms)
    setInterval(() => {
      const dir = toggle ? 'right' : 'left'
      toggle = !toggle

      bot.setControlState(dir, true)
      setTimeout(() => {
        bot.setControlState(dir, false)
      }, 2000) // Ruch trwa 2 sekundy
    }, 5 * 60 * 1000)
  })

  // Jeśli zostanie wyrzucony – próbuje połączyć się ponownie
  bot.on('end', () => {
    console.log('🔄 Bot został rozłączony. Próba ponownego połączenia za 5 sek...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('❌ Błąd:', err.message)
  })

  // Ignoruje wiadomości czatu
  bot.on('chat', () => {})
}

createBot()
