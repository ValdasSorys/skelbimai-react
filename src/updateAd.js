import React from 'react'
import {API_URL, REGEXPRICE} from './constants'
import { Form, Button, Modal} from 'react-bootstrap';
import { getToken } from './auth';
export class UpdateAdModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoading: true, isLoadingSmall: false, show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
            text: this.props.text, header: this.props.header, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click,
            errorMessage: null, 
            name: this.props.adData.name, 
            description: this.props.adData.text, 
            price: this.props.adData.price, 
            selectCategory: this.props.adData.categoryId};
        this.handleInputChange = this.handleInputChange.bind(this);
        console.log(this.state);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
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
    
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    handleButton2 = () =>
    {
      this.state.onButton2Click();
    }
    submit = async (event) =>
    {
        event.preventDefault();
        if (this.state.isLoadingSmall === true)
        {
            return;
        }
        if (this.state.name === this.props.adData.name &&
            this.state.description === this.props.adData.text  && 
            this.state.price === this.props.adData.price && 
            this.state.selectCategory === this.props.adData.categoryId)
        {
            this.setState({errorMessage: "Nepakeista nei viena reikšmė"});
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
        const response = await fetch(API_URL+"ads/" + this.props.adData.adId + "/", {
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (response.status === 200)
        {
            let adData = await response.json();
            let dataAd = {adId: adData.id, ownerId: adData.user_id, owner: adData.username, name: adData.name, date: adData.date, 
            text: adData.text, 
            categoryId: adData.category, categoryName: adData.categoryname, price: adData.price, email: adData.email, phone: adData.phone};
            this.state.onButton1Click(dataAd);  
            //this.setState({redirect: "/ads/" + dataAd.adId, params: {dataAd, reloadParent: true} });
        }
        else
        {
            this.setState({errorMessage: "Nežinoma klaida, bandykite dar kartą", isLoadingSmall: false});
        }

    }
    render()
  {         
        if (this.state.isLoading)
        {
            return <Modal show={this.state.show} onHide={this.handleButton2} centered>
            <Modal.Header className="border-0" closeButton>
            <Modal.Title>{this.state.header}<div id="smallLoader"></div></Modal.Title>
            </Modal.Header>
            </Modal>
        }
        else
        {  
            let categoryOptions = [];
            let i;
            for (i = 0; i < this.state.categories.length; i++)
            {
                let index = i;
                if (parseInt(this.state.categoryId) !== index)
                {
                    categoryOptions.push(<option 
                                    key={index} 
                                    value={this.state.categories[index].id}>
                                        {this.state.categories[index].name}
                                    </option>);
                }
                else
                {
                    categoryOptions.push(<option 
                        selected="selected"
                        key={index} 
                        value={this.state.categories[index].id}>
                            {this.state.categories[index].name}
                        </option>);
                }
            }
            let errorMessage = null;
            if (this.state.errorMessage && !this.state.isLoadingSmall)
            {
                errorMessage = <div className="alert alert-danger fade show" role="alert">
                                {this.state.errorMessage}
                                </div>
            }
            return <Modal show={this.state.show} onHide={this.handleButton2} centered>
                    <Modal.Header className="border-0" closeButton>
                    <Modal.Title>{this.state.header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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
                    Atnaujinti skelbimą
                    </Button>
                    {
                        this.state.isLoadingSmall &&
                        <div id="smallLoader"></div>
                    }
                    </Form>

                    </Modal.Body>
                </Modal>
        }
    
  }
}