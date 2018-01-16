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
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko otsikko={kurssi} />
            <Sisalto osa={osa1} tehtavia={tehtavia1} />
            <Sisalto osa={osa2} tehtavia={tehtavia2} />
            <Sisalto osa={osa3} tehtavia={tehtavia3} />
            <Yhteensa tehtavaa={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)