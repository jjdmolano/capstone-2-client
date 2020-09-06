import { useState, useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import DoughnutChart from '../../components/DoughnutChart';
import Head from 'next/head'

export default function index() {
    const [ records, setRecords ] = useState([])

    // fetch user records hook
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
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
        <>
        <Head><title>Breakdown</title></Head>
        {
        (records.length < 1)
        ?   <Container className="error-container" fluid>
                <Image className="error-img" src="/error.svg" fluid></Image>
            </Container>
        :   <DoughnutChart records={records} />
        }
        </>
    )
}