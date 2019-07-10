import React, {Fragment, Component} from "react";
import { Route } from 'react-router-dom';
import FoodContainer from './FoodContainer';
import FoodDetails from './FoodDetails';
import RecipeDetails from './RecipeDetails';
import SearchAndFilter from './SearchAndFilter';
import '../../css/FoodPage.css'



const foodsAPI = 'http://localhost:3001/foods'

class FoodPage extends Component {

    state = {
        selectedMonth: null,
        searchTerm: null,
        selectedRecipe: null,
    }

    setStateOnLoad = () => {
        this.setState({ selectedMonth: null, searchTerm: null, selectedRecipe: null, selectedFood: null })
    }

    componentDidMount = () => {
        fetch(foodsAPI)
                .then(resp => resp.json())
                .then(() => this.setStateOnLoad())
    }

    filterFoodsByMonth = event => {
        const selectedMonth = this.props.months.filter(m => m.name.toLowerCase() === event.target.value.toLowerCase())
        this.setState({ selectedMonth: selectedMonth[0] })
    }

    updateSearchTerm = event => {
        this.setState({
          searchTerm: event.target.value 
        })
      }

    selectRecipe = recipe => {
        this.setState({
            selectedRecipe: recipe
        })
    }

    render() {
        // debugger
        return (
            <div className="food-page">
                < Route exact path={`/foods/:id`} render={props => {
                    return <FoodDetails 
                        id={(props.match.params.id)} 
                        currentMonth={this.props.currentMonth}
                        addItemToList={this.props.addItemToList} 
                        { ...props }
                    />
                }}/>
                < Route path={`${this.props.match.path}/recipes/:id`} render={props => {
                    return <RecipeDetails 
                        id={(props.match.params.id)}
                        image={props.image}
                        { ...props }
                    />
                }}/>
                < Route exact path={this.props.match.path} render={() => {
                    return (
                        <Fragment>
                            <div className="banner">
                                {
                                    this.state.selectedMonth
                                        ? <img src={this.state.selectedMonth.image} alt="" className="bannerImage" />
                                        : <img src={this.props.currentMonth.image} alt="" className="bannerImage" />
                                }
                                
                                <div className="content text-container">
                                    <div>Find out what's</div> 
                                    {
                                        this.state.selectedMonth
                                            ? <div> in season in {this.state.selectedMonth.name}</div>
                                            : <div> in season in {this.props.currentMonth.name}</div>
                                    }
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
