import CardRestaurant from 'components/CardRestaurant'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 280px;
`

const Sidebar: React.FC = () => {
  return (
    <Wrapper>
      <Form className='d-flex'>
        <Form.Control
          type='search'
          className='me-2'
          placeholder='Find restaurants...'
        />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='card-list py-3 d-flex flex-column gap-3'>
        <CardRestaurant />
        <CardRestaurant />
        <CardRestaurant />
      </div>
    </Wrapper>
  )
}

export default Sidebar
