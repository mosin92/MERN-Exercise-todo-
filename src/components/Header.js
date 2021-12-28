import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><Link to="/">Exercies Todo App</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav><Link to="/">Exercise</Link> </Nav>
                    <Nav ><Link to="/create">Create Exercise Log</Link></Nav>
                    <Nav ><Link to="/user"> Create User</Link></Nav>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
