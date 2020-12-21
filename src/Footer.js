import React from 'react';
import {Modal, Container, Row, Col} from 'react-bootstrap';

export class Footer extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {aboutModal: null};
  }
  showAboutModal = () =>
  {
    this.setState({aboutModal: <About onHide={this.hideAboutModal}/>});
    return;
  }
  hideAboutModal = () =>
  {
    this.setState({aboutModal: null});
    return;
  }
  render()
  {
    return(
      <footer className="bottom-footer py-2 bg-primary text-white-50">
        {this.state.aboutModal}
        <Container>
          <Row>
            <Col>
              Informacija:<br></br>
              <a onClick={this.showAboutModal} href="/#">Apie portalą</a><br></br>
            </Col>
            <Col>
            <div className="text-center" style={{"marginTop":"60px"}}>
              <ins>2020</ins>
            </div>
            </Col>
            <Col>
            <div style={{"float":"right"}}>
              Nuorodos:<br></br>
              <a style={{"float":"right"}} href="http://google.lt">Google&nbsp;</a><br></br>
              <a style={{"float":"right"}} href="https://www.bankai.lt/valiutos/valiutu-skaiciuokle">Valiutos&nbsp;</a>
            </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

class About extends React.Component 
{

  render()
  {
    return <Modal show={true} onHide={this.props.onHide} centered>
              <Modal.Header className="border-0" closeButton>
                <Modal.Title>Apie</Modal.Title>
              </Modal.Header>
              <Modal.Body>Papildoma informacija apie skelbimų portalą</Modal.Body>
            </Modal>
  }
}