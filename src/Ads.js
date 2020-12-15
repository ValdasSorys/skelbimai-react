import React from 'react';
import {Comments} from './Comments'
import {ConfirmationModal} from './ConfirmationModal'
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {PagingElement} from './Paging';
import {Modal, Button} from 'react-bootstrap';
export class Ads extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {activePage: 1, pageCount: 20, showFiltering: false};
    }

    setPage = (number) =>
    {
        if (number > 0 && number <= this.state.pageCount)
        {
            this.setState({activePage: number});
        }
    }

    handleClose = () => this.setState({showFiltering: false});
    handleShow = () => this.setState({showFiltering: true});

    render()
  {
    let match = this.props.match; 
         
    return (      
      <div className="elementContainer">
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad detailed = {true} {...props}/>)}>
          </Route>
          <Route exact path="/ads">
            <h1>Skelbimai{this.state.activePage}</h1>
            <button onClick={this.handleShow} type="button" class="btn btn-primary">Filtravimas</button>
            <Modal show={this.state.showFiltering} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

            <table className="entryElement">
            <tr>
                    <td className="entryFirst">
                    <div className="wrapper">
                    <div style={{"font-size": "12px"}}>Savininkas:<br></br>valdas123</div>
                    <div></div>
                    <div style={{"font-size": "12px", "margin-top": "5px"}}>2020-12-12</div>
                    </div>
                    </td>
                    
                    <td className="entrySecond">
                    <div className="wrapper">
                    <div style={{"color": "#0275d8", "font-weight": "550"}}>
                        Opel Astra
                    </div>
                    <div className="entryDetails">
                        Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. 
                    </div>
                    <div style={{"margin-top": "-20px"}}>
                        1250$
                        <div style={{"color": "gray", "font-size": "15px"}}>
                            Kategorija: Automobilis
                        </div>
                    </div>
                    </div>
                    </td>
            </tr>
            <tr>
                    <td className="entryFirst">
                    <div className="wrapper">
                    <div style={{"font-size": "12px"}}>Savininkas:<br></br>valdas123</div>
                    <div></div>
                    <div style={{"font-size": "12px", "margin-top": "5px"}}>2020-12-12</div>
                    </div>
                    </td>
                    
                    <td className="entrySecond">
                    <div className="wrapper">
                    <div style={{"color": "#0275d8", "font-weight": "550"}}>
                        Opel Astra
                    </div>
                    <div className="entryDetails">
                        Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. 
                    </div>
                    <div style={{"margin-top": "-20px"}}>
                        1250$
                        <div style={{"color": "gray", "font-size": "15px"}}>
                            Kategorija: Automobilis
                        </div>
                    </div>
                    </div>
                    </td>
            </tr>
            <tr>
                    <td className="entryFirst">
                    <div className="wrapper">
                    <div style={{"font-size": "12px"}}>Savininkas:<br></br>valdas123</div>
                    <div></div>
                    <div style={{"font-size": "12px", "margin-top": "5px"}}>2020-12-12</div>
                    </div>
                    </td>
                    
                    <td className="entrySecond">
                    <div className="wrapper">
                    <div style={{"color": "#0275d8", "font-weight": "550"}}>
                        Opel Astra
                    </div>
                    <div className="entryDetails">
                        Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. Labai geras ir puikus automobilis. 
                    </div>
                    <div style={{"margin-top": "-20px"}}>
                        1250$
                        <div style={{"color": "gray", "font-size": "15px"}}>
                            Kategorija: Automobilis
                        </div>
                    </div>
                    </div>
                    </td>
            </tr>
        </table>
        <div className="underFloat">
            <Ad id = {1} detailed = {false}/>
            <Ad id = {2} detailed = {false}/>
            <Ad id = {3} detailed = {false}/>
            <Ad id = {4} detailed = {false}/>
        </div>
        <div style={{"margin": "0 auto", "display": "table"}}>
        <PagingElement pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
        </div>
          </Route>
          <Route path="/">
            <Redirect to="/404" />
            </Route>
        </Switch>
      </div>
    );
  }
}

class Ad extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { confirmationModal: "", text: ""}
  }
  showConfirmation = () => 
  {
    let modal = <ConfirmationModal button1Name={"Atšaukti"} button2Name={"Patvirtinti"} text={""} header={"Ar tikrai norite kažką padaryti?"} onButton1Click={this.action1} onButton2Click={this.action2}/>
    this.setState({confirmationModal: modal});
  }
  action1 = () =>
  {
    this.setState({confirmationModal: "", text: "Cancelled"});
  }
  action2 = () =>
  {
    this.setState({confirmationModal: "", text: "Confirmed"});
  }
    render()
  {
    if (this.props.detailed === false)
    {
      return (
        <p>Skelbimas: {this.props.id} <Link to={"/ads/" + this.props.id}>Atidaryti</Link></p>
      );
    }//{show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
    //text: this.props.text, header: this.props.header, onButton1Click: this.props.onButton1Click, onButton2Click: this.props.onButton2Click};
    else
    {
      return (
        <div>
        <h1>Skelbimas</h1>
        <p>Tai yra detalus skelbimo {this.props.match.params.id} langas</p>
        <p>{this.state.text}</p>
        <button onClick={this.showConfirmation} type="button" class="btn btn-primary">Atidaryti modal</button>
        {this.state.confirmationModal}
        <p><Link to="/ads/">Grįžti atgal</Link></p>
        <h1>Komentarai</h1>
        <Comments />
        </div>
      );
    }
  }
}