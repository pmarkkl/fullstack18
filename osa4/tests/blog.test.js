const testHelper = require('../utils/testhelper')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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
})

describe('api tests', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('post for api/blogs with valid input', async () => {
    const blogsBefore = testHelper.blogsInDb
    const testBlog = {
      title: 'Jamin kalablogi',
      author: 'Jami Jaamanka',
      url: 'http://kalablog11.blogspot.com',
      likes: 0
    }

    const res = await api
      .post('/api/blogs')
      .send(testBlog)
      .except(201)
      .except('Content-Type', /application\/json/)

    const blogsAfter = testHelper.blogsInDb

    expect(blogsAfter).toBe(blogsBefore+1)
    expect(res.body.title).toBe('Jamin kalablogi')
    expect(res.body.author).toBe('Jami Jaamanka')
    expect(res.body.url).toBe('http://kalablog11.blogspot.com')
    expect(res.body.likes).toBe(0)
  })

  test('likes set to zero', async () => {
    const testBlog = {
      title: 'Kuhasoppaa yms. mahtavia herkkuja',
      author: 'Pohjois-pohjanmaan Martat',
      url: 'http://jeeblogi.martat.fi'
    }

    const res = await api
      .post('/api/blogs')
      .send(testBlog)
    expect(res.body.likes).toBe(0)
  })
  test('sending a post request without title and url', async () => {
    const testBlog = {
      author: 'Petteri Markkola'
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)
  })
})

afterAll(() => {
  server.close()
})