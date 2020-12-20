import React from 'react';
import {getToken} from './auth';
import {Table, Button} from 'react-bootstrap';
import {API_URL} from './constants';
import {CreateCategory} from './CreateCategory';
import { ConfirmationModal } from './ConfirmationModal';
import { UpdateCategory } from './UpdateCategory';

export class Categories extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {isLoading: true, categories: null, createModal: null};
  }
  componentDidMount() {
    this.props.showHF();
    this.loadCategoriesFromAPI();
  }
  async loadCategoriesFromAPI()
  {
    const response = await fetch(API_URL+"categories/", {
      mode: 'cors',
      method: 'GET',
    });
    if (response.status === 200)
    {
      let body = await response.json();
      this.setState({categories: body, isLoading: false});
    }
  }
  reload = async () =>
  {
    await this.setState({categories: null, isLoading: true});
    await this.loadCategoriesFromAPI();
  }
  create = async (onFail, name) =>
  {
    let token = await getToken();
    const body = {
      "name": name
    }
    const response = await fetch(API_URL+"categories/", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    if (response.status === 201)
    {
      this.setState({categories: null, isLoading: true, createModal: null});
      this.loadCategoriesFromAPI();
    }
    else if (response.status === 409)
    {
      onFail("Jau yra kategorija su tokiu pavadinimu");
    }
  }
  showCreateModal = () =>
  {
    this.setState({createModal: <CreateCategory onExit={this.hideCreateModal} onSubmit={this.create} />})
  }
  hideCreateModal = () =>
  {
    this.setState({createModal: null});
  }
  
  render()
  {
    document.title = "Kategorijos"; 
    let categories = null;
    let loader = null;
    if (!this.state.isLoading)
    {
      let categoryElements = [];
      let i;
      for (i = 0; i < this.state.categories.length; i++)
      {
        let index = i;
        let categoryId = this.state.categories[index].id;
        let categoryName = this.state.categories[index].name;
        categoryElements.push(<Category key={index} id={categoryId} name={categoryName} updateParent ={this.reload}/>);
      }
      categories = <div className="elementContainer">
                      <div className="container">
                        <div className="col">
                          <Button className="mb-2" variant="primary" onClick={this.showCreateModal}>Sukurti kategoriją</Button>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Kategorija</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categoryElements}
                            </tbody>
                          </Table>
                          </div>
                      </div>
                    </div>
    }
    else
    {
      loader = <div id="loader"></div>
    } 
    return (      
      <div>
            {this.state.createModal}
            {categories}
            {loader}                 
      </div>
    );
  }
}

class Category extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {deleteModal: null, editModal: null, updateParent: this.props.updateParent, name: this.props.name, id: this.props.id};
  }
  showDeleteModal = () =>
  {
    /*
    this.state = {isLoading: false, show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
            text: this.props.text, header: this.props.header, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click,
          errorMessage: null};
          */
    this.setState({deleteModal: <ConfirmationModal button1Name="Atšaukti" button2Name="Ištrinti" text="Ištrynus, kategorijos atkurti negalima" header={"Kategorijos \"" + this.props.name+ "\" ištrynimas"}
                    onButton1Click={this.delete} onButton2Click={this.hideDeleteModal}/>});
  }
  hideDeleteModal = () =>
  {
    this.setState({deleteModal: null});
  }
  delete = async (onFail) =>
  {
    let token = await getToken();

    const response = await fetch(API_URL+"categories/" + this.props.id + "/", {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token
      }
    });
    if (response.status === 200)
    {
      await this.setState({deleteModal: null});
      this.state.updateParent();
    }
    else if (response.status === 409)
    {
      onFail("Kategoriją naudoja bent vienas skelbimas");
    }
  }
  showUpdateModal = () =>
  {
    this.setState({updateModal: <UpdateCategory onUpdate={this.update} onHide={this.hideUpdateModal} name={this.state.name} id={this.state.id}/>});
  }
  hideUpdateModal = () =>
  {
    this.setState({updateModal: null});
  }
  update = async (onFail, newName) =>
  {
    let token = await getToken();
    const body = {
      "name": newName
    }
    const response = await fetch(API_URL+"categories/" + this.state.id + "/", {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    if (response.status === 200)
    {
      await this.setState({deleteModal: null});
      this.state.updateParent();
    }
    else if (response.status === 409)
    {
      onFail("Kategoriją naudoja bent vienas skelbimas");
    }
    else
    {
      console.log(response.status);
    }
  }
  render()
  {
      return (
        <tr>
        <td>
        {this.state.deleteModal}
        {this.state.updateModal}
        <div style={{"float":"right"}}>
          <Button className="mr-2" variant="primary" onClick={this.showUpdateModal}>Redaguoti</Button>
          <Button style={{"float":"right"}} variant="danger" onClick={this.showDeleteModal}>Ištrinti</Button>
        </div>
        <span style={{"wordWrap":"break-word"}}>{this.state.name}</span>
        </td>
        </tr>
      );
    
  }
}