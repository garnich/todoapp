import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PageNotFind from './pageNotFind'

Enzyme.configure({ adapter: new Adapter() })

describe('Test PageNotFind component', () => {
  it('<PageNotFind>', () => {
    const wrapper = shallow(<PageNotFind />)

    expect(wrapper).toMatchSnapshot()
  })
})
