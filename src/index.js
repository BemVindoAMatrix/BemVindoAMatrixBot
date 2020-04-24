require('dotenv').config()

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')

const { 
   kickUser, 
   banUser, 
   unbanUser, 
   warnUser,
   unwarnUser
} = require('./commands/index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('kick', (ctx) => kickUser(ctx, Markup))
   .command('ban', (ctx) => banUser(ctx, Markup))
   .command('unban', (ctx) => unbanUser(ctx))
   .hears(/\/warn\s?(reset)?/, (ctx) => warnUser(ctx, Markup))
   .action('unwarn', (ctx) => unwarnUser(ctx))
   .action('ban', (ctx) => banUser(ctx, Markup))
   .action('unban', (ctx) => unbanUser(ctx))

bot.startPolling()

console.log('running...')

module.exports = bot