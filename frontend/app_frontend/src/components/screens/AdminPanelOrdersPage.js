import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import { Button, Table } from 'react-bootstrap'
import { listOrders } from '../../actions/orderActions'
import Loader from '../Loader'

const AdminPanelOrdersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    useEffect(() => {
        if (userLoginInfo && userLoginInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/user/login')
        }

    }, [dispatch, userLoginInfo])

    return (
    <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>DETAILS</th>
                                    <th>MARK AS DELIVERED</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                <Button variant='dark' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                <Button variant='dark' className='btn-sm'>
                                                    Delivered
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
            )
}

export default AdminPanelOrdersPage