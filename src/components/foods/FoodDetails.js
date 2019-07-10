import React from "react";
import '../../css/FoodDetails.css'
// import { Link } from 'react-router-dom'

import RecipeCard from './RecipeCard'

const foodsAPI = 'http://localhost:3001/foods'

class FoodDetails extends React.Component {

    state = {
        id: null,
        name: '',
        image: '',
        created_at: '',
        updated_at: '',
        recipes: []
    }

    componentDidMount() {
        if (Object.keys(this.props.currentMonth).length === 0) {
            this.props.history.push('/foods')
        }
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
                    {
                        this.props.currentMonth && this.props.currentMonth.foods.find(f => f.name === this.state.name)
                        ? <button 
                            onClick={() => this.props.addItemToList(this.state)} 
                            className="food-details__add" 
                        >
                            +
                        </button>
                        : null
                    }
                </div>
                {
                    this.state.recipes.length > 0
                    ?
                        <div className="recipes-container">
                            <div className="recipes-title">Recipes you can make with {this.state.name}</div>
                            {
                                this.state.recipes.map( recipe => <RecipeCard recipe={recipe} image={this.state.image}/> )
                            }
                        </div>
                    : 
                        <div className="recipes-container"> 
                            <div className="recipes-title">There are currently no recipes for {this.state.name}</div>
                        </div>
                }
                
                
            </div>
        )
    }
}

export default FoodDetails;
