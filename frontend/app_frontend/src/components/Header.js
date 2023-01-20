import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

function Header() {
  return (
    <header>
        <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home"><i class="fa-solid fa-house"/>Home</Nav.Link>{/* edit icons from FontAwesomeIcon */}
                <Nav.Link href="#link"><i class="fa-solid fa-user"/>Login</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">test</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header