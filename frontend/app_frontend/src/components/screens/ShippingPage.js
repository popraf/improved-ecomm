import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { shippingAddressSaveAction } from "../../actions/shippingActions";
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgress from "../CheckoutProgressBar";
import { useNavigate } from "react-router-dom";


const ShippingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shipCountry, setShipCountry] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipPostCode, setShipPostCode] = useState('');
    const [shipAddress, setShippingAddress] = useState('');

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    useEffect(() => {
        if (!userLoginInfo) {
            navigate('/user/login')
        }

    }, [userLoginInfo])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(shippingAddressSaveAction({shipCountry, shipCity, shipPostCode, shipAddress}))
        navigate('/payment-method')
    }

    return (
        <span >
            <CheckoutProgress step1 step2/>
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

                <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
        </span>
        )

}

export default ShippingPage