import React from 'react';
import {
  Link
} from "react-router-dom";
import {loginContext, isLoggedIn} from './auth'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';

export class Header extends React.Component {
    constructor(props)
    {
      super(props);
      let activeHeader = "";
      if (this.props.activeHeader)
      {
        activeHeader = this.props.activeHeader;
      }
      this.state = {activeKey: activeHeader};
    }
    setActiveKey = (key) => 
    {
        this.setState({activeKey: key});
    }
    render()
    {
      let userRole = isLoggedIn();
      let navbarLeft = "";
      let navbarRight = "";
      if (userRole === 2)
      {
        navbarLeft = 
        <Nav className="mr-auto" activeKey={this.state.activeKey}>
                <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
                <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>
                <Nav.Link onClick = {() => this.setActiveKey("/categories")} eventKey = "/categories" as = {Link} to="/categories">Kategorijos</Nav.Link>
                </Nav>
              navbarRight = 
              <Nav className="ml-auto" activeKey={this.state.activeKey}>
                <Navbar.Text><i>Prisijungęs: {loginContext.user}</i></Navbar.Text>
                <Nav.Link onClick = {() => this.setActiveKey("/user")} eventKey = "/user" as = {Link} to={"/user/"+loginContext.id}>Profilis</Nav.Link>
                <Nav.Link onClick = {() => this.setActiveKey("/logout")} eventKey = "/logout" as = {Link} to="/logout">Atsijungti</Nav.Link>
                </Nav>
      }
      else if (userRole === 1)
      {
        navbarLeft = 
        <Nav className="mr-auto" activeKey={this.state.activeKey}>
            <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
            <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>     
            </Nav>
        navbarRight = 
        <Nav className="ml-auto" activeKey={this.state.activeKey}>
            <Navbar.Text><i>Prisijungęs: {loginContext.user}</i></Navbar.Text>
            <Nav.Link onClick = {() => this.setActiveKey("/user")}  eventKey = "/user" as = {Link} to={"/user/"+loginContext.id}>Profilis</Nav.Link>
            <Nav.Link onClick = {() => this.setActiveKey("/logout")} eventKey = "/logout" as = {Link} to="/logout">Atsijungti</Nav.Link>
            </Nav>
      }
      else
      {
        navbarLeft = 
                <Nav className="mr-auto" activeKey={this.state.activeKey}>
                <Nav.Link onClick = {() => this.setActiveKey("/")} eventKey = "/" as = {Link} to="/">Pagrindinis puslapis</Nav.Link>
                <Nav.Link onClick = {() => this.setActiveKey("/ads")} eventKey = "/ads" as = {Link} to="/ads">Skelbimai</Nav.Link>
                </Nav>
        navbarRight = 
                <Nav className="ml-auto" activeKey={this.state.activeKey}>
                  <Nav.Link onClick = {() => this.setActiveKey("/registration")} eventKey = "/registration" as = {Link} to="/registration">Registruotis</Nav.Link>
                <Nav.Link onClick = {() => this.setActiveKey("/login")} eventKey = "/login" as = {Link} to="/login">Prisijungti</Nav.Link>
                </Nav>
      }
      return(
        <Navbar className="header" id="header" sticky="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand>Skelbimai</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {navbarLeft}
        {navbarRight}
        </Navbar.Collapse>
        </Navbar>
      );
    }
  }