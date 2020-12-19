import React from 'react';
import {isLoggedIn} from './auth'
import { Form, Button } from 'react-bootstrap';
import {API_URL, REGEXNAME, REGEXUSERNAME, REGEXNUMBER, REGEXEMAILCHAR} from './constants'
import {
    Redirect
  } from "react-router-dom";

export class RegistrationForm extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = ({isLoggedIn : isLoggedIn(), username: "", password: "", name: "", phone: "", email: "", redirect: null, error: null, isLoading: false});
      this.handleInputChange = this.handleInputChange.bind(this);
      this.register = this.register.bind(this);
      this.props.updateParent();
    }
    async register(event)
    {
        event.preventDefault();
        if (this.state.isLoading === true)
        {
          return;
        }
        this.setState({isLoading: true});
        const data = {
          "username": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "phone": this.state.phone,
          "name": this.state.name
        }
        const response = await fetch(API_URL+"users/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (response.status === 201)
        {
          this.setState({redirect: "/login", params: { message: "Registracija pavyko, galite prisijungti"}})
        }
        else if (response.status === 409)
        {
          this.setState({error: "Jau yra vartotojas su tokiu prisijungimo vardu", isLoading: false});
        }
        else
        {
          this.setState({error: "Nežinoma klaida, bandykite vėliau", isLoading: false});
        }
        //this.setState({redirect: "/register", params: {username: this.state.username, password: this.state.id, email: this.state.email, phone: this.state.phone, name: this.state.name}});
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
      let errorMessage = null
      if (this.state.error && !this.state.isLoading)
      {
        errorMessage = <div className="alert alert-danger" role="alert">
                        {this.state.error}
                      </div>
      }
      if (!this.state.isLoggedIn)
      {
        form =    <div>
                    <div className="animated-login auth-wrapper">
                    <div className="auth-inner">
                    <Form onSubmit={this.register}>

                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>Prisijungimo vardas:</Form.Label>
                      <Form.Control title="Turi būti naudojamos tik lietuviškos raidės ir skaičiai" pattern={REGEXUSERNAME} name="username" type="text" required="required" minLength="6" maxLength="20" placeholder="Prisijungimo vardas" value={this.state.username} onChange={this.handleInputChange} />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Slaptažodis</Form.Label>
                      <Form.Control name="password" type="password" maxLength="50" required="required" placeholder="Slaptažodis" value={this.state.password} onChange={this.handleInputChange}/>          
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                      <Form.Label>Vardas:</Form.Label>
                      <Form.Control title="Turi būti naudojamos tik lietuviškos raidės" pattern={REGEXNAME} name="name" type="text" required="required" minLength="2" maxLength="20" placeholder="Vardas" value={this.state.name} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Elektroninis paštas:</Form.Label>
                      <Form.Control title={"Turi būti naudojamos tik lietuviškos raidės ir šie simboliai: @ . "} pattern={REGEXEMAILCHAR} name="email" type="text" required="required" minLength="6" maxLength="50" placeholder="E. paštas" value={this.state.email} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                      <Form.Label>Telefono numeris:</Form.Label>
                      <Form.Control  pattern={REGEXNUMBER} title="Turi būti naudojami tik skaičiai" name="phone" type="text" required="required" minLength="6" maxLength="20" placeholder="Tel. nr." value={this.state.phone} onChange={this.handleInputChange} />
                    </Form.Group>

                    {errorMessage}

                    <Button variant="primary" type="submit">
                      Registruotis
                    </Button>
                    {
                      this.state.isLoading &&
                    <div id="smallLoader"></div>
                    }
                  </Form>
                  
                  </div>
                </div>
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