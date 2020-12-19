import React from 'react';
import {isLoggedIn} from './auth'
import { Form, Button } from 'react-bootstrap';
import {
    Redirect
  } from "react-router-dom";
import {API_URL} from './constants'
import {login, setClient_id} from './auth'
export class LoginForm extends React.Component {
    constructor(props)
    {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      let messageReceived = null;
      if (this.props.location && this.props.location.state)
      {
        if (this.props.location.state.message)
        {
          messageReceived = this.props.location.state.message;
        }        
      }
      this.state = ({isLoggedIn : isLoggedIn(), username: "", password: "", redirect: null, error: null, isLoading: false, message: messageReceived});
      this.handleInputChange = this.handleInputChange.bind(this);
      
      this.props.updateParent();
    }
    async login(event)
    {
      event.preventDefault();
      this.setState({message: null});
      if (this.state.isLoading === true)
      {
        return;
      }
      this.setState({isLoading: true});
      const data = {
        "username": this.state.username,
        "password": this.state.password
      }
      const response = await fetch(API_URL+"users/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      if (response.status === 200)
      {
        let body = await response.json();
        setClient_id(body.client_id);
        let result = await login(this.props.updateApp, this.props.isAdmin);
        if (result !== 200)
        {
          this.setState({error: "Neturite tinkamų privilegijų", isLoading: false});
        }
      }
      else if (response.status === 401)
      {
        this.setState({error: "Neteisingi duomenys", isLoading: false});
      }
      else
      {
        this.setState({error: "Kritinė klaida", isLoading: false});
      }
      //this.setState({redirect: "/loginAction", params: {username: this.state.username, id: this.state.id}});
    }
    logout()
    {
      this.setState({redirect: "/logout"});
    }
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    render()
    {
      if (this.state.redirect) {
        let redirect = this.state.redirect;
        if (this.state.params)
        {
          let params = this.state.params;
          return <Redirect to={{
            pathname: redirect,
            state:  params 
        }}
          />
        }
        else
        {
          return <Redirect to={redirect} />
        }
      }
      let button;
      let errorMessage;
      if (this.state.error && !this.state.isLoading)
      {
        errorMessage = <div className="alert alert-danger fade show" role="alert">
                        {this.state.error}
                      </div>
      }
      let message;
      if (this.state.message)
      {
          message = <div className="alert alert-success" role="alert">
                      {this.state.message}
                      </div>
      }
      if (!this.state.isLoggedIn)
      {
        button =  <div className="animated-login auth-wrapper">
                    <div className="auth-inner">
                    <Form onSubmit={this.login}>
                    {message}
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>Vartotojo vardas:</Form.Label>
                      <Form.Control name="username" type="username" placeholder="Slapyvardis" maxLength="20" required="required" value={this.state.username} onChange={this.handleInputChange} />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Slaptažodis</Form.Label>
                      <Form.Control name="password" type="password" maxLength="50" required="required" placeholder="Slaptažodis" value={this.state.password} onChange={this.handleInputChange}/>          
                    </Form.Group>
                    {errorMessage}
                    <Button variant="primary" type="submit">
                      Prisijungti
                    </Button>
                    {
                      this.state.isLoading &&
                    <div id="smallLoader"></div>
                    }
                  </Form>
                  
                  </div>
                </div>
      }
      else
      {
          button = <Redirect to="/"/>
      }
      return (
        <div>
        {button}
        </div>
      );
    }
  }