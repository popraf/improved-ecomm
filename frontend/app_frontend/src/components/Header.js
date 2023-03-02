import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
        <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">ImprovedEcomm</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" ><i className="fa-solid fa-house"/>Home</Nav.Link>{/* edit icons from FontAwesomeIcon */}
                <Nav.Link as={Link} to="/login" ><i className="fa-solid fa-user"/>Login</Nav.Link>
                <Nav.Link as={Link} to="/cart" ><i className="fa-solid fa-cart-shopping"/>Cart</Nav.Link>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">First Category</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Second Category</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Third Category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header