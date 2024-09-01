import { React } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useGetProductsQuery } from '../redux/features/products/productApiSlice'
import { Spinner } from 'react-bootstrap'
import { useParams,Link } from 'react-router-dom'
import Paginate from '../Components/Paginate'
import Message from '../Components/Message'
const HomeScreen = () => {
    const { pageNumber } = useParams();
    const { keyword } = useParams();
    //fetch data once
    const { data, isLoading, isError } = useGetProductsQuery({ pageNumber, keyword });
    return (
        <>
            {keyword && 
                <div className='text-start'>
                    <Link to='/' className='btn btn-dark mb-2' >
                    Go Back
                    </Link>
                </div>
            }
            {
                isLoading ? (<Spinner />) : isError ? (<Message variant={'danger'}>{isError?.data?.message || isError.error}</Message>) : (<>
                    <h1 style={{ textAlign: 'center' }}>Latest products</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className='d-flex justify-content-center mt-5'>
                        <Paginate pageNumber={pageNumber || 1} totalNumberOfPages={data.totalNumberOfPages} keyword={keyword ? keyword : ''} />
                    </div>
                </>)
            }

        </>
    )
}

export default HomeScreen
