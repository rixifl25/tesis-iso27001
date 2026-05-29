const { USUARIOS } = require('./_lib/data')
const { createToken } = require('./_lib/auth')
const { setCors } = require('./_lib/cors')

module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { usuario, password } = req.body || {}
  const user = USUARIOS.find(u => u.usuario === usuario && u.password === password)

  if (!user) return res.status(401).json({ error: 'Usuario o clave incorrectos' })

  const token = createToken({ username: user.usuario, email: user.email, nombre: user.nombre_encargado })
  return res.status(200).json({ token })
}
