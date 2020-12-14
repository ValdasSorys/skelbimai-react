import React from 'react';
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import {loginContext} from './auth'
export class UserInfo extends React.Component
{
    render()
  {
    let match = this.props.match;
    let ownerId = -2;
    if (loginContext.id !== -1)
    {
        ownerId = parseInt(loginContext.id);
    } 
    return (      
      <div>
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<User detailed = {true} ownerId = {ownerId} {...props}/>)}>
          </Route>
          <Route exact path="/user">
            <h1>Vartotojas</h1>
            <p>Test</p>
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
    let isOwner = "";
    if (parseInt(this.props.match.params.id) === this.props.ownerId)
    {
        isOwner = " (jūsų)";
    }
    if (this.props.detailed === false)
    {
      return (
        <p>Vartotojas: {this.props.id} <Link to={"/user/" + this.props.id}>Atidaryti</Link></p>
      );
    }
    else
    {

      return (
        <div>
        <h1>Vartotojas</h1>
        <p>Tai yra detalus vartotojo{isOwner} {this.props.match.params.id} langas</p>
        </div>
      );
    }
  }
}