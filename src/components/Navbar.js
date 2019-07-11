import React, { Fragment, Component } from "react";
import { Link } from 'react-router-dom'
import '../css/App.css'

class LandingPage extends Component {

    render() {

        return (
            <div className="navbar">
                {
                    this.props.username
                        ? <Fragment>
                            <Link to='/foods'>
                                <img className="logo" src="logo/1.png" alt="logo"/>
                            </Link>
                            <Link to='/foods'>
                                <div className="nav-button">
                                    Seasonal foods
                                </div>
                            </Link>
                            <Link to='/shoppinglist'>
                                <div className="nav-button">
                                    Shopping list
                                </div>
                            </Link>
                        </Fragment>
                        : <Link to='/'>
                            <img className="logo" src="logo/1.png" alt="logo"/>
                        </Link>
                }
                
                
                {
                    this.props.username
                        ? <div className="nav-button sessions"><Link onClick={this.props.logout}>Log out</Link></div>
                        : <div className="sessions">
                            <div className="nav-button"><Link to='/login'>Log in</Link></div>
                            <div className="nav-button"><Link to='/signup'>Sign up</Link></div>
                        </div>
                }
            </div>
        )
    }
}

export default LandingPage;
