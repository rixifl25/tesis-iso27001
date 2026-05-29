import { useState, useEffect } from "react"
import { Card, CardBody, CardHeader, CardTitle, Input } from "reactstrap"

const Question = ({ control, onSelectionChange, isReadOnly = false, defaultSelectedValues = [] }) => {
    const hasRequiredAlternative = control.alternativas.some(alt => alt.required === true)
    const [selectedRequired, setSelectedRequired] = useState(!hasRequiredAlternative)
    const [selectedAlternatives, setSelectedAlternatives] = useState(
        control.alternativas.map(() => false)
    )

    useEffect(() => {
        // Se asegura de inicializar `selectedRequired` solo una vez.
        if (!hasRequiredAlternative) {
            setSelectedRequired(true)
        }
    }, [hasRequiredAlternative])

    useEffect(() => {
        const selectedValues = control.alternativas
            .filter((_, index) => selectedAlternatives[index])
            .map(alternative => alternative.codigo_alternativa)

        onSelectionChange(control.codigo_control, selectedValues)
    }, [selectedAlternatives, control.codigo_control, onSelectionChange])

    const handleCheckboxChange = (index, isRequired) => {
        if (isReadOnly) return // Si es solo de visualización, no hacer nada al cambiar
        setSelectedAlternatives(prevSelectedAlternatives => {
            const updatedSelectedAlternatives = [...prevSelectedAlternatives]

            if (isRequired) {
                updatedSelectedAlternatives[index] = !updatedSelectedAlternatives[index]
                setSelectedRequired(updatedSelectedAlternatives[index])
            } else if (selectedRequired) {
                updatedSelectedAlternatives[index] = !updatedSelectedAlternatives[index]
            }

            if (!updatedSelectedAlternatives[index] && isRequired) {
                updatedSelectedAlternatives.fill(false)
            }

            return updatedSelectedAlternatives
        })
    }

    const IsDefaultSelect = (codigo) => {
        if (!isReadOnly) return false
        return defaultSelectedValues.includes(codigo)
    }

    return (
        <Card style={{ background: "#B1D4E077" }}>
            <CardHeader>
                <CardTitle>{control.codigo_control} - {control.titulo}</CardTitle>
            </CardHeader>
            <CardBody>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {control.alternativas.map((alternative, index) => (
                        <li key={index} className="mb-1">
                            <Input
                                type="checkbox"
                                name="alternatives"
                                value={alternative.codigo_alternativa}
                                checked={selectedAlternatives[index] || IsDefaultSelect(alternative.codigo_alternativa)}
                                disabled={(hasRequiredAlternative && !selectedRequired && !alternative.required) || isReadOnly}
                                onChange={() => handleCheckboxChange(index, alternative.required)}
                            />
                            <span className="ms-1">{alternative.alternativas}</span>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    )
}

export default Question
