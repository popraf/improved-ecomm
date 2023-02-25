import { Card } from "react-bootstrap";
import ProductRating from "./ProductRating";
import { Link } from "react-router-dom";

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                        < ProductRating value={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                </Card.Text>

                <Card.Text as="h3" className="text-black">
                    ${product.price}
                </Card.Text>

{/* 
                <a Link to={'/product/${product._id}'}>
                    <div>
                        <h5>we are in productjs</h5>
                        {product.rating} from {product.numReviews} reviews

                        <ProductRating />
                    </div>
                </a> */}

            </Card.Body>


        </Card>
    )
};

export default Product;