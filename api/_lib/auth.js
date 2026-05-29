const jwt = require('jsonwebtoken')

// Hardcodeado — no necesita env var para funcionar
const SECRET = process.env.JWT_SECRET || 'tesis-iso27001-jwt-2024'

function verifyToken(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '')
  if (!token) throw new Error('Token requerido')
  return jwt.verify(token, SECRET)
}

function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' })
}

module.exports = { verifyToken, createToken }
