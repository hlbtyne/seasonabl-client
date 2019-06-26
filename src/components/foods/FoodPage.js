import React from "react";

class FoodPage extends React.Component {

    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }

    render() {

        return (
            
            <div>Welcome to seasonabl, {this.props.username}!</div>
            
        );
    }
}

export default FoodPage;
