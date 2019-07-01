import React from "react";
import { Link } from 'react-router-dom'
import '../css/App.css'

class LandingPage extends React.Component {

    render() {

        return (
            <div className="navbar">
                <Link to='/foods'>
                    <img className="logo" src="logo/1.png" alt="logo"/>
                </Link>
                <Link to='/shoppinglist'><div className="nav-button">My shopping list</div></Link>
                {
                    this.props.username
                        ? <div className="nav-button"><Link onClick={this.props.logout}>Log out</Link></div>
                        : <div>
                            <div className="nav-button"><Link to='/login'>Log in</Link></div>
                            <div className="nav-button"><Link to='/signup'>Sign up</Link></div>
                        </div>
                }
            </div>
        )
    }
}

export default LandingPage;
