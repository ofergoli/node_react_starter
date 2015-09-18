/** @jsx React.DOM */

"use strict"
var React = require('react');
//var BS = require('react-bootstrap');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Form = require('./components/form');

var App = React.createClass({
  render:function() {
     return (<div> 
                <Form/>
            </div>)
  }
});


React.render(<App/>, document.getElementById('app'));
