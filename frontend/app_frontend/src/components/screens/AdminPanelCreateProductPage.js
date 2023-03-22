import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { Button, Table, Form, Row, Col } from 'react-bootstrap'
import CheckoutProgress from '../CheckoutProgressBar'
import { createOrderAction } from '../../actions/orderActions'
import { listUsers } from '../../actions/userActions'
import FormContainer from '../FormContainer'
import { createProduct } from '../../actions/productActions'


const AdminPanelCreateProductPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productName, setProductName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [countInStock, setCountInStock] = useState(1)

    const [image_url, setImage_url] = useState(null)

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    useEffect(() => {
        if (!userLoginInfo || !userLoginInfo.isAdmin) {
            navigate('/user/login')
        }

    }, [userLoginInfo])

    const productSubmitHandler = (event) => {
        event.preventDefault()
        dispatch(createProduct({
            name: productName, 
            brand: brand, 
            category: category, 
            description: description, 
            price: price, 
            countInStock: countInStock, 
            image: image_url}))
        navigate('/admin/products')
    }

    return (
        <FormContainer>
            <h1>Add Product</h1>

            {/* {message && <Message variant='danger'>{message}</Message>} */}
            {/* {error && <Message variant='danger'>{error}</Message>} */}
            {/* {loading && <Loader/>} */}
            <Form onSubmit={productSubmitHandler}>
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
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control type="number" required placeholder="Count in stock" value={countInStock} onChange={(event) => setCountInStock(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" accept="image/jpeg,image/png,image/gif" onChange={(event) => setImage_url(event.target.files[0])}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">Add product</Button>
            </Form>

        </FormContainer>

        )
}

export default AdminPanelCreateProductPage