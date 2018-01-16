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
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
    }

    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto osa={kurssi.osat[0].nimi} tehtavia={kurssi.osat[0].tehtavia} />
            <Sisalto osa={kurssi.osat[1].nimi} tehtavia={kurssi.osat[1].tehtavia} />
            <Sisalto osa={kurssi.osat[2].nimi} tehtavia={kurssi.osat[2].tehtavia} />
            <Yhteensa tehtavaa={kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)