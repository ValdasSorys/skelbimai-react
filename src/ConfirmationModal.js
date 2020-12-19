import React from 'react';
import {Modal, Button} from 'react-bootstrap';
export class ConfirmationModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isLoading: false, show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
            text: this.props.text, header: this.props.header, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click};
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    handleButton1 = () =>
    {        
        if (this.state.isLoading)
        {
          return;
        }
        this.state.onButton1Click();
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
    render()
  {         
    return (      
            <Modal show={this.state.show} onHide={this.handleButton2} centered>
            <Modal.Header className="border-0" closeButton>
              <Modal.Title>{this.state.header}</Modal.Title>
            </Modal.Header>
            {this.state.text &&
            <Modal.Body>{this.state.text}</Modal.Body>
            }
              <Modal.Footer className="border-0">
              {this.state.isLoading &&
              <div className="mr-1" id="smallLoader"></div>
              }
              <Button variant="secondary" onClick={this.handleButton2}>
              {this.state.button1Name}
              </Button>
              <Button variant="primary" onClick={this.handleButton1}>
              {this.state.button2Name}
              </Button>
              </Modal.Footer>
          </Modal>
    )
  }
}