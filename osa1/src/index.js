import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensa {props.tehtavaa} tehtävää</p>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osa} tehtavia={props.tehtavia} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <Otsikko otsikko={kurssi} />
            <Sisalto osa={osat[0].nimi} tehtavia={osat[0].tehtavia} />
            <Sisalto osa={osat[1].nimi} tehtavia={osat[1].tehtavia} />
            <Sisalto osa={osat[2].nimi} tehtavia={osat[2].tehtavia} />
            <Yhteensa tehtavaa={osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)