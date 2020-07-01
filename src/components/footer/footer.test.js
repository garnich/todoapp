import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from './footer'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Footer component', () => {
  it('<Footer>', () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper).toMatchSnapshot()
  })
})
