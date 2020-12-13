import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'

class App extends React.Component {
  render()
  {
    return (
      <Router>
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

          <Switch>
            <Route path="/about" component={About} >
            </Route>
            <Route path="/topics" component={(props) => (<Topics {...props}/>)}>
            </Route>
            <Route path="/" component={Home}>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  render()
  {
    return <h2>Home</h2>;
  }
}

class About extends React.Component {
  render()
  {
    return <h2>About</h2>;
  }
}

class Topics extends React.Component {
  render()
  {
    let match = this.props.match;

    return (
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