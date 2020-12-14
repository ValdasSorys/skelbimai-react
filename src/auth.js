import React from 'react'
import {
    Redirect
  } from "react-router-dom";

export let loginContext = {user: "", id: -1};
export function isLoggedIn()
{
    if (window.sessionStorage.getItem("token"))
    {
        loginContext = {user: window.sessionStorage.getItem("username"), id: window.sessionStorage.getItem("id")};
        if (loginContext.id === "0")
        {
            return 2;
        }
        else
        {
            return 1;
        }
    }
    else
    {
        return 0;
    }
}
export function login(username, id)
{
    window.sessionStorage.setItem("token", "1");
    window.sessionStorage.setItem("username", username);
    window.sessionStorage.setItem("id", id);
    loginContext = {user: username, id: id};
}

export function logout()
{
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("id");
    loginContext = {user: "", id: -1};
}

export function register(username, password, name, email, phone)
{
    window.sessionStorage.setItem("token", "1");
    window.sessionStorage.setItem("username", username);
    window.sessionStorage.setItem("id", 0);
    loginContext = {user: username, id: "0"};
}

export class Logout extends React.Component {
    constructor(props)
    {
      super(props);
      logout();
      this.props.updateParent();
    }
    render()
    {
      return <Redirect to="/"></Redirect>
    }
  }
  
export class Login extends React.Component {
    constructor(props)
    {
      super(props);
      if (this.props.location.state)
      {
        login(this.props.location.state.username, this.props.location.state.id);
        this.props.updateApp();
      }
    }
    render()
    {
      return <Redirect to="/"></Redirect>
    }
  }

export class Register extends React.Component 
{
    constructor(props)
    {
        super(props);
        if (this.props.location.state)
        {
            register(this.props.location.state.username, this.props.location.state.password, this.props.location.state.name, this.props.location.state.email, this.props.location.state.phone)
            this.props.updateApp();
        }
    }
    render()
    {
        return <Redirect to="/login"></Redirect>
    }
}
