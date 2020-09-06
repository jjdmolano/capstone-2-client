import { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext'
import { Container, Image } from 'react-bootstrap'
import AddCategory from '../../components/AddCategory'
import CategoryList from '../../components/CategoryList'
import Head from 'next/head'

export default function index() {
    const { user } = useContext(UserContext)
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
        {
        (user.id === null)
        ?   <Container className="error-container" fluid>
            <a href="/">
                <Image className="error-img" src="/errorlog.svg" fluid />
            </a>
            </Container>
        :   <>
            <AddCategory setCategories={setCategories} />
            {categories.length === 0
            ?   <Container className="error-container" fluid>
                    <Image className="error-img" src="/errorempty.svg" fluid></Image>
                </Container>
            :   <CategoryList categories={categories} setCategories={setCategories} />
            }
            </>
        }
        </>
    )
}