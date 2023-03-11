import CheckoutProgress from "../CheckoutProgressBar";
import FormContainer from "../FormContainer";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePaymentAction } from "../../actions/paymentActions";

const PaymentPage = () => {
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savePaymentAction(paymentMethod))
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