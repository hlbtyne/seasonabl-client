import React from "react";
import '../../css/FoodItem.css'

import { Link } from 'react-router-dom' 

class FoodItem extends React.Component {

    render() {
        const { food, addItemToList, username} = this.props 
        return (
            <div className="food-item-tile">
                {
                    username
                        ? <Link to={`/foods/${food.id}`}>
                            <div>
                                <div className="food-item-name">{food.name}</div>
                                <img src={food.image} alt={food.name} className="food-item-image"/>
                                    {this.props.currentMonth.foods.find(f => f.name === food.name)
                                        ? <button 
                                            onClick={() => addItemToList(food)} 
                                            className="add" 
                                        >
                                            +
                                        </button>
                                        : null
                                    }
                            </div>
                        </Link>
                        : <div>
                            <div className="food-item-name">{food.name}</div>
                            <img src={food.image} alt={food.name} className="food-item-image"/>
                        </div>
                }
            </div>
        )
    }
}

export default FoodItem;
