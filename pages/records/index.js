import { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Jumbotron, Container } from 'react-bootstrap'
import AddRecord from '../../components/AddRecord'
import DeleteRecordButton from '../../components/DeleteRecordButton'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])
    const [ records, setRecords ] = useState([])

    // TODO: separated all amounts into another array and added them all
    // const amountSum = records
    //     .map(record => record.amount)
    //     .reduce((total, amount) => total + amount, 0)
    // console.log(amountSum)

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

    // Get sum of all income
    const incomeSum = records
        .filter(record => record.categoryType === 'Income')
        .map(record => record.amount)
        .reduce((total, amount) => total + amount, 0)
    // console.log(incomeSum)

    // Get sum of all expenses
    const expenseSum = records
        .filter(record => record.categoryType === 'Expense')
        .map(record => record.amount)
        .reduce((total, amount) => total + amount, 0)
    // console.log(expenseSum)

    // Get current total amount for all accounts
    const totalAmount = incomeSum - expenseSum
    // console.log(totalAmount)

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
            <AddRecord categories={categories} />
            {records.length === 0
            ?   <Jumbotron>
                    <p>We couldn't find any records, {name}. Why not make one above?</p>
                </Jumbotron>
            :   <ListGroup>
                {records.map(record => {
                    return (
                        <ListGroup.Item key={record._id}>
                        <Row>
                            <Col className="col-2">{record.categoryName}</Col>
                            <Col className="col-2">{record.amount}</Col>
                            <Col className="col-2">{record.categoryType}</Col>
                            {record.description.length > 0
                            ? <Col className="col-2">{record.description}</Col>
                            : null
                            }
                            <Col className="col-2">{record.balanceAfterTransaction}</Col>
                            <Col className="col-2">{record.dateAdded}</Col>
                            <DeleteRecordButton recordId={record._id} />
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            }
        </Container>
    )
}