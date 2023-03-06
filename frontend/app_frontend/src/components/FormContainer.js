import { Container, Col, Row } from "react-bootstrap";

function FormContainer({children}) {

    return (
        <Container>

            <Row className="justify-content-md-center">
                <Col xs={15} md={8}>
                    {children}
                </Col>
            </Row>

        </Container>
    )
}

export default FormContainer