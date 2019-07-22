import React from "react";
import { getRecipeDetails } from '../../services/api'

import '../../css/RecipeDetails.css'
// import { Link } from 'react-router-dom'

// import RecipeCard from './RecipeCard'

const recipesAPI = 'http://localhost:3001/recipes'

class RecipeDetails extends React.Component {

    state = {
        title: '',
        instructions: '',
        ingredients: [],
        image: '',
        prepTime: null,
        cookingTime: null,
        api_id: null
    }

    componentDidMount = () => {
        fetch(`${recipesAPI}/${this.props.id}`)
            .then(resp => resp.json())    
            .then(data => getRecipeDetails(data.api_id))
            .then(data=> this.updateState(data))
    }

    updateState = (data) => {
        const ingredients = data.extendedIngredients.map(ing => ing.originalString)
        const noHtmlInst = data.instructions ? data.instructions.replace(/<[^>]*>?/gm, '') : data.instructions
        const cleanInst = noHtmlInst && noHtmlInst.split('\n')[0] === "Instructions" ? noHtmlInst.split('\n').slice(1).join('') : noHtmlInst
        this.setState({api_id: data.id, title: data.title, instructions: cleanInst, image: data.image, ingredients: ingredients, prepTime: data.preparationMinutes, cookingTime: data.cookingMinutes})
    }

    render() {
        return (
            <div>
                <div className="recipe-header">
                    <img className="recipe-header-image" src={this.state.image} alt={this.state.title}/>
                    <div className="recipe-header-text">{this.state.title}</div>
                    <button 
                        onClick={this.props.history.goBack} 
                        className="back-button" 
                    >
                        More recipes
                    </button>
                </div>

                <div className="recipe-container">
                    <div className="left-column">
                        <div className="recipe_ingredients"> 
                            <div className="subheader">Ingredients</div>
                            {
                                this.state.ingredients.map(ing =>
                                    <div className="text">{ing}</div>
                                )
                            }
                        </div>
                            {
                                this.state.prepTime || this.state.cookingTime
                                    ?
                                        <div className="recipe-time">
                                            <div className="subheader">Time</div>
                                            {
                                                this.state.prepTime
                                                    ? <div className="text">Prep time: {`${this.state.prepTime} minutes`}</div>
                                                    : null
                                            }
                                            {
                                                this.state.cookingTime
                                                    ? <div className="text">Cooking time: {`${this.state.cookingTime} minutes`}</div>
                                                    : null
                                            }
                                        </div>
                                    : null
                            }
                        
                    </div>
                    
                    {
                        this.state.instructions
                            ?
                                <div className="right-column">
                                    <div className="subheader">Instructions</div>
                                    <div className="text">{this.state.instructions}</div>
                                </div>
                            : null
                    }
                    
                </div>
            </div>
        )
    }
}

export default RecipeDetails;
