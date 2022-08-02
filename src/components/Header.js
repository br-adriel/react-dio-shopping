import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar
      className='navbar-dark navbar-expand-lg mb-4'
      bg='primary'
      sticky='top'
    >
      <Container className=''>
        <Navbar.Brand as='h1'>Dio Shopping</Navbar.Brand>

        <div className='ml-auto '>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/contato' className='nav-link'>
                Contato
              </NavLink>
            </li>
            <li className='nav-item'>
              <Cart />
            </li>
          </ul>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
