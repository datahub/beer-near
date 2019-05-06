import React from 'react';

function getLocation(success, error) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error({code: 0});
    }
}

var FindPint = React.createClass({
    getInitialState: function() {
        return {loading: false, errored: false};
    },
    handleClick: function() {
        if (!this.props.selected) {
            // When we find the user's location
            function success(position) {
                this.setState({loading: false});
                this.props.onUpdate({slug: 'findPint', selected: position.coords});
                this.props.onUpdate({slug: 'regions', selected: false});
                this.props.onUpdate({slug: 'cities', selected: false});
                this.props.onDone();
            }

            // When we can't find the user's location
            function error() {
                this.setState({loading: false, errored: true});
                this.props.onUpdate({slug: 'findPint', selected: false});
            }

            this.setState({ loading: true });
            getLocation(success.bind(this), error.bind(this));
        } else {
            this.props.onUpdate({slug: 'findPint', selected: false});
        }
    },
    render: function() {
        if (this.state.loading) {
            return (
                <div className="find-pint">
                    <div className="loading-message">
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    </div>
                </div>
            )
        }

        if (this.state.errored) {
            return (
                <div className="find-pint">
                    <div className="error-message">
                        <div className="title"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Whoops!</div>
                        We're unable to find your location. Please activate location services for this feature.
                    </div>
                </div>
            )
        }

        var findButton = (
            <button className="find-button" onClick={this.handleClick}>
                <i className="fa fa-location-arrow"></i>
                Find the nearest pint
            </button>
        );

        var seeAllButton = (
            <button className="see-all-button" onClick={this.handleClick}>
                <i className="fa fa-times"></i>
                See all
            </button>
        );
    
        return (
            <div className="find-pint">
                {this.props.selected ? seeAllButton : findButton}
            </div>
        );
    }
});

export default FindPint;
