import { useState, useEffect, useContext } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import styles from './AddRecord.module.css'

export default function AddRecord({categories, setRecords}) {
    const {user} = useContext(UserContext)
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [amount, setAmount] = useState('')
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
        ((amount.length > 0 && isNaN(amount) === false) && (categoryType.length > 0 && categoryName.length > 0))
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

    // auto-set category ID after choosing category name hook
    useEffect(()=> {
        const autoId = categories.find(autoId => autoId.categoryName === categoryName)
        return (
            (autoId === undefined)
            ? setCategoryId('')
            : setCategoryId(autoId._id)
        )
    },[categoryName])


    function addRecord(e) {
        e.preventDefault()

        // set record amount to negative if category is expense
        const newAmount = (categoryType === 'Expense')
            ? -amount
            : amount

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/transactions`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                categoryId: categoryId,
                categoryName: categoryName,
                categoryType: categoryType,
                amount: newAmount,
                description: description
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
                    setRecords(data.transactions)
                    setDescription('')
                    setAmount('')
                    Swal.fire({
                    text: 'Added record!',
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
                text: 'Error!',
                icon: 'error',
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
        <Form onSubmit={(e) => addRecord(e)}  className={styles.form}>
            <Form.Row>
                <Col>
                    <Form.Row className={styles.formContainer}>
                    <Form.Label className={styles.formItems}  column>Add Transaction:</Form.Label>
                        <Col>
                            <Form.Control className={styles.formInput} type="text" placeholder="Description here" value={description} onChange={e => setDescription(e.target.value)} required />
                        </Col>
                    <Form.Label className={styles.formItems}  column>Category:</Form.Label>
                        <Col>
                            <Form.Control className={styles.formInput} as="select" value={categoryName} onChange={e => setCategoryName(e.target.value)} required>
                                {categories.map(category => {
                                return (
                                    <option key={category._id}>{category.categoryName}</option>
                                )
                                })
                                }
                            </Form.Control>
                        </Col>
                    <Form.Label className={styles.formItems}  column>Amount:</Form.Label>
                        <Col>
                            <Form.Control className={styles.formInput} type="text" value={amount} onChange={e => setAmount(e.target.value)} required />
                        </Col>
                    <Form.Label className={styles.formItems}  column>Type:</Form.Label>
                        <Col>
                        <Form.Control className={styles.formInputRead} type="text" placeholder={categoryType} readOnly />
                        </Col>
                    </Form.Row>
                </Col>
                <Col className={styles.buttonContainer}>
                { isActive === true
                ? <Button type="submit" className={styles.button} block variant="success"><h1>+</h1></Button>
                : <Button type="submit" className={styles.button} block variant="outline-success" disabled><h1>+</h1></Button>}
                </Col>
            </Form.Row>
        </Form>
    )
}