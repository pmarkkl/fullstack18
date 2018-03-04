import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const Statistiikka = () => {

  console.log(store.getState())

  const good = store.getState().good
  const neutral = store.getState().ok
  const bad = store.getState().bad

  const palautteita = good+neutral+bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const ka = () => {
    const sum = good-bad
    return (palautteita === 0 ? 0 : sum / palautteita).toFixed(1)
  }

  const pos = () =>
    (palautteita === 0 ? 0 : 100 * good / palautteita).toFixed(1)

  const emptyStore = () => {
    const action = {
      type: 'ZERO'
    }
    store.dispatch(action)
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ka()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => emptyStore()}>nollaa tilasto</button>
    </div >
  )
}

const render = () => {
  class App extends React.Component {
    klik = (nappi) => () => {
      const action = {
        type: nappi
      }
      store.dispatch(action)
    }
  
    render() {
      return (
        <div>
          <h2>anna palautetta</h2>
          <button onClick={this.klik('GOOD')}>hyvä</button>
          <button onClick={this.klik('OK')}>neutraali</button>
          <button onClick={this.klik('BAD')}>huono</button>
          <Statistiikka />
        </div>
      )
    }
  }
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)