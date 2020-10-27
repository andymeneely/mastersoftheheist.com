/* eslint import/no-webpack-loader-syntax: off */
var tileData = {
  "GP" : {
    'slug': 'gap',
    'name': 'Gap',
  },
  "EM" : {
    'slug': 'empty',
    'name': 'Empty'
  },
  "SC" : {
    'slug': 'security',
    'name': 'Unknown Security'
  },
  "GU" : {
    'slug': 'security-guard',
    'name': 'Guard',
    'guards': 1,
  },
  "LO" : {
    'slug': 'security-lock',
    'name': 'Lock',
    'locks': 1,
  },
  "CM" : {
    'slug': 'security-camera',
    'name': 'Camera',
    'cameras': 1,
  },
  "DO" : {
    'slug': 'security-dog',
    'name': 'Guard Dog',
    'guardDogs': 1,
  },
  "JW" : {
    'slug': 'jewel',
    'name': 'Jewel',
    'jewel': 1,

  },
  "$1" : {
    'slug': '1k',
    'name': '$1k',
    'cash': 1
  },
  "$2" : {
    'slug': '2k',
    'name': '$2k',
    'cash': 2
  },
  "$3" : {
    'slug': '3k',
    'name': '$3k',
    'cash': 3
  },
  "PP" : {
    'slug': 'folder',
    'name': 'Documents',
    'docs': 1,
  },
  "USB" : {
    'slug': 'usb',
    'name': 'USB drive',
    'usb': 1,
  },
  "RE" : {
    'slug': 'reinforcements',
    'name': 'Reinforcements'
  },
  "WT" : {
    'slug': 'watchtower',
    'name': 'Watchtower'
  },
  "GA" : {
    'slug': 'gate-a',
    'name': 'Lockdown Gate A'
  },
  "GB" : {
    'slug': 'gate-b',
    'name': 'Lockdown Gate B'
  },
  "GC" : {
    'slug': 'gate-c',
    'name': 'Lockdown Gate C'
  },
  "GD" : {
    'slug': 'gate-d',
    'name': 'Lockdown Gate D'
  },
  "E1" : {
    'slug': 'entrance-upper-right',
    'name': 'Entrance/Exit (Upper Right)'
  },
  "E2" : {
    'slug': 'entrance-right',
    'name': 'Entrance/Exit (Right)'
  },
  "E3" : {
    'slug': 'entrance-lower-right',
    'name': 'Entrance/Exit (Lower Right)'
  },
  "E4" : {
    'slug': 'entrance-lower-left',
    'name': 'Entrance/Exit (Lower Left)'
  },
  "E5" : {
    'slug': 'entrance-left',
    'name': 'Entrance/Exit (Left)'
  },
  "E6" : {
    'slug': 'entrance-upper-left',
    'name': 'Entrance/Exit (Upper Left)'
  },
  "*" : {
    'slug': 'asterisk',
    'name': 'Story Beacon'
  },
  "BE" : {
    'slug': 'beacon',
    'name': 'Discovery Beacon'
  },
  "G2" : {
    'slug': 'security-2guard',
    'name': 'Two Guards',
    'guards': 2
  },
  "L2" : {
    'slug': 'security-2lock',
    'name': 'Two Locks',
    'locks': 2
  },
  "C2" : {
    'slug': 'security-2camera',
    'name': 'Two Cameras',
    'cameras': 2
  },
  "2GL" : {
    'slug': 'security-guardlock',
    'name': 'Guard and Lock',
    'guards': 1,
    'locks':  1,
  },
  "2GC" : {
    'slug': 'security-guardcamera',
    'name': 'Guard and Camera',
    'guards': 1,
    'cameras': 1,
  },
  "2GD" : {
    'slug': 'security-guarddog',
    'name': 'Guard and Dog',
    'guards': 1,
    'guardDogs':  1,
  },
  "G1K" : {
    'slug': 'security-guard-1k',
    'name': 'Guard and $1k',
    'guards':  1,
    'cash' : 1
  },
  "G2K" : {
    'slug': 'security-guard-2k',
    'name': 'Guard and $2k',
    'guards':  1,
    'cash' : 2,
  },
  "G3K" : {
    'slug': 'security-guard-3k',
    'name': 'Guard and $3k',
    'guards':  1,
    'cash' : 3,
  },
  "GKC" : {
    'slug': 'security-guard-keycard',
    'name': 'Guard and Keycard',
    'guards':  1,
    'keycard':  1,
  },
  "GDGD" : {
    'slug': 'security-2guarddog',
    'name': 'Two Guard Dogs',
    'guardDogs': 2
  },
  "2CL" : {
    'slug': 'security-cameralock',
    'name': 'Camera and Lock',
    'cameras': 1,
    'locks': 1,
  },
  "2CD" : {
    'slug': 'security-cameradog',
    'name': 'Camera and Dog',
    'cameras': 1,
    'dog': 1,
  },
  "2LD" : {
    'slug': 'security-lockdog',
    'name': 'Lock and Dog',
    'guardDogs': 1,
    'locks': 1,
  },
  "G2X" : {
    'slug': 'security-guard-2x',
    'name': 'Elite Guard'
  },
  "C2X" : {
    'slug': 'security-camera-2x',
    'name': 'Elite Camera'
  },
  "L2X" : {
    'slug': 'security-lock-2x',
    'name': 'Elite Lock'
  },
  "SX" : {
    'slug': 'server-x',
    'name': 'Server X'
  },
  "SY" : {
    'slug': 'server-y',
    'name': 'Server Y'
  },
  "RX" : {
    'slug': 'remote-lock-x',
    'name': 'Remote Lock X'
  },
  "RY" : {
    'slug': 'remote-lock-y',
    'name': 'Remote Lock Y'
  },
  "RXJ" : {
    'slug': 'remote-lock-x-jewel',
    'name': 'Remote Lock X Covering Jewel'
  },
  "RXD" : {
    'slug': 'remote-lock-x-document',
    'name': 'Remote Lock X Covering Document',
    'docs': 1,
  },
  "RYJ" : {
    'slug': 'remote-lock-y-jewel',
    'name': 'Remote Lock Y Covering Jewel',
    'jewel': 1,
  },
  "RXM" : {
    'slug': 'remote-lock-x-meeple',
    'name': 'Remote Lock X Covering Character'
  },
  "RYM" : {
    'slug': 'remote-lock-y-meeple',
    'name': 'Remote Lock Y Covering Character'
  },
  "RYD" : {
    'slug': 'remote-lock-y-document',
    'name': 'Remote Lock Y Document'
  },
  "KC" : {
    'slug': 'keycard',
    'name': 'Keycard',
    'keycard': 1,
  },
  "KCL" : {
    'slug': 'keycard-lock',
    'name': 'Keycard Door'
  },
  "DK" : {
    'slug': 'kennel',
    'name': 'Kennel'
  },
  "S" : {
    'slug': 'safe',
    'name': 'Safe'
  },
  "AA" : {
    'slug': 'art-apple',
    'name': 'Painting of Apple'
  },
  "AG" : {
    'slug': 'art-grapes',
    'name': 'Painting of Grapes'
  },
  "AS" : {
    'slug': 'art-strawberry',
    'name': 'Painting of Strawberry'
  },
  "AC" : {
    'slug': 'art-church',
    'name': 'Painting of Church'
  },
  "AH" : {
    'slug': 'art-house',
    'name': 'Painting of House'
  },
  "AL" : {
    'slug': 'art-lighthouse',
    'name': 'Painting of Lighthouse'
  },
  "MW" : {
    'slug': 'meeple-white',
    'name': 'Non-Player Character'
  },
};

for(let t in tileData) {
  let svgstr = require(`!!raw-loader!./img/hexart/${tileData[t]['slug']}.svg`);
  tileData[t]['svgstr'] = svgstr;
}

export default tileData;
