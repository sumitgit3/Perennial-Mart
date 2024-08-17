import React from 'react'
import { Spinner, Row, Col, ListGroup, ListGroupItem, Image ,Card} from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../redux/features/orders/orderApiSlice'
import Message from '../Components/Message'

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);


    return isLoading ? (<Spinner />) : isError ? (<Message variant={'danger'}>Error</Message>) : (
        <>
            <h1>Order:{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong>{order.user.email}</p>
                            <p><strong>Address:</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city} {order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (<Message variant={'success'}>Delivered on {order.deliveredAt}</Message>) :
                                (
                                    <Message variant={'danger'}>Not Delivered</Message>
                                )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong>{order.paymentmethod}</p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {/* PAY ORDER PLACEHOLDER */}
                            {/* {MARK AS DELIVERED PLACEHOLDER} */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen
