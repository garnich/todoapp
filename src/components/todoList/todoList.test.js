import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from './todoList'

Enzyme.configure({ adapter: new Adapter() })

const todo = [
  {
    name: 'Item_1',
    id: 1,
    important: true,
    done: false,
  },
  {
    name: 'Item_2',
    id: 2,
    important: true,
    done: true,
  },
  {
    name: 'Item_3',
    id: 3,
    important: false,
    done: true,
  },
]

describe('Test TodoList component', () => {
  const props = {
    todo,
    onDeleted: jest.fn(),
    addToDone: jest.fn(),
    addToImportant: jest.fn(),
  }

  it('<TodoList> empty list item array', () => {
    const emptyTodo = {
      ...props,
      todo: [],
    }
    const wrapper = shallow(<TodoList {...emptyTodo} />)

    expect(wrapper.isEmptyRender()).toEqual(true)
  })

  it('<TodoList> with list item array', () => {
    const wrapper = shallow(<TodoList {...props} />)

    expect(wrapper.find('ul').children()).toHaveLength(todo.length)
    expect(wrapper).toMatchSnapshot()
  })

  it('<TodoList> check onDeleted function', () => {
    const wrapper = shallow(<TodoList {...props} />)

    wrapper
      .find('ul')
      .children()
      .at(0)
      .dive()
      .find('.btn-outline-secondary')
      .simulate('click')

    expect(props.onDeleted).toHaveBeenCalled()
  })

  it('<TodoList> check addToDone function', () => {
    const wrapper = shallow(<TodoList {...props} />)

    wrapper
      .find('ul')
      .children()
      .at(0)
      .dive()
      .find('.btn-outline-success')
      .simulate('click')

    expect(props.addToDone).toHaveBeenCalled()
  })

  it('<TodoList> check addToImportant function', () => {
    const wrapper = shallow(<TodoList {...props} />)

    wrapper
      .find('ul')
      .children()
      .at(0)
      .dive()
      .find('.btn-outline-danger')
      .simulate('click')

    expect(props.addToDone).toHaveBeenCalled()
  })
})
