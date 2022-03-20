import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import NavLink from 'components/NavLink'
import { logout } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'

const AdminLayout: React.FC = (props) => {
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
              <NavLink to='/admin/queues'>Queues</NavLink>
              <NavLink to='/admin/restaurants'>Restaurants</NavLink>
              <NavLink to='/admin/users'>Users</NavLink>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  user?.username ? `Hello, ${user.username}` : 'Hello, Admin'
                }
                id='user dropdown'
                align='end'
              >
                <NavDropdown.Item
                  onClick={() => {
                    logout()
                    dispatch({ type: IUserDispatch.LOGOUT })
                    navigate('/')
                  }}
                >
                  Log out
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

export default AdminLayout
