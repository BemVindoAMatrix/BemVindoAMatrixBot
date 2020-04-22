const isAdmin = async (ctx, userId) => {
    const user = await ctx.getChatMember(userId)

    if(user.status === 'creator' || user.status === 'administrator')
        return true

    return false
}

module.exports = { isAdmin }