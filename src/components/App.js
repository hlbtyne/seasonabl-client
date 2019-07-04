import React, { Component } from 'react';
import '../css/Navbar.css';
import { Route, withRouter } from 'react-router-dom'

import Navbar from './Navbar'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import LandingPage from './LandingPage'
import FoodPage from './foods/FoodPage'
import ShoppingList from './ShoppingList'

import { validate } from '../services/api'

const baserURL = "http://localhost:3001"
const usersURL = `${baserURL}/users`
const foodsURL = `${baserURL}/foods`
const monthsURL = `${baserURL}/months`
const shoppingListURL = `${baserURL}/shopping_list_items`

class App extends Component {

  state = {
    foods: [],
    username: '',
    currentUser: null,
    shoppingList: [],
    months: [],
    currentMonth: '',
  }

  signup = (event, user) => {
    event.preventDefault()
    const newUser = {
      name: user.name,
      password: user.password
    }
    this.createNewUserBackend(newUser)
    .then(user => this.login(user))
  }

  createNewUserBackend = user => {
    return fetch(usersURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
  }

  login = user => {
    this.setState({ username: user.name })
    this.setState({ currentUser: user })
    this.props.history.push("/foods")
    localStorage.setItem('token', user.token)
    this.updateShoppingList(user)
  }

  logout = () => {
    this.setState({ username: '' })
    this.setState({ currentUser: null })
    this.setState({ shoppingList: [] })
    this.props.history.push("/")
    localStorage.removeItem('token')
  }

  componentDidMount = () => {
    if (localStorage.token) {
      validate()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.login(data)
          this.setMonth()
          return fetch(foodsURL)
            .then(resp => resp.json())
            .then(foods => this.setState({ foods }))
        }
      })
    }
  }

  addItemToList = food => {
    if (!this.state.shoppingList.find(f => f.name === food.name)) {

      this.findCurrentUser(this.state.currentUser)
      .then(user => {
        const newListItem = {
          food_id: food.id,
          user_id: user.id
        }
        this.createShoppingListItemBackend(newListItem)
        this.findIteminFoods(newListItem)})
    }
  }

  findIteminFoods = (item) => {
    const selectedFood = this.state.foods.find(f => f.id === item.food_id)
    this.setState({ shoppingList: [...this.state.shoppingList, selectedFood] })
  }

  createShoppingListItemBackend = item => {
    return fetch(shoppingListURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    })
    .then(resp => resp.json())
  }

  removeItemFromList = food => {
    const remainingFoods = this.state.shoppingList.filter(f => f.id !== food.id)
    setTimeout(() => this.setState({ shoppingList: remainingFoods }), 800);
    
    this.findCurrentUser(this.state.currentUser)
      .then(user => {
        return fetch(shoppingListURL)
        .then(resp => resp.json())
        .then(items => {
          const item = items.find(i => i.user_id === user.id && i.food_id === food.id)
          this.removeShoppingListItemBackend(item)
        })
      })
    }

  removeShoppingListItemBackend = item => {
    fetch(`${shoppingListURL}/${item.id}`, {
      method: 'DELETE',
    })
    .then(resp => resp.json())
  }

  findCurrentUser = user => {
    return fetch(usersURL)
    .then(resp => resp.json())
    .then(users => users.find(u => 
      u.name === user.name
    ))
  }

  updateShoppingList = user => {
    this.findCurrentUser(user)
    .then(user => this.setState({ shoppingList: user.foods }))
  }

  setMonth = () => {
    const today = new Date()
        fetch(monthsURL)
            .then(resp => resp.json())
            .then(months => {
                this.setState({ months })
                this.setState({ currentMonth: months[today.getMonth()] })
            })
  }

  

  render() {
    const { login, logout } = this
    const { username } = this.state
    return (
      <div>
        <Navbar username={username} logout={logout}/>
        <Route path='/foods' component={props => <FoodPage username={username} addItemToList={this.addItemToList} foods={this.state.foods} months={this.state.months} currentMonth={this.state.currentMonth} {...props} />} />
        <Route path='/shoppinglist' component={props => <ShoppingList shoppingList={this.state.shoppingList} username={username} removeItem={this.removeItemFromList} {...props} />} />
        <Route exact path='/' component={props => <LandingPage {...props} />} />
        <Route path='/login' component={props => <LoginForm login={login} {...props} />} />
        <Route path='/signup' component={() => <SignupForm signup={this.signup} />} />
      </div>
        
    )
  }
}

export default withRouter(App);
