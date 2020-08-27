import { useState, useEffect, useContext } from 'react'
import { Form, Alert, Button, Col } from 'react-bootstrap'
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
        if(categoryName.length < 30 && categoryName.length > 0){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [categoryName])

    function addCategory(e) {

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
            data ? Router.reload : Swal.fire('You have already added this category','error')
        })
    }

    return (
        <Form onSubmit={(e) => addCategory(e)}  className="mb-3">
            <Form.Row>
                <Col className="col-8">
                    <Form.Control type="text" placeholder="Add Category" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
                </Col>
                <Col className="col-3">
                    <Form.Control as="select" placeholder="Category Type" value={categoryType} onChange={e => setCategoryType(e.target.value)} required >
                        <option>Expense</option>
                        <option>Income</option>
                    </Form.Control>
                </Col>
                <Col className="col-1">
                    { isActive === true
                    ? <Button type="submit" variant="success">Submit</Button>
                    : <Button type="submit" variant="outline-success" disabled>Submit</Button>}
                </Col>
            </Form.Row>
        </Form>
    )
}