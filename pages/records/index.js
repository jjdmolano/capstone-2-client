import { useEffect, useState } from 'react'
import { Jumbotron, Container, Col, Row } from 'react-bootstrap'
import AddRecord from '../../components/AddRecord'
import RecordList from '../../components/RecordList'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])
    const [ records, setRecords ] = useState([])

    // TODO: separated all amounts into another array and added them all
    // const amountSum = records
    //     .map(record => record.amount)
    //     .reduce((total, amount) => total + amount, 0)
    // console.log(amountSum)

    // const [recordDates] = records
    //     .map(record => record.dateAdded)
    // console.log(recordDates)
    // const d = new Date("2020-08-29T09:51:58.990Z")
    // console.log(d.toLocaleString())

    // TODO: filtered records by income and expense, now to show just them
    // const incomeRecords = records.filter(record =>
    //     record.categoryType === 'Income'
    // )
    // const expenseRecords = records.filter(record =>
    //     record.categoryType === 'Expense'
    // )
    // console.log(incomeRecords)
    // console.log(expenseRecords)

    // TODO: filter records by income and expense(convert to negative!) and add them

    // Sum of all income
    const incomeSum = records
        .filter(record => record.categoryType === 'Income')
        .map(record => record.amount)
        .reduce((total, amount) => total + amount, 0)

    // Sum of all expenses
    const expenseSum = records
        .filter(record => record.categoryType === 'Expense')
        .map(record => record.amount)
        .reduce((total, amount) => total + amount, 0)

    // new array for balance per transaction
    let balanceArr = records.map(record => record.amount),sum
    balanceArr = balanceArr.map(recordAmount => sum = (sum || 0) + recordAmount)

    const currentBalance = balanceArr.slice(-1)

    // fetch user records and categories hook
    useEffect(() => {
        fetch('http://localhost:4000/api/users/details', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.firstName)
            setRecords(data.transactions)
            setCategories(data.categories)
        })
    },[])

    return (
        <Container className="mx-5 px-5" >
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
        </Container>
    )
}