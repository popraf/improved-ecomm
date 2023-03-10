import { useState } from "react";
import {  Row,  Col,  Button,  Table,  Form } from "react-bootstrap";
import FormContainer from "../FormContainer";

const ShippingPage = () => {
    const [shipAddress, setShippingAddress] = useState('');
    const [shipPostCode, setShipPostCode] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipCountry, setShipCountry] = useState('');

    const submitHandler = (event) => {
        event.preventDefault()
        console.log('submitted')
    }

    return (
            <FormContainer >
                <Form onSubmit={submitHandler}>
                <h1>Order shipping</h1>

                <Form.Group className="mb-3" controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={shipCountry}
                        onChange={(e) => setShipCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={shipCity}
                        onChange={(e) => setShipCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='post-code'>
                    <Form.Label>Post Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter post code'
                        value={shipPostCode}
                        onChange={(e) => setShipPostCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={shipAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </FormContainer>
        )

}

export default ShippingPage