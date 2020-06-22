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
          savekey : 'The+Backdoor+Job|60|230|0|0|0|250|200|OIBQBKHpPXUNo+TIFEAsC0CYIEEwBlAYWXNLDQFkKyAZPAJQA0ApO4s1eSmrsPQDyAknko9OlJmmIsIeACR5JqMv2EDgAEXKSJAIQESUpvWf6qzktADYgA',
          desc : 'Steal the Jewel. Needs a Special Event "Close the Gates!" at around the 12-15 mark.'
        }, {
          name : 'The Docks',
          savekey : 'The+Docks|130|5|0|0|0|250|200|OIBQBKYKILIQIhckXPAKQOpgMoGElcD8jo4oBWQyE2g1atCAIULzgCUpSTZoqGWHgT4MGAEgBMjUsACCMseHEBGMEOD1wdMv0XK1JJfpPHQQA',
          desc : 'Steal 2 out of 3 jewels.'
        }, {
          name : 'The Crown Jewels',
          savekey : 'The+Crown+Jewels|30|5|0|0|0|250|200|OIBQBKHpPXUNggJAJjMgjI+S-gGUBhCE4sc-FbAKQHUwj1KBBMAUQFkOBWHBLhAAiFEsABCoqVUj0plcACV2Hbuz4zwgyOV1jcBsHIVSs-Tf22GLkdthsggA',
          desc : 'Steal all 3 jewels.'
        }, {
          name : 'A Tough Prison Break',
          savekey : 'Cell+Block+North|70|235|0|0|0|250|200|OIBQBKHpPXUNmAogZkfJyAsG8wFV9MilI0EBlAYTBolvqcdrOiPsk4EF8AhCEWQBWKq3idM4ScTrix+ACJzZAdQAqEAExgAMjuZgtwWvtlswAWVUJrtmxcdTzzpy6hA',
          desc : 'Everyone must exit out a different door.'
        }, {
          name : 'The North Wing',
          savekey : 'Museum:+North+Wing|85|250|0|0|0|250|200|OIBQBKYFIOpgygYQuJDmxVyPzACLoQCC2e5ZRaiATFcrpZpGmpMxY4wDJ0BKAUSJdOFVgwBClEZXERkbUZQEBZYagUMlM1dPACAbHqwCAjMZm4gA',
          desc : 'Steal 3 jewels.'
        }, {
          name : 'The Exhibition Floor',
          savekey : 'The+Exhibition+Floor|55|5|0|0|0|250|200|OIBQBKHpPXUNo8BBFywoBIaZAygMJhFgBKAGgLInGn0UYp3EECaCpe89r8SXHsRTBa5RigAy5DqRT4MAJmB9c-cMukEWajLwwBRGt11GEBgIy6TkAwDYoQA',
          desc : 'Steal as many paintings as you want. NPC is a Guide.'
        }, {
          name : 'The Courtyard',
          savekey : 'The+Courtyard|120|230|0|0|0|250|200|OIBQBKHpDKAaVGWdVYYGEICF1c3oSkuAQcceWmVgKICyitAzIlSWACSvu0BsTRsABMHWPiwVqktBQCChchKKzpEACKKZY1YgBKcAFI6TU07tBA',
          desc : 'Steal the jewel.'
        }, {
          name : 'High Security',
          savekey : 'The+Jeweler+Keep|55|5|0|0|0|250|200|OIBQBKHpPXUNmAygTTAJVQKRQYQgBFF4lkCyCtckkMANAWQXJLcleAM4EF8V6CAKIAmMEOaUEAGTGz24VkoIB1ACr9O8CfwAkY4ACEw+-jqRCAjAptCAbEA',
          desc : 'Steal both jewels. The NPC is a prisoner.'
        }, {
          name : 'Junkyard',
          savekey : 'Junkyard|-5|160|0|0|0|250|200|OIBQBKHpkCQExSTa4BSB1MBhAsmAZWzACUANNMAEQHllUkAZRSIsTQ4lJNtmK4FR5cGrMpzDxGQ+IImtiAQUX1hpAKKTgxPqL0T42RhN2rup3gE0z+yOoBsYdQEYbQA',
          desc : 'Steal two jewels.'
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
