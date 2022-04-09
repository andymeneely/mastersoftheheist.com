import React from 'react';

class TextMap extends React.Component {
  render() {
    let url = new URL(document.location);
    let savekey = this.props.savekey;
    let save_url =`${url.origin}${url.pathname}?savekey=${savekey}`
    return (
      <div className="textmap">
        <p>To recreate this map, use this URL: <a href={save_url}>{save_url}</a>
        </p>
      </div>
    );
  }
}

export default TextMap;
