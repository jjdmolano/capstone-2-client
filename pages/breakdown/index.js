import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import DoughnutChart from '../../components/DoughnutChart';


export default function index() {
    const [ records, setRecords ] = useState([])

    // fetch user records hook
    useEffect(() => {
        fetch('http://localhost:4000/api/users/details', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setRecords(data.transactions)
        })
    },[])

    return (
        <Container>
            <DoughnutChart records={records} />
        </Container>
    )
}