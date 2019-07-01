import React from "react";
import '../css/ShoppingList.css'

class ShoppingList extends React.Component {

    render() {

        return (
            <div className="shopping-list-view">
                <div className="shopping-list-container">
                    {
                        this.props.shoppingList.map(item => {
                            return <div>{item.name}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ShoppingList;
