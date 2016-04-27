import React from 'react';

var Features = React.createClass({
    render: function() {
        if (this.props.tours) {
            if (this.props.tours.toString() === "true") {
                var tour = <li className="brewery--item"><i className="fa-li fa fa-map-signs" ariaHidden="true"></i><span className="mobile--hidden">Tours available</span></li>;
            } else {
                var tour = <li className="brewery--item"><i className="fa-li fa fa-map-signs" ariaHidden="true"></i><span className="mobile--hidden">{this.props.tourInfo}</span></li>;
            }
        }
        if (this.props.food) {
            if (this.props.food.toString() === "true") {
                var food = <li className="brewery--item"><i className="fa-li fa fa-cutlery" ariaHidden="true"></i><span className="mobile--hidden">Food available</span></li>;
            } else {
                var food = <li className="brewery--item"><i className="fa-li fa fa-cutlery" ariaHidden="true"></i><span className="mobile--hidden">{this.props.food}</span></li>;
            }
        }
        if (food || tour) {
            return (
                <li className="brewery--item">
                    <ul className="fa-ul details--list">
                        {tour}
                        {food}
                    </ul>
                </li>
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
                <div className="brewery--logo logo--empty">
                    <i className="fa fa-beer" ariaHidden="true"></i>
                </div>
            );
        }
    }
});

var LinkedAddress = React.createClass({
    render: function() {
        if (this.props.address) {
            var address = this.props.address;
            var urlRoot = "https://maps.google.com?q=";
            var url = urlRoot + encodeURI(this.props.address.replace(/\s/g, '+'));
            var firstComma = address.lastIndexOf(",");
            var secondComma = address.lastIndexOf(",",(firstComma-1));
            var before = address.substring(0,(secondComma+1));
            var city = address.substring((secondComma+1),firstComma);
            var after = address.substring(firstComma,address.length);
            var addressNode = (
                <span>
                    <span className="mobile--hidden">{before}</span>{city}<span className="mobile--hidden">{after}</span>
                </span>
            );
            return (
                <li className="brewery--item">
                    <i className="fa fa-li fa-map-marker" ariaHidden="true"></i><a className="brewery--link" href={url} target="_blank">{addressNode}</a>
                </li>
            );
        } else {
            return null;
        }
    }
});

var Taproom = React.createClass({
    render: function() {
        if (this.props.taproom && this.props.hours) {
            return (
                <li className="brewery--item">
                    <i className="fa fa-li fa-clock-o" ariaHidden="true"></i>{this.props.hours}
                </li>
            );
        } else {
            return null;
        }
    }
});

var Description = React.createClass({
    render: function() {
        if (this.props.desc) {
            return (
                <li className="brewery--item">
                    <i className="fa fa-li fa-info-circle" ariaHidden="true"></i>{this.props.desc}
                </li>
            );
        } else {
            return null;
        }
    }
});

var Phone = React.createClass({
    formatPhoneNumber: function(number) {
        var num = number.replace(/\D/g, '');
        if (num.length === 10) {
            num = "+1" + num;
        }
        return num;
    },
    render: function() {
        if (this.props.number) {
            var number = this.formatPhoneNumber(this.props.number);
            return (
                <li className="brewery--item">
                    <a className="brewery--link" href={"tel:"+number}><i className="fa fa-li fa-phone" ariaHidden="true"></i></a><a className="brewery--link" href={"tel:"+number}><span className="mobile--hidden">{this.props.number}</span></a>
                </li>
            );
        } else {
            return null;
        }
    }
});

var Website = React.createClass({
    render: function() {
        if (this.props.url) {
            var linkStyle = {overflow: "hidden", textOverflow: "ellipsis"};
            var displayLink = this.props.url;
            if (this.props.url.indexOf('facebook.com') > -1) {
                displayLink = "Facebook";
            }
            return (
                <li className="brewery--item">
                    <a className="brewery--link" href={"http://www."+this.props.url} target="_blank"><i className="fa fa-li fa-link" ariaHidden="true"></i></a>
                    <a className="brewery--link" href={"http://www."+this.props.url} target="_blank"><span className="mobile--hidden" style={linkStyle}>{displayLink}</span></a>
                </li>
            );
        } else {
            return null;
        }
    }
});

var BreweryType = React.createClass({
    render: function() {
        if (this.props.breweryType) {
            return (
                <li className="brewery--item">
                    <i className="fa fa-li fa-beer" ariaHidden="true"></i>{this.props.breweryType}
                </li>
            );
        } else {
            return null;
        }
    }
});

var MobileBar = React.createClass({
    render: function() {
        var addressNode = null, foodNode = null, tourNode = null;
        if (this.props.address) {
            var firstComma = this.props.address.lastIndexOf(",");
            var secondComma = this.props.address.lastIndexOf(",",(firstComma-1));
            var city = this.props.address.substring((secondComma+1),firstComma).trim();
            addressNode = (
                <span className="brewery--mobilefeature">
                    <i className="fa fa-map-marker" ariaHidden="true"></i>{city}
                </span>
            );
        }
        if (this.props.tours) {
            tourNode = (
                <span className="brewery--mobilefeature">
                    <i className="fa fa-map-signs" ariaHidden="true"></i>Tours
                </span>
            );
        }
        if (this.props.food) {
            foodNode = (
                <span className="brewery--mobilefeature">
                    <i className="fa fa-cutlery" ariaHidden="true"></i>Food
                </span>
            );
        }
        if (addressNode || tourNode || foodNode) {
            return (
                <div className="brewery--mobileicons">
                    {addressNode}
                    {foodNode}
                    {tourNode}
                </div>
            );
        } else {
            return null;
        }
    }
});

var Brewery = React.createClass({
    getInitialState: function() {
        return {
            classes: "beernear--brewery",
            toggleText: "more",
        };
    },
    handleClick: function() {
        if (this.state.classes === "beernear--brewery") {
            this.setState({classes: "beernear--brewery mobile--show"});
            this.setState({toggleText: "less"});
        } else {
            this.setState({classes: "beernear--brewery"});
            this.setState({toggleText: "more"});
        }
    },
    render: function() {
        var brewery = this.props.data;
        return (
            <div className={this.state.classes} onClick={this.handleClick}>
                <div className="brewery--inner">
                    <h2 className="brewery--name">{brewery.brewery}</h2>
                    <Logo logoUrl={brewery.logoUrl} />
                    <MobileBar address={brewery.location} food={brewery.food} tours={brewery.tours}  />
                    <div className="brewery--details">
                        <ul className="fa-ul details--list">
                            <BreweryType breweryType={brewery.type} />
                            <LinkedAddress address={brewery.location} />
                            <Phone number={brewery.phone} />
                            <Website url={brewery.websiteUrl} />
                        </ul>
                        <ul className="fa-ul details--list">
                            <Description desc={brewery.description} />
                            <Taproom taproom={brewery.taproom} hours={brewery.taproomHours} />
                            <Features food={brewery.food} tours={brewery.tours} tourInfo={brewery.tourInfo} />
                        </ul>
                    </div>
                </div>
                <span className="mobile--info">{this.state.toggleText}<i className="fa fa-caret-down" ariaHidden="true"></i></span>
            </div>
        );
    }
});

export default Brewery;
