import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css';

const Search = ({searchHandle, text}) => {

  return(
    <div>
      {text} <input onChange={searchHandle}/>
    </div>
  )
}

const Countries = ({countries, detailHandle}) => {

  if(countries.length > 10){

    return(
      <p>Too many matches, please specify</p>
    )
  }
  else if(countries.length > 1 && countries.length <= 10){

    return(
      
      countries.map(country => {
        return(
          <p key={country.name.common}>
            <span >{country.name.common}</span>
            <button onClick={() => detailHandle(country.name.common)}>show details</button>
          </p>
        )
      })
    )
  }
  else if(countries.length === 1){
    
    return(
      <Country country={countries[0]} />
    )
  }
 
  // empty search
  return(
    <></>
  )
}

const Country = ({country}) => {
  
  return(
    <>
      <h3>{country.name.common}</h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h4>languages</h4>
      <ul>{Object.entries(country.languages).map(([short, full]) => <li key={short}>{full}</li>)}</ul>
      <img src={country.flags.png} alt={country.name.common + ' flag'} width="150" height="100"/>
 
    </>
  )
}

const App = () => {

  const [countriesDefault, setCountriesDefault] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {

    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {

        setCountriesDefault(response.data)
      })
      
  }, [])

  const searchChange = (event) => {

    if(event.target.value.length === 0){
      setCountries(0)
    }
    else{

      const searchCountryName = event.target.value.toLowerCase()
      setCountries(countriesDefault.filter(country => country.name.common.toLowerCase().includes(searchCountryName)))
    }
  }

  const showDetails = (countryName) => setCountries(countriesDefault.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase())))

  return (
    <div>
      <Search searchHandle={searchChange} text="Find country"/>
      <div>
        <Countries countries={countries} detailHandle={showDetails}/>
      </div>
    </div>
  );
}

export default App;