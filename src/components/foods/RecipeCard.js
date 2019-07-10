import React from "react";
import '../../css/RecipeCard.css'

import { Link } from 'react-router-dom' 

class RecipeCard extends React.Component {

    render() {
        const { recipe } = this.props 
        return (
            <Link to={`/foods/recipes/${recipe.id}`}>
                <div className="recipe-strip">
                    <div className="recipe-item-name">{recipe.title}</div>
                </div>
            </Link>
        )
    }
}

export default RecipeCard;


