import { Card } from "react-bootstrap";


function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">

            <a href={'/product/${product._id}'}>
                <div>
                    <h5>we are in productjs</h5>
                    {product.rating} from {product.numReviews} reviews
                </div>
            </a>

        </Card>
    )
};

export default Product;