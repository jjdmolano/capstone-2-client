import { useState, useEffect } from 'react'
import LineChart from '../../components/LineChart'
import Head from 'next/head'

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
        <>
        <Head><title>Trends</title></Head>
        <LineChart records={records} />
        </>
    )
}