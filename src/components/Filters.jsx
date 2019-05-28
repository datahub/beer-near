import React from 'react';
import ClickableMap from './Filter.Map.jsx';
import Dropdown from './Filter.Dropdown.jsx';
import Check from './Filter.Checkbox.jsx';
import FindPint from './Filter.FindPint.jsx';

var Filters = React.createClass({
    getInitialState: function() {
        return {classes: "beernear--filters"};
    },
    toggleFilters: function() {
        if (this.state.classes === "beernear--filters") {
            this.setState({classes: "beernear--filters filters--show"});
        } else {
            this.setState({classes: "beernear--filters"});
        }
    },
    componentWillMount: function() {
        window.addEventListener("toggleFilters", this.toggleFilters, false);
    },
    componentWillUnmount: function() {
        window.removeEventListener("toggleFilters", this.toggleFilters, false);
    },
    render: function() {
        var filters = this.props.filters;
        return (
            <div className={this.state.classes}>
                <FindPint selected={filters.findPint.selected} onUpdate={this.onUpdate} onDone={this.toggleFilters}/>
                <div className="filters--break"></div>
                <div className="beernear--filter">
                    <Check
                        name={filters.tapRoom.name}
                        onUpdate={this.onUpdate}
                        slug="tapRoom"
                        iconClasses="fa-beer"/>
                    <Check
                        name={filters.food.name}
                        onUpdate={this.onUpdate}
                        slug="food"
                        iconClasses="fa-cutlery" />
                    <Check
                        name={filters.tours.name}
                        onUpdate={this.onUpdate}
                        slug="tours"
                        iconClasses="fa-ticket" />
                </div>
                <div className="filters--break"></div>
                <ClickableMap
                    name={filters.regions.name}
                    options={filters.regions.options}
                    slug="regions"
                    onUpdate={this.onUpdate} 
                    selected={filters.regions.selected} />
                <div className="filters--break"><span className="filters--or">OR</span></div>
                <div className="filter--right">
                    <Dropdown
                        name={filters.cities.name}
                        options={filters.cities.options}
                        onUpdate={this.onUpdate}
                        slug="cities" 
                        selected={filters.cities.selected} />
                </div>
                <div className="filters--apply" onClick={this.toggleFilters}>
                    Apply
                </div>
            </div>
        );
    },
    onUpdate: function(updatedFilters) {
        this.props.onUpdate(updatedFilters);
    }
});

export default Filters;
