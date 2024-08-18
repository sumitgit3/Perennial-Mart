import React, { useEffect, useState } from 'react'
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../redux/features/products/productApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Spinner } from 'react-bootstrap'
import Message from '../../Components/Message'
import FormContainer from '../../Components/FormContainer'
import { toast } from 'react-toastify'
const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);  
            setDescription(product.description);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        console.log(updatedProduct.productId,"test");
        try {
            await updateProduct(updatedProduct).unwrap();
            toast.success('Product Updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-primary my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
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
                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                placeholder='Enter price'
                                onChange={(e) => setPrice(Number(e.target.value))}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand' className='my-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                value={brand}
                                placeholder='Enter brand'
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* image input */}
                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                value={category}
                                placeholder='Enter category'
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'  
                                value={countInStock}
                                placeholder='Enter Count In Stock'
                                onChange={(e) => setCountInStock(Number(e.target.value))}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                placeholder='Enter description'
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
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

export default ProductEditScreen;
