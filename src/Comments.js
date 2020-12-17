import React from 'react';
import {API_URL} from './constants'
import {PagingElement} from './Paging';

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
      console.log(JSON.stringify(data));
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
          if (this.state.comments)
          {
            comments = [];
            let i;
            for (i = 0; i < this.state.comments.length; i++)
            {
              let key = i;
              let commentData = this.state.comments[key];
              comments.push(<Comment key ={key} content={commentData}/>);
            }
            content =
                  <div style={{"display": "inline-block"}}>
                    <h1>Komentarai</h1>
                    <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                     <table>
                        <tbody>
                          {comments}
                        </tbody> 
                      </table>
                    <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                  </div>
          }
          else
          {
            content = <div>
            <h1>Komentarai</h1>
             <p>Komentarų nėra</p>
            </div>
          }

          
        }
        else
        {
          content = <div>
                      <h1>Komentarai <div id="smallLoader"></div></h1>
                    </div>
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