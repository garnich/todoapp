import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HomePage from './homePage'

Enzyme.configure({ adapter: new Adapter() })

describe('Test HomePage component', () => {
  it('<HomePage>', () => {
    const wrapper = shallow(<HomePage />)

    expect(wrapper).toMatchSnapshot()
  })
})
