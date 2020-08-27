import { useContext } from 'react'
import UserContext from '../UserContext'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'

export default function NavBar() {

    const { user } = useContext(UserContext)

    return(
    <Navbar bg="dark" expand="lg" variant="dark">
        <Link href="/">
            <a className="navbar-brand">Budget Tracker</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link href="#home">
                    <a className="nav-link" role="button">Categories</a>
                </Link>
                <Link href="#features">
                    <a className="nav-link" role="button">Records</a>
                </Link>
                <Link href="#pricing">
                    <a className="nav-link" role="button">Trends</a>
                </Link>
                <Link href="#pricing">
                    <a className="nav-link" role="button">Breakdown</a>
                </Link>
            </Nav>
            <Nav>
            {(user.id === null)
            ? <>
                <Link href="#pricing">
                    <a className="nav-link" role="button">Login</a>
                </Link>
                <Link href="#">
                    <a className="nav-link" role="button">Register</a>
                </Link>
            </>
            : <Link href="#pricing">
                    <a className="nav-link" role="button">Logout</a>
            </Link>
            }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}