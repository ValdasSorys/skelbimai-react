import React from 'react';
import {
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export class Categories extends React.Component {
  render()
  {
    let match = this.props.match;        
    return (      
      <div>
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Category detailed = {true} {...props}/>)}>
          </Route>
          <Route exact path="/categories">
            <h1>Kategorijos</h1>
            <Category id = {1} detailed = {false}/>
            <Category id = {2} detailed = {false}/>
            <Category id = {3} detailed = {false}/>
            <Category id = {4} detailed = {false}/>
          </Route>
          <Route path="/">
            <Redirect to="/404" />
            </Route>
        </Switch>
      </div>
    );
  }
}

class Category extends React.Component {
  render()
  {
    if (this.props.detailed === false)
    {
      return (
        <p>Kategorija: {this.props.id} <Link to={"/categories/" + this.props.id}>Atidaryti</Link></p>
      );
    }
    else
    {
      return (
        <div>
        <h1>Kategorija</h1>
        <p>Tai yra detalus kategorijos {this.props.match.params.id} langas</p>
        <p><Link to="/categories/">Grįžti atgal</Link></p>
        </div>
      );
    }
  }
}