import React from 'react'
import ReactDOM from 'react-dom'

const tdStyle = {
    width: '80px'
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Otsikko = ({ otsikko }) => <h1>{otsikko}</h1>

const Statistic = ({ text, lasku }) => {
    if (isNaN(lasku)) {
        return (
            <div></div>
        )
    } else {
        var merkki = '%'
        if (text === 'keskiarvo') {merkki = ''}
        return (
            <div>
                <table>
                <tbody>
                    <tr>
                        <td style={tdStyle}>{text}</td>
                        <td style={tdStyle}>{lasku} {merkki}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

const Statistics = ({ states }) => {
    if (states[0].state === 0 && states[1].state === 0 && states[2].state === 0) {
        return (
            <div>ei yhtään palautetta annettu</div>
        )
    } else {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td style={tdStyle}>hyvä</td>
                            <td>{states[0].state}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>neutraali</td>
                            <td>{states[1].state}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>huono</td>
                            <td>{states[2].state}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
        }
    }

    // ideat loppuivat kesken

    asetaArvoon = (teksti) => {
        return () => {
            if (teksti === 'hyvä') {
                this.setState({ hyva: this.state.hyva + 1 })
                console.log('hyvä on')
            }
            if (teksti === 'neutraali') {
                this.setState({ neutraali: this.state.neutraali + 1 })
                console.log('neutraali on')
            }
            if (teksti === 'huono') {
                this.setState({ huono: this.state.huono + 1 })
                console.log('huono on')
            }
        }
    }



    render() {
        const states = [
            {
                text: 'hyvä',
                state: this.state.hyva
            },
            {
                text: 'neutraali',
                state: this.state.neutraali
            },
            {
                text: 'huono',
                state: this.state.huono
            }
        ]

        const keskiarvo = ((states[0].state + (states[2].state * -1)) / (states[0].state + states[1].state + states[2].state)).toFixed(1)
        const positiivisia = ((states[0].state / (states[0].state + states[1].state + states[2].state))*100).toFixed(1)
        return (
            <div>
                <Otsikko otsikko='anna palautetta' />
                <Button handleClick={this.asetaArvoon('hyvä')} text='hyvä' />
                <Button handleClick={this.asetaArvoon('neutraali')} text='neutraali' />
                <Button handleClick={this.asetaArvoon('huono')} text='huono' />
                <Otsikko otsikko='statistiikka' />
                <Statistics states={states} />
                <Statistic text='keskiarvo' lasku={keskiarvo} />
                <Statistic text='positiivisia' lasku={positiivisia} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)