import { Card } from "react-bootstrap";
import ProductRating from "./ProductRating";
import { Link } from "react-router-dom";

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">

            <a Link to={'/product/${product._id}'}>
                <div>
                    <h5>we are in productjs</h5>
                    {product.rating} from {product.numReviews} reviews

                    <ProductRating />
                </div>
            </a>

        </Card>
    )
};

export default Product;