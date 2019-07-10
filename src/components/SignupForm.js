import React from "react";
import { login } from '../services/api'


const baserURL = "http://localhost:3001"
const usersURL = `${baserURL}/users`

class SignupForm extends React.Component {

    state = {
        name: '',
        password: ''
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
      event.preventDefault()
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
        const { name, password } = this.state
        const { handleChange, handleSubmit } = this

        return (
          <div className="login-view">
          <form onSubmit={(event) => this.props.signup(event, this.state)} className="form">
              <div>
                <div className="label"><p>Username</p></div>
                <input
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
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={password}
                    className="input"
                    placeholder="Type a password"
                />
              </div>
              <button className="button" onClick={handleSubmit} type="submit">
                Sign up
              </button>
            </form>
        </div>
              
        );
    }
}

export default SignupForm;