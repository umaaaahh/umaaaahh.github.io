const INTRO = {
  speech: {
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/Annie%20-%20Intro_01.aac',
    script: [
      { t: 0,    text: 'Excuse me, do you have a minute.' },
      { t: 4,    text: 'My name is Annie,' },
      { t: 6,    text: 'I seem to have gotten a little lost.' },
      { t: 10,   text: 'I\'m looking for my husband.' },
      { t: 13.5, text: 'He said he\'d be waiting for me' },
      { t: 16,   text: 'over at the bench near the lake.' },
      { t: 20,   text: 'But I\'m a little confused' },
      { t: 22.5, text: 'if I\'m by the Anderson Road entrance' },
      { t: 25.5, text: 'or if I\'m closer to St Kilda Rd.' },
    ],
  },
  yes: {
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/Annie%20-%20Intro-%20Yes.mp3',
    script: [
      { t: 0,    text: 'Thank you.' },
      { t: 1.5,  text: 'I\'m looking for my husband, Ron.' },
      { t: 4,    text: 'We come here just to sit in the park together.' },
      { t: 8,    text: 'He called me not too long ago to say he\'d be here.' },
      { t: 12,   text: 'He said he\'d be waiting for me at our special spot.' },
      { t: 15,   text: 'But now, of course, I can\'t reach him.' },
      { t: 18,   text: 'Can you help me find him, please?' },
    ],
  },
  no: {
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/intro-no.aac',
    script: [
      { t: 0,   text: 'Oh of course,' },
      { t: 2.5, text: 'I didn\'t mean to be a bother.' },
      { t: 6,   text: 'Enjoy the rest of your day.' },
    ],
  },
};

const STOPS = [
  {
    id: 1,
    location: 'The Gazebo',
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/stop%202%20-%20The%20Gazebo-%20QR%20Trigger.mp3',
    pinX: 62, pinY: 30,
    onEnd: 'map',
    lat: -37.8315, lng: 144.9832, radius: 15, // Tecoma Pavilion area
    script: [
      { t: 0,    text: 'Oh, the gazebo!' },
      { t: 2,    text: 'We always had our children\'s parties here.' },
      { t: 6,    text: 'When they were little, of course.' },
      { t: 8.5,  text: 'All the family and friends would come too.' },
      { t: 11,   text: 'We had so much fun here.' },
      { t: 15,   text: 'My children are grown up now,' },
      { t: 18,   text: 'off living their own lives.' },
      { t: 21,   text: 'I just wish I got to see them more.' },
      { t: 24.5, text: 'I miss them a lot.' },
      { t: 27,   text: 'I keep meaning to ring them.' },
      { t: 30,   text: 'They worry about me since their father, um, passed...' },
      { t: 36,   text: '...uh, mm. Yeah. Um, well,' },
      { t: 41,   text: 'their father likes to worry about me too,' },
      { t: 44.5, text: 'so um, I think they\'ve probably picked up that habit from him.' },
      { t: 48,   text: 'He says I\'d lose my head if it wasn\'t screwed on.' },
      { t: 54,   text: 'But this isn\'t where Ron would be waiting for me.' },
      { t: 58,   text: 'He\'ll be down near the water.' },
    ],
  },
  {
    id: 2,
    location: 'The Lawn',
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/stop%201%20-%20The%20Lawn-%20QR%20Code.aac',
    pinX: 38, pinY: 55,
    onEnd: 'map',
    lat: -37.8306, lng: 144.9813, radius: 15, // Central Lawn
    script: [
      { t: 0,    text: 'So, this is the lawn.' },
      { t: 2.5,  text: 'This is where Ron and I had our very first date.' },
      { t: 7,    text: 'We had a picnic,' },
      { t: 9,    text: 'and I can\'t quite remember whose idea it was,' },
      { t: 12.5, text: 'but I remember arriving and seeing Ron already there.' },
      { t: 17,   text: 'He was so nervous, bless him.' },
      { t: 20.5, text: 'He was wearing his favourite woolen coat,' },
      { t: 24,   text: 'and it was a really warm afternoon.' },
      { t: 27.5, text: 'He was absolutely boiling,' },
      { t: 30,   text: 'but he wouldn\'t take it off' },
      { t: 32.5, text: 'because he wanted to look his best for me.' },
      { t: 37,   text: 'I think I knew then' },
      { t: 39.5, text: 'that he was the one.' },
    ],
  },
  {
    id: 3,
    location: 'The Lake Bench',
    audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/stop%203%20-%20The%20Bench-%20QR%20Trigger.mp3',
    pinX: 24, pinY: 65,
    onEnd: 'closing',
    lat: -37.8283, lng: 144.9831, radius: 15, // Lakeview Rest House / Ornamental Lake bench
    script: [
      { t: 0,    text: 'Oh, I\'m so silly.' },
      { t: 2,    text: 'This is the bench I was looking for.' },
      { t: 4,    text: 'I don\'t know how I managed to confuse myself.' },
      { t: 7,    text: 'We come here all the time.' },
      { t: 9,    text: 'Ron is usually sitting here waiting for me.' },
      { t: 13,   text: 'Hmm, but that\'s odd.' },
      { t: 15,   text: 'He\'s not here.' },
      { t: 17,   text: 'Ah, it\'s all right.' },
      { t: 19,   text: 'I did ring him. I\'m sure I did.' },
      { t: 23,   text: 'Hmm, he\'s probably just running late for once.' },
      { t: 26.5, text: 'Maybe getting us a coffee.' },
      { t: 29,   text: 'Usually he complains that I\'m always late,' },
      { t: 33,   text: 'but he loves his bit of peace and quiet' },
      { t: 35.5, text: 'before I arrive and talk his ear off.' },
      { t: 38,   text: 'laughs' },
      { t: 40,   text: 'Isn\'t it lovely?' },
      { t: 42,   text: 'All the greenery and the water' },
      { t: 44.5, text: 'makes it feel like time is almost standing still.' },
      { t: 54,   text: 'I\'ll just wait for Ron here.' },
      { t: 56.5, text: 'He shouldn\'t be long.' },
      { t: 58,   text: 'Thank you for helping me out today.' },
      { t: 61,   text: 'It was very kind of you to walk with me.' },
      { t: 63,   text: 'You go ahead,' },
      { t: 64.5, text: 'enjoy the rest of your day.' },
      { t: 67,   text: 'I\'ll be okay waiting here.' },
    ],
  },
];

const GPS = {
  outOfRange: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/GPS%20out%20of%20range%20prompt.aac',
  near: {
    // per-stop near prompts — add { audioSrc, script } here when recorded
    1: null,
    2: null,
    3: {
      audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/stop%203%20-%20The%20Bench-%20gps%20prompt.mp3',
      script: [
        { t: 0,   text: 'Oh, is that the bench near the water?' },
        { t: 3,   text: 'I think that\'s where Ron said he\'d meet me.' },
        { t: 6,   text: 'Do you mind if we head over?' },
        { t: 8,   text: 'I\'m sure it\'ll come back to me when I get there.' },
      ],
    },
  },
};

const OUTRO = {
  audioSrc: 'https://pub-4150616b72844a3b9af9a5aa28511c95.r2.dev/Outro%20-%20part%201_01.aac',
  script: [
    { t: 0,   text: 'Oh of course,' },
    { t: 2.5, text: 'thank you so much for helping me out.' },
    { t: 6.5, text: 'I\'m sure I\'ll find him soon.' },
    { t: 10,  text: 'Have a lovely day.' },
  ],
};
