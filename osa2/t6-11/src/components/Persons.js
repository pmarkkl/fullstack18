import React from 'react'

const Persons = ({ renderoitavat, removeName }) => {
    return (
      renderoitavat.map(person => 
        <table key={person.id}>
          <tbody>
            <tr>
              <td style={{width: 175}}>{person.name}</td>
              <td style={{width: 125}}>{person.number}</td>
              <td><button key={person.id} type="submit" onClick={() => removeName(person)}>poista</button></td>
            </tr>
          </tbody>
        </table>
      )
    )
  }

export default Persons