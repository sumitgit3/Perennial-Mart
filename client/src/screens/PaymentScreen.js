import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Button,ListGroup } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { cartActions } from '../redux/features/cart/cartSlice'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('RazorPay');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(cartActions.savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} className='my-3'>
                <ListGroup>
                    <ListGroup.Item>
                        <Form.Group>
                            <Col>
                                <Form.Check
                                    type='radio'
                                    className='my-2'
                                    label='PayPal or Credit Card'
                                    id='PayPal'
                                    name='paymentMethod'
                                    value='PayPal'
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={true}
                                >
                                </Form.Check>
                            </Col>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Form.Group>
                            <Col>
                                <Form.Check
                                    type='radio'
                                    className='my-2'
                                    label='RazorPay'
                                    id='RazorPay'
                                    name='paymentMethod'
                                    value='RazorPay'
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    checked
                                >
                                </Form.Check>
                            </Col>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='submit' variant='primary' >Continue</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
