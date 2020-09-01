import { useState, useEffect } from 'react'
import DoughnutChart from '../../components/DoughnutChart';
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
        <Head><title>Breakdown</title></Head>
        <DoughnutChart records={records} />
        </>
    )
}