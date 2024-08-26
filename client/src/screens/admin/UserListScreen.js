import React from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/features/users/userApiSlice'
import { Table, Button, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes, FaTrash, FaCheck, FaEdit } from 'react-icons/fa'
import {toast} from 'react-toastify'
import Message from '../../Components/Message'

const UserListScreen = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery();
    const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id)=>{
        if(window.confirm('Do you want delete this User?')){
            try {
                await deleteUser(id).unwrap();
                toast.success('User Deleted');
            } 
            catch (err) {
                toast.error(err?.data?.message||err?.error);
            }
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Spinner/>}
            {isLoading ? <Spinner /> : error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (<FaCheck />) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><FaTrash style={{ color: 'white' }} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
