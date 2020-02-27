import React from 'react'
import X from '.'
import { shallow } from 'enzyme'

describe('Component', () => {
  it('renders the heading', () => {
    const result = shallow(<X />).contains(<p>X</p>)
    expect(result).toBeTruthy()
  })
})
