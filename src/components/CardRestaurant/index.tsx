import React from 'react'
import { Card, Ratio } from 'react-bootstrap'
import styled from 'styled-components'

import type { MouseEventHandler } from 'react'
import type { IPhoto } from 'interfaces/restaurant'

const CardWrapper = styled(Card)`
  cursor: pointer;
  transition: box-shadow 300ms;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  img.cover {
    width: 100%;
    object-fit: cover;
    background-color: var(--bs-light);
  }
  .content {
    padding: 0.5rem;
    .title {
      font-size: 1.25rem;
      font-weight: 700;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

interface IProps {
  onClick?: MouseEventHandler<HTMLDivElement>
  name: string
  description?: string
  cover: IPhoto
}

const CardRestaurant: React.FC<IProps> = (props) => {
  const { onClick, name, description, cover } = props
  return (
    <CardWrapper onClick={onClick}>
      <Ratio aspectRatio='16x9'>
        <img className='cover' src={cover.src} alt={cover.alt} />
      </Ratio>
      <div className='content'>
        <div className='title'>{name}</div>
        <div className='description'>{description}</div>
      </div>
    </CardWrapper>
  )
}

export default CardRestaurant
