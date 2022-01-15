import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css';
import phonebookService from './services/phonebook'

const Heading = ({text}) => <h2>{text}</h2>

const PhonebookEntry = ({person, deleteHandle}) => {

  return(
    <div>
      <span>{person.name} {person.number}</span>
      <button type="button" onClick={() => deleteHandle(person.id, person.name)}>delete</button>
    </div>
  )
} 

const Phonebook = ({persons, deleteHandle}) => persons.map(person => 
                                <PhonebookEntry key={person.number} person={person} deleteHandle={deleteHandle}/> )

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

  const [personsDefault, setPersonsDefault] = useState([]) 
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {

    phonebookService
      .getAll()
      .then(persons => {
        setPersonsDefault(persons)
        setPersons(persons)
      })

  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = personsDefault.some(person => person.name === newName)
    
    if(nameExists){
      
      if(window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)){

        const newPerson = personsDefault.find(person => person.name === newName)

        newPerson.number = newNumber

        phonebookService
          .changeNumber(newPerson)
          .then(response => {

            setPersonsDefault(personsDefault.map(person => person.name === newName ? newPerson : person))
            setPersons(persons.map(person => person.name === newName ? newPerson : person))
          })
      }
    }
    else{
      const personObject = { name: newName, number: newNumber }

      phonebookService
        .create(personObject)
        .then(response => {

          personObject.id = response.id
          setPersonsDefault(personsDefault.concat(personObject))
          setPersons(persons.concat(personObject))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    
    if(window.confirm(`Delete ${name} ?`)){

      phonebookService
      .remove(id)
      .then(response => {
    
        const persons = personsDefault.filter(person => person.id !== id)
        setPersonsDefault(persons)
        setPersons(persons)
      })
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
      <Phonebook persons={persons} deleteHandle={deletePerson}/>
    </div>
  )
}


export default App;