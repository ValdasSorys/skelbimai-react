import React from 'react'
import {
    Redirect
  } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {API_URL} from './constants'

export let loginContext = {user: "", id: -1, role: "guest", date: null};
export function isLoggedIn()
{
    if (window.localStorage.getItem("token"))
    {
        loginContext = {user: window.localStorage.getItem("username"), id: window.localStorage.getItem("id"), role: window.localStorage.getItem("role"), date: window.localStorage.getItem("date")};
        if (loginContext.role === "admin")
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
export function setClient_id(client_id)
{
  window.localStorage.setItem("client_id", client_id);
}
export async function getToken()
{
  
  if (window.localStorage.getItem("token"))
  {
    if ((new Date().getTime() - window.localStorage.getItem("date"))/1000 > window.localStorage.getItem("expires_in"))
    {
      let isAdmin = false;
      if (window.localStorage.getItem("role") === "admin")
      {
        isAdmin = true;
      }
      await getTokenFromServer(isAdmin);
      return window.localStorage.getItem("token");
    }
    else
    {
      return window.localStorage.getItem("token");
      //return "test";
    }
  }
  else
  {
    return null;
  }
}
export async function login(onFinish, isAdmin)
{
    let result = await getTokenFromServer(isAdmin);
    if (result === 200)
    {
      onFinish();
    }
    return result;
}

async function getTokenFromServer(isAdmin)
{
  let currentDate = new Date().getTime();
  let scope = "";
  console.log(isAdmin);
  if (isAdmin)
  {
    scope = 'ads+comments+ads_admin+comments_admin+categories_admin+user_admin';
  }
  else
  {
    scope = 'ads+comments';
  }
    const response = await fetch(API_URL+"users/gettoken/", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'scope': scope,
        'redirect-uri': 'https://skelbimai.azurewebsites.net/',
        'client-id': window.localStorage.getItem("client_id"),
        'Access-Control-Allow-Origin': '*'
      }
    });
    if (response.status === 200)
    {
      let body = await response.json();
      console.log(body);
      console.log(jwt_decode(body.access_token));
      window.localStorage.setItem("token", body.access_token);
      window.localStorage.setItem("expires_in", body.expires_in);
    }
    else
    {
      logout();
      return response.status;
    }
    const responseUserInfo = await fetch(API_URL+"users/"+ jwt_decode(window.localStorage.getItem("token")).id +"/", {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (responseUserInfo.status === 200)
    {
      let body = await responseUserInfo.json();
      console.log(body);
      window.localStorage.setItem("username", body.username);
      window.localStorage.setItem("id", body.id);
      window.localStorage.setItem("role", body.role);
      window.localStorage.setItem("date", currentDate);
    }
    else
    {
      logout();
      return responseUserInfo.status;
    }
    return 200;
}

export function logout()
{
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("client_id");
    loginContext = {user: "", id: -1, role: "guest", date: null};
}

export function register(username, password, name, email, phone)
{
  /*
    window.localStorage.setItem("token", "1");
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("id", 0);
    loginContext = {user: username, id: "0"};
   */
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
        setClient_id(this.props.location.state.client_id);
        login(this.props.updateApp);
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
