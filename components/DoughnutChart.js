import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Form } from 'react-bootstrap'
import styles from './DoughnutChart.module.css'

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

    const colors = ["#4F7CAC","#ABDF75","#C0E0DE","#F3B3A6","#CEFDFF","#B98B82","#D6F9DD","#E4959E","#C5D6D8","#CB958E","#99F7AB","#7E78D2","#8E9DCC","#7D84B2","#9EEFE5","#4F7CAC","#ABDF75","#C0E0DE","#F3B3A6","#CEFDFF","#B98B82","#D6F9DD","#E4959E","#C5D6D8","#CB958E","#99F7AB","#7E78D2","#8E9DCC","#7D84B2","#9EEFE5","#4F7CAC","#ABDF75","#C0E0DE","#F3B3A6","#CEFDFF","#B98B82","#D6F9DD","#E4959E","#C5D6D8","#CB958E","#99F7AB","#7E78D2","#8E9DCC","#7D84B2","#9EEFE5","#4F7CAC","#ABDF75","#C0E0DE","#F3B3A6","#CEFDFF","#B98B82","#D6F9DD","#E4959E","#C5D6D8","#CB958E","#99F7AB","#7E78D2","#8E9DCC","#7D84B2","#9EEFE5"]

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
        <Form className={styles.form}>
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
                    backgroundColor: colors,
                    borderColor: '#363636'
                }],
                labels: chartLabels
            }}

            redraw={false}
        />
        </>
    )
}