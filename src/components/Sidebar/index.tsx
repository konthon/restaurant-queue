import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'

import type { Dispatch, FormEventHandler, SetStateAction } from 'react'

import CardRestaurant from 'components/CardRestaurant'
import { getRestaurants } from 'services/restaurants'

interface IProps {
  setSelectedID: Dispatch<SetStateAction<string | null>>
}

const Wrapper = styled.div`
  max-width: 280px;
  flex: 1 0 280px;
`

const Sidebar: React.FC<IProps> = (props) => {
  const { setSelectedID } = props

  const [search, setSearch] = useState<string>('')
  const [query, setQuery] = useState<string | undefined>(undefined)
  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (!search) {
      setQuery(undefined)
    } else {
      setQuery(search)
    }
  }

  const { data: restaurants } = useQuery(
    query ? ['restaurants', query] : ['restaurants'],
    () => getRestaurants(query)
  )

  return (
    <Wrapper>
      <Form className='d-flex' onSubmit={onSearch}>
        <Form.Control
          type='search'
          className='me-2'
          placeholder='Find restaurants...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='card-list py-3 d-flex flex-column gap-3'>
        {restaurants?.data.map((restaurant) => (
          <CardRestaurant
            key={restaurant.id}
            name={restaurant.name}
            description={restaurant.description}
            cover={restaurant.cover}
            onClick={() => setSelectedID(restaurant.id)}
          />
        ))}
      </div>
    </Wrapper>
  )
}

export default Sidebar
