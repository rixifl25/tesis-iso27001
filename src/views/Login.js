import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'react-feather'
import axios from 'axios'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, Form, Label, Input, Button, Alert, CardText } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'

const Login = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [txtUsername, setTxtUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensajeErroneo, setMensajeErroneo] = useState('')

  const iniciosesion = async () => {
    setVisible(false)

    if (!txtUsername) {
      setMensajeErroneo('Ingrese el usuario')
      setVisible(true)
      return
    }
    if (!password) {
      setMensajeErroneo('Ingrese la clave')
      setVisible(true)
      return
    }

    setLoadingBtn(true)
    try {
      const API_BASE = process.env.REACT_APP_API_BASE || '/api'
      const response = await axios.post(`${API_BASE}/login`, { usuario: txtUsername, password })
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userData', JSON.stringify({ role: 'admin', username: txtUsername }))
      navigate('/home')
      navigate(0)
    } catch {
      setMensajeErroneo('Usuario y/o clave incorrectos')
      setVisible(true)
      setLoadingBtn(false)
    }
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <div className="d-flex align-items-center justify-content-center">
          <Col className="d-flex align-items-center auth-bg px-2 p-lg-5 pt-2" lg="4" sm="12">
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                HERRAMIENTA DE EVALUACIÓN BASADA EN LA ISO 27001:2022
              </CardTitle>
              <CardText tag="h4" className="mb-1 text-center">AUTORES:</CardText>
              <CardText className="mb-1 text-center">Cesar Kenec Zuloaga Estrada</CardText>
              <CardText className="mb-1 text-center">Gabriel Omar Quispe Kobashibawa</CardText>

              <Alert color='danger' isOpen={visible} toggle={() => setVisible(false)}>
                <div className='alert-body'>
                  <AlertCircle size={15} />{' '}
                  <span className='ms-1'>{mensajeErroneo}</span>
                </div>
              </Alert>

              <Form className="auth-login-form mt-2" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-1">
                  <Label className="form-label" for="login-text">Usuario</Label>
                  <Input
                    type="text"
                    id="login-text"
                    placeholder="Ingrese su usuario"
                    autoFocus
                    onChange={(e) => setTxtUsername(e.target.value?.toString())}
                    onKeyDown={(e) => { if (e.key === 'Enter') iniciosesion() }}
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">Contraseña</Label>
                    <Link to="/forgot-password">
                      <small>¿Olvidaste la contraseña?</small>
                    </Link>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') iniciosesion() }}
                  />
                </div>
                <Button onClick={() => iniciosesion()} color="primary" block disabled={loadingBtn}>
                  {loadingBtn ? 'Iniciando...' : 'Iniciar sesión'}
                </Button>
              </Form>
              <p className="text-center mt-2">
                <span className="me-25">¿Nuevo en la plataforma?</span>
                <Link to="/register"><span>Crea una cuenta</span></Link>
              </p>
            </Col>
          </Col>
        </div>
      </Row>
    </div>
  )
}

export default Login
