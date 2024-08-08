import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import Rating from '../Components/Rating.js'
const ProductScreen = () => {
    const [product, setProduct] = useState({});
    //id is destructured with name as productId from url of the route
    const { id: productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProduct();
    }, [productId]); //will run every time productId is changed,so new product will be fetched

    return (
        <>
            {/* moving goback button to left */}
            <div className='text-start'>
                <Link to='/' className='btn btn-dark my-3' >
                    Go Back
                </Link>
            </div>

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
                            <ListGroupItem>
                                {/* disable button if out of stock */}
                                <Button type='button' className='btn-block btn-dark' disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default ProductScreen
