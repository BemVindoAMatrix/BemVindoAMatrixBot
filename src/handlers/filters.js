const fetch = require("node-fetch");

const filterNewMember = async (ctx, Markup) => {
    const newMemberId = ctx.message.new_chat_member.id
    const newMemberFirstName = ctx.message.new_chat_member.first_name

    fetch(`https://api.cas.chat/check?user_id=${newMemberId}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if(data.ok){
                ctx.reply(`⚠️ ${newMemberFirstName} [${newMemberId}] is a known spammer.`,
                    Markup.inlineKeyboard([
                        Markup.callbackButton('🚫 Ban', 'ban')
                    ])
                        .oneTime()
                        .resize()
                        .extra()
                )
            }
        })
}

module.exports = { filterNewMember }