import { Line } from 'react-chartjs-2'

export default function LineChart({records}) {
    // Map and sort records by date added. Sort is needed since update function is pull then push
    const chartDates = records.map(record => new Date(record.dateAdded).toLocaleString('en-US',{
        month:'long',
        day:'numeric',
        hour: '2-digit'
    }))
    .sort((a,b) => b - a)

    const chartLabels = records.map(record => `${record.description} (${record.categoryName})`)
    const chartAmounts = records.map(record => record.amount)

    return (
        <Line
            data={{
                datasets:[{
                    label: 'Transactions',
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