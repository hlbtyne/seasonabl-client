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

export function getRecipeDetails (recipeId) {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`
    return fetch(url, {
        headers: {
            "X-RapidAPI-Host": 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com', 
            "X-RapidAPI-Key": '72161c23c9mshff16fb4cfa94eb4p14ebaejsn587b8503e8d3'
        }
    }).then(resp => resp.json())
}

export default { login, validate, getRecipeDetails }
