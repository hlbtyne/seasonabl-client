import React from "react";
import FoodItem from './FoodItem'
// import '../../css/FoodsContainer.css'

class FoodContainer extends React.Component {

    render() {

        return (
            <div className="foods_container">
                {
                    this.props.foods.map(food => < FoodItem food={food}/>)
                }
                
            </div>
        )
    }
}

export default FoodContainer;
