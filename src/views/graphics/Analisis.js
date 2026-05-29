import { Fragment, useContext } from "react"
import RadialBar from "./components/RadialBar"
import { Card, CardBody, CardText, Col, Row } from "reactstrap"
import RadarChart from "./components/RadarChart"
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useSkin } from '@hooks/useSkin'

const Analisis = ({ categoriasAnalisisGraphic, categorias, categoriasAnalisisGeneralGraphic, categoriasRadarGeneralGraphic }) => {
    const { colors } = useContext(ThemeColors),
        { skin } = useSkin(),
        labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
        gridLineColor = 'rgba(200, 200, 200, 0.2)'
    console.log(colors)
    const findCategoryName = (code) => {
        const category = categorias.find(categoria => categoria.codigo === code)
        return category ? category.nombre : code
    }
    const convertArrayCodeToArrayName = () => {
        const names = []
        categoriasRadarGeneralGraphic[0]?.labels?.forEach(code => {
            const category = categorias.find(categoria => categoria.codigo === code)
            names.push(category ? category.nombre : code)
        })
        return names
    }
    return (
        <Fragment>
            <Row className='match-height'>
                {
                    categorias && categoriasAnalisisGraphic && categoriasAnalisisGraphic.map((categoria, index) => {
                        return (
                            <Col xl='3' lg='12' key={index}>
                                <RadialBar
                                    tittle={findCategoryName(categoria.code)}
                                    labels={categoria.labels}
                                    values={categoria.values}
                                    total={categoria.total}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <Row>
                            {categoriasRadarGeneralGraphic && categoriasAnalisisGeneralGraphic ? (
                                <>
                                    <Col xl='4' lg='12' className="d-flex align-items-center">
                                        <h1>Cumplimiento total: </h1>
                                    </Col>
                                    <Col xl='4' lg='12'>
                                        <RadialBar
                                            labels={categoriasAnalisisGeneralGraphic.labels}
                                            values={categoriasAnalisisGeneralGraphic.values}
                                            total={categoriasAnalisisGeneralGraphic.total}
                                        />
                                    </Col>
                                    <Col xl='4' lg='12'>
                                        <RadarChart
                                            labelColor={labelColor}
                                            gridLineColor={gridLineColor}
                                            categoriasRadarGeneralGraphic={categoriasRadarGeneralGraphic}
                                            categoryNames={convertArrayCodeToArrayName()}
                                        />
                                    </Col>
                                </>
                            ) : (
                                <CardText>Cargando datos de las categorias...</CardText>
                            )}
                        </Row>
                    </CardBody>
                </Card>
            </Row>
        </Fragment>

    )
}

export default Analisis