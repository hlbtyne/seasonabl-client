import React, { Component } from 'react';
import '../App.css';
import { Route, withRouter } from 'react-router-dom'

import Navbar from './Navbar'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import LandingPage from './LandingPage'
import FoodPage from './foods/FoodPage';

import { validate } from '../services/api'

class App extends Component {

  state = {
    username: ''
  }

  login = (user) => {
    this.setState({ username: user.name })
    this.props.history.push("/foods")
    localStorage.setItem('token', user.token)
  }

  logout = () => {
    this.setState({ username: '' })
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

  render() {
    const { login, logout } = this
    const { username } = this.state
    return (
      <div>
        <Navbar username={username} logout={logout}/>
        <Route exact path='/foods' component={props => <FoodPage username={username} {...props} />} />
        <Route exact path='/' component={() => <LandingPage />} />
        <Route path='/login' component={props => <LoginForm login={login} {...props} />} />
        <Route path='/signup' component={() => <SignupForm />} />
      </div>
        
    )
  }
}

export default withRouter(App);
