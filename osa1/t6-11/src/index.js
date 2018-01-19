import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}



const Statistic = ({ text, hyva, neutraali, huono }) => {
    const keskiarvo = ((hyva + (huono * -1)) / (hyva + neutraali + huono)).toFixed(1)
    const positiivisia = ((hyva / (hyva + neutraali + huono)) * 100).toFixed(1)
    if (hyva === 0 && neutraali === 0 && huono === 0) {
        return (
            <div></div>
        )
    } else {
        if (text === 'positiivisia') {
            if (isNaN(positiivisia)) {
                return <div>{text}: 0 %</div>
            }
            return <div>{text}: {positiivisia} %</div>;
        } else {
            if (isNaN(keskiarvo)) {
                return <div>{text}: 0</div>;
            }
            return <div>{text}: {keskiarvo}</div>;
        }
    }
}

const Statistics = ({ hyva, neutraali, huono }) => {
    if (hyva === 0 && neutraali === 0 && huono === 0) {
        return (
            <div>ei yhtään palautetta annettu</div>
        )
    } else {
        return (
            <div>
                <p>hyvä: {hyva}</p>
                <p>neutraali: {neutraali}</p>
                <p>huono: {huono}</p>
            </div>
        )
    }
}

const Otsikko = ({ otsikko }) => {
    return (
        <div>
            <h1>{otsikko}</h1>
        </div>
    )
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
        return (
            <div>
                <Otsikko otsikko='anna palautetta' />
                <Button handleClick={this.asetaArvoon('hyvä')} text='hyvä' />
                <Button handleClick={this.asetaArvoon('neutraali')} text='neutraali' />
                <Button handleClick={this.asetaArvoon('huono')} text='huono' />
                <Otsikko otsikko='statistiikka' />
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
                <Statistic text='keskiarvo' hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
                <Statistic text='positiivisia' hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)