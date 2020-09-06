import { useState, useContext } from 'react'
import UserContext from '../UserContext'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Container, Form, Image, Button } from 'react-bootstrap'

export default function login() {
    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // fetch request for user authentication
    function authenticate(e) {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
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
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setUser({
                        id: data._id
                    })
                    Router.push('/home')
                })
            } else {
                Router.push('/error')
            }
        })
    }

    // Google login
    const captureLoginResponse = (res) => {
        const payload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tokenId: res.tokenId})
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify-google-id-token`, payload)
        .then((res) => res.json())
        .then(data => {
            if (typeof data.accessToken !== 'undefined') {
                localStorage.setItem('token', data.accessToken)
                setUser({
                    id: data._id
                })
                Router.push('/')
            }else{
                if (data.error == 'google-auth-error') {
                    Swal.fire('Google Auth Error', 'Google authentication procedure failed.', error)
                }
            }
        })
    }

    return (
        <>
        {
        (user.id === null)
        ?   <Container className="login-landing">
                <div className="login-img">
                    <Image src="/landing.svg" fluid/>
                </div>
                <Form onSubmit={(e) => authenticate(e)} className="login-form">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <div className="buttons">
                        <Button type="submit" className="login-button">Sign in</Button>
                        <GoogleLogin className="google-login"
                        clientId="668311413806-037mvt89p941msquk95tk75mj27mb699.apps.googleusercontent.com"
                        onSuccess={captureLoginResponse}
                        onFailure={captureLoginResponse}
                        cookiePolicy={'single_host_origin'} />
                        <p>
                            <small>Don't have an account?</small>
                        </p>
                        <Button href="/register" className="register-button">Register</Button>
                    </div>
                </Form>
            </Container>
        :   <Container className="error-container" fluid>
                <a href="/home">
                    <Image className="error-img" src="/errorlogin.svg" fluid></Image>
                </a>
            </Container>
        }
        </>
    )
}