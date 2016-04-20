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
                        Beer is a part of the Wisconsin heritage just like cheese and the Packers.<br /><br />
                        Beer Near, a guide to the state's breweries and brewpubs, will help you navigate that legacy.<br /><br />
                        Click on the map to find breweries by region. Click on an icon to find brewery hours; see if they offer tours; or even if they serve food. It&apos;s that easy. <br /><br />
                        Breweries, particularly craft breweries, are a growing community. If you see a new brewery opened or one that closed, write <a className="tagline--link" target="_blank" href="mailto:kathy.flanigan@jrn.com&subject=BeerNear520feedback">kathy.flanigan@jrn.com</a>.<br /><br />
                        Cheers,<br />
                        Kathy
                    </span>
                </p>
                <div className="breweries--results"><span className="breweries--count">{breweriesCount}</span></div>
                {breweryNodes}
            </div>
        );
    }
});

export default Breweries;
