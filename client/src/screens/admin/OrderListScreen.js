import React from 'react'
import { useGetAllOrdersQuery } from '../../redux/features/orders/orderApiSlice'
import { Table, Button, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Message from '../../Components/Message'

const OrderListScreen = () => {
    const { data: orders, isLoading, error } = useGetAllOrdersQuery();
    console.log(orders);
    return (
        <>
            <h1>Orders</h1>
            {isLoading? <Spinner/>:error?(<Message variant='danger'>{error?.data?.message || error?.error}</Message>):(
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (order.paidAt.substring(0, 10)) : (
                                    <FaTimes style={{ color: 'red' }} />
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                    <FaTimes style={{ color: 'red' }} />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Detail</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </>
    )
}

export default OrderListScreen
