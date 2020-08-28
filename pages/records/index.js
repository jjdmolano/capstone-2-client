import { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Jumbotron, Container } from 'react-bootstrap'
import AddRecord from '../../components/AddRecord'

export default function index() {
    const [ name, setName ] = useState('')
    const [ category, setCategory ] = useState([])
    const [ record, setRecord ] = useState([])

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
            setRecord(data.transactions)
            setCategory(data.categories)
        })
    },[])

    return (
        <Container className="mx-5 px-5" >
            <AddRecord category={category} />
            {record.length === 0
            ?   <Jumbotron>
                    <p>We couldn't find any records, {name}. Why not make one above?</p>
                </Jumbotron>
            :   <ListGroup>
                {record.map(record => {
                    return (
                        <ListGroup.Item action key={record._id}>
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
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            }
        </Container>
    )
}