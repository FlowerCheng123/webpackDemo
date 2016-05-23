var React = require('react');
var ReactDOM = require('react-dom');

class Hello extends React.Component {
  render() {
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
}

// var Hello = React.createClass({
//   render: function() {
//     return (
//       <h1>Hello {this.props.name}!</h1>
//     );
//   }
// });
module.exports = Hello;
// export default Hello; //es6