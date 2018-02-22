const listHelper = require('../utils/list_helper')
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
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('4.4-4.7', () => {
  test('4.1 totalLikes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(11)
  })
  test('4.5 favoriteBlog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({ title: 'Go To Statement Considered Harmful',  author: 'Edsger W. Dijkstra', likes: 5 })
  })
})