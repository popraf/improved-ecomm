import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from '../products/Product';
import Message from '../Message';
import Loader from '../Loader';
import { useSearchParams } from 'react-router-dom';

function LandingPage() {
    const dispatch = useDispatch()
    const [ keyword ] = useSearchParams()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword]
    )

    return (
        <div>
            <h1>Latest Products</h1>

            {
                loading ? <Loader />
                    :error ? <Message variant='danger'> {error} </Message>
                    :<Row>
                        {products && products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            }

        </div>
    )
}

export default LandingPage;