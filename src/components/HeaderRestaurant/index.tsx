import React from 'react'
import { Ratio } from 'react-bootstrap'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  img.cover {
    width: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
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
  }
`

// TODO: replace with real
const cover = {
  src: 'https://www.infoquest.co.th/wp-content/uploads/2020/12/20201228_Canva_Fasfood-1024x576.png',
  alt: 'cover',
}
const photos = [
  {
    src: 'https://www.infoquest.co.th/wp-content/uploads/2020/12/20201228_Canva_Fasfood-1024x576.png',
    alt: 'image-1',
  },
  {
    src: 'https://www.infoquest.co.th/wp-content/uploads/2020/12/20201228_Canva_Fasfood-1024x576.png',
    alt: 'image-2',
  },
  {
    src: 'https://www.infoquest.co.th/wp-content/uploads/2020/12/20201228_Canva_Fasfood-1024x576.png',
    alt: 'image-3',
  },
]

const HeaderRestaurant: React.FC = () => {
  return (
    <HeaderWrapper>
      <Ratio aspectRatio='21x9'>
        <img src={cover.src} className='cover' alt={cover.alt} />
      </Ratio>
      <section className='content'>
        <h2>Title</h2>
        <p>desc</p>
        <div className='d-flex flex-wrap gap-3'>
          {photos.map((photo) => (
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
