import React from 'react';

var Brewery = React.createClass({
    render: function() {
        var brewery = this.props.data;
        brewery.features = "";
        if (brewery.tours) {
            brewery.features = "Tours: " + brewery.tourInfo + ( <br /> );
        }
        if (brewery.food) {
            brewery.features += brewery.food;
        }
        return (
            <div className="beernear--brewery">
                <div className="brewery--inner">
                    <h2 className="brewery--name">{brewery.brewery}</h2>
                    <div className="brewery--logo">
                        <img className="brewery--image" src={"http://media.jrn.com/images/"+brewery.logoUrl} />
                    </div>
                    <div className="brewery--details">
                        <div className="brewery--item">
                            <strong>Type:</strong> {brewery.type}
                        </div>
                        <div className="brewery--item">
                            <strong>Address:</strong> {brewery.location}
                        </div>
                        <div className="brewery--item">
                            <strong>Website:</strong><a className="brewery--link" href={"http://www."+brewery.websiteUrl}> {brewery.websiteUrl}</a>
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
                        <div className="brewery--item">
                            <strong>Features:</strong>
                            {brewery.features}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Brewery;
