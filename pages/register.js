import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Container, Form, Image, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import validator from 'validator'

export default function register() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [isActive, setIsActive] = useState(false)
	const [emailText, setEmailText] = useState(
		'Please input valid email address.'
	)
	const [passwordText, setPasswordText] = useState(
		'Password must be at least 8 characters and not contain your first name or last name.'
	)
	const [password2Text, setPassword2Text] = useState('')

	// check if password contains name and is at least 8 characters
	const passValid =
		!(validator.contains(password1, firstName, {
			ignoreCase: true
		}) ||
			validator.contains(password1, lastName, {
				ignoreCase: true
			})) &&
		(firstName.length && lastName.length) !== 0
	// check password length
	const passLengthShort = password1.length < 8
	// check password match
	const passMatch = password2 === password1 ? true : false
    // check if email is valid
    const emailValid = validator.isEmail(email)
	// check if all inputs are filled
	const hasInput =
		password1.length &&
		password2.length &&
		firstName.length &&
		lastName.length &&
		email.length !== 0
			? true
			: false

	// password validation hook
	useEffect(() => {
		if (!passValid) {
			setPasswordText('Password contains your first or last name.')
		} else if (passLengthShort) {
			setPasswordText(
				'Password must be at least 8 characters and not contain your first name or last name.'
			)
		} else if (passValid && !passLengthShort) {
			setPasswordText('Password is valid.')
		}
	}, [password1, password2, firstName, lastName])

    // email validation hook
    useEffect(() => {
        if (emailValid && email.length > 1) {
            setEmailText('Email address is valid.')
        } else {
            setEmailText('Please input valid email address.')
            setIsActive(false)
        }
    },[email])

	// verify password hook & update register button on input change
	useEffect(() => {
		if (hasInput && passValid && !passLengthShort && emailValid) {
			if (passMatch) {
				setPassword2Text('')
				setIsActive(true)
			} else {
				setPassword2Text('Passwords do not match.')
				setIsActive(false)
			}
		} else if (!hasInput) {
			setPassword2Text('')
			setIsActive(false)
		}
	}, [password1, password2, firstName, lastName, email])

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
				data === true
					? Swal.fire({
							text: 'Registration success!',
							icon: 'success',
							timer: 800,
							timerProgressBar: true,
							showConfirmButton: false
					  }).then(result => {
							result.dismiss === Swal.DismissReason.timer
								? Router.push('/')
								: Router.push('/')
					  })
					: Router.push('/error')
			})
	}

	return (
		<Container className='register-main'>
			<div className='login-img'>
				<Image src='/landing.svg' fluid />
			</div>
			<Form onSubmit={e => registerUser(e)} class='register-form'>
				<Form.Group>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type='text'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type='text'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					></Form.Control>
					<Form.Text className='text-muted'>{emailText}</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password1}
						onChange={e => setPassword1(e.target.value)}
						required
					></Form.Control>
					<Form.Text className='text-muted'>{passwordText}</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Verify Password</Form.Label>
					<Form.Control
						type='password'
						value={password2}
						onChange={e => setPassword2(e.target.value)}
						required
					></Form.Control>
					<Form.Text className='text-muted'>{password2Text}</Form.Text>
				</Form.Group>
				{isActive === true ? (
					<Button className='register-button-main' type='submit' block>
						Register
					</Button>
				) : (
					<Button
						id='register-button-main-disabled'
						type='submit'
						disabled
						block
					>
						Register
					</Button>
				)}
			</Form>
		</Container>
	)
}
