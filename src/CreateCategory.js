import { Modal, Form, Button, Alert } from 'react-bootstrap';
import React from 'react';

export class CreateCategory extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoadingSmall: false, name: "", show: true, onSubmit: this.props.onSubmit, onExit: this.props.onExit, errorMessage: null};
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
    submit = (event) =>
    {
        event.preventDefault();
        if (this.state.isLoadingSmall)
        {
            return;
        }
        this.setState({isLoadingSmall: true})
        this.state.onSubmit(this.onFail, this.state.name);
    }
    onExit = () =>
    {
        if (this.state.isLoadingSmall)
        {
            return;
        }
        this.state.onExit();
    }
    onFail = (message) =>
    {
        this.setState({isLoadingSmall: false, errorMessage: message});
    }
    render()
    {
        let errorMessage = null;
        if (!this.state.isLoading && this.state.errorMessage)
        {
            errorMessage = <Alert variant="danger">{this.state.errorMessage}</Alert>
        }
        let form = <Modal show={this.state.show} onHide={this.onExit} centered>
                    <Modal.Header className="border-0" closeButton>
                    <Modal.Title>Naujos kategorijos kūrimas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                            <Form onSubmit={this.submit}>

                                <Form.Group controlId="formName">
                                <Form.Label>Kategorijos pavadinimas:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Kategorijos pavadinimas" maxLength="100" minLength="2" required="required" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>
                                {errorMessage}
                                <Button variant="primary" type="submit">
                                Sukurti kategoriją
                                </Button>
                                {
                                this.state.isLoadingSmall &&
                                <div id="smallLoader"></div>
                                }
                            </Form>

                    </Modal.Body>
                    </Modal>
                    
        return <div>{form}</div>;
    }
}