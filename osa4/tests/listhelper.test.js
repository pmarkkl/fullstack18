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

/*test('dummy is called', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})*/

describe('total likes', () => {
  test('finding out combined amount of likes from every blog', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(11)
  })
})

describe('favorite blog', () => {
  test('finding out the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({ title: 'Go To Statement Considered Harmful',  author: 'Edsger W. Dijkstra', likes: 5 })
  })
})