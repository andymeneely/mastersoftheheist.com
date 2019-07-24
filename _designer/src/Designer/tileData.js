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
    'name': 'Guard'
  },
  "LO" : {
    'slug': 'security-lock',
    'name': 'Lock'
  },
  "CM" : {
    'slug': 'security-camera',
    'name': 'Camera'
  },
  "DO" : {
    'slug': 'security-dog',
    'name': 'Guard Dog'
  },
  "JW" : {
    'slug': 'jewel',
    'name': 'Jewel'
  },
  "$1" : {
    'slug': '1k',
    'name': '$1k'
  },
  "$2" : {
    'slug': '2k',
    'name': '$2k'
  },
  "$3" : {
    'slug': '3k',
    'name': '$3k'
  },
  "PP" : {
    'slug': 'paper',
    'name': 'Document'
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
    'name': 'Two Guards'
  },
  "L2" : {
    'slug': 'security-2lock',
    'name': 'Two Locks'
  },
  "C2" : {
    'slug': 'security-2camera',
    'name': 'Two Cameras'
  },
  "2GL" : {
    'slug': 'security-guardlock',
    'name': 'Guard and Lock'
  },
  "2GC" : {
    'slug': 'security-guardcamera',
    'name': 'Guard and Camera'
  },
  "2GD" : {
    'slug': 'security-guarddog',
    'name': 'Guard and Dog'
  },
  "2CL" : {
    'slug': 'security-cameralock',
    'name': 'Camera and Lock'
  },
  "2CD" : {
    'slug': 'security-cameradog',
    'name': 'Camera and Dog'
  },
  "2LD" : {
    'slug': 'security-lockdog',
    'name': 'Lock and Dog'
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
  "RYJ" : {
    'slug': 'remote-lock-y-jewel',
    'name': 'Remote Lock Y Covering Jewel'
  },
  "RXM" : {
    'slug': 'remote-lock-x-meeple',
    'name': 'Remote Lock X Covering Character'
  },
  "RYM" : {
    'slug': 'remote-lock-y-meeple',
    'name': 'Remote Lock Y Covering Character'
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
