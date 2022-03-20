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
        <Navbar bg='light' variant='light'>
          <Container>
            <Link to='/' className='text-decoration-none'>
              <Navbar.Brand as='div'>Restaurant Queue</Navbar.Brand>
            </Link>
            <Nav className='me-auto'>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/queues'>Queues</NavLink>
            </Nav>
            <Nav>
              {user?.roles.includes('admin') && (
                <NavLink to='/admin/queues'>Go to Admin Pages</NavLink>
              )}
              <NavDropdown
                title={
                  user?.username ? `Hello, ${user.username}` : 'Hello, Guest'
                }
                id='user dropdown'
                align='end'
              >
                {user?.roles.includes('admin') && (
                  <Link to='/admin/queues' className='text-decoration-none'>
                    <NavDropdown.Item href='/admin/queues'>
                      Go to Admin
                    </NavDropdown.Item>
                  </Link>
                )}
                {user?.roles.includes('owner') && (
                  <NavDropdown.Item>Go to My Restaurants</NavDropdown.Item>
                )}
                {(user?.roles.includes('admin') ||
                  user?.roles.includes('owner')) && <NavDropdown.Divider />}
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

export default MainLayout
