const { isAdmin } = require('./../handlers/utils')
const { connectToDB } = require('./../handlers/db')
const { banUser } = require('./ban')

const warnUser = async (ctx) => {
    const db = await connectToDB()
    const users = await db.collection('users')

    const userId = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.id 
                : ctx.message.from.id
    const userFirstName = ctx.message.reply_to_message 
                ? ctx.message.reply_to_message.from.first_name 
                : ctx.message.from.first_name

    const user = await users.findOne({ 'user_id': userId })
    let totalWarns = user ? user.total_warns : 0

    const resetWarns = async () => {
        await users.updateOne(
            { 'user_id': userId },
            { $set: { 'total_warns' : 0 } }
        )
    }

    if(await isAdmin(ctx, ctx.message.reply_to_message.from.id)){
        ctx.reply(`You cannot warn ${userFirstName}`)
        return
    }

    if(await isAdmin(ctx, ctx.message.from.id)){
        try {
            if(ctx.match[1] === 'reset' && user) {
                try {
                    await resetWarns()

                    ctx.reply('Warns resetted successfully.')
                } catch(e) {
                    console.log(e)

                    ctx.reply('Warns not resetted.')
                }
            } else {
                if(user) {
                    await users.updateOne(
                        { 'user_id': userId },
                        { $set: { 'total_warns' : totalWarns + 1 } }
                    )
    
                    totalWarns = totalWarns + 1
                } else {
                    await users.insertOne({
                        'user_id': userId,
                        'total_warns': 1
                    })
    
                    totalWarns = 1
                }

                ctx.reply(`${userFirstName} warned.\nTotal warns: ${totalWarns}`)

                if(totalWarns >= 3){
                    banUser(ctx)
                    await resetWarns()
                }
            }
        } catch(e) {
            console.log(e)
    
            ctx.reply('Sorry, I don\'t have sufficient permissions to do this.')
        }
    } else {
        ctx.reply('You can\'t do that, you\'re not admin.')
    }
}

module.exports = warnUser