import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const QueueRestaurant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onCancel = () => setIsOpen(false)
  const onConfirm = () => {
    setIsOpen(false)
  }

  return (
    <>
      <section className='slots'>
        <h3>Queue</h3>
        <div>In queue now: 99999</div>
        <Button onClick={() => setIsOpen(true)}>Get queue!</Button>
      </section>
      <Modal show={isOpen} onHide={onCancel} backdrop='static' keyboard={false}>
        <Modal.Header>Confirm your choice?</Modal.Header>
        <Modal.Body>Get the queue of this restaurant</Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default QueueRestaurant
