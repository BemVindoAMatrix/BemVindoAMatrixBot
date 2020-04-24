const { isAdmin } = require('./../handlers/utils')

const kickUser = async (ctx) => {
    if(!ctx.message.reply_to_message) return

    const chatId = ctx.message.chat.id
    const userId = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.id 
                : ctx.message.from.id
    const userFirstName = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.first_name 
                : ctx.message.from.first_name

    if(await isAdmin(ctx, ctx.message.from.id)){
        try{
            await ctx.telegram.kickChatMember(chatId, userId)
            await ctx.telegram.unbanChatMember(chatId, userId)
        
            ctx.replyWithMarkdown(`✅ [${userFirstName}](tg://user?id=${userId}) kicked.`)
        } catch(e) {
            console.log(e)
    
            ctx.reply('Sorry, I couldn\'t kick this user.')
        }
    } else {
        ctx.reply('You can\'t do that, you\'re not admin.')
    }
}

module.exports = kickUser