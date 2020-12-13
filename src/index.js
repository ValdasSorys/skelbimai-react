import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {loginContext, isLoggedIn, login, logout} from './auth'
import NotFound from './404'
import {App2} from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {update: this.update};
  }
  render()
  {
    return (
      <Router>
          <Switch>
            <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." {...props}/>)} >
            </Route>            
            <Route exact path="/about" component={(props) => (<About  {...props}/>)} >
            </Route>
            <Route path="/topics" component={(props) => (<Topics {...props}/>)}>
            </Route>
            <Route exact path="/" component={(props) => (<Home {...props}/>)}>
            </Route>
            <Route exact path="/logout" component={(props) => (<Logout {...props}/>)}>
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
          username: {loginContext.user}<br></br>
          id: {loginContext.id}<br></br>
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
            <li>
              <Link to="/logout">Logout</Link>
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
class TestFooter extends React.Component {
  render()
  {
    return(
      <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
    <div class="container text-center">
      <small>Copyright &copy; Your Website</small>
    </div>
  </footer>
    );
  }
}
class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = ({isLoggedIn : isLoggedIn(), username: "", id: "", redirect: null});
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  login(event)
  {
    login(this.state.username, this.state.id);
    this.setState(state => ({isLoggedIn: isLoggedIn(), redirect: "/"}));
  }
  logout()
  {
    this.setState({redirect: "/logout"});
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render()
  {
    if (this.state.redirect) {
      let redirect = this.state.redirect;
      this.setState({redirect: null});
      return <Redirect to={redirect} />
    }
    let button;
    if (!this.state.isLoggedIn)
    {
      button = <form onSubmit={this.login}>
                  <label>
                    Name:
                    <input name="username" type="text" required="required" maxlength="20" value={this.state.username} onChange={this.handleInputChange} />
                  </label><br></br>
                  <label>
                    Id:
                    <input name="id" type="number" min="1" step="1" required="required" value={this.state.id} onChange={this.handleInputChange} />
                  </label><br></br>
                  <input type="submit" value="Login" /><br></br>
                </form>
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
      <TestFooter/>
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
      <App2/>
      <TestFooter/>
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
          <Route exact path={`${match.path}/:topicId`} component={(props) => (<Topic {...props}/>)}>
          </Route>
          <Route exact path="/topics">
            <h3>Please select a topic.</h3>
          </Route>
          <Route path="/">
            <Redirect to="/404" />
            </Route>
        </Switch>
      </div>
      <TestFooter/>
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

class Logout extends React.Component {
  render()
  {
    logout();
    return <Redirect to="/"></Redirect>
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);