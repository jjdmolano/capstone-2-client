import { useState, useContext } from 'react'
import UserContext from '../UserContext'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Form, Jumbotron, Button } from 'react-bootstrap'
import AppHelper from '../app-helper'

export default function login() {
    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // fetch request for user authentication
    function authenticate(e) {
        e.preventDefault()

        fetch(`${AppHelper.API_URL}/users/login`, {
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
                fetch(`${AppHelper.API_URL}/users/details`, {
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

    // Google login
    const captureLoginResponse = (res) => {
        const payload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tokenId: res.tokenId})
        }

        fetch(`${AppHelper.API_URL}/users/verify-google-id-token`, payload)
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
        ?   <>
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
            <p>or</p>
            <GoogleLogin
            render={renderProps => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="outline-success">Login using Google Account</Button>
            )}
            clientId="668311413806-b1kj21kiv4doqb878flbm5pd2uo7r51m.apps.googleusercontent.com"
            onSuccess={captureLoginResponse}
            onFailure={captureLoginResponse}
            cookiePolicy={'single_host_origin'} />
            </>
        :   <Jumbotron>
                <h1>Error!</h1>
                <p>You are already logged in. Would you like to go <a href="/"><strong>Home</strong></a>?</p>
            </Jumbotron>
        }
        </>
    )
}