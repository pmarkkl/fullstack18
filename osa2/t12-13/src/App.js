import React from 'react'
import axios from 'axios'

const Input = ({text, value, onChange}) => {
    return (
        <div>
            {text} <input value={value} onChange={onChange} />
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        filter: '',
        showOne: '',
        countries: [],
        showAll: true
    }
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    console.log('filter: ', this.state.filter)
    this.setState({filter: event.target.value})
  }

  handleClick = (event) => {
      console.log('country clicked', event.numericCode)
      this.setState({ filter: event.name })
  }

  filterCountries = () => {
    const filtered = this.state.countries.filter(country => country.name.toString().toLowerCase().includes(this.state.filter.toString().toLowerCase()))
    if (filtered.length > 1 && filtered.length < 11) {
        return (
            <div>
                {filtered.map(country => <p key={country.numericCode} onClick={this.handleClick.bind(this,country)}>{country.name} numeric code: {country.numericCode}</p>)}
            </div>
        )
    } else if (filtered.length === 1) {
        return (
            <div>
                {filtered.map(country => 
                <div key={country.numericCode}>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <img src={country.flag} alt="flag"/>
                </div>)}
            </div>
        )
    } else {
        return (
            <div>
                too many matches, specify another filter
            </div>
        )
    }
  }

render() {
    console.log('render')
    return (
      <div>
          <h1>Countries</h1>
          <Input text='find countries: ' value={this.state.filter} onChange={this.handleFilterChange} />
          {this.filterCountries()}
      </div>
    )
  }
}

export default App
