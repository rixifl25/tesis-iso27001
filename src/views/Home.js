import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap"
import { getUserConfig } from "../store/UsuarioConfigStore"
import Loading from "./common/Loading"
import { useNavigate } from "react-router-dom"
import { executeAsyncAction } from "../utility/Utils"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userConfigStore = useSelector((state) => state.UsuarioConfigStore)
  const { user } = userConfigStore

  const [isLoading, setIsLoading] = useState(false)
  const openQuiz = () => {
    navigate("/quiz")
  }
  useEffect(() => {
    if (!user) {
      executeAsyncAction(getUserConfig(), dispatch, setIsLoading)
    }

  }, [])
  return (
    <div>
      {isLoading && <Loading />}
      <Card>
        <CardHeader>
          <CardTitle>Datos del usuario</CardTitle>
        </CardHeader>
        <CardBody>
          {user ? (
            <>
              <CardText><strong>Nombre del encargado:</strong> {user.nombre_encargado}</CardText>
              <CardText><strong>Usuario:</strong> {user.usuario}</CardText>
              <CardText><strong>Nombre de la empresa:</strong> {user.nombre_empresa}</CardText>
              <CardText><strong>RUC de la empresa:</strong> {user.ruc_empresa}</CardText>
            </>
          ) : (
            <CardText>Cargando datos del usuario...</CardText>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardText>
            El siguiente formulario tiene como propósito definir el estado actual del Sistema de Seguridad de la Información (SGSI) de la empresa en base a 36 controles del estándar ISO 27001:2022, direccionados a mitigar la fuga de información.
          </CardText>
          <CardText>
            Hacer click en el enlace para visualizar el detalle de los controles seleccionados.
          </CardText>
          <Button.Ripple color="primary" outline onClick={openQuiz}>
            Comenzar evaluación
          </Button.Ripple>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
