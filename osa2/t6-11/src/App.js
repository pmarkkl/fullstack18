import React from 'react';
import personsService from './services/persons'
import FilterInput from './components/FilterInput'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      uusiNimi: '',
      uusiNumero: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    console.log('did mount')
    personsService
      .getAll()
      .then(response => {
        console.log(response.data)
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  addName = (event) => {
    event.preventDefault()
    const nimiObjekti = {
      name: this.state.uusiNimi,
      number: this.state.uusiNumero
    }
    /* lisää henkilö */
    if (!this.state.persons.some(person => person.name === nimiObjekti.name)) {
      personsService
        .create(nimiObjekti)
        .then(response => {
          this.setState({persons: this.state.persons.concat(response.data), uusiNimi: '', uusiNumero: '', message: `Henkilö ${nimiObjekti.name} lisätty`})
        })
        this.timeOut()
    /* päivitä henkilö */
    } else {
      const rightPerson = this.state.persons.find(person => person.name === nimiObjekti.name)
      window.confirm(`${nimiObjekti.name} on jo luettelossa, korvataanko numero?`)
      personsService
        .update(rightPerson.id, nimiObjekti)
        .then(response => {
          personsService
          .getAll()
          .then(response => {
            this.setState({ persons: response.data, uusiNimi: '', uusiNumero: '', message: `Henkilön ${rightPerson.name} numero päivitetty`})
          })
        })
        /* erroria pukkaa: henkilö poistettu toisessa paikassa, lisätään uusiksi */
        .catch(error => {
          /* filteröidään nimen perusteella (???) */
          this.setState({ persons: this.state.persons.filter(person => person.name !== nimiObjekti.name) })       
          personsService
            .create(nimiObjekti)
            .then(response => {
              this.setState({persons: this.state.persons.concat(response.data), message: `Henkilö ${nimiObjekti.name} oli poistettu palvelimelta, lisättiin uudestaan`, 
              uusiNimi: '', uusiNumero: ''})
            })

        })
        this.timeOut()
    }
  }

  timeOut() {
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }

  removeName = (person) => {
    const confirmation = window.confirm(`poistetaanko ${person.name} ?`)
    if (confirmation) {
      personsService
      .deletePerson(person)
      .then((response) => {
        personsService
        .getAll()
        .then(response => {
            this.setState({ persons: response.data, message: `Henkilö ${person.name} poistettu` })
        })
      })
      this.timeOut()
    }
  }

  handleNameChange = (event) => {
    this.setState({ uusiNimi: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ uusiNumero: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    console.log('render')
    const renderoitavat = this.state.persons.filter(person => person.name.toString().toLowerCase().includes(this.state.filter.toString().toLowerCase()))
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.message} />
        <FilterInput text='rajaa näytettäviä:' value={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <PersonForm addName={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} uusiNimi={this.state.uusiNimi} uusiNumero={this.state.uusiNumero} />
        <h2>Numerot</h2>
        <Persons renderoitavat={renderoitavat} removeName={this.removeName}/>
      </div>
    )
  }
}

export default App