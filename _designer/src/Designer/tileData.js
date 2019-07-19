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
    'name': 'Security (unknown)'
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
    'name': ''
  },
  "JW" : {
    'slug': 'jewel',
    'name': ''
  },
  "$1" : {
    'slug': '1k',
    'name': ''
  },
  "$2" : {
    'slug': '2k',
    'name': ''
  },
  "$3" : {
    'slug': '3k',
    'name': ''
  },
  "PP" : {
    'slug': 'paper',
    'name': 'Document'
  },
  "RE" : {
    'slug': 'reinforcements',
    'name': ''
  },
  "WT" : {
    'slug': 'watchtower',
    'name': ''
  },
  "GA" : {
    'slug': 'gate-a',
    'name': ''
  },
  "GB" : {
    'slug': 'gate-b',
    'name': ''
  },
  "GC" : {
    'slug': 'gate-c',
    'name': ''
  },
  "GD" : {
    'slug': 'gate-d',
    'name': ''
  },
  "E1" : {
    'slug': 'entrance-upper-right',
    'name': ''
  },
  "E2" : {
    'slug': 'entrance-right',
    'name': ''
  },
  "E3" : {
    'slug': 'entrance-lower-right',
    'name': ''
  },
  "E4" : {
    'slug': 'entrance-lower-left',
    'name': ''
  },
  "E5" : {
    'slug': 'entrance-left',
    'name': ''
  },
  "E6" : {
    'slug': 'entrance-upper-left',
    'name': ''
  },
  "*" : {
    'slug': 'asterisk',
    'name': 'Story Spot'
  },
  "BE" : {
    'slug': 'beacon',
    'name': 'Story Beacon'
  },
  "G2" : {
    'slug': 'security-2guard',
    'name': ''
  },
  "L2" : {
    'slug': 'security-2lock',
    'name': ''
  },
  "C2" : {
    'slug': 'security-2camera',
    'name': ''
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
