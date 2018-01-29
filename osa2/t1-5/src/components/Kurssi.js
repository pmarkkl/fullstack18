import React from 'react'

const Kurssi = ({ kurssit }) => {
    const Otsikko = ({ otsikko }) => <h1>{otsikko}</h1>
    const Osa = ({ nimi, tehtavia }) => <div><p>{nimi} {tehtavia}</p></div>
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

    return (
        <div>
            <Otsikko otsikko='Opetusohjelma' />
            {kurssit.map(kurssi => <Sisalto key={kurssi.id} kurssi={kurssi} />)}
        </div>
    )
}

export default Kurssi