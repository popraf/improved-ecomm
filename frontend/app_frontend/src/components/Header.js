import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userLogoutAction } from '../actions/userActions';

function Header() {
  const userLogIn = useSelector(state => state.userLoginInfo)
  const { userLoginInfo } = userLogIn
  const dispatch = useDispatch()

  const userLogoutHandler = () => {
    dispatch(userLogoutAction());
  }

{/* <i className="fa-solid fa-user"/> */}
  
  const adminNavbar = (<span>
      <NavDropdown.Item as={Link} to="admin/orders" >Admin Panel - Orders</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="admin/users" >Admin Panel - Users</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="admin/products" >Admin Panel - Manage Inventory</NavDropdown.Item>
    <NavDropdown.Divider />
  </span>
    );

  const loggedInNavbar = (
      <NavDropdown title="User Menu" id="basic-nav-dropdown" >
        { userLoginInfo && userLoginInfo.isAdmin ? adminNavbar :''}
        <NavDropdown.Item as={Link} to="user/profile">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={userLogoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
  );
  const notLoggedInNavbar = (<Nav>
      <Nav.Link as={Link} to="user/login" >Login</Nav.Link>
      <Nav.Link as={Link} to="user/register" >Register</Nav.Link>
    </Nav>);

  return (
    <header>
        <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">ImprovedEcomm</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" ><i className="fa-solid fa-house"/> Home</Nav.Link>{/* edit icons from FontAwesomeIcon */}
                <Nav.Link as={Link} to="/cart" ><i className="fa-solid fa-cart-shopping"/> Cart</Nav.Link>
                {userLoginInfo ? loggedInNavbar : notLoggedInNavbar}
                {/* <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">First Category</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Second Category</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Third Category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
                </NavDropdown> */}
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header