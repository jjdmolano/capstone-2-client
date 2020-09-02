import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Container, Form, Image, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [isActive, setIsActive] = useState(false)

    // verify password hook
    useEffect(() => {
        if((password1 !== '' && password2 !== '') && (password2 === password1)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [password1, password2])

    function registerUser(e) {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password1
            })
        })
        .then(res => res.json())
        .then(data => {
            (data === true)
            ?   Swal.fire({
                text: 'Registration success!',
                icon: 'success',
                timer: 800,
                timerProgressBar: true,
                showConfirmButton: false
                })
                .then((result) => {
                    result.dismiss === Swal.DismissReason.timer
                    ? Router.push('/login')
                    : Router.push('/login')
                })
            : Router.push('/error')
        })
    }

    return (
        <Container className="register-main">
            <div className="login-img">
                <Image src="/landing.svg" fluid/>
            </div>
            <Form onSubmit={(e) => registerUser(e)} class="register-form">
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password1} onChange={e => setPassword1(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control type="password" value={password2} onChange={e => setPassword2(e.target.value)} required></Form.Control>
                </Form.Group>
                {isActive === true
                ? <Button className="register-button-main" type="submit" block>Register</Button>
                : <Button id="register-button-main-disabled" type="submit" disabled block>Register</Button>}
            </Form>
        </Container>
    )
}