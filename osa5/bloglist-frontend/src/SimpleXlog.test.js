import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './components/SimpleBlog'
jest.mock('./services/blogs.js')

describe.only('<SimpleBlog />', () => {
  it('SimpleBlog test', () => {
    const blog = {
      title: 'MeiZin Blogi',
      author: 'Petteri Markkola',
      likes: 0
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    console.log(blogComponent.debug())
    const titleAuthor = blogComponent.find('.titleAuthor')
    const likes = blogComponent.find('.likes')
    expect(titleAuthor.text()).toContain(blog.title)
    expect(titleAuthor.text()).toContain(blog.author)
    expect(likes.text()).toContain('blog has 0 likes')

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)

  })
})