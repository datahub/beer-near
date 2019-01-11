import React from 'react';

function getLocation(success, error) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error({code: 'No browser support'});
    }
}

var FindPint = React.createClass({
    getInitialState: function() {
        return {selected: false};
    },
    handleClick: function() {
        if (this.state.selected === false) {
            function success(position) {
                this.setState({selected: true});
                this.props.onUpdate({ slug: 'findPint', selected: position.coords });
            }
            function error() {
                this.setState({selected: false});
                this.props.onUpdate({ slug: 'findPint', selected: false });
            }
            getLocation(success.bind(this), error.bind(this));
        } else {
            this.setState({selected: false});
            this.props.onUpdate({ slug: 'findPint', selected: false });
        }
    },
    render: function() {
        var findButton = (
            <button className="find-button" onClick={this.handleClick}>
                <i className="fa fa-location-arrow" aria-hidden="true"></i>
                Find the nearest pint
            </button>
        );

        var seeAllButton = (
            <button className="see-all-button" onClick={this.handleClick}>
                <i className="fa fa-times" aria-hidden="true"></i>
                See all
            </button>
        );

        return (
            <div className="find-pint">
                {this.state.selected ? seeAllButton : findButton}
            </div>
        );
    }
});

export default FindPint;
