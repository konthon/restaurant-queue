import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import NavLink from 'components/NavLink'
import { logout } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'

const MainLayout: React.FC = (props) => {
  const { children } = props
  const { user, dispatch } = useUser()
  const navigate = useNavigate()
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
              <NavDropdown
                title={
                  user?.username ? `Hello, ${user.username}` : 'Hello, Guest'
                }
                id='user dropdown'
                align='end'
              >
                {user?.roles.includes('admin') && (
                  <NavDropdown.Item>Go to Admin</NavDropdown.Item>
                )}
                {user?.roles.includes('owner') && (
                  <NavDropdown.Item>Go to My Restaurants</NavDropdown.Item>
                )}
                <NavDropdown.Item
                  onClick={() => {
                    logout()
                    dispatch({ type: IUserDispatch.LOGOUT })
                    navigate('/')
                  }}
                >
                  Logout
                </NavDropdown.Item>
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
