import React from 'react';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    let url = new URL(document.location);
    let savekey = compress(this.props.value);
    let save_url =`${url.origin}${url.pathname}?savekey=${savekey}`
    window.history.pushState(savekey, null, save_url);
    return (
      <div className="textmap">
        <p>To recreate this map, use this URL: <a href={save_url}>{save_url}</a>
        </p>
      </div>
    );
  }
}

export default TextMap;
