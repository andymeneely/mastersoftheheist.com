import React from 'react';
import PNGPreview from './pngpreview';
import Designer from './designer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DesignerApp extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Designer}
               savekey={new URL(document.location).searchParams.get('savekey')}


        />
        <Route path="/preview/" component={PNGPreview}
               pngpreview={new URL(document.location).searchParams.get('png')}/>
      </Router>
    );
  }
}

export default DesignerApp;
