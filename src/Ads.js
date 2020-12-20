import React from 'react';
import {isLoggedIn, loginContext, getToken} from './auth'
import {Comments} from './Comments'
import {ConfirmationModal} from './ConfirmationModal'
import {API_URL} from './constants'
import {CreateAd} from './createAd'
import {UpdateAdModal} from './updateAd'
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {PagingElement} from './Paging';
import {Modal, Button, Form} from 'react-bootstrap';
export class Ads extends React.Component
{
    constructor(props)
    {
        super(props);
        let onlyRoutingVar = null;
        let pathWithoutParams = this.props.location.pathname.split("?")[0];
        if (pathWithoutParams === "/ads" || pathWithoutParams === "/ads/")
        {
          onlyRoutingVar = false;
        }
        else
        {
          onlyRoutingVar =true;
        }

        let activePageVar = 1;

        let writtenPageVar = null;

        const params = this.props.location.search;
        const regex = /[?&]page=[0-9]+(&|$)/g;
        const found = params.match(regex);
        if (found && found.length > 0)
        {
          activePageVar = parseInt(found[0].replace("page", "").replace("&", "").replace("?", "").replace("=", ""));
          writtenPageVar = activePageVar;
          if (activePageVar < 1)
          {
            activePageVar = 1;
          }
        }
        this.state = {activePage: activePageVar, writtenPage: writtenPageVar, pageCount: 1, showFiltering: false, 
          ads: null, role: this.props.role, onlyRouting: onlyRoutingVar};
        
        
    }
    async componentDidMount() {
      this.props.showHF();
      let pathWithoutParams = this.props.location.pathname.split("?")[0];

      
      if (pathWithoutParams === "/ads" || pathWithoutParams === "/ads/")
      {
        const params = this.props.location.search;
        const regex = /[?&]page=[0-9]+(&|$)/g;
        const found = params.match(regex);
        if (found && found.length > 0)
        {
          parseInt(found[0].replace("page", "").replace("&", "").replace("?", "").replace("=", ""));
        }
        if ((this.state.activePage === 1 && this.state.writtenPage !== 1) || this.state.writtenPage === null)
        {
          await this.props.history.replace("/ads?page=1");
        }
        else
        {
          await this.loadAdsFromAPI();  
        }  
      }   
    }

    loadAdsFromAPI = async () =>
    {
        const data = {
        "page": this.state.activePage,
        "limit": 10,
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
        if (body.totalCount > 0 && body.ads.length === 0)
        {
            this.props.history.replace("/ads?page=1");
        }
        else
        {
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
          this.setState({pageCount: Math.ceil(body.totalCount/10), ads: items})
        }
      }
    }
    setPage = async (number, moveToTop) =>
    {
        if (number !== this.state.activePage)
        {
          if (number > 0 && number <= this.state.pageCount)
          {
              await this.props.history.replace("/ads?page=" + number);
          }
          if (moveToTop)
          {
            window.scroll({top: 0, left: 0, behavior: 'smooth' })
          }
        }
    }
    getAds = () =>
    {
      return this.state.ads;
    }

    handleClose = () => this.setState({showFiltering: false});
    handleShow = () => this.setState({showFiltering: true});

    render()
    {
      document.title = "Skelbimai";
    let unAllowedRoutes = null;
    if (isLoggedIn() === 0)
    {
      unAllowedRoutes = [];
      unAllowedRoutes.push(<Route key={0} exact path="/ads/create/">
                            <Redirect to="/403" />
                          </Route>);
    }
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
    let extraButtons = "";
    if (this.state.role === 1 || this.state.role === 2)
    {
      extraButtons = <div className="mb-2">
                      <Link to="/ads/create">                        
                        <button type="button" className="btn btn-primary">Kurti skelbimą</button>
                      </Link>
                    </div>
    }
    return (      
      <div className="elementContainer">
      <Switch>
          
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad detailed = {true} {...props}/>)}>
          </Route>

          <Route exact path="/ads">
            
