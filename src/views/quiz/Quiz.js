import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Label, Row } from "reactstrap"
import Question from "./Question"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGeneralData } from "../../store/UsuarioConfigStore"
import Loading from "../common/Loading"
import { executeAsyncAction, handleAlert } from "../../utility/Utils"
import { guardarEvaluacion } from "../../store/EvaluacionStore"
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const Quiz = ({ isReadOnly = false, defaultSelectedValues = [] }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedValues, setSelectedValues] = useState({}) // Guarda los valores seleccionados
    const userConfigStore = useSelector((state) => state.UsuarioConfigStore)
    const { categorias } = userConfigStore
    const executeGetEvaluationAsyncFunction = async (allSelectedValues) => {
        try {
            setIsLoading(true)
            const result = await dispatch(guardarEvaluacion({
                alternativas_marcadas: allSelectedValues
            }
            )).unwrap()
            handleAlert({
                text: result.message || 'Ha ocurrido un error',
                icon: 'success',
                onConfirm: () => {
                    navigate("/graphics")
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
    useEffect(() => {
        if (!categorias) {
            executeAsyncAction(getGeneralData(), dispatch, setIsLoading)
        }
    }, [dispatch])
    // Maneja la actualización de valores seleccionados
    const handleSelectionChange = useCallback((controlCode, selectedAlternatives) => {
        setSelectedValues(prevSelectedValues => ({
            ...prevSelectedValues,
            [controlCode]: selectedAlternatives
        }))
    }, [])
    const openAnalisis = () => {
        const allSelectedValues = Object.values(selectedValues).flat()
        executeGetEvaluationAsyncFunction(allSelectedValues)
        console.log("Valores seleccionados:", allSelectedValues)
    }
    const encuestaOptions = defaultSelectedValues.map(encuesta => {
        return {
            value: encuesta.code,
            label: encuesta.code
        }
    })
    const [alternativasMarcadas, setAlternativasMarcadas] = useState(defaultSelectedValues.find(encuesta => encuesta.code === encuestaOptions[0].value)?.alternativas_marcadas)
    const handleEncuestaChange = (value) => {
        setAlternativasMarcadas(defaultSelectedValues.find(encuesta => encuesta.code === value.value).alternativas_marcadas)
    }
    return (
        <>
            {isLoading && <Loading />}
            <Card>
                <CardHeader>
                    <CardTitle> EVALUACIÓN DE CONTROLES BASADOS  EN LA  ISO 27001:2022</CardTitle>
                </CardHeader>
                <CardBody>
                    {isReadOnly &&
                        <Row className="mb-2">
                            <Col md='4'>
                                <Label for='encuesta-input' style={{ fontSize: '1.0rem' }}>Seleccione una evaluación</Label>
                                <Select
                                    id='encuesta-select'
                                    options={encuestaOptions}
                                    defaultValue={encuestaOptions[0]}
                                    onChange={handleEncuestaChange}
                                    placeholder='Seleccione la encuesta'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    theme={selectThemeColors}
                                />
                            </Col>
                        </Row>
                    }

                    {categorias ? (
                        <>
                            {categorias.map((categoria, index) => (
                                <div key={index}>
                                    <h4>{categoria.codigo} - {categoria.nombre}</h4>
                                    {categoria.controles.map((control, index) => (
                                        <Question
                                            key={index}
                                            control={control}
                                            onSelectionChange={handleSelectionChange}
                                            isReadOnly={isReadOnly}
                                            defaultSelectedValues={alternativasMarcadas || []}
                                        >
                                        </Question>
                                    ))}
                                </div>
                            ))}
                        </>
                    ) : (
                        <CardText>Cargando datos de las categorias...</CardText>
                    )}
                    {!isReadOnly &&
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                            <Button color="primary" outline>
                                Cancelar
                            </Button>
                            <Button color="primary" onClick={openAnalisis}>
                                Enviar evaluación
                            </Button>
                        </div>
                    }

                </CardBody>
            </Card>
        </>

    )
}

export default Quiz