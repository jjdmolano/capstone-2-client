import { Line } from 'react-chartjs-2'

export default function LineChart({records}) {
    // map and sort records by date added. Sort just to make sure records are chronological
    const chartDates = records.map(record => new Date(record.dateAdded).toLocaleString('en-US',{
        month:'short',
        day:'numeric',
        hour: '2-digit'
    }))
    .sort((a,b) => b - a)

    // array for balance per transaction
    let chartAmounts = records.map(record => record.amount),sum
    chartAmounts = chartAmounts.map(recordAmount => sum = (sum || 0) + recordAmount)

    return (
        <Line
            data={{
                datasets:[{
                    label: 'Balance',
                    fill: false,
                    data: chartAmounts,
                    backgroundColor: 'darkBlue',
                    borderColor: 'lightBlue'
                }],
                labels: chartDates
            }}

            redraw={false}
        />
    )
}