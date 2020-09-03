import { useState, useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import AddCategory from '../../components/AddCategory'
import CategoryList from '../../components/CategoryList'
import Head from 'next/head'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])

    // fetch user categories hook
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.firstName)
            setCategories(data.categories)
        })
    },[])

    return (
        <>
        <Head><title>Categories</title></Head>
        <AddCategory setCategories={setCategories} />
        {categories.length === 0
        ?   <Container className="error-container" fluid>
                <Image className="error-img" src="/errorempty.svg" fluid></Image>
            </Container>
        :   <CategoryList categories={categories} setCategories={setCategories} />
        }
        </>
    )
}