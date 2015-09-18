var React = require('react');

var Form = React.createClass({

	render: function() {
		return (
			<div>
				<input type='text' />
				<input type='text' />
				<input type='button' value='Login' />
			</div>
		);
	}

});

module.exports = Form;