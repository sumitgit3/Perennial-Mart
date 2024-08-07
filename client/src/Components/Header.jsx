import React from 'react' 
import { Navbar, Nav, Container } from 'react-bootstrap' 
import { FaShoppingCart, FaUser } from 'react-icons/fa' 
import { LinkContainer } from 'react-router-bootstrap' // Importing LinkContainer for linking within the Navbar using react-router

const Header = () => {
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
                                <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
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
