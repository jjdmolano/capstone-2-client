import { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Jumbotron, Container } from 'react-bootstrap'
import AddCategory from '../../components/AddCategory'

export default function index() {
    const [ name, setName ] = useState('')
    const [ data, setData ] = useState([])

    // fetch user categories hook
    useEffect(() => {
        fetch('http://localhost:4000/api/users/details', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.firstName)
            setData(data.categories)
        })
    },[])

    return (
        <Container className="mx-5 px-5" >
            <AddCategory />
            {data.length === 0
            ?   <Jumbotron>
                    <p>We couldn't find any categories, {name}. Why not make one above?</p>
                </Jumbotron>
            :   <ListGroup>
                {data.map(category => {
                    return (
                        <ListGroup.Item action key={category._id}>
                        <Row>
                            <Col className="col-10">{category.categoryName}</Col>
                            <Col className="col-2">{category.categoryType}</Col>
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            }
        </Container>
    )
}