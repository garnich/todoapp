import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AuthorizationForm from './authorizationForm'
import { auth } from './../../Firebase'

Enzyme.configure({ adapter: new Adapter() })

describe('Test AuthorizationForm component', () => {
  it('<AuthorizationForm> test snapshot', () => {
    const wrapper = shallow(<AuthorizationForm />)

    expect(wrapper).toMatchSnapshot()
  })

  it('<AuthorizationForm> handleInputChange test', () => {
    const event = {
      target: {
        name: 'singInEmail',
        value: 'Test Value',
      },
    }
    const wrapper = shallow(<AuthorizationForm />)

    wrapper.instance().handleInputChange(event)

    expect(wrapper.state('singInEmail')).toEqual('Test Value')
  })

  it('<AuthorizationForm> handleSingIn test FAILED auth PASSWORD', async () => {
    const event = {
      target: [{ value: 'test@test.test' }, { value: '' }],
      preventDefault: jest.fn(),
    }
    const error =
      'The password is invalid or the user does not have a password.'
    const wrapper = shallow(<AuthorizationForm />)

    wrapper.instance().handleSignIn(event)

    await expect(wrapper.state('createUserWithEmailAndPassword')).toEqual(false)
    await expect(wrapper.state().error.message).toEqual(error)
  })

  it('<AuthorizationForm> handleSingnUp test', () => {
    const event = {
      target: [
        { value: 'test@test.test' },
        { value: 'testPass' },
        { value: 'testPass' },
      ],
      preventDefault: jest.fn(),
    }

    const wrapper = shallow(<AuthorizationForm />)

    expect(wrapper.state('createUserWithEmailAndPassword')).toEqual(false)

    auth.createUserWithEmailAndPassword = jest.fn((para1, para2) => {
      return new Promise(resolve =>
        resolve(
          wrapper.setState({
            createUserWithEmailAndPassword: true,
          })
        )
      )
    })

    wrapper.instance().handleSignUp(event)
    expect(wrapper.state('createUserWithEmailAndPassword')).toEqual(true)
  })

  it('<AuthorizationForm> handleSingnUp test with different PASSWORDS', () => {
    const event = {
      target: [
        { value: 'test@test.test' },
        { value: 'testPass' },
        { value: 'testPass1' },
      ],
      preventDefault: jest.fn(),
    }

    const wrapper = shallow(<AuthorizationForm />)

    wrapper.instance().handleSignUp(event)

    expect(wrapper.state().error.message).toEqual('Passwords must be same')
  })
})
