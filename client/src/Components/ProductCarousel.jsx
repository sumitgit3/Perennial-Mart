import React from 'react'
import { Carousel, Spinner,Image } from 'react-bootstrap'
import Message from './Message.js'
import { Link } from 'react-router-dom'
import { useFetchTopProductsQuery } from '../redux/features/products/productApiSlice'

const ProductCarousel = () => {
    const { data: products, isLoading, err } = useFetchTopProductsQuery(3);
    console.log(products);
    return (
        isLoading ? <Spinner /> : err ? <Message variant={'danger'}>{err?.data?.message || err.error}</Message> :
         <Carousel pause={'hover'} data-bs-theme="dark" className='bg-secondary mb-4'>
            {products.map((product)=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption>
                            <h3>{product.name}</h3>
                            <strong><p>₹{product.price}</p></strong>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
         </Carousel>
  )
}

export default ProductCarousel
