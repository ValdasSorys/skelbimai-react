import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {loginContext, isLoggedIn, Login, Logout, Register} from './auth'
import {Ads} from './Ads'
import {Categories} from './Categories'
import {HomePage} from './HomePage'
import {LoginForm} from './LoginForm'
import {UserList} from './UsersAdmin'
import {UserInfo} from './UserProfile'
import NotFound from './404'
import NotAuthorized from './403'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';
import { RegistrationForm } from './RegistrationForm';
//import * as constants from './constants'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { hideHF: false, activeLink: "/" };   
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
    let routerElement = "";
    let userRole = isLoggedIn();
    console.log(this.props);
    if (userRole === 2)
    {
      routerElement = <Switch>
                      <Route path="/ads" component={(props) => (<Ads {...props}/>)} >
                      </Route>
                      <Route path="/categories" component={(props) => (<Categories {...props}/>)} >
                      </Route>
                      <Route path="/userslist" component={(props) => (<UserList {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo {...props}/>)} >
                      </Route>  
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>               
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout" component={(props) => (<Logout updateParent={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginAction" component={(props) => (<Login updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    else if (userRole === 1)
    {
                      routerElement = <Switch>
                      <Route path="/ads" component={(props) => (<Ads {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo {...props}/>)} >
                      </Route>                      
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>               
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout" component={(props) => (<Logout updateParent={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginAction" component={(props) => (<Login updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route path="/categories">
                      <Redirect to="/403"/>
                      </Route>
                      <Route path="/userslist">
                      <Redirect to="/403"/>
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    else
    {
      routerElement = <Switch>
                      <Route path="/ads" component={(props) => (<Ads {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo {...props}/>)} >
                      </Route>  
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>           
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout">
                      <Redirect to="/" />
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginAction" component={(props) => (<Login updateApp={this.updateApp} {...props}/>)}>
                      </Route>                      
                      <Route exact path="/categories">
                      <Redirect to="/403" />
                      </Route>
                      <Route path="/">
                      <Route path="/userslist">
                      <Redirect to="/403"/>
                      </Route>
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    if (typeof this.state.hideHF != 'undefined' && !this.state.hideHF)
    {
      header = <Header/>;
      footer = <Footer/>;
    }
    return (
      
      <div>
      <article>    
      <Router>
          {header}
          {routerElement}
          {footer}
      </Router>
      </article> 
      </div>
    );
  }
}

class Header extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {activeKey: ""};
  }
  setActiveKey = (key) => 
  {
      this.setState({activeKey: key});
  }
  render()
  {
    let userRole = isLoggedIn();
    let navbarLeft = "";
    let navbarRight = "";
    if (userRole === 2)
    {
      navbarLeft = 
      <Nav className="mr-auto" activeKey={this.state.activeKey}>
              <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
              <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>
              <Nav.Link onClick = {() => this.setActiveKey("/categories")} eventKey = "/categories" as = {Link} to="/categories">Kategorijos</Nav.Link>
              <Nav.Link onClick = {() => this.setActiveKey("/userslist")} eventKey = "/userslist" as = {Link} to="/userslist">Vartotojų sąrašas</Nav.Link>
              </Nav>
            navbarRight = 
            <Nav activeKey={this.state.activeKey}>
              <Navbar.Text><i>Prisijungęs: {loginContext.user}</i></Navbar.Text>
              <Nav.Link onClick = {() => this.setActiveKey("/user")} eventKey = "/user" as = {Link} to={"/user/"+loginContext.id}>Profilis</Nav.Link>
              <Nav.Link onClick = {() => this.setActiveKey("/logout")} eventKey = "/logout" as = {Link} to="/logout">Atsijungti</Nav.Link>
              </Nav>
    }
    else if (userRole === 1)
    {
      navbarLeft = 
      <Nav className="mr-auto" activeKey={this.state.activeKey}>
          <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
          <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>     
          </Nav>
      navbarRight = 
      <Nav activeKey={this.state.activeKey}>
          <Navbar.Text><i>Prisijungęs: {loginContext.user}</i></Navbar.Text>
          <Nav.Link onClick = {() => this.setActiveKey("/user")}  eventKey = "/user" as = {Link} to={"/user/"+loginContext.id}>Profilis</Nav.Link>
          <Nav.Link onClick = {() => this.setActiveKey("/logout")} eventKey = "/logout" as = {Link} to="/logout">Atsijungti</Nav.Link>
          </Nav>
    }
    else
    {
      navbarLeft = 
              <Nav className="mr-auto" activeKey={this.state.activeKey}>
              <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
              <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>
              </Nav>
      navbarRight = 
              <Nav activeKey={this.state.activeKey}>
              <Nav.Link onClick = {() => this.setActiveKey("/login")} eventKey = "/login" as = {Link} to="/login">Prisijungti</Nav.Link>
              </Nav>
    }
    return(
      <header>
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand>Skelbimų portalas</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      {navbarLeft}
      {navbarRight}
      </Navbar.Collapse>
      </Navbar>
      </header>
    );
  }
}
class Footer extends React.Component {
  render()
  {
    return(
      <footer className="bottom-footer py-4 bg-primary text-white-50">
      <div className="container text-center align-middle">
      <small>Copyright &copy; Your Website</small>
      </div>
      </footer>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);