import { React } from 'react'
import { Spinner, Row, Col, ListGroup, ListGroupItem, Image, Card, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useDeliverOrderMutation, useGetOrderByIdQuery, useVerifyPaymentMutation } from '../redux/features/orders/orderApiSlice'
import { usePayOrderByIdMutation, useCreatePaymentOrderMutation, useGetRazorPayKeyIdQuery } from '../redux/features/orders/orderApiSlice'

import { toast } from 'react-toastify'
import Message from '../Components/Message'
import { useSelector } from 'react-redux'

import useRazorpay from 'react-razorpay';


const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, isError, refetch } = useGetOrderByIdQuery(orderId);
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [payOrder, { isLoading: payLoading, }] = usePayOrderByIdMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
    //razor pay
    const [createPaymentOrder, { isLoading: loadingPayment }] = useCreatePaymentOrderMutation();
    const { data: razorpay, isLoading: loadingRazorPayId } = useGetRazorPayKeyIdQuery();
    const [verifyPayment] = useVerifyPaymentMutation();
    const [Razorpay] = useRazorpay();

    async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success('Order is paid');
    }

    const handlePayment = async () => {
        if (!loadingPayment && !loadingRazorPayId) {
            try {
                //create razorpay order
                const razorPayOrder = await createPaymentOrder(orderId).unwrap();
                const options = {
                    key: razorpay.id,
                    amount: razorPayOrder.amount,
                    currency: razorPayOrder.currency,
                    name: 'Perennial Mart',
                    description: 'test transaction',
                    order_id: razorPayOrder.orderId,
                    handler: async (response) => {
                        try {
                            const valid = await verifyPayment({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            });
                            if (valid) {
                                await payOrder({ orderId, details: { id:response.razorpay_payment_id,status:'success',update_time:String(Date.now()),email:String(userInfo.email)} });
                                refetch();
                                toast.success('Order is paid');
                            }
                            else {
                                toast.error('Payment Failed');
                            }
                        } catch (error) {
                            toast.error('Payment Failed');
                        }
                    },
                    prefill: {
                        name: userInfo.name,
                        email: userInfo.email,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };
                // Open Razorpay checkout
                const rzp1 = new Razorpay(options);
                rzp1.open();
            }
            catch (err) {
                console.log(err);
                toast.error('Payment Failed');
            }

        }
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId).unwrap();
            refetch();
            toast.success('Order Delivered')
        } catch (err) {
            toast.error(err);
        }
    }

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
                            <p><strong>Method:</strong>{order.paymentMethod}</p>
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
                                            {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
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
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <>
                                    {order.paymentMethod === 'RazorPay' ? (
                                        <ListGroupItem>
                                            {/* check if payment mutation in progress */}
                                            {payLoading || loadingPayment || loadingRazorPayId ? (<Spinner />) : (
                                                <Button onClick={handlePayment} className='my-3'>
                                                    Pay using Razorpay
                                                </Button>
                                            )}
                                        </ListGroupItem>
                                    ) : (
                                        <ListGroupItem>
                                            {payLoading && <Spinner />} {/* check if payment mutation in progress */}
                                            <Button onClick={onApproveTest} className='my-3'>
                                                Test Pay Order
                                            </Button>
                                        </ListGroupItem>
                                    )}
                                </>
                            )}

                            {loadingDeliver ? <Spinner /> :
                                userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Button type='button' onClick={deliverOrderHandler} variant='primary'>Mark as Delivered</Button>
                                    </ListGroupItem>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen
