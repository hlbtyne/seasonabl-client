const baseUrl = 'http://localhost:3001'
const loginUrl = baseUrl + '/login'
const validateUrl = baseUrl + '/validate'

export function login (name, password) {
	return fetch(loginUrl, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    }).then(resp => resp.json())
}

export function validate () {
    return fetch(validateUrl, {
        headers: { 'Authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export default { login, validate }
