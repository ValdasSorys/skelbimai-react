import React from 'react'; 
import { Form, Button, Modal, Alert} from 'react-bootstrap';

export class UpdateCategory extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {show: true, isLoading: false, errorMessage: null, originalName: this.props.name, name: this.props.name, id: this.props.id, 
            onUpdate: this.props.onUpdate, onHide: this.props.onHide};
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }
    submit = async (event) =>
    {
        event.preventDefault();
        if (this.state.isLoading)
        {
            return;
        }
        if (this.state.name === this.state.originalName)
        {
            this.setState({errorMessage: "Nepakeisti duomenys"});
            return;
        }
        await this.setState({isLoading: true});
        this.state.onUpdate(this.onFail, this.state.name);        
    }
    handleButton2 = () =>
    {
        if (this.state.isLoading)
        {
            return;
        }
        this.state.onHide();
    }
    onFail = (message) =>
    {
        this.setState({isLoading: false, errorMessage: message});
    }
    render()
    {
        let errorMessage = null;
        if (!this.state.isLoading && this.state.errorMessage)
        {
            errorMessage = <Alert variant="danger">{this.state.errorMessage}</Alert>
        }
        return <Modal show={this.state.show} onHide={this.handleButton2} centered>
                <Modal.Header className="border-0" closeButton>
                <Modal.Title>Kategorijos "{this.state.originalName}" redagavimas</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form onSubmit={this.submit}>

                <Form.Group controlId="formName">
                <Form.Label>Kategorijos pavadinimas:</Form.Label>
                <Form.Control name="name" type="text" placeholder="Kategorijos pavadinimas" maxLength="20" minLength="2" required="required" value={this.state.name} onChange={this.handleInputChange} />
                </Form.Group>

                {errorMessage}
                <Button variant="primary" type="submit">
                Atnaujinti kategoriją
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