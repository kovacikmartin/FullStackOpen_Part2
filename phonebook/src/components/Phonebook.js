import React from 'react'
import PhonebookEntry from './PhonebookEntry'

const Phonebook = ({persons, deleteHandle}) => persons.map(person => 
    <PhonebookEntry key={person.number} person={person} deleteHandle={deleteHandle}/> )

export default Phonebook