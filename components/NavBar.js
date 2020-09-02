import { useContext } from 'react'
import UserContext from '../UserContext'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'

export default function NavBar() {
    const { user } = useContext(UserContext)

    return(
    <Navbar expand="lg" collapseOnSelect>
        <Link href="/">
            <a className="navbar-brand">Budget Tracker</a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            {(user.id === null)
                ?   null
                :   <Nav className="ml-auto">
                    <Link href="/categories">
                        <a className="nav-link" role="button">Categories</a>
                    </Link>
                    <Link href="/records">
                        <a className="nav-link" role="button">Records</a>
                    </Link>
                    <Link href="/trends">
                        <a className="nav-link" role="button">Trends</a>
                    </Link>
                    <Link href="/breakdown">
                        <a className="nav-link" role="button">Breakdown</a>
                    </Link>
                    <Link href="/logout">
                        <a className="nav-link" id="logout" role="button">Logout</a>
                    </Link>
                    </Nav>
            }
        </Navbar.Collapse>
    </Navbar>
    )
}