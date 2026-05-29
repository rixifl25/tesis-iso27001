import { Link } from "react-router-dom"
import { ChevronLeft } from "react-feather"
import { Row, Col, CardTitle, CardText } from "reactstrap"
import "@styles/react/pages/page-authentication.scss"

const ForgotPassword = () => {
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <div className="d-flex align-items-center justify-content-center">
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                ¿Olvidaste tu clave? 🔒
              </CardTitle>
              <CardText className="mb-2">
                En modo demo, usa las credenciales: <strong>admin</strong> / <strong>admin123</strong>
              </CardText>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Regresar al Inicio de Sesión</span>
                </Link>
              </p>
            </Col>
          </Col>
        </div>
      </Row>
    </div>
  )
}

export default ForgotPassword
