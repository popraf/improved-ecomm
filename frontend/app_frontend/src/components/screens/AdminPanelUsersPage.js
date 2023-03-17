import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { Button, Table } from 'react-bootstrap'
import CheckoutProgress from '../CheckoutProgressBar'
import { createOrderAction } from '../../actions/orderActions'
import { listUsers } from '../../actions/userActions'


const AdminPanelUsersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogIn = useSelector(state => state.userLoginInfo)
    const { userLoginInfo } = userLogIn
  
    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete

    useEffect(() => {
        if (userLoginInfo && userLoginInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/user/login')
        }

    }, [dispatch, userLoginInfo])

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(_user => (
                                    <tr key={_user._id}>
                                        <td>{_user._id}</td>
                                        <td>{_user.name}</td>
                                        <td>{_user.email}</td>
                                        <td>{_user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <Link to={`/admin/user/${_user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
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

export default AdminPanelUsersPage