import React from 'react'
import {API_URL, REGEXPRICE} from './constants'
import {
    Redirect
  } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { getToken } from './auth';
export class CreateAd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoading: true, isLoadingSmall: false, categories: null, name: "", description: "", price: "", selectCategory: 1};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async componentDidMount()
    {
        //api/categories/
        const response = await fetch(API_URL+"categories/", {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200)
          {
            let body = await response.json();
            this.setState({categories: body, isLoading: false});
          }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }
    async submit(event)
    {
        event.preventDefault();
        if (this.state.isLoadingSmall === true)
        {
            return;
        }
        this.setState({isLoadingSmall: true});
        let token = await getToken();
        const data = {
            "name": this.state.name,
            "text": this.state.description,
            "category": parseInt(this.state.selectCategory),
            "price": parseFloat(this.state.price)
        }
        const response = await fetch(API_URL+"ads/", {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (response.status === 201)
        {
            let body = await response.json();
            let adData = body;
            let dataAd = {adId: adData.id, ownerId: adData.user_id, owner: adData.username, name: adData.name, date: adData.date, 
            text: adData.text, 
            categoryId: adData.category, categoryName: adData.categoryname, price: adData.price, email: adData.email, phone: adData.phone};
                
            this.setState({redirect: "/ads/" + dataAd.adId, params: {dataAd, reloadParent: true} });
        }
        else
        {
            this.setState({errorMessage: "Nežinoma klaida, bandykite dar kartą", isLoadingSmall: false});
        }


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
        let errorMessage = null;
        if (this.state.errorMessage && !this.state.isLoadingSmall)
        {
            errorMessage = <div className="alert alert-danger fade show" role="alert">
                            {this.state.errorMessage}
                            </div>
        }
        let form = null;
        if (this.state.categories)
        {   
            let categoryOptions = [];
            let i;
            for (i = 0; i < this.state.categories.length; i++)
            {
                let index = i;
                categoryOptions.push(<option 
                                    key={index} 
                                    value={this.state.categories[index].id}>
                                        {this.state.categories[index].name}
                                    </option>);
            }
            form =  <div className="animated-login auth-wrapper">
                        <div className="auth-inner">
                            <Form onSubmit={this.submit}>

                                <Form.Group controlId="formName">
                                <Form.Label>Skelbimo pavadinimas:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Skelbimo pavadinimas" maxLength="100" minLength="6" required="required" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>
                            
                                <Form.Group controlId="formDescription">
                                <Form.Label>Skelbimo aprašymas:</Form.Label>
                                <Form.Control className="error" style={{"height": "200px"}} maxLength="2000" name="description" as="textarea"  required="required" placeholder="Skelbimo aprašymas" value={this.state.description} onChange={this.handleInputChange}/>          
                                </Form.Group>

                                <Form.Group controlId="formCategory">
                                <Form.Label>Kategorija</Form.Label>
                                <Form.Control as="select" name="selectCategory" value={this.state.selectCategory} onChange={this.handleInputChange}>
                                {categoryOptions}
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formDescription">
                                <Form.Label>Kaina(€):</Form.Label>
                                <Form.Control name="price" pattern={REGEXPRICE} title="Turi būti neneigiama kaina" type="text" required="required" placeholder="Kaina" value={this.state.price} onChange={this.handleInputChange}/>          
                                </Form.Group>
                                {errorMessage}
                                <Button variant="primary" type="submit">
                                Sukurti skelbimą
                                </Button>
                                
                                {
                                this.state.isLoadingSmall &&
                                <div id="smallLoader"></div>
                                }
                            </Form>
                    
                        </div>
                    </div>
        }
        let loader = null;
        if (this.state.isLoading)
        {
            loader = <div id="loader"></div>
        }
        return <div>{loader}{form}</div>;
    }
}
