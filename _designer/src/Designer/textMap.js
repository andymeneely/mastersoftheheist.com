import React from 'react';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    let url = new URL(document.location);
    let save_url =
      `${url.origin}${url.pathname}?savekey=${compress(this.props.value)}`
    return (
      <div className="textmap">
        <p>To recreate this map, use this URL: <a href={save_url}>{save_url}</a>
        </p>
      </div>
    );
  }
}

export default TextMap;
