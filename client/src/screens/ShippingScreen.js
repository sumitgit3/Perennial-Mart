import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer.js'
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { cartActions } from '../redux/features/cart/cartSlice.js'

const ShippingScreen = () => {
    const shippingAddress = useSelector((state)=>state.cart.shippingAddress);
    const [address,setAddress] = useState(shippingAddress?.address || '');
    const [city,setCity] = useState(shippingAddress?.city || '');
    const [postalCode,setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country,setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(cartActions.saveShippingAddress({address,city,postalCode,country}));
        navigate('/payment');
    }
  return (
    <FormContainer>
        <h1>Shipping Address</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' placeholder='Enter postal code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter country' value={country} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-2'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
