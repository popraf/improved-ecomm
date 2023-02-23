import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import listProducts from '../../actions/productActions';
import Product from '../products/Product';
import Message from '../Message';
import Loader from '../Loader';
import { products as productsz } from '../../products_demo_api';

function LandingPage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]
    )

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {productsz.map(
                    product => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <h3>{product.name}</h3>
                        </Col>
                    )
                )}
            </Row>
            {/* {
                loading ? <Loader />
                    :error ? <Message variant='danger'> {error} </Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            } */}

        </div>
    )
}

export default LandingPage;