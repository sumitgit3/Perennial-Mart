import React, { useEffect, useState } from 'react'
import { useGetUserQuery,useUpdateUserMutation} from '../../redux/features/users/userApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Spinner } from 'react-bootstrap'
import Message from '../../Components/Message'
import FormContainer from '../../Components/FormContainer'
import { toast } from 'react-toastify'
const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
   
    const { data: user, isLoading, refetch, error } = useGetUserQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();



    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({userId,name,email,isAdmin}).unwrap();
            toast.success('User Updated');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    }

    
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-primary my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Spinner animation="border" />}
                {isLoading ? (
                    <Spinner animation="border" />
                ) : error ? (
                    <Message variant='danger'>{error?.data?.message || error?.error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                placeholder='Enter Name'
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type='checkbox'
                                label='isAdmin'
                                checked={isAdmin}
                                onChange={(e)=>setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' className='my-2' disabled={loadingUpdate}>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen;
