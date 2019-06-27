import React from "react";
import '../../css/FoodItem.css'

class FoodItem extends React.Component {

    render() {

        return (
            <div className="food-item-tile">
                <div className="food-item-name">{this.props.food.name}</div>
                <img src={this.props.food.image} alt={this.props.food.name} className="food-item-image"/>
            </div>
        )
    }
}

export default FoodItem;
