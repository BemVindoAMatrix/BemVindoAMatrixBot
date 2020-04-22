require('dotenv').config()

const Telegraf = require('telegraf')

const { kickUser, banUser } = require('./commands/index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('kick', (ctx) => kickUser(ctx))
   .command('ban', (ctx) => banUser(ctx))

bot.startPolling()

console.log('running...')

module.exports = bot