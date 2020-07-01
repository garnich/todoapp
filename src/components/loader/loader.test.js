import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loader from './loader'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Loader component', () => {
  it('<Loader>', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper).toMatchSnapshot()
  })
})
