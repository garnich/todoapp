import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ErrorBoundary from './errorBoundary'

Enzyme.configure({ adapter: new Adapter() })

const children = <h1>test</h1>
describe('Test ErrorBoundary WITHOUT errors', () => {
  it('<ErrorBoundary> test snapshot', () => {
    const wrapper = shallow(<ErrorBoundary>{children}</ErrorBoundary>)

    expect(wrapper).toMatchSnapshot()
  })
})

describe('Test ErrorBoundary WITH errors', () => {
  const wrapper = shallow(<ErrorBoundary>{children}</ErrorBoundary>)

  beforeEach(() => {
    wrapper.instance().componentDidCatch('error')
    wrapper.update()
  })

  it('<ErrorBoundary> test snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should update the state to indicate an error', () => {
    expect(wrapper.instance().state.hasError).toBeTruthy()
  })

  it('should not render the child component', () => {
    expect(wrapper.find('h1').exists()).toBeFalsy()
  })
})
