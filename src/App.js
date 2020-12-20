import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { isLoggedIn, Logout, Register} from './auth'
import {Ads} from './Ads'
import {Categories} from './Categories'
import {HomePage} from './HomePage'
import {LoginForm} from './LoginForm'
import {UserInfo} from './UserProfile'
import {Header} from './Header'
import {Footer} from './Footer'
import NotFound from './404'
import NotAuthorized from './403'
import { RegistrationForm } from './RegistrationForm'

export class AppHelper extends React.Component
{
  render()
  {
    return <Route path="/" component={(props) => (<App  {...props}/>)} />
  }
}
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
    let activeHeaderKey = null;
    if (this.props.location.pathname.startsWith("/ads"))
    {
      activeHeaderKey = "/ads";
    }
    else if (this.props.location.pathname.startsWith("/categories"))
    {
      activeHeaderKey = "/categories";
    }
    else if (this.props.location.pathname.startsWith("/userslist"))
    {
      activeHeaderKey = "/userslist";
    }
    else if (this.props.location.pathname === "/")
    {
      activeHeaderKey = "/";
    }
    if (userRole === 2)
    {
      routerElement = <Switch>
                      <Route path="/ads" component={(props) => (<Ads showHF={this.showHF} role = {userRole} {...props}/>)} >
                      </Route>
                      <Route exact path="/categories" component={(props) => (<Categories showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo showHF={this.showHF} {...props}/>)} >
                      </Route>  
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>               
                      <Route exact path="/" component={(props) => (<HomePage showHF={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout" component={(props) => (<Logout updateParent={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm isAdmin={false} updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginadmin" component={(props) => (<LoginForm isAdmin={true} updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    else if (userRole === 1)
    {
                      routerElement = <Switch>
                      <Route path="/ads" component={(props) => (<Ads showHF={this.showHF} role = {userRole} {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo showHF={this.showHF} {...props}/>)} >
                      </Route>                      
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>               
                      <Route exact path="/" component={(props) => (<HomePage {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm isAdmin={false}  updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginadmin" component={(props) => (<LoginForm isAdmin={true} updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout" component={(props) => (<Logout updateParent={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/categories">
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
                      <Route path="/ads" component={(props) => (<Ads showHF={this.showHF} role = {userRole} {...props}/>)} >
                      </Route>
                      <Route path="/user" component={(props) => (<UserInfo showHF={this.showHF} {...props}/>)} >
                      </Route>  
                      <Route exact path="/404" component={(props) => (<NotFound errorMessage="Puslapis nerastas." hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>
                      <Route exact path="/403" component={(props) => (<NotAuthorized hideHF={this.hideHF} showHF={this.showHF} {...props}/>)} >
                      </Route>           
                      <Route exact path="/" component={(props) => (<HomePage showHF={this.showHF} {...props}/>)}>
                      </Route>
                      <Route exact path="/login" component={(props) => (<LoginForm isAdmin={false} updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/loginadmin" component={(props) => (<LoginForm isAdmin={true} updateParent={this.showHF} updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/logout">
                      <Redirect to="/" />
                      </Route>
                      <Route exact path="/register" component={(props) => (<Register updateApp={this.updateApp} {...props}/>)}>
                      </Route>
                      <Route exact path="/registration" component={(props) => (<RegistrationForm updateParent={this.showHF} {...props}/>)}>
                      </Route>                  
                      <Route exact path="/categories">
                      <Redirect to="/403" />
                      </Route>
                      <Route path="/">
                      <Redirect to="/404" />
                      </Route>
                      </Switch>
    }
    if (typeof this.state.hideHF != 'undefined' && !this.state.hideHF)
    {
      header = <Header activeHeader={activeHeaderKey}/>;
      footer = <Footer/>;
    }
    return (        
      <div>
          {header}
          <div className="bodypage">
          {routerElement}
          </div>
          {footer}
      </div>
    );
  }
}