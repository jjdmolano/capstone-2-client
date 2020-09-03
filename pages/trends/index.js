import { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext'
import { Container, Image } from 'react-bootstrap'
import LineChart from '../../components/LineChart'
import Head from 'next/head'

export default function index() {
    const { user } = useContext(UserContext)
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
        <Head><title>Trends</title></Head>
        {
        (user.id === null)
        ?   <Container className="error-container" fluid>
                <Image className="error-img" src="/error.svg" fluid></Image>
            </Container>
        :   <LineChart records={records} />
        }
        </>
    )
}