import React from 'react';

export class Comments extends React.Component
{
    render()
    {    
        return (      
        <div>
            <Comment id = {1} detailed = {false}/>
            <Comment id = {2} detailed = {false}/>
            <Comment id = {3} detailed = {false}/>
            <Comment id = {4} detailed = {false}/>
        </div>
        );
    }
}

class Comment extends React.Component
{
    render()
    {
      return(
        <div>
        <p>Tai yra komentaras {this.props.id}</p>
        </div>
      );
    }
}