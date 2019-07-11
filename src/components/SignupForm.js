import React from "react";
import { Link } from 'react-router-dom'
import { login } from '../services/api'


const baserURL = "http://localhost:3001"
const usersURL = `${baserURL}/users`

class SignupForm extends React.Component {

    state = {
        name: '',
        password: '',
        passwordConf: ''
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.password === this.state.passwordConf) {
        const newUser = {
          name: this.state.name,
          password: this.state.password
        }
        this.createNewUserBackend(newUser)
        .then(() => login(this.state.name, this.state.password)
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.props.login(data)
          }
        }))
      } else {
        alert("Passwords do not match")
      }
    }
  
    createNewUserBackend = user => {
      return fetch(usersURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      .then(resp => resp.json())
    }

    render() { 
        const { name, password, passwordConf } = this.state
        const { handleChange, handleSubmit } = this

        return (
          <div className="login-view">
            <div className="title">Sign up</div>
            <form onSubmit={(event) => this.props.signup(event, this.state)} className="form">
                <div>
                  <div className="label"><p>Username</p></div>
                  <input
                      required
                      onChange={handleChange}
                      name="name"
                      value={name}
                      className="input"
                      placeholder="Create a username"
                  />
                </div>
                <div>
                  <div className="label"><p>Password</p></div>
                  <input
                      required
                      onChange={handleChange}
                      type="password"
                      name="password"
                      value={password}
                      className="input"
                      placeholder="Type a password"
                  />
                </div>
                <div>
                  <div className="label"><p>Password confirmation</p></div>
                  <input
                      required
                      onChange={handleChange}
                      type="password"
                      name="passwordConf"
                      value={passwordConf}
                      className="input"
                      placeholder="Type it again"
                  />
                </div>
                <button className="login-button" onClick={handleSubmit} type="submit">
                  Sign up
                </button>
                <Link to='/login'><div className="switch-form">Know us already? Log in</div></Link>
            </form>
          </div>
              
        );
    }
}

export default SignupForm;