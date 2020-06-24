import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './header'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Header component', () => {
  const props = {
    auth: true,
    logout: jest.fn(),
  }

  it('If user Authorized <Header> should contain LOGOUT button ', () => {
    const wrapper = shallow(<Header {...props} />)

    expect(wrapper.find('.logout')).toBeTruthy()
  })

  it('If user click LOGOUT button user should logout', () => {
    const wrapper = shallow(<Header {...props} />)
    wrapper.find('.logout').simulate('click')

    expect(props.logout).toHaveBeenCalled()
  })
})
