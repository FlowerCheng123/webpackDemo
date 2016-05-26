import React from 'react';

const navList = React.createClass({
	render(){
		var navNodes = this.props.data.map(function(node) {
	    return (
	      <li className={node.class}>
	        <a href={node.link}>{node.title}</a>
	      </li>
	    );
    });
		return 
	}
})
const Header = React.createClass({
  getTitle: function(){
  	var timeSec = 5000;
    setTimeout(function(){
      this.setState({data: [
       	{ title:'首页', class:"",link:''},
       	{ title:'我们的团队', class:"",link:''},
       	{ title:'商城', class:"",link:''},
      ]});
    }, timeSec);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getTitle();
  },
  render() {
  	console.log('state',this.state);
  	return(
  		<nav className="nav">
        <navList data={this.state.data} />
  		</nav>
  	)
  }
})

module.exports = Header; //es6