import React from 'react'
import products from '../DummyProduct'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
const HomeScreen = () => {
    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
