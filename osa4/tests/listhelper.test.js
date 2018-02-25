const testHelper = require('../utils/testhelper')
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 4,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  }
]

describe('dummy is called', () => {
  test('calling of the dummy', () => {
    const result = testHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('4.4-4.7', () => {
  test('4.4 totalLikes', () => {
    const result = testHelper.totalLikes(blogs)
    expect(result).toBe(11)
  })
  test('4.5 favoriteBlog', () => {
    const result = testHelper.favoriteBlog(blogs)
    expect(result).toEqual({ title: 'Go To Statement Considered Harmful',  author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('4.6 mostBlogs', () => {
    const result = testHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })
  test('4.7 mostLikes', () => {
    const result = testHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 7 })
  })
})