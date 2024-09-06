import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../Components/Message'
import { cartActions } from '../redux/features/cart/cartSlice'
const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (item, qty) => {
        dispatch(cartActions.addToCart({ ...item, qty }));
    }
    const removeFromCartHandler = (id)=>{
        dispatch(cartActions.removeFromCart(id));
    }
    //send to login page if not logged in,if logged in redirect to shipping page
    const checkoutHandler = ()=>{
        // If login is successful, navigate to the redirect path
        navigate('/login?redirect=/shipping');
    }
    return (
        <>
            <h1 style={{textAlign:'left'}} className='mb-3'>Shopping Cart</h1>
            {cartItems.length === 0 ? (<Message>No Items in Cart <Link to='/'>Go back</Link></Message>) :
            (
                <Row>
            {/* first col for items */}
            <Col md={8} >
                        <ListGroup variant='flush' >
                            {cartItems.map((item) => (
                                <ListGroupItem key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            <p><strong>₹{item.price}</strong></p>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant='danger' onClick={()=>removeFromCartHandler(item._id)}>
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
            </Col>
            {/* second column for checkout */}
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col md={6}>
                                 <h3>Subtotal ({cartItems.reduce((acc, item) => (acc + item.qty), 0)}) items</h3>
                                </Col>
                                <Col md={6}>
                                <h3><strong> ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong></h3>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button variant='warning' type='button' className='btn-block' disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            )}
        </>
    )
}

export default CartScreen
