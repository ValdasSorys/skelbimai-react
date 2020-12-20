import React from 'react';

export class Footer extends React.Component {
  render()
  {
    return(
      <footer className="bottom-footer py-4 bg-primary text-white-50">
        <div className="container">
            <div style={{"display":"inline-block", "float":"left"}}>
              Valdo skelbimų portalas<br></br>
              Valdo skelbimų portalas<br></br>
              Valdo skelbimų portalas
            </div>
            
            <div style={{"display":"inline-block", "float":"right"}}>
              <small>Valdo skelbimų portalas</small>
            </div>

            <div className="text-center">
              <small>Valdo skelbimų portalas</small>
            </div>
        </div>
      </footer>
    );
  }
}