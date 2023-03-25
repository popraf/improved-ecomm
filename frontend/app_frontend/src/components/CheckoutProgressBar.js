import { Nav } from "react-bootstrap"

function CheckoutProgress({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-md-center">
            <Nav.Item>
                {step1 ? (
                        <Nav.Link >Login</Nav.Link>
                ) : (
                        <Nav.Link disabled>Login</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                        <Nav.Link>Shipping</Nav.Link>
                ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                        <Nav.Link>Payment</Nav.Link>
                ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                        <Nav.Link>Place Order</Nav.Link>
                ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutProgress