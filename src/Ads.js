import React from 'react';
//import {Comments} from './Comments'
import {ConfirmationModal} from './ConfirmationModal'
import {API_URL} from './constants'
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
        this.state = {activePage: 1, pageCount: 1, showFiltering: false, 
          ads: null};
    }
    async componentDidMount() {
      if (this.props.location.pathname === "/ads" || this.props.location.pathname === "/ads/")
      {
        window.scrollTo(0, 0);
        await this.loadAdsFromAPI();    
      }   
    }

    loadAdsFromAPI = async () =>
    {
        const data = {
        "page": this.state.activePage,
        "limit": 3,
        "sortby": "date",
        "sortorder": "DESC"
      }
      const response = await fetch(API_URL+"ads/?actualMethod=GET/", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      if (response.status === 200)
      {
        let body = await response.json();
        let items = [];
        var i;
        for (i = 0; i < body.ads.length; i++)
        {
          let key = i;
          let adData = body.ads[key];
          let dataAd = {adId: adData.id, ownerId: adData.user_id, owner: adData.username, name: adData.name, date: adData.date, 
          text: adData.text, 
          categoryId: adData.category, categoryName: adData.categoryname, price: adData.price, email: adData.email, phone: adData.phone};
          items.push(dataAd)
        }
        this.setState({pageCount: Math.ceil(body.totalCount/3), ads: items})
      }
    }
    setPage = async (number, moveToTop) =>
    {
        if (number > 0 && number <= this.state.pageCount)
        {
            await this.setState({activePage: number, ads: null});
            await this.loadAdsFromAPI(); 
        }
        if (moveToTop)
        {
          window.scroll({top: 0, left: 0, behavior: 'smooth' })
        }
    }

    handleClose = () => this.setState({showFiltering: false});
    handleShow = () => this.setState({showFiltering: true});

    render()
  {
    let match = this.props.match;
    let adList = null;
    if (this.state.ads)
    {
      adList= [];
      var i;
      for (i = 0; i < this.state.ads.length; i++)
      {
        let keyList = i;
        adList.push(<Ad key={keyList} data={this.state.ads[keyList]} detailed={false}/>);
      }
    }
    return (      
      <div className="elementContainer">
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad detailed = {true} {...props}/>)}>
          </Route>
          <Route exact path="/ads">
            <h1>Skelbimai{this.state.activePage}</h1>
            {this.state.ads ?
            <div>
            <button onClick={this.handleShow} type="button" className="btn btn-primary">Filtravimas</button>
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
          <div style={{"height": "15px"}}></div>
          <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
            <table className="entryElement">
            <tbody>
            {adList}
            </tbody>
            </table>
            
        <PagingElement moveToTop={true} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
        </div> : <div id="loader"></div>
          }
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
    let data = null;
    if (this.props.location && this.props.location.state)
    {
      data = this.props.location.state;
    }
    else if (this.props.data)
    {
      data = this.props.data;
    }
    this.state = { confirmationModal: "", text: "", ad : data}   
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.state.ad)
    {
      await this.loadAdFromAPI();
    }
  } 
  loadAdFromAPI = async () =>
    {
      const response = await fetch(API_URL+"ads/" + this.props.match.params.id + "/", {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200)
      {
        let adData = await response.json();
        let dataAd = {adId: adData.id, ownerId: adData.user_id, owner: adData.username, name: adData.name, date: adData.date, 
        text: adData.text, 
        categoryId: adData.category, categoryName: adData.categoryname, price: adData.price, email: adData.email, phone: adData.phone};
        this.setState({ad: dataAd, dataFetched: true});
      }
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
    let ad = this.state.ad;
    if (this.props.detailed === false)
    {
      return (
            <tr>
                    <td className="entryFirst">
                    <div className="wrapper">
                    <div style={{"fontSize": "12px"}}>Savininkas:<br></br>{ad.owner}</div>
                    <div></div>
                    <div style={{"fontSize": "12px", "marginTop": "5px"}}>{ad.date}</div>
                    </div>
                    </td>
                    
                    <td className="entrySecond">
                    <div className="wrapper">
                    <Link to={{
                        pathname: "/ads/" + ad.adId,
                        state: this.props.data
                      }}>
                    <div style={{"color": "#0275d8", "fontWeight": "550"}}>
                        {ad.name}
                    </div>
                    </Link>
                    <div className="entryDetails">
                        {ad.text}
                    </div>
                    <div style={{"marginTop": "-20px"}}>
                        {ad.price}€
                        <div style={{"color": "gray", "fontSize": "15px"}}>
                            Kategorija: {ad.categoryName}
                        </div>
                    </div>
                    </div>
                    </td>
            </tr>
      );
    }
    else
    {
      return (
        <div className="elementContainer">        
        {
          this.state.ad ?
          <div>
          <p>{ad.date}</p> 
          <h2>{ad.name}</h2>
          <p>Savininkas:<br></br>{ad.owner}</p>              
          
          <p>{ad.text}</p>
          <p>{ad.price}€</p>
          <p>{ad.email}</p>
          <p>{ad.phone}</p>
          <p>Kategorija: {ad.categoryName}</p>
          </div> : <div id="loader"></div>
        }
        </div>
      );
    }
  }
}