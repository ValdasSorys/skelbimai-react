import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
            <Route path="/about" component={About} >
            </Route>
            <Route path="/topics" component={(props) => (<Topics {...props}/>)}>
            </Route>
            <Route exact path="/" component={Home}>
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
}
class Home extends React.Component {
  render()
  {
    return (
      <div>
      <LinksLol/>
      <h2>Home</h2>
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