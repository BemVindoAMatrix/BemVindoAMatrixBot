require('dotenv').config()

const Telegraf = require('telegraf')

const { kickUser, banUser } = require('./commands/index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('kick', kickUser())
   .command('ban', banUser())

bot.startPolling()

console.log('running...')

module.exports = bot