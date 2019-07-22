import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../css/LandingPage.css'
import step1 from '../images/step1-bw.png'
import step2 from '../images/step2-bw.png'
import step3 from '../images/step3-bw.png'

class LandingPage extends Component {

    render() {
        
        return (
            <div>
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
                <div className="diagram-container">
                    <div className="three-step-diagram">
                        <div className="step">
                            <img src={step1} alt="fruit tree icon" className="step-image" />
                        </div>
                        <div className="step">
                            <img src={step2} alt="basket of fruit icon" className="step-image" />
                        </div>
                        <div className="step">
                            <img src={step3} alt=" green planet icon" className="step-image" />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default LandingPage;

