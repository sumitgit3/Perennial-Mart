import { React, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Spinner, FormControl } from 'react-bootstrap'
import Rating from '../Components/Rating.js'
import { useGetProductDetailsQuery } from '../redux/features/products/productApiSlice.js'
import Message from '../Components/Message.js'
import { useDispatch } from 'react-redux'
import {cartActions} from '../redux/features/cart/cartSlice.js'
const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //fetch whenever productId change,first check if available in cache otherwise fetch
    const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);

    //dispatch the add to cart action and navigate to cart page
    const addToCartHandler = ()=> {
        dispatch(cartActions.addToCart({...product,qty}));
        navigate('/cart');
    }

    return (
        <>
            {/* moving goback button to left */}
            <div className='text-start'>
                <Link to='/' className='btn btn-dark my-3' >
                    Go Back
                </Link>
            </div>
            {isLoading ? (<Spinner />) : isError ? (<Message variant={'danger'}>{isError?.data?.message || isError.error}</Message>) : (<>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        {/* flush variant to remove outer borders and rounded corners to render list group items edge-to-edge in a parent container such as a Card. */}
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                {product.name}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>{`Price:$${product.price}`} </strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    {/* row col here -> one on each side looks good */}
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}</strong></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock === 0 ? 'Out of Stock' : 'In Stock'}</Col>
                                    </Row>
                                </ListGroupItem>
                                {
                                    product.countInStock > 0 &&
                                    (<>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <FormControl as='select' value={qty} onChange={(e)=>{setQty(Number(e.target.value))}}>
                                                        {/* create options for no of qty in stocks */}
                                                        {[...Array(product.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </>)
                                }
                                <ListGroupItem>
                                    {/* disable button if out of stock */}
                                    <Button type='button' className='btn-block btn-dark' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                        Add to Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

            </>)}

        </>
    )
}

export default ProductScreen
