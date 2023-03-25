import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { Button, Col, Image, Form } from 'react-bootstrap'
import { listProductDetails } from '../../actions/productActions'
import { updateProduct } from '../../actions/productActions'
import FormContainer from '../FormContainer'
import { backendApiURL } from '../../http-common'

const AdminPanelProductsEditPage = ({match}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const [productName, setProductName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [countInStock, setCountInStock] = useState(1)
    const [removeImage, setRemoveImage] = useState(false)

    const [image_url, setImage_url] = useState(null)

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, []);

    useEffect(() => {
        setProductName(product.name)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setCountInStock(product.countInStock)
        setImage_url(product.image)
    }, [product]);

    useEffect(() => {
        if (!userLoginInfo || !userLoginInfo.isAdmin) {
            navigate('/user/login')
        }

    }, [userLoginInfo])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name: productName, 
            brand: brand, 
            category: category, 
            description: description, 
            price: price, 
            countInStock: countInStock, 
            image: image_url,
            removeImageFlag: removeImage
        }))
        navigate('/admin/products')
    }
    return (
        <div>

            <FormContainer>
                <h1>Edit Product</h1>

                        <Form onSubmit={submitHandler}>

                        <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="text" required placeholder="Enter name" maxLength="200" value={productName} onChange={(event) => setProductName(event.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" required placeholder="Brand" maxLength="200" value={brand} onChange={(event) => setBrand(event.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" required placeholder="Category" maxLength="200" value={category} onChange={(event) => setCategory(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <textarea 
                    className="form-control" 
                    id="description" 
                    placeholder="Description" 
                    rows="3" 
                    maxLength="1500"
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Unit price</Form.Label>
                    <Form.Control type="number" min="1" step="0.01" required placeholder="Unit price" value={price} onChange={(event) => setPrice(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" required placeholder="Stock" value={countInStock} onChange={(event) => setCountInStock(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Current Image</Form.Label>
                    <Col>
                        <Image src={`${backendApiURL}${product.image}`} alt={product.name} fluid rounded />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Remove current image?</Form.Label>
                    <Col>
                        <Form.Check label="Check box to remove current image" checked={removeImage} onChange={() => {setRemoveImage(!removeImage)}}/>
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>New Image</Form.Label>
                    <Form.Control type="file" accept="image/jpeg,image/png,image/gif" onChange={(event) => setImage_url(event.target.files[0])}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
                </Form>

            </FormContainer >
        </div>    )
}

export default AdminPanelProductsEditPage
