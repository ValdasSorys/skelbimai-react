import React from 'react';
import {isLoggedIn} from './auth';
export class HomePage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {tokenValue: null};
  }
  render()
  {
    let role = isLoggedIn();
    let text = null;
    if (role === 0)
    {
      text = "Kad išnaudotumėt visas portalo funkcijas galite užsiregistruoti ir prisijungti";
    }
    else if (role === 1)
    {
      text = "Jūs esate prisijungęs, galite kurti skelbimus ir rašyti komentarus";
    }
    else if (role === 2)
    {
      text = "Jūs esate prisijungęs kaip administratorius";
    }
    document.title = "Skelbimai";     
    return (      
        <div className="elementContainer">
          <div className="container"><div className="col">
            <h1>Sveiki atvykę</h1>
              <p>{text}</p>
              <img alt="Skelbimai" style={{"maxWidth":"100%", "display":"block", "textAlign": "center"}}src="https://p1.pxfuel.com/preview/62/205/156/technology-hands-agreement-ok-screen-computer.jpg"></img>
            </div>
          </div>
        </div>
    );
  }
}