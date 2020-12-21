import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {isLoggedIn, loginContext, getToken} from './auth'
import {API_URL} from './constants'
import {UserEdit} from './UserEdit'
import {Card, Button} from 'react-bootstrap'
import { ConfirmationModal } from './ConfirmationModal';
export class UserInfo extends React.Component
{
    componentDidMount()
    {
      this.props.showHF();
    }
    render()
    {
      document.title = "Vartotojo profilis";
      let match = this.props.match;
      let ownerId = -1;
      if (isLoggedIn() !== 0)
      {
          ownerId = parseInt(loginContext.id);
      }
      let onUser = <Redirect to="/403"/>
      if (ownerId !== -1)
      {
        onUser = <Redirect to={"/user/" + ownerId}/>
      }
      return (      
        <div>
        <Switch>
            <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<User detailed = {true} ownerId = {ownerId} {...props}/>)}>
            </Route>
            <Route exact path="/user">
              {onUser}
            </Route>
            <Route path="/">
              <Redirect to="/404" />
              </Route>
          </Switch>
        </div>
      );
    }
}

class User extends React.Component
{    
    constructor(props)
    {
      super(props);
      this.state = {isLoading: true, id: this.props.match.params.id,  idUser: this.props.ownerId, user: null, 
        userEditModal: null, userDeleteModal: null, userDeleted: false};
    }
    async componentDidMount()
    {
      const response = await fetch(API_URL+"users/" + this.state.id + "/",
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200)
      {
        let body = await response.json();
        this.setState({user: body, isLoading: false});
      }
      else if (response.status === 404)
      {
        this.props.history.replace("/404");
      }
    }
    showEditModal = () =>
    {
      let user = this.state.user;
      this.setState({userEditModal: <UserEdit onSubmit={this.update} onExit={this.hideEditModal} name={user.name} email={user.email} phone={user.phone} />});
    }
    hideEditModal = () =>
    {
      this.setState({userEditModal: null});
    }
    
    update = async (newData) =>
    {
      let token = await getToken();
      const data = {
        "name": newData.name,
        "email": newData.email,
        "phone": newData.phone
      }
      const response = await fetch(API_URL+"users/" + this.state.user.id + "/",
      {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200)
      {
        let body = await response.json();
        this.setState({user: body, isLoading: false, userEditModal: null});
      }
      else
      {
        this.setState({userEditModal: null});
      }
    }
    showDeleteModal = () =>
    {
      this.setState({userDeleteModal: <ConfirmationModal button1Name="Atšaukti" button2Name="Ištrinti" text="Ištrynus, vartotojo atkurti negalima" 
                      header="Ištrinti vartotoją" onButton1Click={this.delete} onButton2Click={this.hideDeleteModal}/>})
    }
    hideDeleteModal = () =>
    {
      this.setState({userDeleteModal: null});
    }
    delete = async () =>
    {
      let token = await getToken();
      const response = await fetch(API_URL+"users/" + this.state.user.id + "/",
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        }
      });
      if (response.status === 200)
      {
        this.setState({userDeleted: true, userEditModal: null});
      }
      else
      {
        this.setState({userEditModal: null});
      }
    }
    render()
    {
      if (this.state.isLoading)
      {
        return <div id="loader"></div>
      }
      if (this.state.userDeleted)
      {
        return <div className="elementContainer">
                <div className="container">
                  <div className="col">
                    <div className="alert alert-success" role="alert">
                      Vartotojas pašalintas sėkmingai
                    </div>
                  </div>
                </div>
              </div> 
              
      }
      let role = isLoggedIn();
      let isOwner = "";
      let buttonEdit = null;
      let buttonDelete = null;

      if (parseInt(this.state.id) === parseInt(this.state.idUser))
      {
          isOwner = " (jūsų)";
          buttonEdit = <Button variant="primary" onClick={this.showEditModal}>Redaguoti</Button>
      }
      else if (role === 2)
      {
          buttonDelete = <Button variant="danger" onClick={this.showDeleteModal}>Ištrinti vartotoją</Button>
      }

      let user = this.state.user;
      return  <div className="elementContainer">
                <div className="container">
                  <div className="col">
                    <Card className="mt-4">
                      {this.state.userEditModal}
                      {this.state.userDeleteModal}
                      <Card.Header>
                        <Card.Title>Profilio peržiūra{isOwner}</Card.Title>                      
                        </Card.Header>
                      <Card.Body>
                                              
                        <Card.Text>
                          <b>Prisijungimo vardas:</b> {user.username}
                        </Card.Text>
                        <Card.Text>
                          <b>Vardas:</b> {user.name}
                        </Card.Text>
                        <Card.Text>
                          <b>El. paštas:</b> {user.email}
                        </Card.Text>
                        <Card.Text>
                          <b>Telefonas:</b> {user.phone}
                        </Card.Text>
                        <Card.Text>
                          <b>Registracijos data:</b> {user.usersince_date}
                        </Card.Text>
                        <Card.Text></Card.Text>                        
                        <Card.Text>
                          <b>Rolė:</b> {user.role}
                        </Card.Text>
                        <div>
                          {buttonEdit}
                          {buttonDelete}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
  }
}