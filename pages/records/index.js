import { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import { Card, ListGroup } from 'react-bootstrap'

export default function index() {
    const [data, setData] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:4000/api/users/details', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setData(data.transactions)
        })
    },[])

    return (
        <>
        <Card>
            <h1>{data.firstName}</h1>
        </Card>
        <ListGroup>
            {data.map(category => {
                return (
                    <ListGroup.Item key={category._id}>{category.categoryName}</ListGroup.Item>
                )
            })}
        </ListGroup>
        </>
    )
}