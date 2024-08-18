import React from 'react'
import { Table, Button, Spinner, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaEdit, FaTrash } from 'react-icons/fa'
import {toast} from 'react-toastify'
import Message from '../../Components/Message'
import { useGetProductsQuery,useCreateProductMutation } from '../../redux/features/products/productApiSlice.js'
const ProductListScreen = () => {
    const { data: products, isLoading, error ,refetch} = useGetProductsQuery();
    const [createProduct,{isLoading:loadingCreate}] = useCreateProductMutation();

    const createProductHandler = async()=>{
        if(window.confirm('Are you Sure? Do you want to create a new Product')){
            try {
                await createProduct();
                refetch();//refetches all products after creation
            } catch (err) {
                toast.error(err?.data?.message||err?.error);
            }
        }
    }

    const deleteHandler = (id)=>{
        console.log('delete',id);
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Spinner/>}
            {isLoading ? <Spinner /> : error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}><FaTrash style={{color:'white'}} /></Button>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </Table>
                </>
            )}

        </>
    )
}

export default ProductListScreen
