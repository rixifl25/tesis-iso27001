// ** Third Party Components
import { Bar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

// Importar y registrar componentes de Chart.js
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const GraphicBar = ({ gridLineColor, labelColor, categoriasBarGeneralGraphic }) => {
    // ** Chart Options
    const options = {
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        elements: {
            bar: {
                borderRadius: {
                    topRight: 15,
                    bottomRight: 15
                }
            }
        },
        layout: {
            padding: { top: -4 }
        },
        scales: {
            x: {
                type: 'category', // Especifica que el eje X es de tipo 'category'
                min: 0,
                grid: {
                    drawTicks: false,
                    color: gridLineColor,
                    borderColor: 'transparent'
                },
                ticks: { color: labelColor }
            },
            y: {
                type: 'linear', // Especifica que el eje Y es de tipo 'linear'
                grid: {
                    display: false,
                    borderColor: gridLineColor
                },
                ticks: { color: labelColor }
            }
        },
        plugins: {
            legend: {
                align: 'end',
                position: 'top',
                labels: { color: labelColor }
            }
        }
    }
    const Colors = [
        '#9B88FA',
        '#FFA1A1',
        '#A1FFCB',
        '#FFE5A1',
        '#A1CBFF'
    ]


    // ** Chart Data
    const data = {
        labels: categoriasBarGeneralGraphic[0]?.labels || [],
        datasets: categoriasBarGeneralGraphic.map((categoria, index) => {
            return {
                maxBarThickness: 15,
                label: categoria.code,
                backgroundColor: Colors[index],
                borderColor: 'transparent',
                data: categoria.values
            }
        })

    }
    return (
        <Card>
            <CardBody>
                <div style={{ height: '400px' }}>
                    <Bar data={data} options={options} height={400} />
                </div>
            </CardBody>
        </Card>
    )
}

export default GraphicBar
