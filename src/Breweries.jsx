import React from 'react';
import Brewery from './Brewery.jsx';

var Breweries = React.createClass({
    getInitialState: function() {
        return {classes: "tagline--more"};
    },
    handleClick: function() {
        if (this.state.classes === "tagline--more") {
            this.setState({classes: "tagline--more tagline--show"});
        } else {
            this.setState({classes: "tagline--more"});
        }
    },
    render: function() {
        var breweryNodes = this.props.data.map(function(brewery) {
            return (
                <Brewery data={brewery} key={brewery.id} />
            );
        });
        if (this.props.data.length === 1) {
            var breweriesCount = this.props.data.length + " Result";
        } else {
            var breweriesCount = this.props.data.length + " Results";
        }
        return (
            <div className="beernear--breweries">
                <div className="breweries--header">Beer Near</div>
                <p className="breweries--tagline">A guide to Wisconsin breweries
                    <i className="fa fa-info-circle" onClick={this.handleClick} ariaHidden="true"></i>
                    <span className={this.state.classes}>
                        <br className="tagline--break" /><br />
                        Beer is a part of the Wisconsin heritage. It's right up there with award-winning cheese and the Packers.<br /><br />
                        To help you go straight to the source, we've developed this guide of the state's breweries and brewpubs.<br /><br />
                        It's called Beer Near. Click on the map to find breweries in specific regions of the state. Click on an icon to find out if the brewery near you offers tours; if they serve food; or simply to see what hours the brewery is open.<br /><br />
                        Breweries, particular craft breweries, are a growing and changing community. If you see a brewery that's not in this guide please let us know.<br /><br />
                        Cheers,<br />
                    <a className="tagline--link" target="_blank" href="http://www.jsonline.com/about-us/kathy-flanigan-28293394.html">Kathy Flanigan</a>
                    </span>
                </p>
                <div className="breweries--results"><span className="breweries--count">{breweriesCount}</span></div>
                {breweryNodes}
            </div>
        );
    }
});

export default Breweries;
