import React from 'react';
import {Modal, Button} from 'react-bootstrap';
export class ConfirmationModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
            text: this.props.text, header: this.props.header, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click};
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    handleButton1 = () =>
    {
        this.state.onButton1Click();
    }
    handleButton2 = () =>
    {
        this.state.onButton2Click();
    }
    render()
  {         
    return (      
            <Modal show={this.state.show} onHide={this.handleButton1} centered>
            <Modal.Header className="border-0" closeButton>
              <Modal.Title>{this.state.header}</Modal.Title>
            </Modal.Header>
            {this.state.text &&
            <Modal.Body>{this.state.text}</Modal.Body>
            }
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={this.handleButton1}>
                {this.state.button1Name}
              </Button>
              <Button variant="primary" onClick={this.handleButton2}>
                {this.state.button2Name}
              </Button>
            </Modal.Footer>
          </Modal>
    )/*
    return (      
        <Modal show={this.state.show} onHide={this.handleButton1}>
        {this.state.text &&
        <Modal.Body>
            {this.state.text}
        <Button variant="secondary" onClick={this.handleButton1}>
            {this.state.button1Name}
          </Button>
          <Button variant="primary" onClick={this.handleButton2}>
            {this.state.button2Name}
          </Button></Modal.Body>
        }
      </Modal>
)*/
  }
}