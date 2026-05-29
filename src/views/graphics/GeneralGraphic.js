import { Fragment, useContext } from "react"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import { ThemeColors } from '@src/utility/context/ThemeColors'
import GraphicBar from "./components/GraphicBar"
import { useSkin } from '@hooks/useSkin'

const GeneralGraphic = ({ categoriasBarGeneralGraphic }) => {
    const { colors } = useContext(ThemeColors),
        { skin } = useSkin(),
        labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
        gridLineColor = 'rgba(200, 200, 200, 0.2)'
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>A continuación se muestra una comparativa, de los controles evaluados, en el analisis inicial de la empresa y el anailis final de la misma</CardTitle>
                </CardHeader>
                <CardBody>
                    <GraphicBar
                        labelColor={labelColor}
                        warning={colors.warning.main}
                        gridLineColor={gridLineColor}
                        categoriasBarGeneralGraphic={categoriasBarGeneralGraphic}
                    ></GraphicBar>
                </CardBody>
            </Card>
        </Fragment>

    )
}

export default GeneralGraphic