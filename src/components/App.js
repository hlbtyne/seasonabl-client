import React, { Component } from 'react';
import '../css/Navbar.css';
import { Route, withRouter } from 'react-router-dom'

import Navbar from './Navbar'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import LandingPage from './LandingPage'
import FoodPage from './foods/FoodPage';
import ShoppingList from './ShoppingList'

import { validate } from '../services/api'

const baserURL = "http://localhost:3001"
const usersURL = `${baserURL}/users`

class App extends Component {

  state = {
    username: '',
    currentUser: null,
    shoppingList: []
  }

  login = (user) => {
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
        }
      })
    }
  }

  addItemToShoppingList = item => {
    
  }

  updateShoppingList = user => {
    return fetch(usersURL)
    .then(resp => resp.json())
    .then(users => users.find(u => 
      u.name === user.name
    ))
    .then(user => this.setState({ shoppingList: user.foods }))
  }

  render() {
    const { login, logout } = this
    const { username } = this.state
    return (
      <div>
        <Navbar username={username} logout={logout}/>
        <Route path='/foods' component={props => <FoodPage username={username} {...props} />} />
        <Route path='/shoppinglist' component={props => <ShoppingList shoppingList={this.state.shoppingList}/>} />
        <Route exact path='/' component={() => <LandingPage />} />
        <Route path='/login' component={props => <LoginForm login={login} {...props} />} />
        <Route path='/signup' component={() => <SignupForm />} />
      </div>
        
    )
  }
}

export default withRouter(App);
