import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = person => {

    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const remove = id => {

    return axios.delete(`${baseUrl}/${id}`)
}

const changeNumber = (person) => {

    const id = person.id
    return axios.put(`${baseUrl}/${id}`, person)
}

export default { getAll, create, remove, changeNumber }