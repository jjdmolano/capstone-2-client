import { useState, useEffect, useContext } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import Router from 'next/router'

export default function AddCategory({setCategories}) {
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
            ?   fetch('http://localhost:4000/api/users/details', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                })
                .then(res => res.json())
                .then(data => {
                    setCategories(data.categories)
                    setCategoryName('')
                    Swal.fire({
                    text: 'Added category!',
                    icon: 'success',
                    timer: 800,
                    timerProgressBar: true,
                    showConfirmButton: false
                    })
                    .then((result) => {
                        result.dismiss === Swal.DismissReason.timer
                        ? null
                        : null
                    })
                })
            :   Swal.fire({
                text: 'You have already added this category', icon: 'error',
                timer: 800,
                timerProgressBar: true,
                showConfirmButton: false
                })
                .then((result) => {
                    result.dismiss === Swal.DismissReason.timer
                    ? null
                    : null
                })
        })
    }

    return (
        <Form onSubmit={(e) => addCategory(e)} className="pb-2">
            <Form.Row>
                <Form.Label column className="pl-3 col-auto">Add Category:</Form.Label>
                <Col className="col-4">
                    <Form.Control type="text" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
                </Col>
                <Form.Label column className="pl-3 col-auto">Select Type:</Form.Label>
                <Col className="col-3">
                    <Form.Control as="select" placeholder="Category Type" value={categoryType} onChange={e => setCategoryType(e.target.value)} required >
                        <option>Expense</option>
                        <option>Income</option>
                    </Form.Control>
                </Col>
                <Col className="pl-4">
                    { isActive === true
                    ? <Button type="submit" block variant="success">+</Button>
                    : <Button type="submit" block variant="outline-success" disabled>+</Button>}
                </Col>
            </Form.Row>
        </Form>
    )
}