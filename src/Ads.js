import React from 'react';
import {Comments} from './Comments'
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
export class Ads extends React.Component
{
    render()
  {
    let match = this.props.match;        
    return (      
      <div>
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad detailed = {true} {...props}/>)}>
          </Route>
          <Route exact path="/ads">
            <h1>Skelbimai</h1>
            <Ad id = {1} detailed = {false}/>
            <Ad id = {2} detailed = {false}/>
            <Ad id = {3} detailed = {false}/>
            <Ad id = {4} detailed = {false}/>
          </Route>
          <Route path="/">
            <Redirect to="/404" />
            </Route>
        </Switch>
      </div>
    );
  }
}

class Ad extends React.Component
{
    render()
  {
    if (this.props.detailed === false)
    {
      return (
        <p>Skelbimas: {this.props.id} <Link to={"/ads/" + this.props.id}>Atidaryti</Link></p>
      );
    }
    else
    {
      return (
        <div>
        <h1>Skelbimas</h1>
        <p>Tai yra detalus skelbimo {this.props.match.params.id} langas</p>
        <p><Link to="/ads/">Grįžti atgal</Link></p>
        <h1>Komentarai</h1>
        <Comments />
        </div>
      );
    }
  }
}