import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export class UpdateComment extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoading: false, show: true, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click, commentText: this.props.commentText, originalCommentText: this.props.commentText, errorMessage: null};
    }
    handleButton1 = (event) =>
    {        
        event.preventDefault();
        if (this.state.isLoading)
        {
          return;
        }
        if (this.state.commentText === this.state.originalCommentText)
        {
            this.setState({errorMessage: "Nepakeistas komentaro tekstas"});
            return;
        }
        this.state.onButton1Click(this.state.commentText);
        this.setState({isLoading: true});
    }
    handleButton2 = () =>
    {
      if (this.state.isLoading)
      {
        return;
      }
      this.state.onButton2Click();
    }
    handleInputChange = (event) =>
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    render()
    {
        let errorMessage = null;
        if (this.state.errorMessage && !this.state.isLoading)
        {
            errorMessage = <div className="alert alert-danger fade show" role="alert">
                            {this.state.errorMessage}
                            </div>
        }
        return <Modal show={this.state.show} onHide={this.handleButton2} centered>
                <Modal.Header closeButton>
                <Modal.Title>Komentaro redagavimas</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form onSubmit={this.handleButton1}>
                    
                    <Form.Group controlId="formCommentText">
                    <Form.Control rows={3} maxLength="300" name="commentText" as="textarea"  required="required" placeholder="Komentaro tekstas" value={this.state.commentText} onChange={this.handleInputChange}/>          
                    </Form.Group>                    
                    {errorMessage}
                    <Button variant="primary" type="submit">
                    Atnaujinti komentarą                
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