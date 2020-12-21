import React from 'react';
import {API_URL} from './constants'
import {PagingElement} from './Paging';
import {ConfirmationModal} from './ConfirmationModal'
import {UpdateComment} from './UpdateComment'
import {isLoggedIn, loginContext, getToken} from './auth';
import {Button, Form, Card} from 'react-bootstrap';
export class Comments extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {comments: null, isLoading: true, isLoadingSmall: false, activePage: 1, pageCount: 1, totalCount: 0, 
      writeComment: "", writeCommentSuccess: null, writeCommmentFail: null};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.writeComment = this.writeComment.bind(this);
    this.loadCommentFromAPI = this.loadCommentFromAPI.bind(this);
  }
    async componentDidMount()
    {
      if (!this.state.comment)
      {
        await this.loadCommentFromAPI();
      }
    }
    handleInputChange(event) 
    {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    async writeComment(event)
    {
      event.preventDefault();
      if (this.state.isLoadingSmall)
      {
        return;
      }
      this.setState({isLoadingSmall: true, writeCommentSuccess: null, writeCommentFail: null});
      let token = await getToken();
      const data = {
        "text": this.state.writeComment
      }
      const response = await fetch(API_URL+"ads/" + this.props.adId + "/comments/", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201)
      {
        //let body = await response.json();
        await this.loadCommentFromAPI(true);
        this.setState({writeCommentSuccess: "Komentaras pridėtas", isLoadingSmall: false, writeComment: ""});
      }
      else
      {
        this.setState({writeCommentFail: "Nežinoma klaida, mėginkite dar kartą", isLoadingSmall: false});
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
    async loadCommentFromAPI(reload)
    {
      this.setState({isLoading:true});
      let page;
      if (reload)
      {
        page = 1;
      }
      else
      {
        page = this.state.activePage;
      }
      const data = {
        "page": page,
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
        let i;
        for (i = 0; i < body.comments.length; i++)
        {
          let key = i;
          let commentData = body.comments[key];
          let dataComment = {user_id: commentData.user_id, adId: commentData.ad_id, date: commentData.date, 
            text: commentData.text, comment_id: commentData.comment_id, 
          username: commentData.username, idOwner: commentData.idowner};
          items.push(dataComment);          
        }
        this.setState({activePage: page, comments: items, isLoading: false, pageCount: Math.ceil(body.totalCount/10), totalCount: body.totalCount, writeCommentSuccess: null});
      }
      else
      {
        this.setState({isLoading: false, writeCommentSuccess: null});
      }
    }
    onCommentUpdate = () =>
    {
      this.setState({writeCommentSuccess: null});
    }
    render()
    {   
        let content = null
        let comments = null;
        let role = isLoggedIn();
        if (!this.state.isLoading)
        {
            comments = [];
            
            if (this.state.comments)
            {
              let i;
              for (i = 0; i < this.state.comments.length; i++)
              {
                let key = i;
                let commentData = this.state.comments[key];
                comments.push(<Comment key ={commentData.comment_id} content={commentData} user_id={loginContext.id} role={role} onUpdate={this.onCommentUpdate} updateParent={this.loadCommentFromAPI}/>);
              }
            }
            content =<div>             
                      <div className="container">
                      <div className="col">
                        <h1>Komentarai({this.state.totalCount})</h1>
                        { role !== 0 &&
                        <Card className="mt-4 mb-4" >
                          <Form className="m-4" onSubmit={this.writeComment}>
                            
                            <Form.Group controlId="writecommentForm">
                              <Form.Control name="writeComment" as="textarea" rows={3} required maxLength="300" placeholder="Komentaro tekstas" value={this.state.writeComment} onChange={this.handleInputChange}/>
                            </Form.Group>
                            {this.state.writeCommentSuccess &&
                              <div className="alert alert-success" role="alert">
                                {this.state.writeCommentSuccess}
                              </div>
                            }
                            {this.state.writeCommentFail &&
                              <div className="alert alert-danger" role="alert">
                                {this.state.writeCommentFail}
                              </div>
                            }
                            
                            <Button variant="primary" type="submit">
                              Komentuoti
                            </Button>
                            {this.state.isLoadingSmall &&
                            <div id="smallLoader"></div>
                            }

                          </Form>
                        </Card>
                        }
                        { this.state.comments && <div>
                        <PagingElement moveToTop={false} pageCount={this.state.pageCount} whenClicked={this.setPage} page={this.state.activePage}/>
                        
                      {comments}

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
    constructor(props)
    {
      super(props);
      this.state = {content: this.props.content, confirmationModal: null, updateCommentModal: null};
    }

    tryToDelete = () =>
    {
      this.setState({confirmationModal: <ConfirmationModal button1Name="Atšaukti" button2Name="Ištrinti" text="Ištrynus, komentaro atkurti negalima" header="Ar tikrai norite ištrinti komentarą?" onButton1Click={this.delete} onButton2Click={this.hideConfirmation}/>})
    }

    hideConfirmation = () =>
    {
      this.setState({confirmationModal: null});
    }

    delete = async () =>
    {
      //this.setState({confirmationModal: null});
      let token = await getToken();
      const response = await fetch(API_URL+"ads/" + this.state.content.adId + "/comments/" + this.state.content.comment_id + "/",
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Authorization': "Bearer " + token
        }// body data type must match "Content-Type" header
        
        });
        if (response.status === 200)
        {
            this.hideConfirmation();
            this.props.updateParent(true);
        }
    }

    updateComment = async (commentText) =>
    {
      const data = {
        "text": commentText
      }
      let token = await getToken();
      const response = await fetch(API_URL+"ads/" + this.state.content.adId + "/comments/" + this.state.content.comment_id + "/", {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      if (response.status === 200)
      {
          let commentData = await response.json();
          let dataComment = {user_id: commentData.user_id, adId: commentData.ad_id, date: commentData.date, text: commentData.text, comment_id: commentData.comment_id, 
            username: commentData.username, idOwner: commentData.idowner};
          this.setState({content: dataComment, updateCommentModal: null});
          this.props.onUpdate();
      }
      else
      {
          this.setState({updateCommentModal: null});
      }
    }
    tryToUpdate = () =>
    {
      this.setState({updateCommentModal: <UpdateComment commentText={this.state.content.text} onButton1Click={this.updateComment} onButton2Click={this.hideUpdateModal}/>});
    }
    hideUpdateModal = () =>
    {
      this.setState({updateCommentModal: null});
    }

    render()
    {
      let comment = this.state.content;
      let role = this.props.role;
      let user_id = this.props.user_id;
      let button1 = null;
      let button2 = null;
      let buttonSeparator = ' ';
      let isOwner = "";
      if (parseInt(user_id) === parseInt(comment.user_id))
      {
        button1 =   <Button variant="primary" size="sm" onClick={this.tryToUpdate}>
                      Redaguoti
                    </Button>
        button2 = <Button variant="danger" size="sm" onClick={this.tryToDelete}>
                      Ištrinti
                    </Button>
      }
      else if (role === 2)
      {
        button2 = <div><Button style={{"float":"right"}} variant="danger" size="sm" onClick={this.tryToDelete}>
                    Ištrinti
                  </Button>
                  <div style={{"clear": "both"}}></div>
                  </div>
        buttonSeparator = null;
      }
      if (parseInt(comment.idOwner) === parseInt(comment.user_id))
      {
        isOwner = " (savininkas)";
      }
      return(
        <Card className="mt-4">
          {this.state.confirmationModal}
          {this.state.updateCommentModal}
          <Card.Header>
        
            <div>
              
              <div style={{"float":"right"}}>             
                <div>
                  <div>
                  {button1}
                  {buttonSeparator}
                  {button2}
                  </div>
                  <div>
                  {comment.date}
                  </div>
                </div>
              </div>
              {comment.username + isOwner}
            </div>
            
            </Card.Header>
          <Card.Body>
            
            <Card.Text>
            {comment.text}
            </Card.Text>

          </Card.Body>
        </Card>
      );
    }
}