import React from 'react'
import { render } from 'react-dom'
// using an ES6 transpiler, like babel
// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Header from './components/Header.js'

console.log('Header', Header);
const App = React.createClass({
  render() {
    return (
      <div>
        <Header></Header>
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

const Home = React.createClass({
  render() {
    return <h3>Home</h3>
  }
})
const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return <h3>Inbox</h3>
  }
})

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox },
  ]
}
render(<Router history={hashHistory} routes={routes} />, document.getElementById('bodyWrap'))