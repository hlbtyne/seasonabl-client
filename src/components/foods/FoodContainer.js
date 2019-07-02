import React from "react";
import FoodItem from './FoodItem'
import '../../css/FoodsContainer.css'

class FoodContainer extends React.Component {

    renderFoods = () => {
        if (this.props.searchTerm) {
            return this.filterBySearchTerm().map(food => 
                < FoodItem 
                    food={food} 
                    key={food.id} 
                    currentMonth={this.props.currentMonth}
                    addItemToList={this.props.addItemToList}
                /> 
            )
        }
        if (this.props.selectedMonth) {
            return this.props.selectedMonth.foods.map(food => 
                < FoodItem 
                    food={food} 
                    key={food.id} 
                    currentMonth={this.props.currentMonth}
                    addItemToList={this.props.addItemToList}
                /> 
            )
        }
        if (this.props.currentMonth) {
            return this.props.currentMonth.foods.map(food => 
                < FoodItem 
                    food={food} 
                    key={food.id} 
                    currentMonth={this.props.currentMonth}
                    addItemToList={this.props.addItemToList}
                /> 
            )
        } 
    }

    filterBySearchTerm = () => {
        return this.props.allFoods.filter(food => 
            food.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
        )
      }

    render() {
        return (
            <div className="foods-view">
                <div className="foods-container">
                    {
                        this.renderFoods()
                    }
                </div>
            </div>
            
        )
    }
}

export default FoodContainer;

