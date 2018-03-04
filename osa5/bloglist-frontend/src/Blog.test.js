import React from 'react'
import { shallow } from 'enzyme'
import Blog from './components/Blog'
jest.mock('./services/blogs.js')

describe.only('<Blog />', () => {
  it('BLOG TEST', () => {
    const blog = {
      author: 'Petteri Markkola',
      title: 'PETTERIN BLOGI',
      url: 'http://www.helsinki.fi',
      username: 'petterim',
      user: {
        realName: 'Testi testi',
        username: 'testitesti'
      },
      props: {
        username: 'askdlsad'
      }
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler} />)
    console.log(blogComponent.debug())

  })
})