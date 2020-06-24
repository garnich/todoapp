import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ItemStatusFilter from './itemStatusFilter'

Enzyme.configure({ adapter: new Adapter() })

describe('Test ItemStatusFilter component', () => {
  const props = {
    filter: 'all',
    onFilterChange: jest.fn(),
  }

  it('<ItemStatusFilter>', () => {
    const wrapper = shallow(<ItemStatusFilter {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('<ItemStatusFilter> simulate click', () => {
    const wrapper = shallow(<ItemStatusFilter {...props} />)
    wrapper
      .find('.btn-group')
      .children()
      .at(0)
      .simulate('click')

    expect(props.onFilterChange).toHaveBeenCalled()
  })
})
