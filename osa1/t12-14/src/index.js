import React from 'react'
import ReactDOM from 'react-dom'

function number(previous) {
    var random
    do {
        random = Math.floor((Math.random() * anecdotes.length - 1) + 1)
    } while (random === previous)
    return random
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0,0,0,0,0,0],
        }
    }

    klik() {
        var random = number(this.state.selected)
        this.setState({ selected: random })
        console.log('klik random: ' + random)
    }

    vote() {
        var kopio = this.state.votes.slice()
        kopio[this.state.selected] += 1
        this.setState({ votes: kopio })
    }

    onkoYkkonen(indeksi) {
        if (this.state.votes[indeksi] === 1) {
            return 'vote'
        }
        return 'votes'
    }

    onkoTyhja() {
        var onkoTyhja = 0
        for (var i = 0; i < this.state.votes.length; i++) {
            if (this.state.votes[i] > onkoTyhja) onkoTyhja = this.state.votes[i]
        }
        if (onkoTyhja > 0) return false
        return true
    }

    suurin() {
        if (this.onkoTyhja()) {
            return (
                <p>not a single vote given</p>
            )
        }

        var indeksi = 0
        var suurin = 0

        for (var i = 0; i < this.state.votes.length; i++) {
            if (this.state.votes[i] > suurin) {
                suurin = this.state.votes[i]
                indeksi = this.state.votes.indexOf(suurin)
            }
        }

        return (
            <div>
                <p>{this.props.anecdotes[indeksi]}</p>
                <p>has {this.state.votes[indeksi]} {this.onkoYkkonen(indeksi)}</p>
            </div>
        )
    }

    votes() {
        return <p>has {this.state.votes[this.state.selected]} {this.onkoYkkonen(this.state.selected)}</p>
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                {this.votes()}
                <button onClick={() => this.vote()}>vote</button>
                <button onClick={() => this.klik()}>next anecdote</button>
                <h1>anecdote with most votes given</h1>
                {this.suurin()}
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)