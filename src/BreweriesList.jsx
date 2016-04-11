import React from 'react';
import Brewery from './Brewery.jsx';

var BreweriesList = React.createClass({
    render: function() {
        var breweryNodes = this.props.data.map(function(brewery) {
            return (
                <Brewery data={brewery} key={brewery.id} />
            );
        });
        return (
            <div className="beerneer--breweries">
                {breweryNodes}
            </div>
        );
    }
});

export default BreweriesList;
