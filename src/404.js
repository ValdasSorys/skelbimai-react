import React from 'react';
import {
    Link,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'


class NotFound extends React.Component
{
    render()
    {
        let errorMessage;
        if (this.props.errorMessage)
        {
            errorMessage = this.props.errorMessage;
        }
        else
        {
            errorMessage = "";
        }
        return(<div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h1>
                        Klaida</h1>
                    <h2>
                        404 Not Found</h2>
                    <div class="error-details">
                        Atsiprašome, įvyko klaida. {errorMessage}
                    </div>
                    <br></br>
                    <div class="error-actions">
                        <Link to="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                            Pagrindinis puslapis</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)    
    }
}
export default NotFound;