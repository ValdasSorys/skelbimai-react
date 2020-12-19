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
        if (this.props.location.pathname === "/ads" || this.props.location.pathname === "/ads/")
        {
          onlyRoutingVar = false;
        }
        else
        {
          onlyRoutingVar =true;
        }
        this.state = {activePage: 1, pageCount: 1, showFiltering: false, 
          ads: null, role: this.props.role, onlyRouting: onlyRoutingVar};
        
    }
    async componentDidMount() {
      if (this.props.location.pathname === "/ads" || this.props.location.pathname === "/ads/")
      {
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
        await this.loadAdsFromAPI();    
      }   
    }
    reload = async () =>
    {
      await this.setState({onlyRouting: false, ads: null});
      await this.loadAdsFromAPI();  
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
    setPage = async (number, moveToTop) =>
    {
        if (number !== this.state.activePage)
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
    if (this.state.role === 0)
    {
      extraButtons = <div className="mb-2">
                      <button onClick={this.handleShow} type="button" className="btn btn-primary">Filtravimas</button>
                    </div>
    }
    else if (this.state.role === 1 || this.state.role === 2)
    {
      extraButtons = <div className="mb-2">
                        <button onClick={this.handleShow} type="button" className="btn btn-primary mr-1">Filtravimas</button>
                      <Link to="/ads/create">                        
                        <button type="button" className="btn btn-primary">Kurti skelbimą</button>
                      </Link>
                    </div>
    }
    return (      
      <div className="elementContainer">
      <Switch>
          
          {this.state.onlyRouting ?
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad reloadParentOnOnmount={true} reload={this.reload} detailed = {true} {...props}/>)}>
          </Route>:
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad reloadParentOnOnmount={false} reload={this.reload} detailed = {true} {...props}/>)}>
          </Route>
          }

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
    let reloadParentVar = false;
    if (this.props.location && this.props.location.state && this.props.location.state.dataAd)
    {
      if (this.props.location.state.dataAd)
      {
        data = this.props.location.state.dataAd;
      }
      if (this.props.location.state.reloadParent)
      {
        reloadParentVar = this.props.location.state.reloadParent;
      }
    }    
    else if (this.props.data)
    {
      data = this.props.data;
    }
    this.state = { confirmationModal: "", text: "", ad : data, adDeleted: false, reloadParent: reloadParentVar, updateAdModal: null, redirect: null, ignoreReload: false}   
    this.onAdUpdate = this.onAdUpdate.bind(this);
    this.hideUpdateAdModal = this.hideUpdateAdModal.bind(this);
    this.showUpdateAdModal = this.showUpdateAdModal.bind(this);
  }
  async componentDidMount() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
    if (!this.state.ad)
    {
      await this.loadAdFromAPI();
    }
  } 
  componentWillUnmount(){
    if (!this.props.detailed || this.state.ignoreReload)
    {
      return;
    }
    if (this.props.reloadParentOnOnmount)
    {
      this.props.reload();
    }
    else if (this.state.adDeleted || this.state.reloadParent)
    {
      this.props.reload();
    }
    /*else if (this.props.location && this.props.location.state && this.props.location.state.reloadParent)
    {
      this.props.reload();
    }*/
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
        /*this.props.history.replace({
          pathname: '/ads/' + dataAd.adId,
          state: {dataAd: dataAd}
        });*/
      }
      else if (response.status === 404)
      {
        this.setState({redirect: "/404"});
      }
    }
  
  tryToDelete = () =>
  {
    //this.state = {show: true, button1Name: this.props.button1Name, button2Name: this.props.button2Name, 
    //text: this.props.text, header: this.props.header, onButtonClick: this.props.onButtonClick};
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
    await this.setState({ignoreReload: true});
    this.props.history.replace({
      pathname: '/ads/' + newAdData.adId,
      state: {dataAd: newAdData, reloadParent: true}
    });
    
    //this.setState({ad: newAdData, reloadParent: true, updateAdModal: null});
    
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

                          <button onClick={this.tryToDelete} type="button" className="btn btn-primary mr-1 mb-2">Ištrinti</button>
                          <button onClick={this.showUpdateAdModal} type="button" className="btn btn-primary mb-2">Redaguoti</button>

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
                      <b>Kaina: {ad.price}€</b><br></br>
                      <b>Savininkas: {ad.owner}</b><br></br>
                      <b>El. paštas: {ad.email}</b><br></br>
                      <b>Telefono nr.: {ad.phone}</b>
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
