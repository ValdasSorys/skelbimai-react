import React from 'react';
import {API_URL} from './constants'
import {PagingElement} from './Paging';
import {Modal, Button, Form, ListGroup, ListGroupItem, Media, Card} from 'react-bootstrap';
export class Comments extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {comments: null, isLoading: true, activePage: 1, pageCount: 1};
  }
    async componentDidMount()
    {
      if (!this.state.comment)
      {
        await this.loadCommentFromAPI();
      }
    }
    setPage = async (number, moveToTop) =>
    {
        if (number !== this.state.activePage)
        {
          if (number > 0 && number <= this.state.pageCount)
          {
              await this.setState({activePage: number, comments: null, isLoading: true});
              await this.loadCommentFromAPI(); 
          }
          if (moveToTop)
          {
            window.scroll({top: 0, left: 0, behavior: 'smooth' })
          }
        }
    }
    async loadCommentFromAPI()
    {
      const data = {
        "page": 1,
        "limit": 10
      }
      const response = await fetch(API_URL+"ads/" + this.props.adId + "/comments/?actualMethod=GET/", {
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
        for (i = 0; i < body.comments.length; i++)
        {
          let key = i;
          let commentData = body.comments[key];
          let dataComment = {user_id: commentData.user_id, adId: commentData.ad_id, date: commentData.date, text: commentData.text, comment_id: commentData.comment_id, 
          name: commentData.name};
          items.push(dataComment);
          
        }
        this.setState({comments: items, isLoading: false, pageCount: Math.ceil(body.totalCount/10)});
      }
      else
      {
        this.setState({isLoading: false});
      }
    }
    render()
    {   
        let content = null
        let comments = null;
        if (!this.state.isLoading)
        {
            comments = [];
            let i;
            if (this.state.comments)
            {
              for (i = 0; i < this.state.comments.length; i++)
              {
                let key = i;
                let commentData = this.state.comments[key];
                comments.push(<Comment key ={key} content={commentData}/>);
              }
            }
            content =<div>             
                      <div className="container">
                      <div className="col">
                        <h1>Komentarai({comments.length})</h1>
                        { this.state.comments && <div>
                        <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                      <Card className="mt-4">
                        <Card.Header>
                          Valdas
                          <div style={{"float":"right"}}>
                          <Button variant="primary" size="sm">
                            Redaguoti
                          </Button>
                          {' '}
                          <Button variant="primary" size="sm" >
                            Ištrinti
                          </Button>
                          </div>
                          </Card.Header>
                        <Card.Body>
                          <Card.Title>Special title treatment</Card.Title>
                          <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                      <Card className="mt-4">
                        <Card.Header>
                          Valdas
                          <div style={{"float":"right"}}>
                          <Button variant="primary" size="sm">
                            Redaguoti
                          </Button>
                          {' '}
                          <Button variant="primary" size="sm" >
                            Ištrinti
                          </Button>
                          </div>
                          </Card.Header>
                        <Card.Body>
                          <Card.Title>Special title treatment</Card.Title>
                          <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                      <div className="mt-4"></div>
                      <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                      </div>
                        }
                      </div>
                      </div>
                      
                    </div>          
        }
        else
        {
          content = <div>
            <div className="container">
                      <div className="col">
                      <h1>Komentarai <div id="smallLoader"></div></h1>
                      </div>
                      </div></div>
                      
        }
        return (
          <div>
            {content} 
          </div>         
        );
    }
}

class Comment extends React.Component
{
    render()
    {
      return(
        <tr>
          <td>
            Tai yra komentaras {this.props.content.comment_id}
          </td>
        </tr>
      );
    }
}