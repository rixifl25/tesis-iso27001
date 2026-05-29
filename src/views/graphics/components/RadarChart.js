// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** Third Party Components
import { Radar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

// Importar y registrar componentes de Chart.js
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const RadarChart = ({ gridLineColor, labelColor, categoriasRadarGeneralGraphic, categoryNames }) => {
    // ** States
    const [chartData, setChartData] = useState({
        datasets: []
    })

    // ** Hooks
    const chartRef = useRef(null)

    // ** Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        layout: {
            padding: { top: -20 }
        },
        scales: {
            r: {
                ticks: {
                    display: false,
                    maxTicksLimit: 1,
                    color: labelColor
                },
                grid: { color: gridLineColor },
                pointLabels: { color: labelColor },
                angleLines: { color: gridLineColor }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 25,
                    color: labelColor
                }
            }
        }
    }
    const createGradient = (ctx, color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 150)
        gradient.addColorStop(0, `${color}90`) // 0.9 de opacidad
        gradient.addColorStop(1, `${color}80`) // 0.8 de opacidad
        return gradient
    }

    // Lista de colores base para gradientes
    const colors = [
        'rgba(155,136,250,', // Azul
        'rgba(255,161,161,', // Rojo
        'rgba(161,255,203,', // Verde
        'rgba(255,229,161,', // Amarillo
        'rgba(161,203,255,'  // Cian
    ]
    useEffect(() => {
        if (!chartRef.current) {
        } else {
            // For radar gradient color
            const gradientBlue = chartRef.current.ctx.createLinearGradient(0, 0, 0, 150)
            gradientBlue.addColorStop(0, 'rgba(155,136,250, 0.9)')
            gradientBlue.addColorStop(1, 'rgba(155,136,250, 0.8)')

            const gradientRed = chartRef.current.ctx.createLinearGradient(0, 0, 0, 150)
            gradientRed.addColorStop(0, 'rgba(255,161,161, 0.9)')
            gradientRed.addColorStop(1, 'rgba(255,161,161, 0.8)')

            const chartData = {
                labels: categoryNames,
                datasets: categoriasRadarGeneralGraphic.map((categoria, index) => {
                    const color = colors[index % colors.length] // Selecciona el color de forma cíclica
                    const backgroundColor = createGradient(chartRef.current.ctx, color)

                    return {
                        fill: true,
                        label: categoria.code,
                        borderColor: 'transparent',
                        backgroundColor,
                        data: categoria.values,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'transparent'
                    }
                })
            }

            setChartData(chartData)
        }
    }, [])

    return (
        <Card>
            <CardBody>
                <div style={{ height: '355px' }}>
                    <Radar ref={chartRef} data={chartData} options={options} height={355} />
                </div>
            </CardBody>
        </Card>
    )
}

export default RadarChart
