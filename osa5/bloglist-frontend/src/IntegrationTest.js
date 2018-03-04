import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Note'
jest.mock('./services/notes')
import blogService from './services/notes'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders all notes it gets from backend', () => {
    app.update()
    
  })
})