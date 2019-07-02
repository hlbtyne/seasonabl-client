import React from "react";

class SignupForm extends React.Component {

    state = {
        name: '',
        password: ''
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
              <button className="button" onClick={handleSubmit} type="button">
                Sign up
              </button>
            </form>
        </div>
              
        );
    }
}

export default SignupForm;