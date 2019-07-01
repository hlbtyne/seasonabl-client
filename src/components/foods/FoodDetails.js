import React from "react";
import '../../css/FoodDetails.css'
import { Link } from 'react-router-dom'

const foodsAPI = 'http://localhost:3001/foods'

class FoodDetails extends React.Component {

    state = {
        id: null,
        name: '',
        image: '',
        created_at: '',
        updated_at: ''
    }

    componentDidMount() {
        fetch(`${foodsAPI}/${this.props.id}`)
        .then(resp => resp.json())
        .then(data => this.setState(data))
    }

    render() {

        return (
            <div>
                <div className="food-details-header">
                    <img className="food-details-header-image" src={this.state.image} alt={this.state.name}/>
                    <div className="food-details-header-text">{this.state.name}</div>
                </div>
                <Link to='/foods'><button>Back</button></Link>
            </div>
        )
    }
}

export default FoodDetails;
