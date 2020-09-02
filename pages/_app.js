import { useState, useEffect } from 'react'
import { UserProvider } from '../UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import '../styles/globals.css'
import AppHelper from '../app-helper'

export default function MyApp({ Component, pageProps }) {
  // Initial global user state is null
  const [user, setUser] = useState({id: null})

  // Clear local storage and set user state to null upon logout
  const unsetUser = () => {
    localStorage.clear()
    setUser ({id: null})
  }

  // Get user details from API upon user ID state change
  useEffect(() => {
    fetch(`${AppHelper.API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      (data._id) ? setUser({id:data._id}) : setUser({id: null})
    })
  }, [user.id])

  return(
    <UserProvider value={{user, setUser, unsetUser}}>
      <NavBar />
      <Container fluid className="main-container">
        <Component {...pageProps} />
      </Container>
    </UserProvider>
  )
}