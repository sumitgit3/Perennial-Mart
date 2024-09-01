import React from 'react' 
import { Navbar, Nav, Container,Badge, NavDropdown } from 'react-bootstrap' 
import { FaShoppingCart, FaUser } from 'react-icons/fa' 
import { useSelector,useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap' // Importing LinkContainer for linking within the Navbar using react-router
import { authActions } from '../redux/features/users/authSlice'
import { useLogoutMutation } from '../redux/features/users/userApiSlice'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import SearchBox from './SearchBox'

const Header = () => {
    const {cartItems} = useSelector((state)=>state.cart);
    const userInfo = useSelector((state)=>state.auth.userInfo);
    const noOfItems = cartItems.reduce((acc,i)=>acc+i.qty,0);

    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async ()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(authActions.clearCredentials());
            navigate('/login');
        } catch (error) {
            toast.error(error);
        }
        
    }
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
                        <SearchBox />
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart /> Cart
                                {noOfItems > 0 && (<>
                                    <Badge pill bg='success' style={{margin:'5px'}}>
                                        {noOfItems}
                                    </Badge>
                                </>)}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                            )
                            :(
                                <LinkContainer to='/login'>
                                <Nav.Link><FaUser /> Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header 
