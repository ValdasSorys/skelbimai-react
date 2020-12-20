import React from 'react';
import {
    Link,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import * as constants from './constants'


class NotAuthorized extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props.hideHF();
    }
    render()
    {
        document.title = "Neautorizuotas";
        let errorMessage;
        if (this.props.errorMessage)
        {
            errorMessage = this.props.errorMessage;
        }
        else
        {
            errorMessage = "";
        }
        return(<div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="error-template">
                    <h1>
                        Klaida</h1>
                    <h2>
                        403 Not Authorized</h2>
                    <div className="error-details">
                        Neturite prieigos prie šio resurso. {errorMessage}
                    </div>
                    <br></br>
                    <div className="error-actions">
                        <Link to="/" className="btn btn-primary btn-lg" onClick={this.props.showHF}><span className="glyphicon glyphicon-home"></span>
                            Pagrindinis puslapis</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)    
    }
}
export default NotAuthorized;