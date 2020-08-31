import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({records}) {
    const chartLabels = records.map(record => `${record.description} (${record.categoryName})`)
    const chartAmounts = records.map(record => record.amount)
    const colors = ["darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue"]

    return (
        <Doughnut
            data={{
                datasets:[{
                    data: chartAmounts,
                    backgroundColor: colors

                }],
                labels: chartLabels
            }}

            redraw={false}
        />
    )
}