import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {  Row,  Col,  Image,  ListGroup,  Button,  Card,  ListGroupItem } from "react-bootstrap";
import { backendApiURL } from "../../http-common";
import ProductRating from "../products/ProductRating";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";

const ProductPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, []);

    return (
        <div>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
            <div>
            <Row>
                <Col md={6}>
                <Image src={`${backendApiURL}${product.image}`} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <ProductRating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={"#f8e825"}
                    />
                    </ListGroup.Item>

                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                    <ListGroup.Item>
                    Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
                </Col>

                <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                <h4>Reviews</h4>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <h4>Write a review</h4>
                    </ListGroup.Item>
                </ListGroup>
                </Col>
            </Row>
            </div>
        )}
        </div>
    );
    };

export default ProductPage;
