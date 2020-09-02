import { useState, useEffect } from 'react'
import { Jumbotron, CardDeck, Card, Row, Col } from 'react-bootstrap'
import Head from 'next/head'

export default function Home() {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ records, setRecords ] = useState([])

    // sum of all income
    const incomeSum = records
    .filter(record => record.categoryType === 'Income')
    .map(record => record.amount)
    .reduce((total, amount) => total + amount, 0)

    // sum of all expenses
    const expenseSum = records
    .filter(record => record.categoryType === 'Expense')
    .map(record => record.amount)
    .reduce((total, amount) => total + amount, 0)

    // get current total balance
    const currentBalance = incomeSum + expenseSum

    // fetch user records hook
    useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    .then(res => res.json())
    .then(data => {
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setRecords(data.transactions)
    })
    },[])

  return(
    <>
    <Head><title>Budget Tracker</title></Head>
    <Jumbotron>
    <h1>Logged in as: {firstName} {lastName}</h1>
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
    <CardDeck>
    <Card as="button">
        <Card.Img variant="top" src="" />
        <Card.Body>
        <Card.Title>Categories</Card.Title>
        <Card.Text>
            Add or delete a new category.
        </Card.Text>
        </Card.Body>
    </Card>
    <Card>
        <Card.Img variant="top" src="" />
        <Card.Body>
        <Card.Title>Records</Card.Title>
        <Card.Text>
            See a list of the records you made.
        </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
    </Card>
    <Card>
        <Card.Img variant="top" src="" />
        <Card.Body>
        <Card.Title>Trends</Card.Title>
        <Card.Text>
            See the changes to your balance over time.
        </Card.Text>
        </Card.Body>
    </Card>
    <Card>
        <Card.Img variant="top" src="" />
        <Card.Body>
        <Card.Title>Breakdown</Card.Title>
        <Card.Text>
            Check out a breakdown of your records represented in a donut chart.
        </Card.Text>
        </Card.Body>
    </Card>
    </CardDeck>
    </>
  )
}
