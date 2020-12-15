import React from 'react';
import {isLoggedIn} from './auth'
import { Form, Button } from 'react-bootstrap';
import {
    Redirect
  } from "react-router-dom";
export class LoginForm extends React.Component {
    constructor(props)
    {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.state = ({isLoggedIn : isLoggedIn(), username: "", id: "", redirect: null});
      this.handleInputChange = this.handleInputChange.bind(this);
      this.props.updateParent();
    }
    login()
    {
      this.setState({redirect: "/loginAction", params: {username: this.state.username, id: this.state.id}});
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
      if (!this.state.isLoggedIn)
      {
        button =  <div className="animated-login auth-wrapper">
                    <div className="auth-inner">
                    <Form onSubmit={this.login}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Vartotojo vardas:</Form.Label>
                      <Form.Control name="username" type="username" placeHolder="Slapyvardis" maxLength="20" required="required" value={this.state.username} onChange={this.handleInputChange} />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Slaptažodis</Form.Label>
                      <Form.Control name="id" type="password" maxLength="50" required="required" placeholder="Slaptažodis" value={this.state.id} onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Prisijungti
                    </Button>
                  </Form>
                    </div>
                </div>
      }
      else
      {
          button = <div><h1>Atsijungimas</h1>
                   <button onClick={this.logout}>
                    Atsijungti
                    </button></div>
      }
      return (
        <div>
        {button}
        </div>
      );
    }
  }