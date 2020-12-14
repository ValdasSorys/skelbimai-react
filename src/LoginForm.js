import React from 'react';
import {isLoggedIn} from './auth'
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
        button = <form onSubmit={this.login}>
                    <label>
                      Name:
                      <input name="username" type="text" required="required" maxLength="20" value={this.state.username} onChange={this.handleInputChange} />
                    </label><br></br>
                    <label>
                      Id:
                      <input name="id" type="number" min="1" step="1" required="required" value={this.state.id} onChange={this.handleInputChange} />
                    </label><br></br>
                    <input type="submit" value="Login" /><br></br>
                  </form>
      }
      else
      {
          button = <button onClick={this.logout}>
                  Logout
                  </button>
      }
      return (
        <div>
        <h2>Login</h2>
        {button}
        </div>
      );
    }
  }