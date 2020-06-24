import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Title from './title'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Title component', () => {
  it('<Title>', () => {
    const props = {
      todo: 1,
      done: 3,
    }

    const wrapper = shallow(<Title {...props} />)
    const text = wrapper.find('span').text()

    expect(text).toEqual('to do 1, done 3')
  })
})
