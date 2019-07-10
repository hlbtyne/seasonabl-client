import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../css/LandingPage.css'

class LandingPage extends Component {

    render() {
        
        return (
            <div className="banner">
                <img src={this.props.currentMonth.image} alt="" className="bannerImage" />
                <div className="content">
                    <div className="text-container">
                        <div className="text">Know what's in season.</div>
                        <div className="text">Rely less on imported foods.</div>
                        <div className="text">Eat seasonably.</div>
                    </div>
                    <div className="buttons-container">
                        <Link to='/foods'><button className="button browse">Browse foods</button></Link>
                        <Link to='/signup'><button className="button">Sign up</button></Link>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LandingPage;

