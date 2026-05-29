import { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap"
import { getGeneralData } from "../store/UsuarioConfigStore"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./common/Loading"
import { executeAsyncAction } from "../utility/Utils"

const ControlsList = () => {
    const dispatch = useDispatch()
    const userConfigStore = useSelector((state) => state.UsuarioConfigStore)
    const { controls } = userConfigStore
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!controls) {
            executeAsyncAction(getGeneralData(), dispatch, setIsLoading)
        }
    }, [dispatch])
    return (
        <>
            {isLoading && <Loading />}
            <Card>
                <CardHeader>
                    <CardTitle>Listado de controles de la norma ISO 27001:2022 enfocados en mitigar la fuga de información</CardTitle>
                </CardHeader>
                <CardBody>
                    {controls ? (
                        <>
                            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                {controls.map((control, index) => (
                                    <li key={index}>
                                        <strong>{control.codigo_control}</strong> - {control.titulo}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <CardText>Cargando datos de los controles...</CardText>
                    )}
                </CardBody>
            </Card>
        </>
    )
}

export default ControlsList