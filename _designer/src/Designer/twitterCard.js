import React from 'react';
import {Helmet} from "react-helmet";
import {svgAsPngUri} from 'save-svg-as-png';

class TwitterCard extends React.Component {

  constructor(props){
    super(props);
    const makeCardParam = new URL(document.location).searchParams.get('png');
    console.log(makeCardParam === true);
    this.state = {
      makeCard: makeCardParam === 'true'
    }
  }

  makePNGPreview(){
    var svg = document.querySelector(".scenariomap>svg");
    if(!this.state.makeCard) { return ''; }
    const options = {
      width: 500,
      height: 500
    };
    // svgAsPngUri(svg, options).then(uri => {
    //   return uri;
    // });
    return 'foo';
  }

  render() {
    return (
      <Helmet>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@andymeneely"/>
        <meta name="twitter:creator" content="@andymeneely"/>
        <meta name="twitter:title"
              content="Scenario Designer for Masters of the Heist"/>
        <meta name="twitter:description"
              content="This is my scenario for Masters of the Heist! What do you think?"/>
        <meta name="twitter:image"
              content={this.makePNGPreview()}/>
      </Helmet>
    );
  }
}

export default TwitterCard;
