import { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import Router from 'next/router'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function login() {
    const { setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // fetch request for user authentication
    function authenticate(e) {
        e.preventDefault()

        fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.accessToken) {
                localStorage.setItem('token', data.accessToken)
                fetch('http://localhost:4000/api/users/details', {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setUser({
                        id: data._id
                    })
                    Router.push('/')
                })
            } else {
                Router.push('/error')
            }
        })
    }

    return (
        <>
        <Form onSubmit={(e) => authenticate(e)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" >Submit</Button>
        </Form>
        </>
    )
}