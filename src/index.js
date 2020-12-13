import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import isLoggedIn from './auth'
import NotFound from './404'
//import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'

class App extends React.Component {
  render()
  {
    return (
      <Router>
          <Switch>
            <Route path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." {...props}/>)} >
            </Route>            
            <Route path="/about" component={(props) => (<About  {...props}/>)} >
            </Route>
            <Route path="/topics" component={(props) => (<Topics {...props}/>)}>
            </Route>
            <Route exact path="/" component={(props) => (<Home {...props}/>)}>
            </Route>
			      <Route path="/">
            <Redirect to="/404" />
            </Route>
          </Switch>
      </Router>
    );
  }
}

class LinksLol extends React.Component {
  render()
  {
    if (isLoggedIn())
    {
      return (
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/top">404</Link>
            </li>
          </ul>
          </div>
      )
    }
    else
    {
      return (
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          </div>
      )
    }
  }
}
class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = ({isLoggedIn : isLoggedIn()});
  }
  login()
  {
    window.sessionStorage.setItem("token", "1");
    this.setState(state => ({isLoggedIn: true}));
  }
  logout()
  {
    window.sessionStorage.removeItem("token");
    this.setState(sate => ({isLoggedIn: false}));
  }
  render()
  {
    let button;
    if (!this.state.isLoggedIn)
    {
        button = <button onClick={this.login}>
                Login
                </button>
    }
    else
    {
        button = <button onClick={this.logout}>
                Logout
                </button>
    }
    return (
      <div>
      <LinksLol/>
      <h2>Home</h2>
      {button}
      </div>
    );
  }
}

class About extends React.Component {
  render()
  {
    return (
      <div>
      <LinksLol/>
      <h2>About</h2>
      </div>
    );
  }
}

class Topics extends React.Component {
  render()
  {
    let match = this.props.match;

    return (
      <div>
      <LinksLol/>
      <div>
        <h2>Topics</h2>

        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>

        {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
        <Switch>
          <Route path={`${match.path}/:topicId`} component={(props) => (<Topic {...props}/>)}>
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
      </div>
    );
  }
}

class Topic extends React.Component {
  render()
  {
    let topicId = this.props.match.params.topicId;
    return <h3>Requested topic ID: {topicId}</h3>;
  }
  
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);