            {this.state.ads ?
            <div>

            <Modal show={this.state.showFiltering} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>Vartotojo vardas:</Form.Label>
                      <Form.Control name="username" type="username" placeholder="Slapyvardis" maxLength="20" required="required" value={this.state.username} onChange={this.handleInputChange} />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Slaptažodis</Form.Label>
                      <Form.Control name="password" type="password" maxLength="50" required="required" placeholder="Slaptažodis" value={this.state.password} onChange={this.handleInputChange}/>          
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Prisijungti
                    </Button>
                    {
                      this.state.isLoading &&
                    <div id="smallLoader"></div>
                    }
                  </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          

          <div > 
            <div className="container">
            <div className="row">
            {extraButtons}   
            </div></div>     
            <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                {adList}       
            <PagingElement moveToTop={true} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/> 
          </div>

        </div> : <div id="loader"></div>
          }
          </Route>
          {unAllowedRoutes}
          <Route exact path="/ads/create/" >
            <CreateAd/>
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
    if (this.props.location && this.props.location.state && this.props.location.state.dataAd)
    {
      if (this.props.location.state.dataAd)
      {
        data = this.props.location.state.dataAd;
      }
    }    
    else if (this.props.data)
    {
      data = this.props.data;
    }
    this.state = { confirmationModal: "", text: "", ad : data, adDeleted: false, updateAdModal: null, redirect: null}   
    this.onAdUpdate = this.onAdUpdate.bind(this);
    this.hideUpdateAdModal = this.hideUpdateAdModal.bind(this);
    this.showUpdateAdModal = this.showUpdateAdModal.bind(this);
  }
  async componentDidMount() {
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
        this.setState({ad: dataAd});
      }
      else if (response.status === 404)
      {
        this.setState({redirect: "/404"});
      }
    }
  
  tryToDelete = () =>
  {
    this.setState({confirmationModal: <ConfirmationModal button1Name="Atšaukti" button2Name="Ištrinti" text="Ištrynus, skelbimo atkurti negalima" header="Ar tikrai norite ištrinti skelbimą?" onButton1Click={this.delete} onButton2Click={this.hideConfirmation}/>})
  }
  hideConfirmation = () =>
  {
    this.setState({confirmationModal: null});
  }
  showUpdateAdModal()
  {
      let modal = <UpdateAdModal button1Name="Atšaukti" button2Name="Atnaujinti informaciją" header="Skelbimo informacijos atnaujinimas" onButton1Click={this.onAdUpdate} onButton2Click={this.hideUpdateAdModal} adData={this.state.ad}/>
      this.setState({updateAdModal: modal});
  }
  hideUpdateAdModal()
  {
      this.setState({updateAdModal: null});
  }
  async onAdUpdate(newAdData)
  {    
    await this.props.history.replace({
      pathname: '/ads/' + newAdData.adId,
      state: {dataAd: newAdData}
    });    
  }
  delete = async () =>
  {
    let token = await getToken();
    const response = await fetch(API_URL+"ads/" + this.props.match.params.id + "/", {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      }
    });
    if (response.status === 200)
    {
      this.setState({adDeleted: true, confirmationModal: null});
    }
    else
    {
      this.setState({confirmationModal: null});
    }
  }
  clearAd = async () =>
  {
    await this.props.history.replace("/ads/" + this.state.ad.adId);
  }
  render()
  {
    if (this.props.detailed)
    {
      document.title = "Skelbimas";
    }
    if (this.state.redirect) {
      let redirect = this.state.redirect;
      if (this.state.params)
      {
        let params = this.state.params;
        return <Redirect to={{
          pathname: redirect,
          state:  params 
      }}
        />
      }
      else
      {
        return <Redirect to={redirect} />
      }
    }
    if (this.state.adDeleted)
    {
      return <div>
              <div class="alert alert-success" role="alert">
                Skelbimas pašalintas
              </div>
            </div>
    }
    let ad = this.state.ad;
    if (this.props.detailed === false)
    {
      return (
            <div className="container py-3">
            <div className="card">
              <div className="row ">
                <div className="col-md-7 px-3" style={{"minWidth": "100%"}}>
                  <div className="card-block px-6">
                    <div style={{"color":"gray"}}>
                      {ad.date}
                    </div>
                    <div style={{"color":"gray"}}>
                      Kategorija: {ad.categoryName} 
                    </div>
                    
                    <h4 className="card-title">{ad.name}</h4>
                    <p className="card-text ellipsisText">
                      {ad.text}
                    </p>
                    <br></br>
                    <br></br>
                  
                    <div>
                      <b>Kaina: {ad.price}€</b>
                    </div>
                    <div style={{"height": "3px"}}></div>
                    <Link to={{
                        pathname: "/ads/" + ad.adId,
                        state: {dataAd: this.state.ad}
                      }}>
                    <button className="mt-auto btn btn-primary ">Atidaryti</button>
                    </Link>
                  </div>
                </div>
            </div>
            </div>
            </div>
      );
    }
    else
    {
      let extraButtons = "";
      let role = isLoggedIn();
      if (this.state.ad)
      {
        if (role === 2 || parseInt(loginContext.id) === ad.ownerId)
        {
          extraButtons = <div style={{"float":"right"}}>

                          
                          <button onClick={this.showUpdateAdModal} type="button" className="btn btn-primary mr-2 mb-2">Redaguoti</button>
                          <button onClick={this.tryToDelete} type="button" className="btn btn-danger mb-2">Ištrinti</button>

                        </div>
        }
      }
      return (
        
        <div>        
        {
          this.state.ad ?
          <div>
            {this.state.updateAdModal}
            {this.state.confirmationModal}
            
            <div className="container py-3">
            <div className="card">
              
              <div className="row ">
                
                <div className="col-md-7 px-3" style={{"minWidth": "100%"}}>
                  
                  <div className="card-block px-6">
                    <div>
                    {extraButtons}
                    <div>
                    <div style={{"color":"gray", "whiteSpace": "nowrap", "float": "left"}}>
                      {ad.date}<br></br>
                      Kategorija: {ad.categoryName} 
                    </div>
                    <br style={{"clear":"both"}} />
                    </div>
                    </div>
                    
                    
                    <h4 className="card-title">{ad.name}</h4>
                    <p className="card-text">
                      {ad.text}
                    </p>
                    <br></br>
                    <br></br>
                  
                    <div>
                      <b>Kaina:</b> {ad.price}€<br></br>
                      <b>Savininkas:</b> <Link onClick={this.clearAd}to={"/user/" + ad.ownerId} >{ad.owner}</Link><br></br>
                      <b>El. paštas:</b> {ad.email}<br></br>
                      <b>Telefono nr.:</b> {ad.phone}
                    </div>
                  </div>
                </div>
            </div>
            </div>
            </div>
            <Comments adId ={ad.adId}/>
          </div>
           : <div id="loader"></div>
          
        }
        </div>
      );
    }
  }
}
