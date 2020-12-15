import React from 'react';
import {Comments} from './Comments'
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import {PagingElement} from './Paging';
export class Ads extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {activePage: 1, pageCount: 20};
    }

    setPage = (number) =>
    {
        if (number > 0 && number <= this.state.pageCount)
        {
            this.setState({activePage: number});
        }
    }

    render()
  {
    let match = this.props.match;  
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
}      
    return (      
      <div className="elementContainer">
      <Switch>
          <Route exact path={`${match.path}/:id(\\d+)`} component={(props) => (<Ad detailed = {true} {...props}/>)}>
          </Route>
          <Route exact path="/ads">
            <h1>Skelbimai{this.state.activePage}</h1>
            <div className="filteringOptions">
            <p>test</p>
            <p>testtest</p>
            </div>
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
    render()
  {
    if (this.props.detailed === false)
    {
      return (
        <p>Skelbimas: {this.props.id} <Link to={"/ads/" + this.props.id}>Atidaryti</Link></p>
      );
    }
    else
    {
      return (
        <div>
        <h1>Skelbimas</h1>
        <p>Tai yra detalus skelbimo {this.props.match.params.id} langas</p>
        <p><Link to="/ads/">Grįžti atgal</Link></p>
        <h1>Komentarai</h1>
        <Comments />
        </div>
      );
    }
  }
}