const isAdmin = async (ctx) => {
    const user = await ctx.getChatMember(ctx.message.from.id)

    if(user.status === 'creator' || user.status === 'administrator')
        return true

    return false
}

module.exports = { isAdmin }