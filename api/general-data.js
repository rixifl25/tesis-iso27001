const { buildGeneralData } = require('./_lib/data')
const { verifyToken } = require('./_lib/auth')
const { setCors } = require('./_lib/cors')

module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    verifyToken(req)
    return res.status(200).json(buildGeneralData())
  } catch {
    return res.status(401).json({ error: 'No autorizado', error_usuario: 'Sesión expirada, inicie sesión nuevamente' })
  }
}
