import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoItem from './todoItem'

Enzyme.configure({ adapter: new Adapter() })

describe('Test TodoItem component', () => {
  const props = {
    name: 'Item Name',
    delItem: jest.fn(),
    addToDone: jest.fn(),
    addToImportant: jest.fn(),
    done: true,
    important: true,
  }

  it('<TodoItem> has right item name', () => {
    const wrapper = shallow(<TodoItem {...props} />)

    expect(
      wrapper
        .find('span')
        .first()
        .text()
    ).toEqual('Item Name')
  })

  it('<TodoItem> is DONE & IMPORTANT', () => {
    const wrapper = shallow(<TodoItem {...props} />)

    expect(
      wrapper
        .find('span')
        .first()
        .hasClass('done')
    ).toEqual(true)
    expect(
      wrapper
        .find('span')
        .first()
        .hasClass('important')
    ).toEqual(true)
  })

  it('<TodoItem> is NOT DONE & IMPORTANT', () => {
    const falsyProps = {
      ...props,
      done: false,
      important: false,
    }
    const wrapper = shallow(<TodoItem {...falsyProps} />)

    expect(
      wrapper
        .find('span')
        .first()
        .hasClass('done')
    ).toEqual(false)
    expect(
      wrapper
        .find('span')
        .first()
        .hasClass('important')
    ).toEqual(false)
  })
})
