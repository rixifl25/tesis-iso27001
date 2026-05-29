// Stub — Cognito replaced with mock auth. No AWS calls needed.
export default class CognitoService {
  async getTokenUser() { return 'mock-token' }
  async getDatosUsuarios() { return { nombres: 'Cesar', apellido_paterno: 'Zuloaga', apellido_materno: 'Estrada', doc_identidad: '12345678' } }
  async cambiarContrasena() { return { respuesta: true, mensaje: 'Cambio de clave exitoso.' } }
  resetPassword() { return Promise.resolve({ respuesta: true, mensaje: 'Envío exitoso' }) }
  confirmPassword() { return Promise.resolve() }
  async refreshToken() { return Promise.reject('error') }
}
