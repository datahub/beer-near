import React from 'react';

var Menu = React.createClass({
    handleClick: function() {
        // TODO: connect button
        // should toggle .filters--show on .beernear--filters
    },
    render: function() {
        return (
            <div className="beernear--menu">
                <img className="menu--logo" src="http://media.jrn.com/designimages/tap-graytag-500w.png" />
                <div className="menu--right" onClick={this.handleClick}>
                    <i className="fa fa-sliders menu--filters" ariaHidden="true"></i>
                </div>
            </div>
        );
    }
});

export default Menu;
