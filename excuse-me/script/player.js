// Shared audio player — included on intro.html, stop.html, closing.html
// Requires these IDs in the page: audio, lyrics-container, progress-fill,
// time-current, time-total, btn-play, icon-play, icon-pause

const audio       = document.getElementById('audio');
const lyricsEl    = document.getElementById('lyrics-container');
const progFill    = document.getElementById('progress-fill');
const progTrack   = progFill?.closest('[role="progressbar"]');
const timeCurrent = document.getElementById('time-current');
const timeTotal   = document.getElementById('time-total');
const btnPlay     = document.getElementById('btn-play');
const iconPlay    = document.getElementById('icon-play');
const iconPause   = document.getElementById('icon-pause');
const srAnnounce  = document.getElementById('sr-announce');

let currentScript = [];
let activeLine    = -1;
let textTimer     = null;
let textLineIdx   = -1;
let textActive    = false;

function loadTrack(src, script) {
  stopTextMode();
  textActive    = false;
  textLineIdx   = -1;
  activeLine    = -1;
  currentScript = script;

  audio.pause();
  audio.src         = src;
  audio.load();           // reset error/stall state — required on iOS when switching src
  audio.currentTime = 0;

  progFill.style.width    = '0%';
  timeCurrent.textContent = '0:00';
  timeTotal.textContent   = '0:00';
  setPlayIcon(false);

  lyricsEl.innerHTML = '';
  const top = document.createElement('div');
  top.className = 'lyric-spacer';
  lyricsEl.appendChild(top);
  script.forEach(line => {
    const el = document.createElement('p');
    el.className   = 'lyric-line future';
    el.textContent = line.text;
    lyricsEl.appendChild(el);
  });
  const bot = document.createElement('div');
  bot.className = 'lyric-spacer';
  lyricsEl.appendChild(bot);
}

function playTrack() {
  return audio.play()
    .then(() => setPlayIcon(true))
    .catch(() => startTextMode());
}

function setPlayIcon(playing) {
  iconPlay.style.display  = playing ? 'none'  : 'block';
  iconPause.style.display = playing ? 'block' : 'none';
  btnPlay.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function handlePlayPause() {
  if (textActive) {
    if (textTimer) {
      stopTextMode();
      setPlayIcon(false);
    } else {
      setPlayIcon(true);
      const cur   = currentScript[textLineIdx]?.t ?? 0;
      const nextT = currentScript[textLineIdx + 1]?.t;
      const delay = nextT !== undefined ? (nextT - cur) * 1000 : 4000;
      textTimer = setTimeout(stepText, Math.max(delay, 1200));
    }
    return;
  }
  if (audio.paused) {
    audio.play().then(() => setPlayIcon(true)).catch(() => {});
  } else {
    audio.pause();
    setPlayIcon(false);
  }
}

function updateLyrics(t) {
  const lineEls = lyricsEl.querySelectorAll('.lyric-line');
  if (!lineEls.length) return;

  let idx = -1;
  for (let i = 0; i < currentScript.length; i++) {
    if (t >= currentScript[i].t) idx = i; else break;
  }
  if (idx === activeLine) return;
  activeLine = idx;

  lineEls.forEach((el, i) => {
    el.classList.remove('past', 'active', 'future');
    if      (i < idx)  el.classList.add('past');
    else if (i === idx) el.classList.add('active');
    else               el.classList.add('future');
  });

  if (idx >= 0) {
    const el = lineEls[idx];
    lyricsEl.scrollTo({ top: el.offsetTop - lyricsEl.clientHeight / 2 + el.offsetHeight / 2, behavior: 'smooth' });
    if (srAnnounce) srAnnounce.textContent = currentScript[idx].text;
  }
}

function startTextMode() {
  textActive  = true;
  textLineIdx = -1;
  setPlayIcon(true);
  stepText();
}

function stepText() {
  const lineEls = lyricsEl.querySelectorAll('.lyric-line');
  textLineIdx++;

  if (textLineIdx >= currentScript.length) {
    stopTextMode();
    audio.dispatchEvent(new Event('ended'));
    return;
  }

  activeLine = textLineIdx;
  lineEls.forEach((el, i) => {
    el.classList.remove('past', 'active', 'future');
    if      (i < textLineIdx)  el.classList.add('past');
    else if (i === textLineIdx) el.classList.add('active');
    else                       el.classList.add('future');
  });

  if (lineEls[textLineIdx]) {
    const el = lineEls[textLineIdx];
    lyricsEl.scrollTo({ top: el.offsetTop - lyricsEl.clientHeight / 2 + el.offsetHeight / 2, behavior: 'smooth' });
  }
  if (srAnnounce) srAnnounce.textContent = currentScript[textLineIdx].text;

  const current = currentScript[textLineIdx].t;
  const total   = currentScript[currentScript.length - 1].t + 4;
  const nextT   = currentScript[textLineIdx + 1]?.t;
  const delay   = nextT !== undefined ? (nextT - current) * 1000 : 4000;

  progFill.style.width    = (current / total * 100) + '%';
  timeCurrent.textContent = formatTime(current);
  timeTotal.textContent   = formatTime(total);

  textTimer = setTimeout(stepText, Math.max(delay, 1200));
}

function stopTextMode() {
  if (textTimer) { clearTimeout(textTimer); textTimer = null; }
}

function formatTime(s) {
  if (!isFinite(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

audio.addEventListener('timeupdate', () => {
  if (textActive) return;
  const t   = audio.currentTime;
  const dur = audio.duration || 0;
  updateLyrics(t);
  if (dur > 0) {
    const pct = Math.round(t / dur * 100);
    progFill.style.width    = pct + '%';
    timeCurrent.textContent = formatTime(t);
    timeTotal.textContent   = formatTime(dur);
    if (progTrack) progTrack.setAttribute('aria-valuenow', pct);
  }
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('error', () => {
  if (!textActive) startTextMode();
});

btnPlay.addEventListener('click', handlePlayPause);
