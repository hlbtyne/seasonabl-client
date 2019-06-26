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
            <div>
              <form>
                  <div>
                    <label htmlFor="name"><p>Username</p></label>
                    <input
                        onChange={handleChange}
                        name="name"
                        value={name}
                        placeholder="Enter a username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password"><p>Password</p></label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Create a password"
                    />
                  </div>
                  <button onClick={handleSubmit} type="button">
                    Register
                  </button>
                </form>
            </div>
              
        );
    }
}

export default SignupForm;