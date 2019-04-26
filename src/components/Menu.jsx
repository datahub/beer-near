import React from 'react';

var Menu = React.createClass({
    handleClick: function() {
        window.dispatchEvent(window.toggleFilters);
    },
    componentDidMount() {
        window.toggleFilters = document.createEvent('Event');
        window.toggleFilters.initEvent('toggleFilters', true, true);
    },
    render: function() {
        return (
            <div className="beernear--menu">
                <a href="http://www.jsonline.com/entertainment">
                    <img className="menu--logo" src="media/WI_Milwaukee_Logo_Prm-nEds_FullClr_RGB_600.png" />
                </a>
                <div className="menu--right" onClick={this.handleClick}>
                    <i className="fa fa-sliders menu--filters" ariaHidden="true"></i>
                </div>
            </div>
        );
    }
});

export default Menu;
