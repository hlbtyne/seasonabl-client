import React from "react";
import { login } from '../services/api'

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
            <div>
              <form>
                  <div>
                    <label htmlFor="name"><p>Username</p></label>
                    <input
                        onChange={handleChange}
                        name="name"
                        value={name}
                        placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password"><p>Password</p></label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                    />
                  </div>
                  <button onClick={handleSubmit} type="button">
                    Log in
                  </button>
                </form>
            </div>
              
        );
    }
}

export default LoginForm;
