import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { cartActions } from '../redux/features/cart/cartSlice'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shippingAddress = useSelector((state)=>state.cart.shippingAddress);

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[shippingAddress,navigate]);

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(cartActions.savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
