// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Icons Imports

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { crearUsuario } from "../store/UsuarioConfigStore"
import Loading from "./common/Loading"
import { handleAlert } from "../utility/Utils"

const Register = () => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [enterpriseName, setEnterpriseName] = useState('')
  const [enterpriseRuc, setEnterpriseRuc] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validatePassword = (password) => {
    const errors = []

    if (!/[A-Z]/.test(password)) {
      errors.push("La contraseña debe tener al menos una letra mayúscula.")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("La contraseña debe tener al menos una letra minúscula.")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("La contraseña debe tener al menos un número.")
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("La contraseña debe tener al menos un símbolo.")
    }
    if (password.length < 8) {
      errors.push("La contraseña debe tener al menos 8 caracteres.")
    }

    return errors
  }
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    const validationErrors = validatePassword(newPassword)
    setErrors(validationErrors)
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const result = await dispatch(crearUsuario({
        nombre_encargado: name,
        apellido_encargado: lastname,
        email,
        usuario: username,
        nombre_empresa: enterpriseName,
        ruc_empresa: enterpriseRuc,
        password
      })).unwrap()
      handleAlert({
        text: result.message || 'Ha ocurrido un error',
        icon: 'success',
        onConfirm: () => {
          navigate("/login")
        }
      })
    } catch (error) {
      handleAlert({
        text: error.message || 'Ha ocurrido un error',
        icon: 'error'
      })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="auth-wrapper auth-cover">
      {isLoading && <Loading />}
      <Row className="auth-inner m-0">
        <div className="d-flex align-items-center justify-content-center">
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5 pt-2"
            lg="4"
            sm="12"
          >
            <Col className="mx-auto" xs="12" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                HERRAMIENTA DE EVALUACIÓN BASADA EN LA  ISO 27001:2022
              </CardTitle>
              <CardText className="mb-2">
                Complete los datos y comience a evaluar su empresa
              </CardText>
              <Form
                className="auth-register-form mt-2"
                onSubmit={handleRegister}
              >
                <div className="mb-1">
                  <Label className="form-label" for="register-name-charge">
                    Nombre del encargado
                  </Label>
                  <Input
                    type="text"
                    id="register-name-charge"
                    placeholder="Escriba aquí su nombre"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-lastname-charge">
                    Apellido del encargado
                  </Label>
                  <Input
                    type="text"
                    id="register-lastname-charge"
                    placeholder="Esriba aquí su apellido"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-username">
                    Usuario
                  </Label>
                  <Input
                    type="text"
                    id="register-username"
                    placeholder="Escriba aquí su usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="register-username"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-company-name">
                    Nombre de la empresa
                  </Label>
                  <Input
                    type="text"
                    id="register-company-name"
                    placeholder="Escriba aquí el nombre de su empresa"
                    value={enterpriseName}
                    onChange={(e) => setEnterpriseName(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-company-ruc">
                    RUC de la empresa
                  </Label>
                  <Input
                    type="text"
                    id="register-company-ruc"
                    placeholder="Escriba aquí el RUC de su empresa"
                    value={enterpriseRuc}
                    onChange={(e) => setEnterpriseRuc(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-password">
                    Password
                  </Label>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="register-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.length > 0 && (
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index} style={{ color: "red" }}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button color="primary" block type="submit">
                  Registrarse
                </Button>
              </Form>
              <p className="text-center mt-2">
                <span className="me-25">¿Ya tienes una cuenta?</span>
                <Link to="/login">
                  <span>Ingresa sesión ahora</span>
                </Link>
              </p>
            </Col>
          </Col>
        </div>
      </Row>
    </div>
  )
}

export default Register
