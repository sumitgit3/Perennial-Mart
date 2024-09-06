import { React, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Spinner, FormControl,Form } from 'react-bootstrap'
import Rating from '../Components/Rating.js'
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from '../redux/features/products/productApiSlice.js'
import Message from '../Components/Message.js'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/features/cart/cartSlice.js'
import { toast } from 'react-toastify'
import Meta from '../Components/Meta.jsx'
const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //fetch whenever productId change,first check if available in cache otherwise fetch
    const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);

    const [createProductReview, { isLoading: loadingReview }] = useCreateProductReviewMutation();

    const userInfo = useSelector((state) => state.auth.userInfo);

    //dispatch the add to cart action and navigate to cart page
    const addToCartHandler = () => {
        dispatch(cartActions.addToCart({ ...product, qty }));
        navigate('/cart');
    }

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        try {
            await createProductReview({ rating, comment,productId }).unwrap();
            setRating(0);
            setComment('');
            toast.success('Review added');
        }
        catch (err) {
            toast.error(err?.data?.message || err.error);
        }
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
                <Meta title={product.name}/>
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
                                <strong>{`Price:₹${product.price}`} </strong>
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
                                        <Col><strong>₹{product.price}</strong></Col>
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
                                                    <FormControl as='select' value={qty} onChange={(e) => { setQty(Number(e.target.value)) }}>
                                                        {/* create options for no of qty in stocks */}
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
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
                <Row className='my-3'>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        <ListGroup>
                            {product.numReviews === 0 ? (<Message>No reviews</Message>) : (
                                product.reviews.map((review) => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))
                            )}
                            <ListGroupItem>
                                <h3>Write a Customer Review</h3>
                                {loadingReview && <Spinner />}
                                {userInfo ? (
                                    <Form onSubmit={submitReviewHandler}>
                                        <Form.Group controlId='rating' className='my-2'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                            >
                                                <option value="" disabled>Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingReview}
                                            className='my-2'
                                            type='submit'
                                            variant='primary'
                                        >Submit</Button>
                                    </Form>
                                ) : (
                                    <Message>Please,
                                        <Link to='/login'>sign in</Link> 
                                        to write a review{' '}
                                    </Message>
                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </>)}

        </>
    )
}

export default ProductScreen
