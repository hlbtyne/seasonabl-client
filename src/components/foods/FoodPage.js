import React, {Fragment, Component} from "react";
import { Route } from 'react-router-dom';
import FoodContainer from './FoodContainer';
import FoodDetails from './FoodDetails';
import SearchAndFilter from './SearchAndFilter';
import '../../css/FoodPage.css'
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants";

const foodsAPI = 'http://localhost:3001/foods'

class FoodPage extends Component {

    state = {
        selectedMonth: null,
        searchTerm: null
    }

    setStateOnLoad = () => {
        this.setState({ selectedMonth: null })
        this.setState({ searchTerm: null })
    }

    componentDidMount = () => {
        fetch(foodsAPI)
                .then(resp => resp.json())
                .then(() => this.setStateOnLoad())
    }

    filterFoodsByMonth = event => {
        const selectedMonth = this.state.months.filter(m => m.name.toLowerCase() === event.target.value.toLowerCase())
        this.setState({ selectedMonth: selectedMonth[0] })
    }

    updateSearchTerm = event => {
        this.setState({
          searchTerm: event.target.value 
        })
      }

    render() {
        
        return (
            <div className="food-page">
                < Route path={`/foods/:id`} render={props => {
                    return <FoodDetails 
                        id={(props.match.params.id)} 
                        addItemToList={this.props.addItemToList} 
                    />
                }}/>
                < Route exact path={this.props.match.path} render={() => {
                    return (
                        <Fragment>
                            <div className="banner">
                                <img src={this.props.currentMonth.image} className="bannerImage" />
                                <div className="content text-container">
                                    <div>Find out what's</div> 
                                    <div> in season in {this.props.currentMonth.name}</div>
                                </div>
                                {
                                    this.props.username
                                        ? < SearchAndFilter 
                                            months={this.props.months} 
                                            filterByMonth={this.filterFoodsByMonth}
                                            search={this.updateSearchTerm}
                                        />
                                        : null
                                }
                            </div>
                            < FoodContainer 
                                allFoods={this.props.foods}
                                currentMonth={this.props.currentMonth} 
                                selectedMonth={this.state.selectedMonth} 
                                searchTerm={this.state.searchTerm}
                                addItemToList={this.props.addItemToList}
                                username={this.props.username}
                            />
                        </Fragment>
                    )
                }}/>
            </div>
        )
    }
}

export default FoodPage;
