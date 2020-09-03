import { useState, useEffect, useContext } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import styles from './AddCategory.module.css'

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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/categories`,
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
            ?   fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
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
        <Form onSubmit={(e) => addCategory(e)} className={styles.form}>
            <Form.Row>
                <Form.Label className={styles.formItems} column>Add Category:</Form.Label>
                <Col className={styles.formItems}>
                    <Form.Control className={styles.formInput} type="text" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
                </Col>
                <Form.Label  className={styles.formItems} column>Select Type:</Form.Label>
                <Col className={styles.formItems}>
                    <Form.Control as="select" value={categoryType} onChange={e => setCategoryType(e.target.value)} required >
                        <option>Expense</option>
                        <option>Income</option>
                    </Form.Control>
                </Col>
                <Col className={styles.buttonContainer}>
                    { isActive === true
                    ? <Button className={styles.button} type="submit" variant="success" block><h1>+</h1></Button>
                    : <Button className={styles.button}type="submit" variant="outline-success" block disabled><h1>+</h1></Button>}
                </Col>
            </Form.Row>
        </Form>
    )
}