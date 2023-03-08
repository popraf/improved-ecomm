import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  Row,  Col,  Image,  ListGroup,  Button,  Card,  Form } from "react-bootstrap";
import { backendApiURL } from "../../http-common";
import ProductRating from "../products/ProductRating";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";


const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn

    const userProfile = useSelector(state => state.userProfile)
    const { error, loading, userProfileInfo } = userProfile

    useEffect(
        () => {
            if (!userLoginInfo) {
                navigate('/user/login')
            }
        }, [userLoginInfo]
    )

    return (
        <div>
            <Row>
                <Col>
                    <h1>Profile</h1>
                </Col>
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage