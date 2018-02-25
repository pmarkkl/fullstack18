const testHelper = require('../utils/testhelper')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

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