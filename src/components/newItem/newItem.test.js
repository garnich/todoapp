import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NewItem from './newItem'

Enzyme.configure({ adapter: new Adapter() })

describe('Test NewItem component', () => {
  it('<NewItem> test onLabelchange', () => {
    const props = {
      addNewItem: jest.fn(),
    }

    const wrapper = shallow(<NewItem {...props} />)

    expect(wrapper.state('label')).toEqual('')

    wrapper
      .find('.form-control')
      .simulate('change', { target: { value: 'newItem' } })

    expect(wrapper.state('label')).toEqual('newItem')
  })

  it('<NewItem> test onSubmit', () => {
    const props = {
      addNewItem: jest.fn(),
    }

    const wrapper = shallow(<NewItem {...props} />)

    wrapper
      .find('.form-control')
      .simulate('change', { target: { value: 'newItem' } })
    wrapper.find('.item-add-form').simulate('submit', { preventDefault() {} })

    expect(props.addNewItem).toHaveBeenCalledTimes(1)
  })

  it('<NewItem> test onClick', () => {
    const props = {
      addNewItem: jest.fn(),
    }

    const wrapper = shallow(<NewItem {...props} />)

    wrapper
      .find('.form-control')
      .simulate('change', { target: { value: 'newItem' } })
    wrapper.find('button').simulate('click', { preventDefault() {} })

    expect(props.addNewItem).toHaveBeenCalledTimes(1)
  })

  it('<NewItem> test onClick with empty label', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    const props = {
      addNewItem: jest.fn(),
    }

    const wrapper = shallow(<NewItem {...props} />)

    wrapper.find('button').simulate('click', { preventDefault() {} })

    expect(window.alert).toBeCalledWith("You can't add EMPTY task!")
  })

  it('<NewItem> test onSubmit with empty label', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    const props = {
      addNewItem: jest.fn(),
    }

    const wrapper = shallow(<NewItem {...props} />)

    wrapper.find('.item-add-form').simulate('submit', { preventDefault() {} })

    expect(window.alert).toBeCalledWith("You can't add EMPTY task!")
  })
})
