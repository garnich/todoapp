import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AboutPage from './aboutPage'

Enzyme.configure({ adapter: new Adapter() })

describe('Test AboutPage component', () => {
  it('<AboutPage>', () => {
    const mockedDate = new Date('06/25/2020')
    window.Date = jest.fn(() => mockedDate)

    const wrapper = shallow(<AboutPage />)

    expect(wrapper).toMatchSnapshot()
  })
})
