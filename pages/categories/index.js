import { useState, useEffect } from 'react'
import { Jumbotron } from 'react-bootstrap'
import AddCategory from '../../components/AddCategory'
import CategoryList from '../../components/CategoryList'
import Head from 'next/head'

export default function index() {
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])

    // fetch user categories hook
    useEffect(() => {
        fetch('http://localhost:4000/api/users/details', {
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
        ?   <Jumbotron>
                <p>We couldn't find any categories, {name}. Why not make one above?</p>
            </Jumbotron>
        :   <CategoryList categories={categories} setCategories={setCategories} />
        }
        </>
    )
}