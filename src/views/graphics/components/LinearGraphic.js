// ** Reactstrap Imports
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap'

// ** Icons Imports
import { Fragment, useState } from 'react'

const LinearGraphic = ({ control }) => {
    const getProgressColor = (value) => {
        if (value >= 75) {
            return 'success' // Verde
        } else if (value >= 50) {
            return 'warning' // Amarillo
        } else {
            return 'danger' // Rojo
        }
    }
    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const handleRowClick = () => {
        toggleModal()
    }

    const getModalMessage = () => {
        return control.value < 100 ? control.propuesta : 'Cumplimiento del control 100%.'
    }

    return (
        <Fragment>
            <Card className="row-hover" onClick={handleRowClick}>
                <CardBody>
                    <Row>
                        <Col xl='9' lg='12'>
                            {control.description}
                        </Col>
                        <Col xl='3' lg='12'>
                            <span>{control.value}%</span>
                            <Progress value={control.value} color={getProgressColor(control.value)} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            {/* Modal para mostrar recomendaciones */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Propuesta de mejora</ModalHeader>
                <ModalBody>
                    {getModalMessage()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default LinearGraphic