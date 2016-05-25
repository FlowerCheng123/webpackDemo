import React from 'react';
var ReactDOM = require('react-dom');

class Hello extends React.Component {
  render() {
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
}

class Say extends React.Component {
  render() {
    return (
      <h1>Say {this.props.name}!</h1>
    );
  }
}

export {
	Hello,
	Say
}; //es6