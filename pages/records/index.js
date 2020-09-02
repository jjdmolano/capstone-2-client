import { useState, useEffect } from 'react'
import { Jumbotron, Row, Col } from 'react-bootstrap'
import AddRecord from '../../components/AddRecord'
import RecordList from '../../components/RecordList'
import Head from 'next/head'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])
    const [ records, setRecords ] = useState([])
    const [ incomeSum, setIncomeSum ] = useState([])
    const [ expenseSum, setExpenseSum ] = useState([])

    // new array for balance per transaction
    let balanceArr = records.map(record => record.amount),sum
    balanceArr = balanceArr.map(recordAmount => sum = (sum || 0) + recordAmount)

    // get current total balance
    const currentBalance = balanceArr.slice(-1)

    // fetch user records and categories hook
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.firstName)
            setRecords(data.transactions)
            setCategories(data.categories)

            // sum of all income
            const incomeCalc = data.transactions
                .filter(record => record.categoryType === 'Income')
                .map(record => record.amount)
                .reduce((total, amount) => total + amount, 0)
            setIncomeSum(incomeCalc)

            // sum of all expenses
            const expenseCalc = data.transactions
                .filter(record => record.categoryType === 'Expense')
                .map(record => record.amount)
                .reduce((total, amount) => total + amount, 0)
            setExpenseSum(expenseCalc)
        })
    },[])

    return (
        <>
        <Head><title>Records</title></Head>
        {categories.length === 0 && records.length === 0
        ?   <Jumbotron>
                <p>You need to create a category first before adding a record.</p>
            </Jumbotron>
        :   <>
            <Jumbotron className="py-3">
                <h1>{name}'s Account</h1>
                <Row>
                    <Col className="col-7">
                        <h3>Your current Balance is: PHP {currentBalance}</h3>
                    </Col>
                    <Col className="col-5">
                        <h5>Total Income: PHP {incomeSum}</h5>
                        <h5>Total Expenses: PHP {Math.abs(expenseSum)}</h5>
                    </Col>
                </Row>
            </Jumbotron>
            <AddRecord categories={categories} setRecords={setRecords} />
            {(records.length === 0)
            ?   <Jumbotron>
                    <p>We couldn't find any records, {name}. Why not make one above?</p>
                </Jumbotron>
            :   <RecordList records={records} categories={categories} setRecords={setRecords} />
            }
            </>
        }
        </>
    )
}