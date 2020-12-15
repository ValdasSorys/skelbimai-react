import React from 'react';
import {isLoggedIn} from './auth'
import {
    Redirect
  } from "react-router-dom";

export class RegistrationForm extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = ({isLoggedIn : isLoggedIn(), username: "", password: "", name: "", phone: "", email: "", redirect: null});
      this.handleInputChange = this.handleInputChange.bind(this);
      this.register = this.register.bind(this);
      this.props.updateParent();
    }
    register()
    {
        this.setState({redirect: "/register", params: {username: this.state.username, password: this.state.id, email: this.state.email, phone: this.state.phone, name: this.state.name}});
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
      let form;
      if (!this.state.isLoggedIn)
      {
        form =    <div>
                    <h1>Registracija</h1>
                    <form onSubmit={this.register}>
                    <label>
                      Prsijungimo vardas:
                      <input name="username" type="text" required="required" maxLength="20" value={this.state.username} onChange={this.handleInputChange} />
                    </label><br></br>
                    <label>
                      Slaptažodis:
                      <input name="password" type="password" maxLength="50" required="required" value={this.state.password} onChange={this.handleInputChange} />
                    </label>
                    <label>
                      Vardas:
                      <input name="name" type="text" maxLength="50" required="required" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <label>
                      Elektroninis paštas:
                      <input name="email" type="email" required="required" value={this.state.email} onChange={this.handleInputChange} />
                    </label>
                    <label>
                      Telefonas:
                      <input name="phone" type="number" min="0" step ="1" required="required" value={this.state.phone} onChange={this.handleInputChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Registruotis" /><br></br>
                    </form>
                    </div>
      }
      else
      {
        form = <Redirect to="/" />
      }
      return (
        <div>
        {form}
        </div>
      );
    }
  }