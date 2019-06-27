import React from "react";
import FoodContainer from './FoodContainer'
import FoodDetails from './FoodDetails'
import '../../css/FoodPage.css'

const foodsAPI = 'http://localhost:3001/foods'

class FoodPage extends React.Component {

    state = {
        foods: []
    }

    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
        fetch(foodsAPI)
            .then(resp => resp.json())
            .then(foods => this.setState({ foods })
        )
    }

    render() {

        return (
            <div>
                <div className="food-page">Welcome to seasonabl, {this.props.username}!</div>
                < FoodContainer foods={this.state.foods} />
                < FoodDetails />
            </div>
        )
    }
}

export default FoodPage;
