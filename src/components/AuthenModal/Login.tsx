import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'

import { login, loginAsGuest } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'

interface IProps {
  setShow: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<IProps> = (props) => {
  const { setShow } = props
  const { dispatch } = useUser()

  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  const onClickLoginAsGuest = async () => {
    setIsInvalid(false)
    const response = await loginAsGuest()
    if (response.isSuccess && response.user) {
      setIsInvalid(false)
      dispatch({ type: IUserDispatch.LOGIN, payload: { user: response.user } })
      setShow(false)
    } else {
      setIsInvalid(true)
    }
  }

  const onLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    setIsInvalid(false)
    e.preventDefault()
    const response = await login(usernameInput, passwordInput)
    if (response.isSuccess && response.user) {
      setIsInvalid(false)
      dispatch({ type: IUserDispatch.LOGIN, payload: { user: response.user } })
      setShow(false)
    } else {
      setIsInvalid(true)
    }
  }

  return (
    <div className='d-flex flex-column'>
      <Button variant='warning' onClick={onClickLoginAsGuest}>
        Login as Guest
      </Button>
      <div className='d-flex align-items-center justify-content-center gap-3'>
        <hr className='flex-grow-1' />
        <div>or</div>
        <hr className='flex-grow-1' />
      </div>
      <Form className='d-flex flex-column gap-2' onSubmit={onLogin}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            autoComplete='username'
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            isInvalid={isInvalid}
          />
          <Form.Control.Feedback type='invalid'>
            Please check your username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            autoComplete='current-password'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            isInvalid={isInvalid}
          />
          <Form.Control.Feedback type='invalid'>
            Please check your password
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>Log in</Button>
      </Form>
    </div>
  )
}

export default Login
