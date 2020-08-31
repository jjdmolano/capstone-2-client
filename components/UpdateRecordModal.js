import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import UserContext from '../UserContext'
import { Button, Form, Modal, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function UpdateRecordButton({record, categories}) {
    const {user} = useContext(UserContext)
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [ show, setShow ] = useState(false)
    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)
    // pre-load category name and type once category prop gets passed hook
    useEffect(()=> {
        (categories.length === 0)
        ? setCategoryName('')
        : setCategoryName(record.categoryName)
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

    const updateRecord = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/api/users/${user.id}/tr/${record._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: categoryType,
                amount: amount,
                description: description
            })
        })
        .then((res => res.json()))
        .then((data) => {
            data
            ?   Swal.fire({
                text: 'Updated record!',
                icon: 'success'
                })
                .then((result) => {
                    result.value
                    ? Router.reload()
                    : null
                })
            :   Swal.fire({
                text: 'Update error!', icon: 'error'
                })
        })
    }

    return(
        <>
        <Button variant="secondary" block onClick={showModal}>Update</Button>
        <Modal show={show} onHide={closeModal} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e) => updateRecord(e)}>
            <Form.Row className="pb-2">
                <Form.Label column className="pl-3 col-auto">Update Transaction:</Form.Label>
                <Col className="col-6">
                    <Form.Control type="text" placeholder={record.description} value={description} onChange={e => setDescription(e.target.value)} required />
                </Col>
                <Form.Label column className="pl-3 col-auto">Amount:</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder={record.amount} value={amount} onChange={e => setAmount(e.target.value)} required />
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
            </Modal.Body>
        </Modal>
        </>
    )
}