import config from '../config'

const PetfulService = {
    getPeople() {
        return fetch(`${config.API_ENDPOINT}/people`)
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },

    getPets() {
        return fetch(`${config.API_ENDPOINT}/pets`)
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },

    postPerson(name) {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },

    removePetAndPerson(type) {
        return fetch(`${config.API_ENDPOINT}/pets`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ type })
        })
    }
}

export default PetfulService