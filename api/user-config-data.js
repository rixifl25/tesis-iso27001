const { USUARIOS } = require('./_lib/data')
const { verifyToken } = require('./_lib/auth')
const { setCors } = require('./_lib/cors')

module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { username } = verifyToken(req)
    const user = USUARIOS.find(u => u.usuario === username)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    const { password: _, ...userData } = user
    return res.status(200).json({ data: { user: userData } })
  } catch {
    return res.status(401).json({ error: 'No autorizado', error_usuario: 'Sesión expirada, inicie sesión nuevamente' })
  }
}
