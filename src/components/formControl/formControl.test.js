import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FormControl from './formControl'

Enzyme.configure({ adapter: new Adapter() })

describe('Test FormControl component', () => {
  const props = {
    searchParam: jest.fn(),
  }

  it('<FormControl>', () => {
    const wrapper = shallow(<FormControl {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('<FormControl> test changeSearch', () => {
    const wrapper = shallow(<FormControl {...props} />)
    wrapper
      .find('.form-control')
      .simulate('change', { target: { value: 'newItem' } })

    expect(props.searchParam).toHaveBeenCalled()
  })
})
