import { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import Router from 'next/router'

export default function AddRecord({categories}) {
    const {user} = useContext(UserContext)
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(false)

    // pre-load category name and type once category prop gets passed hook
    useEffect(()=> {
        (categories.length === 0)
        ? setCategoryName('')
        : setCategoryName(categories[0].categoryName)
    },[categories])

    // verify record amount hook
    useEffect(()=> {
        ((amount > 0 && isNaN(amount) === false) && (categoryType.length > 0 && categoryName.length > 0))
        ? setIsActive(true)
        : setIsActive(false)
    }, [amount, categoryName, categoryType])

    // auto-set category type after choosing category name hook
    useEffect(()=> {
        const autoType = categories.find(autoType => autoType.categoryName === categoryName)
        return (
            (autoType === undefined)
            ? setCategoryType('')
            : setCategoryType(autoType.categoryType)
        )
    },[categoryName])

    function addRecord(e) {
        e.preventDefault()
        fetch(`http://localhost:4000/api/users/${user.id}/transactions`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: categoryType,
                amount: amount,
                description: description
            })
        })
        .then(res => res.json())
        .then(data => {
            data
            ?   Swal.fire({
                text: 'Added record!',
                icon: 'success'
                })
                .then((result) => {
                    result.value
                    ? Router.reload()
                    : null
                })
            :   Swal.fire({
                text: 'Error!', icon: 'error'
                })
        })
    }

    return (
        <Form onSubmit={(e) => addRecord(e)} className="pb-2">
        <Form.Row className="pb-2">
                <Form.Label column className="pl-3 col-auto">Add Transaction:</Form.Label>
                <Col className="col-6">
                    <Form.Control type="text" placeholder="Description here" value={description} onChange={e => setDescription(e.target.value)} required >
                    </Form.Control>
                </Col>
                <Form.Label column className="pl-3 col-auto">Amount:</Form.Label>
                <Col>
                    <Form.Control type="text" value={amount} onChange={e => setAmount(e.target.value)} required >
                    </Form.Control>
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column className="pl-3 col-auto">Category:</Form.Label>
                <Col className="col-4">
                    <Form.Control as="select" value={categoryName} onChange={e => setCategoryName(e.target.value)} required>
                        {categories.map(category => {
                          return (
                              <option key={category._id}>{category.categoryName}</option>
                          )
                        })
                        }
                    </Form.Control>
                </Col>
                <Form.Label column className="pl-3 col-auto">Type:</Form.Label>
                <Col className="col-2">
                    <Form.Control type="text" placeholder={categoryType} readOnly />
                </Col>
                <Col>
                { isActive === true
                ? <Button type="submit" block variant="success">+</Button>
                : <Button type="submit" block variant="outline-success" disabled>+</Button>}
            </Col>
            </Form.Row>
        </Form>
    )
}