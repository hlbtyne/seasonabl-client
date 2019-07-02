class ShoppingList extends React.Component {

    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }

    getShoppingListItems = () => {
        return fetch(usersURL)
        .then(resp => resp.json())
        .then(users => users.find(u => u.name === this.props.username))
    }

    renderShoppingListItems = () => {
        this.getShoppingListItems()
        .then(user => {
            debugger
            user.foods.map(food => {
                return (
                    <div>
                        <div className="item">
                            <img className="image" src={food.image} alt={food.name}/>
                            <div className="name"> {food.name}</div>   
                            <input type="checkbox" className="checkbox"></input>
                        </div>
                        <hr className="line"></hr>
                    </div>
                )
            })
        })
    }

    render() {
        return (
            <div className="shopping-list-view">
                <div className="shopping-list-container">
                <hr className="line"></hr>
                    {
                        this.renderShoppingListItems()
                    }
                </div>
            </div>
        )
    }
}