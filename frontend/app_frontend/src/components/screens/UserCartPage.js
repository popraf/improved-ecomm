import { useEffect } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../Message";
import { removeFromUserCart, addToCart } from "../../actions/userCartActions";
import { backendApiURL } from "../../http-common";

function UserCartPage({match}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [qty] = useSearchParams();
    const getQty = qty.get("qty"); 

    const cart = useSelector(state => state.userCartItems)
    const { userCartItems } = cart // destructure object to array
    // console.log('cartItems: ', userCartItems)
    
    const checkoutHandler = () => {
        navigate('/shipping')
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromUserCart(id))
    }

    useEffect(() =>{
            if(id){
                dispatch(addToCart(id, getQty))
            }
        }, [dispatch, id, getQty]
    )

    return (
        <div>
            <h1>Shopping cart</h1>
            <Row>
                <Col>
                    {userCartItems.length === 0 ? 
                    (<Message variant="info">Your shopping cart is empty. <Link to="/">Go back</Link> to product listing.</Message>)
                    :(<ListGroup variant='flush'>
                        {userCartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row >
                                    <Col md={2}>
                                        <Image fluid rounded src={`${backendApiURL}${item.image}`} alt={item.name} />
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Select 
                                            as="select"
                                            value={item.qty}
                                            onChange={(event) => dispatch(addToCart(item.product, event.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2 className='d-flex justify-content-center'>Subtotal {userCartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)} items</h2>
                                <span className='d-flex justify-content-center'>${userCartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                            </ListGroup.Item>

                            <ListGroup.Item className='btn-block d-flex justify-content-center'>
                                <Button disabled={userCartItems.length === 0} onClick={checkoutHandler}>
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>

                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default UserCartPage;