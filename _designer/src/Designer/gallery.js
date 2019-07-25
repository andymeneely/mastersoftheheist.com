import React from 'react';

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showGallery: false
    }
  }

  showCSS(){
    return this.state.showGallery ? 'show' : 'hide'
  }

  onExpandClick(){
    console.log(this.state);
    this.setState({
      showGallery: !this.state.showGallery
    });
  }

  expandState(){
    return this.state.showGallery ? '-' : '+'
  }

  render() {
    const data = [
        {
          name : 'The Backdoor Job',
          savekey : 'OIBQBKHpPXUNo+TIFEAsC0CYIEEwBlAYWXNLDQFkKyAZPAJQA0ApO4s1eSmrsPQDyAknko9OlJmmIsIeACR5JqMv2EDgAEXKSJAIQESUpvWf6qzktADYgA',
          desc : 'Steal the Jewel. Needs a Special Event "Close the Gates!" at around the 12-15 mark.'
        }, {
          name : 'The Docks',
          savekey : 'OIBQBKYKILIQIhckXPAKQOpgMoGElcD8jo4oBWQyE2g1atCAIULzgCUpSTZoqGWHgT4MGAEgBMjUsACCMseHEBGMEOD1wdMv0XK1JJfpPHQQA',
          desc : 'Steal 2 out of 3 jewels.'
        }, {
          name : 'The Crown Jewels',
          savekey : 'OIBQBKHpPXUNggJAJjMgjI+S-gGUBhCE4sc-FbAKQHUwj1KBBMAUQFkOBWHBLhAAiFEsABCoqVUj0plcACV2Hbuz4zwgyOV1jcBsHIVSs-Tf22GLkdthsggA',
          desc : 'Steal all 3 jewels.'
        }, {
          name : 'Tough Prison Break',
          savekey : 'OIBQBKHpPXUNmAogZkfJyAsG8wFV9MilI0EBlAYTBolvqcdrOiPsk4EF8AhCEWQBWKq3idM4ScTrix+ACJzZAdQAqEAExgAMjuZgtwWvtlswAWVUJrtmxcdTzzpy6hA',
          desc : 'Everyone must exit out a different door.'
        }, {
          name : 'The North Wing',
          savekey : 'OIBQBKYFIOpgygYQuJDmxVyPzACLoQCC2e5ZRaiATFcrpZpGmpMxY4wDJ0BKAUSJdOFVgwBClEZXERkbUZQEBZYagUMlM1dPACAbHqwCAjMZm4gA',
          desc : 'Steal 3 jewels.'
        }, {
          name : 'The Courtyard',
          savekey : 'OIBQBKHpDKAaVGWdVYYGEICF1c3oSkuAQcceWmVgKICyitAzIlSWACSvu0BsTRsABMHWPiwVqktBQCChchKKzpEACKKZY1YgBKcAFI6TU07tBA',
          desc : 'Steal the jewel.'
        }
    ]
    return (
      <div className="gallery">
        <button className="expand" onClick={() => this.onExpandClick()}>
        {this.expandState()}
        </button>
        <h1 onClick={() => this.onExpandClick()}>Gallery</h1>
        <ul className={`${this.showCSS()}`}>
          {data.map((d) =>
            <li key={`gallery-${d['name']}`}>
                <button onClick={() => this.props.onGalleryClick(d['savekey'])}>
                  <b>{d['name']}</b>. {d['desc']}
                </button>
            </li>
          )}
            </ul>
      </div>
    );
  }
}

export default Gallery;
