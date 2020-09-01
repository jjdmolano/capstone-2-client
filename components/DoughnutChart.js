import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Form } from 'react-bootstrap'

export default function DoughnutChart({records}) {
    // array and label of all records
    const allRecords = records.map(record => record.amount)
    const allLabels = records.map(record => `${record.description} (${record.categoryName})`)

    // array and label of all income records
    const incomeRecords = records.filter(record => record.categoryType === 'Income').map(record => record.amount)
    const incomeLabels = records.filter(record => record.categoryType === 'Income').map(record => `${record.description} (${record.categoryName})`)

    // array and label of all expense records
    const expenseRecords = records.filter(record => record.categoryType === 'Expense').map(record => record.amount)
    const expenseLabels = records.filter(record => record.categoryType === 'Expense').map(record => `${record.description} (${record.categoryName})`)

    const [ chartAmounts, setChartAmounts ] = useState(allRecords)
    const [ chartLabels, setChartLabels ] = useState(allLabels)
    const [ labelSelector, setLabelSelector ] = useState('All Records')

    const colors = ["darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue","darkBlue","indigo", "darkViolet","darkRed","darkGreen","darkOrange","yellow","red","lightBlue"]

    // pre-load amounts and labels once record prop gets passed hook
    useEffect(() => {
        setChartAmounts(allRecords)
        setChartLabels(allLabels)
        setLabelSelector('All Records')
    },[records])

    function filterType(e) {
        e.preventDefault()
        if(e.target.value === 'Income') {
            setChartAmounts(incomeRecords)
            setChartLabels(incomeLabels)
            setLabelSelector('Income')
        } else if(e.target.value === 'Expenses') {
            setChartAmounts(expenseRecords)
            setChartLabels(expenseLabels)
            setLabelSelector('Expenses')
        } else if(e.target.value === 'All Records') {
            setChartAmounts(allRecords)
            setChartLabels(allLabels)
            setLabelSelector('All Records')
        } else {
            setChartAmounts(allRecords)
            setChartLabels(allLabels)
            setLabelSelector('All Records')
        }
    }

    return (
        <>
        <Form>
            <Form.Label>Filter Records by Type:</Form.Label>
            <Form.Control as="select" value={labelSelector} onChange={e => filterType(e)}>
                <option>All Records</option>
                <option>Income</option>
                <option>Expenses</option>
            </Form.Control>
        </Form>
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
        </>
    )
}