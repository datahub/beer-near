require('./styles.scss');

import $ from "jquery";
import React from 'react';
import {render} from 'react-dom';
import Breweries from './Breweries.jsx';
import Filters from './Filters.jsx';
import Menu from './Menu.jsx';

var BeerNear = React.createClass({
    getInitialState: function() {
        return {
            allBreweries: [],
            breweries: [],
            filters: {
                regions: {
                    name: "Region",
                    options: ["Northwest", "Northeast", "Central", "East Central", "Southeast", "South Central", "Southwest"],
                    selected: ""
                },
                cities: {
                    name: "Nearby Cities",
                    options: ["Appleton", "Door County", "Eagle River", "Eau Claire", "Green Bay", "Hayward", "La Crosse", "Lake Geneva", "Madison", "Milwaukee", "Prairie du Chien", "Sheboygan", "Stevens Point", "Wausau", "Wisconsin Dells", "Wisconsin Rapids"],
                    selected: ""
                },
                tours: {name: "Tours", selected: false},
                food: {name: "Food", selected: false},
                tapRoom: {name: "Tap Room", selected: false}
            }
        };
    },
    filterBreweries: function() {
        var filteredBreweries = this.applyFilters(this.state.allBreweries, this.state.filters);
        this.setState({breweries:filteredBreweries});
    },
    loadBreweries: function() {
        // TODO: enable offline support, needs to local storage caching
        $.getJSON(this.props.url, function(data) {
                var obj = JSON.parse(data);
                this.setState({allBreweries: obj.data});
                this.setState({breweries: obj.data});
            }.bind(this)
        );
    },
    componentDidMount: function() {
        this.loadBreweries();
    },
    onUpdate: function(updatedFilter) {
        var newfilters = this.state.filters;
        newfilters[updatedFilter.slug]['selected'] = updatedFilter.selected;
        this.setState({filters: newfilters});
        this.filterBreweries();
    },
    applyFilters : function(breweries,filters) {
        var results = [];
        var matchingBrewery = function(brewery) {
            if (filters.tours.selected) {
                if (!brewery.tours) {
                    return false;
                }
            }
            if (filters.food.selected) {
                if (!brewery.food) {
                    return false;
                }
            }
            if (filters.tapRoom.selected) {
                if (!brewery.taproom) {
                    return false;
                }
            }
            if (filters.regions.selected && filters.regions.selected !== '') {
                if (brewery.region === undefined || brewery.region !== filters.regions.selected) {
                    return false;
                }
            }
            if (filters.cities.selected && filters.cities.selected !== '') {
                if (brewery.nearestCity === undefined || brewery.nearestCity.indexOf(filters.cities.selected) === -1) {
                    return false;
                }
            }

            return true;
        };
        results = breweries.filter(matchingBrewery);
        return results;
    },
    render: function() {
        return (
            <div id="BeerNear">
                <Menu />
                <Filters filters={this.state.filters} onUpdate={this.onUpdate} />
                <Breweries data={this.state.breweries} />
            </div>
        );
    }
});

render(
    <BeerNear url="http://media.dhb.io/data/beer-near.json" />,
    document.querySelector('.beernear--container')
);
