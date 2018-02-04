import React from 'react'

const Osa = ({ nimi, tehtavia }) => <p>{nimi} {tehtavia}</p>
const Otsikko = ({ otsikko }) => <h1>{otsikko}</h1>
const Sisalto = ({ kurssi }) => {
    let kokonaismaara = kurssi.osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            {kurssi.osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
            <p>yhteensä {kokonaismaara} tehtävää</p>
        </div>
    )
}

const Kurssi = ({ kurssit }) => {
    return (
        <div>
            <Otsikko otsikko='Opetusohjelma' />
            {kurssit.map(kurssi => <Sisalto key={kurssi.id} kurssi={kurssi} />)}
        </div>
    )
}

export default Kurssi