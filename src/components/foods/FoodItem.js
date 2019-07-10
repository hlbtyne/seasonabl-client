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
                        ? 
                            <div>
                                <Link to={`/foods/${food.id}`}>
                                    <div className="food-item-name">{food.name}</div>
                                    <img src={food.image} alt={food.name} className="food-item-image"/>
                                </Link>
                                {
                                    this.props.currentMonth.foods.find(f => f.name === food.name)
                                    ? <button 
                                        onClick={() => addItemToList(food)} 
                                        className="food-page__add" 
                                    >
                                        <p className="addText">+</p>
                                    </button>
                                    : <div className="food-page__not-in-season" >
                                        <p className="not-in-season-text">Not currently in season</p>
                                    </div>
                                }
                            </div>
                        
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
