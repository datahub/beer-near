require('./styles.scss');

import $ from "jquery";
import React from 'react';
import {render} from 'react-dom';
import BreweriesList from './BreweriesList.jsx';

var BeerNear = React.createClass({
    getInitialState: function() {
        return {data: []};
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
                <BreweriesList data={this.state.data}/>
            </div>
        );
    }
});

render(
    <BeerNear url="http://media.dhb.io/data/beer-near.json" />,
    document.querySelector('.container')
);
