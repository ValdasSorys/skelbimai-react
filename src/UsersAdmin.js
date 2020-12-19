import React from 'react';
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
export class UserList extends React.Component
{
    render()
    {
      document.title = "Vartotojų sąrašas";
      let match = this.props.match;        
      return (      
        <div>
        <Switch>
            <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<User detailed = {true} {...props}/>)}>
            </Route>
            <Route exact path="/userslist">
              <h1>Vartotojai</h1>
              <User id = {1} detailed = {false}/>
              <User id = {2} detailed = {false}/>
              <User id = {3} detailed = {false}/>
              <User id = {4} detailed = {false}/>
            </Route>
            <Route path="/">
              <Redirect to="/404" />
              </Route>
          </Switch>
        </div>
      );
    }
}

class User extends React.Component
{
    render()
  {
    if (this.props.detailed === false)
    {
      return (
        <p>Vartotojas: {this.props.id} <Link to={"/userslist/" + this.props.id}>Atidaryti</Link></p>
      );
    }
    else
    {
      return (
        <div>
        <h1>Vartotojas</h1>
        <p>Tai yra detalus vartotojo {this.props.match.params.id} admin langas</p>
        <p><Link to="/ads/">Grįžti atgal</Link></p>
        </div>
      );
    }
  }
}