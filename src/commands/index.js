const kickUser = require('./kick')
const { banUser, unbanUser } = require('./ban')
const warnUser = require('./warn')

module.exports = {
    kickUser,
    banUser,
    unbanUser,
    warnUser
}