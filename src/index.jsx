require('./styles.scss');

import $ from "jquery";
import React from 'react';
import {render} from 'react-dom';
import BreweriesList from './BreweriesList.jsx';
import Filters from './Filters.jsx';

var BeerNear = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            filters: {
                regions: {
                    name: "Region",
                    options: ["Northwest", "Northeast", "Central", "East Central", "Southeast", "South Central", "Southwest"]
                },
                cities: {
                    name: "Nearby Cities",
                    options: ["Appleton", "Door County", "Eagle River", "Eau Claire", "Green Bay", "Hayward", "La Crosse", "Lake Geneva", "Madison", "Milwaukee", "Prairie du Chien", "Sheboygan", "Stevens Point", "Wausau", "Wisconsin Dells", "Wisconsin Rapids"]
                },
                tours: {name: "Tours"},
                food: {name: "Food"},
                tapRoom: {name: "Tap Room"}
            }
        };
    },
    loadBreweries: function() {
        $.getJSON(this.props.url, function(data) {
                var obj = JSON.parse(data);
                this.setState({data: obj.data});
            }.bind(this)
        );
    },
    componentDidMount: function() {
        this.loadBreweries();
    },
    render: function() {
        return (
            <div className="BeerNear">
                <Filters filters={this.state.filters} />
                <BreweriesList data={this.state.data} />
            </div>
        );
    }
});

render(
    <BeerNear url="http://media.dhb.io/data/beer-near.json" />,
    document.querySelector('.container')
);
