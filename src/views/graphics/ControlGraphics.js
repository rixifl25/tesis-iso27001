import { Fragment, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row } from "reactstrap"
import LinearGraphic from "./components/LinearGraphic"
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const ControlGraphics = ({ controlesLinearGraphic, controlsData, propuestas }) => {
    const findControlName = (code) => {
        const control = controlsData.find(control => control.codigo_control === code)
        return control ? control.titulo : code
    }
    const controlesLinearGraphicFormated = controlesLinearGraphic.map(control => {
        return {
            code: control.code,
            controles: control.controles.map(control => {
                return {
                    description: `${control.codigo_control} - ${findControlName(control.codigo_control)}`,
                    value: control.puntaje * 100,
                    propuesta: propuestas.find(alternativa => alternativa.codigo_control === control.codigo_control).descripcion
                }
            })
        }
    })
    const encuestaOptions = controlesLinearGraphic.map(control => {
        return {
            value: control.code,
            label: control.code
        }
    })
    const [controls, setControls] = useState(controlesLinearGraphicFormated.find(control => control.code === encuestaOptions[0].value))

    const handleDistritoChange = (value) => {
        setControls(controlesLinearGraphicFormated.find(control => control.code === value.value))
    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">
                        ESTADO DE CUMPLIMIENTO DE LOS CONTROLES
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2 ms-2">
                        <Col md='4'>
                            <Label for='encuesta-input' style={{ fontSize: '1.0rem' }}>Seleccione una evaluación</Label>
                            <Select
                                id='encuesta-select'
                                options={encuestaOptions}
                                defaultValue={encuestaOptions[0]}
                                onChange={handleDistritoChange}
                                placeholder='Seleccione la encuesta'
                                className='react-select'
                                classNamePrefix='select'
                                isClearable={false}
                                theme={selectThemeColors}
                            />
                        </Col>
                    </Row>
                    {controls && controls.controles.map((control, index) => (
                        <LinearGraphic key={index} control={control}>
                        </LinearGraphic>
                    ))}
                </CardBody>
            </Card>
        </Fragment>

    )
}

export default ControlGraphics