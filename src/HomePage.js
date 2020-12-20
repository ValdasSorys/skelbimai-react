import React from 'react';
import {getToken} from './auth';
import jwt_decode from "jwt-decode";
export class HomePage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {tokenValue: null};
  }
  async componentDidMount()
  {
    let token = await getToken();
    let token2 = "";
    if (token)
    {
      token2 = jwt_decode(token)
    }
    this.setState({tokenValue: token + "/" + String(token2.scope)});
  }
  render()
  {
    document.title = "Skelbimai";     
    return (      
        <div className="elementContainer">
          <div className="container"><div className="col">
            <h1>Pagrindinis puslapis</h1>
              <p>Tai yra pagrindinis puslapis</p>
              {
                this.state.tokenValue
              }
            </div>
          </div>
        </div>
    );
  }
}