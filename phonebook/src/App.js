import React, { useState } from 'react'
import './App.css';

const Heading = ({text}) => <h2>{text}</h2>

const PhonebookEntry = ({person}) => <p>{person.name} {person.number}</p>

const Phonebook = ({persons}) => persons.map(person => 
                                <PhonebookEntry key={person.name} person={person} /> )

const PhonebookForm = ({submitHandle, nameHandle, numberHandle, name, number}) => {

  return(
    <form onSubmit={submitHandle}>
        <div>
          name: <input value={name} onChange={nameHandle}/>
        </div>
        <div>
          number: <input value={number} onChange={numberHandle}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Search = ({searchHandle, text}) => <>{text}<input onChange={searchHandle}/></>

const App = () => {

  const [personsDefault, setPersonsDefault] = useState([
    { name: 'Arto Hellas',
      number: '0123456789',
    }
  ]) 
  const [persons, setPersons] = useState([...personsDefault])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = personsDefault.some(person => person.name === newName)
    
    if(nameExists){
      
      alert(`${newName} is already in the phonebook`)
      
    }
    else{
      const personObject = { name: newName, number: newNumber }

      setPersonsDefault(personsDefault.concat(personObject))
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)

  const searchChange = (event) => {
    
    const searchName = event.target.value.toLowerCase()
    
    setPersons(personsDefault.filter(person => person.name.toLowerCase().includes(searchName)))
  }

  return (
    <div>
      <Heading text="Phonebook" />
      <Search searchHandle={searchChange} text="search for"/>

      <Heading text="Add new entry" />
      <PhonebookForm submitHandle={addPerson}
                    nameHandle={nameChange}
                    numberHandle={numberChange}
                    name={newName}
                    number={newNumber}/>

      <Heading text="Numbers" />
      <Phonebook persons={persons}/>
    </div>
  )
}


export default App;
