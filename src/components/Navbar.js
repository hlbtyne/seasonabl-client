import React from "react";

class LandingPage extends React.Component {

    render() {

        return (
            <div>
                <span>seasonabl</span>
                <span>My shopping list</span>
                {
                    this.props.username
                        ? <button onClick={this.props.logout}>Log out</button>
                        : <span>
                            <button>Log in</button>
                            <button>Sign up</button>
                        </span>
                }
            </div>
        )
    }
}

export default LandingPage;
