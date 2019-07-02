import React from "react";
import '../css/ShoppingList.css'

class ShoppingList extends React.Component {

    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className="shopping-list-view">
                <div className="shopping-list-container">
                <hr className="line"></hr>
                    {
                        this.props.shoppingList.map(item => {
                            return <div>
                                <div className="item">
                                    <img className="image" src={item.image} alt={item.name}/>
                                    <div className="name"> {item.name}</div>
                                    <input onClick={() => this.props.removeItem(item)} type="checkbox" className="checkbox"></input>
                                </div>
                                <hr className="line"></hr>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ShoppingList;
