import React from 'react'
import { shallow } from 'enzyme'
import Blog from './components/Blog'
jest.mock('./services/blogs.js')

describe.only('<SimpleBlog />', () => {
  it('SimpleBlog test', () => {
    const blog = {
      title: 'MeiZin Blogi',
      author: 'Petteri Markkola',
      likes: 0
    }
    blog.user = {
      realName: 'Kalle Kala'
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler} />)
    console.log(blogComponent.debug())

  })
})