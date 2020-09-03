import { useState, useEffect } from 'react'
import { Jumbotron, Container, Image, Row, Col } from 'react-bootstrap'
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
        ?   <Container className="error-container" fluid>
                <a href="/categories">
                    <Image className="error-img" src="/errorrecord.svg" fluid />
                </a>
            </Container>
        :   <>
            <Jumbotron className="recordJumbotron">
                <Row>
                    <Image className="recordpage-img" src="/jumbotron.png" fluid />
                    <Col className="recordInfo">
                        <h1>{name}'s Account</h1>
                        <h4>Your Current Balance is: PHP {currentBalance}</h4>
                        <h5>Total Income: PHP {incomeSum}</h5>
                        <h5>Total Expenses: PHP {Math.abs(expenseSum)}</h5>
                    </Col>
                </Row>
            </Jumbotron>
            <AddRecord categories={categories} setRecords={setRecords} />
            {(records.length === 0)
            ?   <Container className="error-container" fluid>
                    <Image className="error-img" src="/errorempty.svg" fluid></Image>
                </Container>
            :   <RecordList records={records} categories={categories} setRecords={setRecords} />
            }
            </>
        }
        </>
    )
}