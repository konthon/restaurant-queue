import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'

import { signUp } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'

interface IProps {
  setShow: Dispatch<SetStateAction<boolean>>
}

const SignUp: React.FC<IProps> = (props) => {
  const { setShow } = props
  const { dispatch } = useUser()
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  const onSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    setIsInvalid(false)
    e.preventDefault()
    const response = await signUp(usernameInput, passwordInput)
    if (response.isSuccess && response.user) {
      setIsInvalid(false)
      dispatch({ type: IUserDispatch.LOGIN, payload: { user: response.user } })
      setShow(false)
    } else {
      setIsInvalid(true)
    }
  }

  return (
    <div>
      <Form className='d-flex flex-column gap-3' onSubmit={onSignUp}>
        <Form.Group controlId='new-username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            autoComplete='username'
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            isInvalid={isInvalid}
          />
        </Form.Group>
        <Form.Group controlId='new-password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            autoComplete='new-password'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Group>
        <Button type='submit'>Sign up</Button>
      </Form>
    </div>
  )
}

export default SignUp
