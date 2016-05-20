var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('../component/Hello');

// React.render(<Hello name="Nate" />, document.getElementById('box'));
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('box')
);