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
          savekey : 'OIBQBKYKILIQIhckXLWAUgdTAZQMJJ6EHHRxQCsRqZpptj6wAQkfnAEpR2GzTUmmHPT5whtACQAmGuAYBBOcqkBGYREKRR5ASvST1DZif1mJpi+ZBA',
          desc : 'Steal 2 out of 3 jewels.'
        }, {
          name : 'The Crown Jewels',
          savekey : 'OIBQBKHpPXUNggJAJjMgjI+S-gGUBhCE4sc-FbAKQHUwj1KBBMAUQFkOBWHBLhAAiFEsABCoqVUj0plcACV2Hbuz4zwgyOV1jcBsHIVSs-Tf22GLkdthsggA',
          desc : 'Steal all 3 jewels.'
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
                {d['name']}
                </button>
                {d['desc']}
            </li>
          )}
            </ul>
      </div>
    );
  }
}

export default Gallery;
