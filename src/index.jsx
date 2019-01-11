import $ from "jquery";
import React from 'react';
import {render} from 'react-dom';
import Breweries from './components/Breweries.jsx';
import Filters from './components/Filters.jsx';
import Menu from './components/Menu.jsx';
import { point as geoPoint } from '@turf/helpers';
import geoDistance from '@turf/distance';

import './index.scss';

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
                tapRoom: {name: "Tap Room", selected: false},
                findPint: {name: 'Find pint', selected: false}
            }
        };
    },

    filterBreweries: function() {
        var filteredBreweries = this.applyFilters(this.state.allBreweries, this.state.filters);
        this.setState({breweries:filteredBreweries});
    },

    loadBreweries: function() {
        // TODO: enable offline support, needs to local storage caching
        $.getJSON(this.props.dataSource, function(data) {
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

    applyFilters : function(breweries, filters) {
        var results = [];

        var closestBreweries = [];
        if (filters['findPint'].selected) {
            var coords = filters['findPint'].selected,
                lat = coords.latitude,
                lng = coords.longitude;

            var breweryDistances = breweries
                .map(function(brewery) {
                    var p0 = geoPoint([lng, lat]);
                    var p1 = geoPoint([brewery.lng, brewery.lat]);
                    var distance = geoDistance(p0, p1, {units: 'miles'});
                    return {brewery: brewery.brewery, distance: distance};
                })
                .filter(function(d) { return !isNaN(d.distance); });
            
            breweryDistances.sort(function(a, b) {
                if (a.distance < b.distance) return -1;
                if (a.distance > b.distance) return 1;
                return 0;
            });

            closestBreweries = breweryDistances
                .slice(0, 9)
                .map(function(d) { return d.brewery; });
        }

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
            if (filters['findPint'].selected) {
                return closestBreweries.indexOf(brewery.brewery) > -1;
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
    <BeerNear dataSource="data/beer-near.json" />,
    document.querySelector('.beernear--container')
);
