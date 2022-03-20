import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

import type { To } from 'react-router-dom'

interface INavLinkProps {
  to: To
}

const NavLink: React.FC<INavLinkProps> = (props) => {
  const { children, to, ...restProps } = props
  return (
    <Link to={to} className='text-decoration-none'>
      <Nav.Link as='div' {...restProps}>
        {children}
      </Nav.Link>
    </Link>
  )
}

export default NavLink
