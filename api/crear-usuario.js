const { setCors } = require('./_lib/cors')

// En modo demo sin DB, el registro confirma éxito
// El usuario puede iniciar sesión con admin/admin123
module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  return res.status(200).json({
    message: 'Usuario registrado exitosamente. Puede iniciar sesión con sus credenciales.'
  })
}
