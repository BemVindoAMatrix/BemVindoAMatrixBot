const { isAdmin } = require('./../handlers/utils')

const banUser = async (ctx) => {
    const chatId = ctx.message.chat.id
    const userId = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.id 
                : ctx.message.from.id
    const userFirstName = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.first_name 
                : ctx.message.from.first_name

    if(await isAdmin(ctx)){
        try{
            await ctx.telegram.kickChatMember(chatId, userId)
        
            ctx.reply(`${userFirstName} kicked.`)
        } catch(e) {
            console.log(e)
    
            ctx.reply('Sorry, I couldn\'t kick this user.')
        }
    } else {
        ctx.reply('You can\'t do that, you\'re not admin.')
    }
}

const unbanUser = async (ctx) => {
    const chatId = ctx.message.chat.id
    const userId = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.id 
                : ctx.message.from.id
    const userFirstName = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.first_name 
                : ctx.message.from.first_name

    if(await isAdmin(ctx)){
        try{
            await ctx.telegram.unbanChatMember(chatId, userId)
        
            ctx.reply(`${userFirstName} unbanned.`)
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