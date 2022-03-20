import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NavLink from 'components/NavLink'

const MainLayout: React.FC = (props) => {
  const { children } = props
  return (
    <div>
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Link to='/' className='text-decoration-none'>
              <Navbar.Brand as='div'>Restaurant Queue</Navbar.Brand>
            </Link>
            <Nav className='me-auto'>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/admin/queues'>Admin</NavLink>
              <NavLink to='/queues'>Queues</NavLink>
            </Nav>
            <Nav>
              <NavDropdown title='Hello, Guest' id='user dropdown' align='end'>
                <NavDropdown.Item>Login</NavDropdown.Item>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
