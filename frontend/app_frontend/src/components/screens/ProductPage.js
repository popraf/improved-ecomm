import axios from 'axios';
import { useEffect } from 'react';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap';


const ProductPage = ({ match }) => {
    const [product, setProduct] = useState({});
    let history = useHistory(); 
  
    const handleDelete = async (e) => {
      await axios.delete(`/products/${match.params.id}`)
      history.push('/')
    };  
  
    const handleUpdate = async () => {
      history.push(`/updateProduct/${product.id}`)
    }; 
    
    useEffect(() => {
      const fetchProduct = async() => {
        const { data } = await axios.get(`/products/${match.params.id}`);
        setProduct(data);
      };
      fetchProduct();
      }, []);
  
  
    return (
      <Row>
        <div className="container single-product">
          <div className="row">
            <div className="col-md-6">
              <div className="single-image">
                <img src={product.image_url} alt={product.name} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                </div>
                <p>{product.description}</p>
                <div className="product-count col-lg-7 ">
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Price</h6>
                    <span>${product.price}</span>
                    <div className="logo-image">
                      <img className="logo" src={product.logo} alt={product.name} />
                    </div>
                  </div>
                </div>
                <div className="col-12 justify-content-center">
                  <button type="button" onClick={handleUpdate}>Update</button>
                  <button type="button" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  };
  
  export default ProductPage;