import React, { useState, useEffect } from 'react'
import './App.css';
import phonebookService from './services/phonebook'
import Heading from './components/Heading'
import Phonebook from './components/Phonebook'
import PhonebookForm from './components/PhonebookForm'
import Notification from './components/Notification'
import Search from './components/Search'


const App = () => {

  const [personsDefault, setPersonsDefault] = useState([]) 
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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

            setMessage(`Number of ${newName} has been changed`)
            setMessageType('success')
          })
          .catch(error => {
            
            setMessage(`Information of ${newName} has already been removed from the server`)
            setMessageType('error')
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

          setMessage(`Added ${newName}`)
          setMessageType('success')
        })
    }

    setTimeout(() => {
          
      setMessage('')
      setMessageType('')
    }, 4000)

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
      <Notification message={message} type={messageType}/>
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