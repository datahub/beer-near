require("../css/styles.scss");

window.$ = require("jquery");
var _tpl = require("lodash/template");

var dataUrl = "http://media.dhb.io/data/beer-near.json";

$(document).ready(function() {
    getData(dataUrl);
});

var getData = function(dataLocation) {
    $.getJSON(dataLocation, function(data) {
        var obj = JSON.parse(data);
        render(obj.data);
    });
}

var render = function(data) {
    if (data.length > 0) {
        var wrapper = $('#beernear');
        var breweryTpl = _tpl($('#template--brewery').html());
        $.each(data,function(key, val) {
            var bhtml = breweryTpl(val);
            wrapper.append(bhtml);
        });
    }
}
