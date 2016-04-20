import React from 'react';

var Dropdown = React.createClass({
    getInitialState: function() {
        return {selected: ""};
    },
    handleChange: function(event) {
        this.setState({selected: event.target.value});
        this.props.onUpdate({slug: this.props.slug, selected: event.target.value});
        window.dispatchEvent(window.deselectMap);
    },
    componentDidMount() {
        window.deselectMap = document.createEvent('Event');
        window.deselectMap.initEvent('deselectMap', true, true);
    },
    componentWillMount: function() {
        window.addEventListener("deselectDropdown", this.deselectDropdown, false);
    },
    componentWillUnmount: function() {
        window.removeEventListener("deselectDropdown", this.deselectDropdown, false);
    },
    deselectDropdown: function() {
        this.setState({selected: ""});
        this.props.onUpdate({slug: this.props.slug, selected: ""});
    },
    render: function() {
        var optionNodes = this.props.options.map(function(val, index) {
            return (
                <option value={val} key={index}>{val}</option>
            );
        });
        return (
            <div className="beernear--filter">
                <select
                    name={this.props.name}
                    className="beernear--dropdown pointer"
                    onChange={this.handleChange}
                    value={this.state.selected} >
                    <option value="">Nearby Cities</option>
                    {optionNodes}
                </select>
            </div>
        );
    }
});

export default Dropdown;
