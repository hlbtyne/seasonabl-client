import React, {Fragment, Component} from "react";
import { Route } from 'react-router-dom';
import FoodContainer from './FoodContainer';
import FoodDetails from './FoodDetails';
import SearchAndFilter from './SearchAndFilter';
import '../../css/FoodPage.css'

const foodsAPI = 'http://localhost:3001/foods'
const monthsAPI = 'http://localhost:3001/months'

class FoodPage extends Component {

    state = {
        months: [],
        currentMonth: '',
        selectedMonth: null,
        searchTerm: null
    }

    setStateOnLoad = () => {
        const today = new Date()
        fetch(monthsAPI)
            .then(resp => resp.json())
            .then(months => {
                this.setState({ months })
                this.setState({ currentMonth: months[today.getMonth()] })
                this.setState({ selectedMonth: null })
                this.setState({ searchTerm: null })

            })
    }

    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/login')
        } else {
            fetch(foodsAPI)
                .then(resp => resp.json())
                .then(() => this.setStateOnLoad())
        }
    }

    getFoodDetails = (id) => {
        return fetch(`${foodsAPI}/${id}`)
        .then(resp => resp.json())
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
                    return <FoodDetails id={(props.match.params.id)} addItemToList={this.props.addItemToList} />
                }}/>
                < Route exact path={this.props.match.path} render={() => {
                    return (
                        <Fragment>
                            < SearchAndFilter 
                                months={this.state.months} 
                                filterByMonth={this.filterFoodsByMonth}
                                search={this.updateSearchTerm}
                            />
                            < FoodContainer 
                                allFoods={this.props.foods}
                                currentMonth={this.state.currentMonth} 
                                selectedMonth={this.state.selectedMonth} 
                                searchTerm={this.state.searchTerm}
                                addItemToList={this.props.addItemToList}
                            />
                        </Fragment>
                    )
                }}/>
            </div>
        )
    }
}

export default FoodPage;
