import React, { useState } from 'react'
import { Modal, Tab, Tabs } from 'react-bootstrap'

import type { Dispatch, SetStateAction } from 'react'

import Login from './Login'
import SignUp from './SignUp'

interface IProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const AuthenModal: React.FC<IProps> = (props) => {
  const { show, setShow } = props
  const [page, setPage] = useState<string>('login')
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Body>
        <Tabs
          className='pt-2'
          id='authen-tabs'
          activeKey={page}
          onSelect={(key) => setPage(key ?? 'login')}
        >
          <Tab eventKey='login' title='Log In' className='pt-3'>
            <Login setShow={setShow} />
          </Tab>
          <Tab eventKey='signup' title='Sign Up' className='pt-3'>
            <SignUp setShow={setShow} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default AuthenModal
