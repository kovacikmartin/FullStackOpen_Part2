import React from 'react'

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

export default PhonebookForm