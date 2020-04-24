const { isAdmin } = require('./../handlers/utils')

const banUser = async (ctx, Markup) => {
    const chatId = ctx.update.callback_query
                ? ctx.update.callback_query.message.chat.id
                : ctx.message.chat.id
    const userId = ctx.update.callback_query
                ? ctx.update.callback_query.message.text.match(/⚠️ (.*) \[(\d+)\].*/)[2]
                : ctx.message.reply_to_message.from.id 
    const userFirstName = ctx.update.callback_query
                ? ctx.update.callback_query.message.text.match(/⚠️ (.*) \[(\d+)\].*/)[1]
                : ctx.message.reply_to_message.from.first_name 
    const adminId = ctx.update.callback_query
                ? ctx.update.callback_query.from.id
                : ctx.message.from.id

    if(await isAdmin(ctx, adminId)){
        try{
            await ctx.telegram.kickChatMember(chatId, userId)
        
            ctx.reply(`${userFirstName} [${userId}] banned.`,
                Markup.inlineKeyboard([
                    Markup.callbackButton('✅ Unban', 'unban')
                ])
                    .oneTime()
                    .resize()
                    .extra()
            )
        } catch(e) {
            console.log(e)
    
            ctx.reply('Sorry, I couldn\'t ban this user.')
        }
    } else {
        ctx.reply('You can\'t do that, you\'re not admin.')
    }
}

const unbanUser = async (ctx) => {
    const chatId = ctx.update.callback_query
                ? ctx.update.callback_query.message.chat.id
                : ctx.message.chat.id
    const userId = ctx.update.callback_query
                ? ctx.update.callback_query.message.text.match(/(.*) \[(\d+)\].*/)[2]
                : ctx.message.reply_to_message.from.id 
    const userFirstName = ctx.update.callback_query
                ? ctx.update.callback_query.message.text.match(/(.*) \[(\d+)\].*/)[1]
                : ctx.message.reply_to_message.from.first_name 
    const adminId = ctx.update.callback_query
                ? ctx.update.callback_query.from.id
                : ctx.message.from.id

    if(await isAdmin(ctx, adminId)){
        try{
            await ctx.telegram.unbanChatMember(chatId, userId)
        
            ctx.reply(`✅ ${userFirstName} unbanned.`)
        } catch(e) {
            console.log(e)
    
            ctx.reply('Sorry, I couldn\'t unban this user.')
        }
    } else {
        ctx.reply('You can\'t do that, you\'re not admin.')
    }
}

module.exports = {
    banUser,
    unbanUser
}