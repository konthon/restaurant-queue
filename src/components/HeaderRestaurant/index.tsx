import React, { useEffect } from 'react'
import { Ratio } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { getRestaurantByID } from 'services/restaurants'
import styled from 'styled-components'

interface IProps {
  selectedID: string | null
}

const HeaderWrapper = styled.div`
  img.cover {
    width: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    background-color: var(--bs-light);
  }
  section.content {
    padding-top: 1rem;
  }
`
const PhotoItem = styled.div`
  width: 150px;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 300ms;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  img {
    width: 100%;
    object-fit: cover;
    background-color: var(--bs-light);
  }
`

const HeaderRestaurant: React.FC<IProps> = (props) => {
  const { selectedID } = props
  const { data: restaurant } = useQuery(
    ['restaurant', selectedID],
    () => getRestaurantByID(selectedID || ''),
    { enabled: selectedID !== null }
  )

  if (!selectedID) {
    return (
      <div className='w-100 d-flex align-items-center justify-content-center text-center'>
        Please select a restaurant on the left-side to continue
      </div>
    )
  }
  return (
    <HeaderWrapper>
      <Ratio aspectRatio='21x9'>
        <img
          src={restaurant?.data.cover.src}
          className='cover'
          alt={restaurant?.data.cover.alt}
        />
      </Ratio>
      <section className='content'>
        <h2>{restaurant?.data.name}</h2>
        <p>{restaurant?.data.description}</p>
        <div className='d-flex flex-wrap gap-3'>
          {restaurant?.data.photos.map((photo) => (
            <PhotoItem key={photo.alt}>
              <Ratio aspectRatio='1x1'>
                <img src={photo.src} alt={photo.alt} />
              </Ratio>
            </PhotoItem>
          ))}
        </div>
      </section>
    </HeaderWrapper>
  )
}

export default HeaderRestaurant
