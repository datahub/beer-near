import React from 'react';

var Features = React.createClass({
    render: function() {
        if (this.props.tours) {
            if (this.props.tours.toString() === "true") {
                var tour = <li>Tours available.</li>;
            } else {
                var tour = <li>{this.props.tourInfo}</li>;
            }
        }
        if (this.props.food) {
            if (this.props.food.toString() === "true") {
                var food = <li>Food available.</li>;
            } else {
                var food = <li>{this.props.food}</li>;
            }
        }
        if (food || tour) {
            return (
                <div className="brewery--item">
                    <strong>Features</strong>
                    <ul className="brewery--features">
                    {tour}
                    {food}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }
});

var Logo = React.createClass({
    render: function() {
        if (this.props.logoUrl) {
            return (
                <div className="brewery--logo">
                    <img className="brewery--image" src={"http://media.jrn.com/images/"+this.props.logoUrl} />
                </div>
            );
        } else {
            return (
                <div className="brewery--logo" />
            );
        }
    }
});

var LinkedAddress = React.createClass({
    render: function() {
        var urlRoot = "https://maps.google.com?q=";
        var url = urlRoot + encodeURI(this.props.address.replace(/\s/g, '+'));
        return (
            <a className="brewery--link" href={url} target="_blank">{this.props.address}</a>
        );
    }
});

var Brewery = React.createClass({
    render: function() {
        var brewery = this.props.data;
        var linkStyle = {overflow: "hidden", textOverflow: "ellipsis"};

        return (
            <div className="beernear--brewery">
                <div className="brewery--inner">
                    <h2 className="brewery--name">{brewery.brewery}</h2>
                    <Logo logoUrl={brewery.logoUrl} />
                    <div className="brewery--details">
                        <div className="brewery--item">
                            <strong>Type:</strong> {brewery.type}
                        </div>
                        <div className="brewery--item">
                            <strong>Address:</strong> <LinkedAddress address={brewery.location} />
                        </div>
                        <div className="brewery--item" style={linkStyle}>
                            <strong>Website:</strong> <a className="brewery--link" href={"http://www."+brewery.websiteUrl} target="_blank">{brewery.websiteUrl}</a>
                        </div>
                        <div className="brewery--item">
                            <strong>Phone:</strong> {brewery.phone}
                        </div>
                    </div>
                    <div className="brewery--description">
                        <div className="brewery--item">
                            {brewery.description}
                        </div>
                        <div className="brewery--item">
                            <strong>Hours:</strong> {brewery.taproomHours}
                        </div>
                        <Features food={brewery.food} tour={brewery.tour} tourInfo={brewery.tourInfo} />
                    </div>
                </div>
            </div>
        );
    }
});

export default Brewery;
