import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { Button, Table } from 'react-bootstrap'
import CheckoutProgress from '../CheckoutProgressBar'
import { createOrderAction } from '../../actions/orderActions'
import { listUsers } from '../../actions/userActions'


const AdminPanelCreateProductPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    useEffect(() => {
        if (userLoginInfo && userLoginInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/user/login')
        }

    }, [dispatch, userLoginInfo])

    return (
        <div>
            <h1>Add Product</h1>
        </div>
                )
}

export default AdminPanelCreateProductPage