import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../Message";
import { addToCart } from "../../actions/userCartActions";

function UserCartPage({match}) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [qty, setQty] = useSearchParams();
    const someQueryParam = qty.get("cart"); 

    useEffect(() =>{
            if(id){
                dispatch(addToCart(id, qty))
            }
        }, [dispatch, id, qty]
    )

    return (
        <div>
            <h1>User Cart Page</h1>

        </div>
    )
}

export default UserCartPage;