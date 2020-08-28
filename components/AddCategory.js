import { useState, useEffect, useContext } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import Router from 'next/router'

export default function AddCategory() {
    const {user} = useContext(UserContext)
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('Expense')
    const [isActive, setIsActive] = useState(false)

    // verify category name hook
    useEffect(()=> {
        (categoryName.length < 30 && categoryName.length > 0)
        ? setIsActive(true)
        : setIsActive(false)
    }, [categoryName])

    function addCategory(e) {
        e.preventDefault()
        fetch(`http://localhost:4000/api/users/${user.id}/categories`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: categoryType
            })
        })
        .then(res => res.json())
        .then(data => {
            data
            ?   Swal.fire({
                text: 'Added category!',
                icon: 'success'
                })
                .then((result) => {
                    result.value
                    ? Router.reload()
                    : null
                })
            :   Swal.fire({
                text: 'You have already added this category', icon: 'error'
                })
        })
    }

    return (
        <Form onSubmit={(e) => addCategory(e)} className="pb-2">
            <Form.Row>
                <Form.Label column className="pl-3" md="auto">Add Category:</Form.Label>
                <Col className="col-5">
                    <Form.Control type="text" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
                </Col>
                <Form.Label column className="pl-3" md="auto">Select Type:</Form.Label>
                <Col className="col-3">
                    <Form.Control as="select" placeholder="Category Type" value={categoryType} onChange={e => setCategoryType(e.target.value)} required >
                        <option>Expense</option>
                        <option>Income</option>
                    </Form.Control>
                </Col>
                <Col className="col-1 pl-4" md="auto">
                    { isActive === true
                    ? <Button type="submit" variant="success">Submit</Button>
                    : <Button type="submit" variant="outline-success" disabled>Submit</Button>}
                </Col>
            </Form.Row>
        </Form>
    )
}