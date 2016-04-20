import React from 'react';

var Check = React.createClass({
    getInitialState: function() {
        return {toggled: false};
    },
    handleChange: function(event) {
        this.setState({toggled: !this.state.toggled});
        this.props.onUpdate({slug: this.props.slug, selected: !this.state.toggled});
    },
    render: function() {
        return (
            <label className="beernear--label pointer">
                <input
                    type="checkbox"
                    name={this.props.name}
                    className="beernear--checkbox pointer"
                    checked={this.state.toggled}
                    onChange={this.handleChange} />
                <i className={"fa fa-fw "+this.props.iconClasses} ariaHidden="true"></i>{this.props.name}
            </label>
        );
    }
});

export default Check;
