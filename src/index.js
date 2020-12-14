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
import {Categories} from './Categories'
import {HomePage} from './HomePage'
import {LoginForm} from './LoginForm'
import NotFound from './404'
import NotAuthorized from './403'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { hideHF: false };   
  }
  hideHF = () =>
  {
    if (this.state.hideHF === false)
    {
      this.setState({hideHF: true});
    }
  }
  showHF = () =>
  {
    if (this.state.hideHF === true)
    {
      this.setState({hideHF : false});
    }
  }
  updateApp = () =>
  {
    this.forceUpdate();
  }
  render()
  {
    let header = "";
    let footer = "";
    if (typeof this.state.hideHF != 'undefined' && !this.state.hideHF)
    {
      header = <LinksLol/>;
      footer = <TestFooter/>;
    }
    let routerElement = "";
    if (isLoggedIn())
    {
      routerElement = <Switch>
                      <Route path="/categories" component={(props) => (<Categories {...props}/>)} >
                      </Route>
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." updateParent={this.hideHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized updateParent={this.hideHF} {...props}/>)} >
                      </Route>               
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout" component={(props) => (<Logout updateParent={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginAction" component={(props) => (<Login updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/test" component={(props) => (<Test updateApp={this.showHF} {...props}/>)}>
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    else
    {
      routerElement = <Switch>
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." updateParent={this.hideHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized updateParent={this.hideHF} {...props}/>)} >
                      </Route>           
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout">
                      <Redirect to="/" />
                      </Route>
                      <Route exact path="/loginAction" component={(props) => (<Login updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/test">
                      <Redirect to="/403" />
                      </Route>
                      <Route exact path="/categories">
                      <Redirect to="/403" />
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    return (
      
      <div>      
      <Router>
          {header}
          {routerElement}
          {footer}
      </Router>
      
      </div>
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
              <Link to="/categories">Kategorijos</Link>
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
              <Link to="/login">Login</Link>
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
      <footer className="bottom-footer py-4 bg-dark text-white-50">
    <div className="container text-center align-middle">
      <small>Copyright &copy; Your Website</small>
    </div>
  </footer>
    );
  }
}

class Logout extends React.Component {
  constructor(props)
  {
    super(props);
    logout();
    this.props.updateParent();
  }
  render()
  {
    return <Redirect to="/"></Redirect>
  }
}

class Login extends React.Component {
  constructor(props)
  {
    super(props);
    if (this.props.location.state)
    {
      login(this.props.location.state.username, this.props.location.state.id);
      this.props.updateApp();
    }
  }
  render()
  {
    return <Redirect to="/"></Redirect>
  }
}
class Test extends React.Component {
  constructor(props)
  {
    super(props);
    this.props.updateApp();
  }
  render()
  {
    return <p>You are logged in for sure!</p>
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);