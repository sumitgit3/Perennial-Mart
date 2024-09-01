import { React, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

const SearchBox = () => {
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyWord] = useState(urlKeyword || '');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
            setKeyWord('');
        }
        else {
            navigate('/');
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex my-2 mx-2'>
            <Form.Control
                type='text'
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder='search products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' className='mx-2'><FaSearch /></Button>
        </Form>
    )
}

export default SearchBox
