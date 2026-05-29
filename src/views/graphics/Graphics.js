import { Fragment, useEffect, useState } from "react"
import { CardText, Col, Row, TabContent, TabPane } from "reactstrap"
import Tabs from "./components/Tabs"
import Analisis from "./Analisis"
import GeneralGraphic from "./GeneralGraphic"
import ControlGraphics from "./ControlGraphics"
import { useDispatch, useSelector } from "react-redux"
import { getEvaluaciones } from "../../store/EvaluacionStore"
import { getGeneralData } from "../../store/UsuarioConfigStore"
import { executeAsyncAction } from "../../utility/Utils"
import Loading from "../common/Loading"
import Quiz from "../quiz/Quiz"

const Graphics = () => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('1')
    const [Cargando, setIsLoading] = useState(false)
    const userConfigStore = useSelector((state) => state.UsuarioConfigStore)
    const { categorias, controls, propuestas } = userConfigStore

    const evaluacionStore = useSelector((state) => state.EvaluacionStore)
    const { evaluaciones,
        categoriasAnalisisGraphic,
        isLoading,
        categoriasAnalisisGeneralGraphic,
        categoriasRadarGeneralGraphic,
        categoriasBarGeneralGraphic,
        controlesLinearGraphic,
        alternativas_marcadas } = evaluacionStore

    useEffect(() => {
        if (!categorias || !controls || !propuestas) {
            executeAsyncAction(getGeneralData(), dispatch, setIsLoading)
        }
        executeAsyncAction(getEvaluaciones(), dispatch, setIsLoading)


    }, [dispatch])
    const toggleTab = tab => {
        setActiveTab(tab)
    }
    return (
        <Fragment>
            {(Cargando && isLoading) && <Loading />}
            {
                evaluaciones && evaluaciones.length > 0 ? (
                    <Row>
                        <Col xs={12}>
                            {evaluaciones && categorias && categoriasBarGeneralGraphic && alternativas_marcadas &&
                                categoriasRadarGeneralGraphic && controlesLinearGraphic && controls && propuestas ? (
                                <>
                                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId='1'>
                                            <Analisis
                                                categoriasAnalisisGraphic={categoriasAnalisisGraphic}
                                                categorias={categorias}
                                                categoriasAnalisisGeneralGraphic={categoriasAnalisisGeneralGraphic}
                                                categoriasRadarGeneralGraphic={categoriasRadarGeneralGraphic}
                                                categoriasBarGeneralGraphic={categoriasBarGeneralGraphic}
                                            ></Analisis>
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <ControlGraphics
                                                controlesLinearGraphic={controlesLinearGraphic}
                                                controlsData={controls}
                                                propuestas={propuestas}
                                            ></ControlGraphics>
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <GeneralGraphic categoriasBarGeneralGraphic={categoriasBarGeneralGraphic}></GeneralGraphic>
                                        </TabPane>
                                        <TabPane tabId='4'>
                                            <Quiz
                                                isReadOnly={true}
                                                defaultSelectedValues={alternativas_marcadas}
                                            ></Quiz>
                                        </TabPane>
                                    </TabContent>
                                </>
                            ) : (
                                <CardText>Cargando datos de los graficos...</CardText>
                            )}
                        </Col>
                    </Row>
                ) : (<CardText>No hay evaluaciones para mostrar</CardText>)
            }
        </Fragment>

    )
}

export default Graphics