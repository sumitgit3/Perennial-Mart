import React from 'react' 
import { Navbar, Nav, Container,Badge } from 'react-bootstrap' 
import { FaShoppingCart, FaUser } from 'react-icons/fa' 
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap' // Importing LinkContainer for linking within the Navbar using react-router

const Header = () => {
    const {cartItems} = useSelector((state)=>state.cart);
    const noOfItems = cartItems.reduce((acc,i)=>acc+i.qty,0);
    return (
        <header>
            {/* Navbar component with dark theme and collapse on select feature */}
            <Navbar bg='dark' data-bs-theme="dark" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Perenial Mart</Navbar.Brand>
                    </LinkContainer>
                    {/* Toggle button for collapsing Navbar in smaller screens */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    {/* Collapsible part of the Navbar */}
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/* Nav element to hold navigation links, aligned to the right */}
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart /> Cart
                                {noOfItems > 0 && (<>
                                    <Badge pill bg='success' style={{margin:'5px'}}>
                                        {noOfItems}
                                    </Badge>
                                </>)}
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><FaUser /> Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header 
