import { Card } from "react-bootstrap";
import ProductRating from "./ProductRating";
import { Link } from "react-router-dom";
import { backendApiURL } from "../../http-common";

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={`${backendApiURL}${product.image}`}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                        < ProductRating value={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                </Card.Text>

                <Card.Text as="h3" className="text-black">
                    ${product.price}
                </Card.Text>
            </Card.Body>

        </Card>
    )
};

export default Product;