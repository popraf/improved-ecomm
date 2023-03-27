import { useState, useEffect } from "react";
import CheckoutProgress from "../CheckoutProgressBar";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentAction } from "../../actions/paymentActions";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    useEffect(() => {
        if (!userLoginInfo) {
            navigate('/user/login')
        }

    }, [userLoginInfo])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savePaymentAction(paymentMethod))
        navigate('/place-order');
    }

    return (
        <div>
            <CheckoutProgress step1 step2 step3/>

            <FormContainer>
                <h1>Payment</h1>

                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Select payment method</Form.Label>
                            <Form.Check 
                                    type='radio' label='PayPal' id='paypal' name='paymentMethod' onChange={(e) => (setPaymentMethod('PayPal'))}>
                            </Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>

            </FormContainer>


        </div>
    )
}

export default PaymentPage;