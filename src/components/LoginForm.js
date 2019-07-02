import React from "react";
import { login } from '../services/api'
import '../css/LoginSignup.css'

class LoginForm extends React.Component {
    state = {
        name: '',
        password: ''
    }

    handleSubmit = () => {
        login(this.state.name, this.state.password)
          .then(data => {
            if (data.error) {
              alert(data.error)
            } else {
              this.props.login(data)
            }
          })
      }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    render() {
        const { name, password } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <div className="login-view">
              <form className="form">
                  <div>
                    <div className="label"><p>Username</p></div>
                    <input
                        onChange={handleChange}
                        name="name"
                        value={name}
                        className="input"
                        placeholder="Enter username"
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
                        placeholder="Password"
                    />
                  </div>
                  <button className="button" onClick={handleSubmit} type="button">
                    Log in
                  </button>
                </form>
            </div>
              
        );
    }
}

export default LoginForm;
