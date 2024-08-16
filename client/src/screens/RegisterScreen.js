import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { authActions } from '../redux/features/users/authSlice'
import { useRegisterMutation } from '../redux/features/users/userApiSlice'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //useUpdateUserMutation hook returns an array with two elements,
    const [register, { isLoading }] = useRegisterMutation();

    const userInfo = useSelector((state) => state.auth.userInfo);

    //search is query String after ?
    const { search } = useLocation();
    //URLSearchParams js object,allow us to get query value easily
    const sp = new URLSearchParams(search);
    //redirect has value of redirect parameter or redirection to homepage
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [redirect, userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            toast.error("Password not matching");
        }
        else {
            try {
                //.unwrap(): turns the result of mutation into a promise
                const user = await register({ name, email, password }).unwrap();
                dispatch(authActions.setCredentials(user));
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }

    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler} className='my-3'>
                <Form.Group>
                    <Form.Label className='my-2'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter Username' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='my-2'>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='my-2'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='my-2'>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>Sign Up</Button>
                {isLoading && <Spinner />}
            </Form>
            <Row className='py-2'>
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
