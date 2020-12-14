import React from 'react';
import {Comments} from './Comments'
import {
    Link,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
export class Ads extends React.Component
{
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
            <h1>Skelbimai</h1>
            <div className="filteringOptions">
            <p>test</p>
            <p>testtest</p>
            </div>
            <table className="entryElement">
            <tr>
                    <td className="entryFirst">
                    First<br></br>
                    Second
                    </td>
                    <td className="entrySecond">
                    LastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLast
                    </td>
            </tr>
            <tr>
                    <td className="entryFirst">
                    First<br></br>
                    Second
                    </td>
                    <td className="entrySecond">
                    LastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLast
                    </td>
            </tr>
            <tr>
                    <td className="entryFirst">
                    First<br></br>
                    Second
                    </td>
                    <td className="entrySecond">
                    LastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLastLast
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
        <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
        </Pagination>
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