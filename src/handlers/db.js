const MongoClient = require('mongodb').MongoClient

let cachedDB = null

const connectToDB = async () => {
	if (cachedDB) return cachedDB

	const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology: true })

	const db = await client.db('bemvindoamatrixbot')

	cachedDB = db

	return db
};

module.exports = {
	connectToDB
}