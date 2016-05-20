var React = require('react');

console.log( 'React', React );
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
}