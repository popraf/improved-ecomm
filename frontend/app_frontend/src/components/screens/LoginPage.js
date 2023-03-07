import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  Row,  Col,  Button,  Form } from "react-bootstrap";
import Message from "../Message";
import { userLoginAction } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import Loader from "../Loader";

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { error, loading, userLoginInfo } = userLogIn

    const onSubmitLoginHandler = (event) => {
        event.preventDefault()
        dispatch(userLoginAction(userEmail, userPassword))
        // console.log('Submitted login', userLogIn, 'logged as: ', userLoginInfo)
    };

    useEffect(
        () => {
            if (userLoginInfo) {
                navigate('/')
            }
        }, [userLoginInfo]
    )

    return (
        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={onSubmitLoginHandler}>
            
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></Form.Control>
                </Form.Group>

                {/* <Form.Group> */}
                <Button variant="primary" type="submit">Login</Button>
                {/* </Form.Group> */}
            </Form>

            <Row className="py-3">
                <Col> <Link to='/register'>Register new account</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage;