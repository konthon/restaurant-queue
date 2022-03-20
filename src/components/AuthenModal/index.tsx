import React from 'react'
import { Modal } from 'react-bootstrap'

import type { Dispatch, SetStateAction } from 'react'

interface IProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const AuthenModal: React.FC<IProps> = (props) => {
  const { show, setShow } = props
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header />
      <Modal.Body></Modal.Body>
    </Modal>
  )
}

export default AuthenModal
