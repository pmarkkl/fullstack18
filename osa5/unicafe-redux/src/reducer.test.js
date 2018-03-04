import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it ('incremeting state with > 0 values', () => {
    const state = {
      good: 5,
      ok: 4,
      bad: 4
    }
    const action = {
      type: 'BAD'
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 5
    })
    
    const anotherAction = {
      type: 'BAD'
    }

    deepFreeze(newState)
    const anotherState = counterReducer(newState, anotherAction)
    expect(anotherState).toEqual({
      good: 5,
      ok: 4,
      bad: 6
    })

  })

})