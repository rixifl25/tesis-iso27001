const { calcularResultados } = require('./_lib/data')
const { verifyToken } = require('./_lib/auth')
const { setCors } = require('./_lib/cors')

module.exports = async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { username } = verifyToken(req)
    const { alternativas_marcadas } = req.body || {}

    if (!Array.isArray(alternativas_marcadas)) {
      return res.status(400).json({ error: 'alternativas_marcadas debe ser un array' })
    }

    const now = new Date().toISOString()
    const { resultados, puntaje_total } = calcularResultados(alternativas_marcadas)

    // Devuelve la evaluación completa — el frontend la guarda en localStorage
    const evaluation = {
      usuario: username,
      estado: 1,
      fecha_creacion: now,
      alternativas_marcadas: {
        fecha: now,
        alternativas_marcadas
      },
      resultados: {
        fecha: now,
        resultados,
        puntaje_total
      }
    }

    return res.status(200).json({
      message: 'Evaluación guardada exitosamente',
      evaluation
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error al calcular resultados', error_usuario: 'Ocurrió un error al guardar la evaluación' })
  }
}
