import React from 'react'

const PersonForm = ({addName, handleNameChange, handleNumberChange, uusiNimi, uusiNumero}) => {
    return (
      <form onSubmit={addName}>
        <table>
            <tbody>
            <tr>
                <td style={{width: 70}}>nimi:</td>
                <td><input value={uusiNimi} onChange={handleNameChange} /></td>
            </tr>
            <tr>
                <td>numero:</td>
                <td><input value={uusiNumero} onChange={handleNumberChange} /></td>
            </tr>
            </tbody>
        </table>
          <button type="submit">lisää</button>
      </form>
    )
  }

export default PersonForm