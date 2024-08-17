import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Card, ListGroup, Image, ListGroupItem, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../Components/CheckoutSteps.js'
import { toast } from 'react-toastify'
import Message from '../Components/Message.js'
import { useCreateOrderMutation } from '../redux/features/orders/orderApiSlice'
import { cartActions } from '../redux/features/cart/cartSlice.js'

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createOrder,{isLoading,isError}] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        }
        else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    const placeOrderHandler = async ()=>{
        try {
            const res = await createOrder({
                orderItems : cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod : cart.paymentMethod,
                itemsPrice : cart.itemsPrice,
                shippingPrice : cart.shippingPrice,
                taxPrice : cart.taxPrice,
                totalPrice : cart.totalPrice
            }).unwrap();
            dispatch(cartActions.clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error?.data?.Message);
        }
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <p>
                                <strong>Shipping Address :</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city} {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <strong>Payment Method: </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>No Items in Cart</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Orders Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items price:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Cost:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax(18%):</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {isError? (
                                <ListGroupItem><Message variant={'danger'}>{isError}</Message></ListGroupItem>
                            ):(<></>)}
                            <ListGroupItem>
                                <Button onClick={placeOrderHandler} type='button' className='btn-block' variant='primary'>Place Order</Button>
                            </ListGroupItem>
                        </ListGroup>
                        {isLoading && <Spinner/>}
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
