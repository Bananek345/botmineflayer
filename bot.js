const mineflayer = require('mineflayer');
const Vec3 = require('vec3');

// Bot configuration
const botConfig = {
    host: 'localhost', // Zmień na IP serwera, jeśli jest inny
    port: 25565, // Zmień na port serwera, jeśli jest inny
    username: 'GGracz355',
    version: '1.12.2' // Wersja 1.12.2
};

let registered = false;

function createBot() {
    const bot = mineflayer.createBot(botConfig);

    // Event handler for successful connection
    bot.on('spawn', () => {
        console.log('Bot został połączony z serwerem!');
        
        // Czat commands
        if (!registered) {
            bot.chat('/register haslogracz3221 haslogracz3221');
            console.log('Wysłano komendę /register haslogracz3221 haslogracz3221');
            registered = true;
        } else {
            bot.chat('/login haslogracz3221');
            console.log('Wysłano komendę /login haslogracz3221');
        }

        // Start the movement loop
        setTimeout(() => startMovementLoop(bot), 5000); // Wait 5 seconds before starting the loop
    });

    // Event handler for chat messages
    bot.on('message', (message) => {
        console.log('Wiadomość z serwera:', message.toString());
    });

    // Event handler for errors
    bot.on('error', (err) => {
        console.error('Wystąpił błąd:', err);
    });

    // Event handler for disconnections
    bot.on('end', (reason) => {
        console.log('Bot został rozłączony z serwerem. Powód:', reason);
        // Attempt to reconnect
        console.log('Ponowne łączenie...');
        setTimeout(createBot, 5000); // Wait 5 seconds before reconnecting
    });
}

async function startMovementLoop(bot) {
    while (true) {
        // Move 5 blocks forward
        await moveDirection(bot, 5, 'forward');

        // Move 5 blocks right
        await moveDirection(bot, 5, 'right');

        // Move 5 blocks back
        await moveDirection(bot, 5, 'back');
        
        // Move 5 blocks left
        await moveDirection(bot, 5, 'left');

        // Move 5 blocks down
        await moveDirection(bot, 5, 'down');

        // Crouch, jump, hit
        bot.setControlState('sneak', true);
        await bot.waitForTicks(20);
        bot.setControlState('sneak', false);

        bot.setControlState('jump', true);
        await bot.waitForTicks(5);
        bot.setControlState('jump', false);

        const entity = bot.nearestEntity();
        if (entity) {
            bot.attack(entity);
            console.log('Uderzono w pobliski cel');
        } else {
            console.log("Brak celu do uderzenia.");
        }

        await bot.waitForTicks(20); // Wait before repeating the loop
    }
}

async function moveDirection(bot, distance, direction) {
    const startPos = bot.entity.position.clone();

    while (bot.entity.position.distanceTo(startPos) < distance) {
        let x = 0;
        let z = 0;

        switch (direction) {
            case 'forward':
                z = -1;
                break;
            case 'back':
                z = 1;
                break;
            case 'left':
                x = -1;
                break;
            case 'right':
                x = 1;
                break;
            case 'down':
                bot.setControlState('forward', true);
                await bot.waitForTicks(5);
                bot.setControlState('forward', false);
                return; // Special case for "down"
        }

        const yaw = bot.entity.yaw;
        const newX = x * Math.cos(yaw) - z * Math.sin(yaw);
        const newZ = x * Math.sin(yaw) + z * Math.cos(yaw);
        
        await bot.look(bot.entity.yaw + Math.atan2(newX, newZ), 0);
        bot.setControlState('forward', true);
        await bot.waitForTicks(5);
    }
    bot.setControlState('forward', false);
}

// Start the bot
createBot();
