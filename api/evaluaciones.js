const { connectDb } = require('./_lib/mongo')
const { verifyToken } = require('./_lib/auth')
const { setCors } = require('./_lib/cors')

module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { username } = verifyToken(req)
    const db = await connectDb()

    const assesments = await db.collection('assessments').find({ usuario: username, estado: 1 }).toArray()
    const formatted = assesments.map(a => ({ ...a, _id: String(a._id) }))

    return res.status(200).json({ data: { assesments: formatted } })
  } catch (e) {
    return res.status(401).json({ error: 'No autorizado', error_usuario: 'Sesión expirada, inicie sesión nuevamente' })
  }
}
