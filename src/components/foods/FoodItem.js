import React from "react";
import '../../css/FoodItem.css'

import { Link } from 'react-router-dom' 

class FoodItem extends React.Component {

    render() {
        const { food, addItemToList } = this.props 
        return (
            <Link to={`/foods/${food.id}`}>
            <div className="food-item-tile">
                <div className="food-item-name">{food.name}</div>
                <img src={food.image} alt={food.name} className="food-item-image"/>
                {
                    this.props.currentMonth.foods.find(f => f.name === food.name)
                        ? <button 
                            onClick={() => addItemToList(food)} 
                            className="add" 
                            title='Add to shopping list'>
                            <i className="fas fa-plus"></i>
                        </button>
                        : null
                }
                
            </div>
            </Link>
        )
    }
}

export default FoodItem;
