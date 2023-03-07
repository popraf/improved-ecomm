import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  Row,  Col,  Image,  ListGroup,  Button,  Card,  Form } from "react-bootstrap";
import Message from "../Message";
import { userRegisterAction } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import Loader from "../Loader";

const RegisterPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerSubmitHandler = (event) => {
        event.preventDefault()

        if (userPassword != confirmPassword) {
            setMessage('Passwords are not matching')
        } else {
            dispatch(userRegisterAction(userName, userEmail, userPassword))
        }
    }
    const userLogIn = useSelector(state => state.userLoginInfo)
    const { error, loading, userLoginInfo } = userLogIn

    useEffect(
        () => {
            if (userLoginInfo) {
                navigate('/')
            }
        }, [userLoginInfo]
    )

    return (
        <FormContainer>
            <h1>Register</h1>

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={registerSubmitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required placeholder="Enter name" value={userName} onChange={(event) => setUserName(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required placeholder="Enter email address" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">Register</Button>

                <Row className="py-3">
                    <Col> <Link to='/login'>Already registered? Login</Link></Col>
                </Row>
            </Form>

        </FormContainer>
    )
}

export default RegisterPage