const { MongoClient } = require('mongodb')

let cachedClient = null

async function connectDb() {
  if (cachedClient) {
    try {
      await cachedClient.db('admin').command({ ping: 1 })
      return cachedClient.db(process.env.MONGODB_DB || 'tesis_bd')
    } catch {
      cachedClient = null
    }
  }
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client.db(process.env.MONGODB_DB || 'tesis_bd')
}

module.exports = { connectDb }
