import React from "react";
import '../../css/SearchAndFilter.css'

class SearchAndFilter extends React.Component {

    render() {
        return (
            <div className="search-bar">
                <div className="search-container">
                    <select onChange={this.props.filterByMonth} className="search-filter">
                        <option>Filter by month</option>
                        {
                            this.props.months.map(month => {
                                const name = month.name.toLowerCase()
                                return <option value={name}>{month.name}</option>
                            })
                        }
                    </select>
                    <input onChange={this.props.search} className="search-filter" type="text" placeholder="Search foods"></input>
                </div>
            </div>
        )
    }
}

export default SearchAndFilter;

