import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({records}) {
    const chartLabels = records.map(record => `${record.description} (${record.categoryName})`)
    const chartAmounts = records.map(record => record.amount)

    return (
        <Doughnut
            data={{
                datasets:[{
                    data: chartAmounts,
                    backgroundColor: ["darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue","darkRed","darkOrange","yellow","green","darkBlue","indigo", "darkViolet","red","lightBlue"]

                }],
                labels: chartLabels
            }}

            redraw={false}
        />
    )
}