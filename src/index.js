import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './header.css';
import './footer.css';
import './smallLoader.css';
import {AppHelper} from './App';

ReactDOM.render(
  <Router>
    <AppHelper />
  </Router>,
  document.getElementById("root")
);