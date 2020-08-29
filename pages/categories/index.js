import { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Jumbotron, Container } from 'react-bootstrap'
import AddCategory from '../../components/AddCategory'
import DeleteCategoryButton from '../../components/DeleteCategoryButton'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])

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
            setCategories(data.categories)
        })
    },[])

    return (
        <Container className="mx-5 px-5" >
            <AddCategory />
            {categories.length === 0
            ?   <Jumbotron>
                    <p>We couldn't find any categories, {name}. Why not make one above?</p>
                </Jumbotron>
            :   <ListGroup>
                {categories.map(category => {
                    return (
                        <ListGroup.Item key={category._id}>
                        <Row>
                            <Col className="col-10">{category.categoryName}</Col>
                            <Col className="col-2">{category.categoryType}</Col>
                            <DeleteCategoryButton categoryId={category._id} />
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            }
        </Container>
    )
}