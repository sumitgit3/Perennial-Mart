import {React,useEffect} from 'react'
import { Spinner, Row, Col, ListGroup, ListGroupItem, Image ,Card,Button} from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../redux/features/orders/orderApiSlice'
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useGetPayPalClientIdQuery,usePayOrderByIdMutation } from '../redux/features/orders/orderApiSlice'

import {toast} from 'react-toastify'
import Message from '../Components/Message'

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, isError,refetch } = useGetOrderByIdQuery(orderId);

    const [payOrder,{isLoading:payLoading,}] = usePayOrderByIdMutation();
    const {data:paypal,isLoading:paypalLoading,error:paypalError} = useGetPayPalClientIdQuery();

    const [{isPending},paypalDispatch] = usePayPalScriptReducer();


    useEffect(()=>{
        if(!paypalError && !paypalLoading && paypal.clientId){
            const loadPayPalScript = async()=>{
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'clientId':paypal.clientId,
                        currency:'USD'
                    }
                });
            }
            paypalDispatch({type:'setLoadingStatus',value:'pending'});
        
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    },[order,paypal,paypalError,paypalLoading,paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            await payOrder({ orderId, details });
            refetch();
            toast.success('Order is paid');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        });
      }
    
      async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
    
        toast.success('Order is paid');
      }
    
      function onError(err) {
        toast.error(err.message);
      }
    
      function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: order.totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
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
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {payLoading && <Spinner/>} {/* check if payment mutation in progress */}
                                    {/* check if paypalScriptReducer is pending */}
                                    {isPending ?(<Spinner/>):(  
                                        <div>
                                            <Button onClick={onApproveTest} className='my-3'> 
                                                Test Pay Order
                                            </Button>
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                >
                                                </PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroupItem>
                            )}

                            {/* {MARK AS DELIVERED PLACEHOLDER} */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen
