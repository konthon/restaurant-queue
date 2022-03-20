import React from 'react'
import { Card, Ratio } from 'react-bootstrap'
import styled from 'styled-components'

import type { MouseEventHandler } from 'react'

const CardWrapper = styled(Card)`
  cursor: pointer;
  transition: box-shadow 300ms;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  img.cover {
    width: 100%;
    object-fit: cover;
  }
  .content {
    padding: 0.5rem;
    .title {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }
`

// TODO: placeholder
const cover =
  'https://www.infoquest.co.th/wp-content/uploads/2020/12/20201228_Canva_Fasfood-1024x576.png'

interface IProps {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const CardRestaurant: React.FC<IProps> = (props) => {
  const { onClick } = props
  return (
    <CardWrapper onClick={onClick}>
      <Ratio aspectRatio='16x9'>
        <img className='cover' src={cover} alt='cover' />
      </Ratio>
      <div className='content'>
        <div className='title'>Title</div>
        <div className='description'>short description</div>
      </div>
    </CardWrapper>
  )
}

export default CardRestaurant
