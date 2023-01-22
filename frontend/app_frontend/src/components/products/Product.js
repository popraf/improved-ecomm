import { Card } from "react-bootstrap";


function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">

            <a href={'/product/${product._id}'}>
                <div>
                    {product.rating} from {product.numReviews} reviews
                </div>
            </a>

        </Card>
    )
};

export default Product;