import React from 'react';
import Kurssi from './components/Kurssi'

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    },
    {
      nimi: 'BASIC',
      id: 3,
      osat: [
        {
          nimi: 'Johdatus',
          tehtavia: 5,
          id: 1
        }
      ]
    },
    {
      nimi: 'Jeejee',
      id: 4,
      osat: [
        {
          nimi: 'Juu',
          tehtavia: 10,
          id: 1
        }
      ]
    }
  ]

  return (
    <div>
      <Kurssi kurssit={kurssit} />
    </div>
  )
}

export default App