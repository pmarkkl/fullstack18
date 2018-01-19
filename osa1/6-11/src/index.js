import React from 'react'
import ReactDOM from 'react-dom'

class Nappi {
    constructor(props) {
        this.luku = 0
    }
    kasvataLukua() {
        this.luku += 1
    }
    palautaTeksti() {
        return this.teksti
    }
}

const App = () => {

    const a = new Nappi('hyvä')
    const b = new Nappi('neutraali')
    const c = new Nappi('huono')

    return (
        <div>
            <h1>anna palautetta</h1>
            <button onClick={(a.kasvataLukua)}>
                {a.palautaTeksti()}
            </button>
            <button>
                {b.palautaTeksti()}
            </button>
            <button>
                {c.palautaTeksti()}
            </button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)