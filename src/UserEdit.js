import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {REGEXNAME, REGEXNUMBER, REGEXEMAILCHAR} from './constants'
export class UserEdit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoading: false, show: true, name: this.props.name, email: this.props.email, phone: this.props.phone, 
                            originalName: this.props.name, originalEmail: this.props.email, originalPhone: this.props.phone,
                            errorMessage: null, onExit: this.props.onExit, onSubmit: this.props.onSubmit};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    onSubmit = (event) =>
    {
        event.preventDefault();
        if (this.state.isLoading)
        {
            return;
        }
        if (this.state.name === this.state.originalName &&
            this.state.email === this.state.originalEmail &&
            this.state.phone === this.state.originalPhone)
        {
            this.setState({errorMessage: "Nepakeisti duomenys"});
            return;
        }
        this.setState({isLoading: true});
        let newData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.state.onSubmit(newData);
    }

    onExit = () =>
    {
        if (this.state.isLoading)
        {
            return;
        }
        this.state.onExit();
    }
    
    render()
    {   
        let errorMessage = null;
        if (!this.state.isLoading && this.state.errorMessage)
        {
            errorMessage = <div className="alert alert-danger" role="alert">
                                    {this.state.errorMessage}
                                </div>
        }
        
        return <Modal show={this.state.show} onHide={this.onExit} centered>
                <Modal.Header className="border-0" closeButton>
                    <Modal.Title>Profilio redagavimas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={this.onSubmit}>

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
                    Atnaujinti profilį               
                    </Button>
                    {
                        this.state.isLoading &&
                        <div id="smallLoader"></div>
                    }
                </Form>
                </Modal.Body>
            
                </Modal>
    }
}
