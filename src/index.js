require('dotenv').config()

const Telegraf = require('telegraf')

const { 
   kickUser, 
   banUser, 
   unbanUser, 
   warnUser 
} = require('./commands/index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('kick', (ctx) => kickUser(ctx))
   .command('ban', (ctx) => banUser(ctx))
   .command('unban', (ctx) => unbanUser(ctx))
   .hears(/\/warn\s?(reset)?/, (ctx) => warnUser(ctx))

bot.startPolling()

console.log('running...')

module.exports = bot