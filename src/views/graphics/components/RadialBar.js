// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const RadialBar = ({ tittle, labels, values, total }) => {
    const donutColors = {
        series1: '#9B88FA',
        series2: '#FFA1A1',
        series3: '#A1FFCB',
        series4: '#FFE5A1',
        series5: '#A1CBFF'
    }

    // ** Chart Options
    const options = {
        colors: Object.values(donutColors),
        plotOptions: {
            radialBar: {
                size: 185,
                hollow: {
                    size: '25%'
                },
                track: {
                    margin: 15
                },
                dataLabels: {
                    name: {
                        fontSize: '2rem',
                        fontFamily: 'Montserrat'
                    },
                    value: {
                        fontSize: '1rem',
                        fontFamily: 'Montserrat'
                    },
                    total: {
                        show: true,
                        fontSize: '1rem',
                        label: 'Total',
                        formatter() {
                            return labels?.length === 1 ? total : ''
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -35,
                bottom: -30
            }
        },
        legend: {
            show: true,
            position: 'bottom'
        },
        stroke: {
            lineCap: 'round'
        },
        labels: labels || ['Series 1']
    }
    return (
        <Card>
            <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
                <CardTitle tag='h4'>{tittle}</CardTitle>
            </CardHeader>
            <CardBody>
                <Chart options={options} series={values || [0]} type='radialBar' height={350} />
            </CardBody>
        </Card>
    )
}

export default RadialBar
