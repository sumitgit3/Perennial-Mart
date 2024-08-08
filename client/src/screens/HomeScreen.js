import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                //destructering data from axios response
                const { data } = await axios.get('/api/products');
                setProducts(data);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchAllProducts();
    }, []); //render only once

    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
