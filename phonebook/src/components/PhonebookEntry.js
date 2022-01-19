import React from 'react'

const PhonebookEntry = ({person, deleteHandle}) => {

    return(
      <div>
        <span>{person.name} {person.number}</span>
        <button type="button" onClick={() => deleteHandle(person.id, person.name)}>delete</button>
      </div>
    )
} 

export default PhonebookEntry