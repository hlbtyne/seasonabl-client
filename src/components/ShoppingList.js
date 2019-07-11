import React from "react";
import { Link } from "react-router-dom";
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
                    <div className="shopping-list-title">Shopping List</div>
                    <hr className="line"></hr>
                    {
                        this.props.shoppingList.length > 0
                            ? this.props.shoppingList.map(item => {
                                    return <div>
                                        <div className="item">
                                            <Link to={`/foods/${item.id}`}>
                                                <img className="image" src={item.image} alt={item.name}/>
                                            </Link>
                                            <div className="name"> {item.name}</div>
                                            <div className="checkbox-container tooltip">
                                                <span className="tooltiptext">Check it off</span>
                                                <input onClick={() => this.props.removeItem(item)} type="checkbox" ></input>
                                            </div>
                                            
                                        </div>
                                        <hr className="line"></hr>
                                    </div>
                                })
                            : <div className="empty-container">
                                <div className="shopping-list-text">You don't have anything on your list at the moment.</div>
                                <Link to='/foods'><button className="button">Browse foods</button></Link>
                            </div>
                    }
                        
                </div>
            </div>
        )
    }
}

export default ShoppingList;
