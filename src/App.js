import './App.css';
import React from 'react';
import {loginContext} from './auth'

export class App2 extends React.Component {
  render()
  {
    return (
      <div>
      <h1>{loginContext.user}</h1>
      <h1>{loginContext.id}</h1>
      </div>
    );
  }
}
