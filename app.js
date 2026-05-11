// ── Supabase ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://oejfkgozxswpvjujbnkg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lamZrZ296eHN3cHZqdWpibmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjUzMjEsImV4cCI6MjA5MzI0MTMyMX0.oyUR0kYcNogW3NF6E98hKFWrk9Ac4HzUwsq89SUSSqQ';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Constants ─────────────────────────────────────────────────────────────────
const GOAL_WEIGHT = 195;
const START_WEIGHT = 225;

const LIFT = [
  { name: 'Smith machine squat',            detail: '3 × 10 @ 75 lbs',  note: 'Still learning the movement — hold weight' },
  { name: 'DB chest press',                 detail: 'Pyramid',           note: '8×40 / 8×50 / 8×60 lbs' },
  { name: 'DB Romanian deadlift',           detail: '3 × 10',            note: 'Form priority — assess after PT eval' },
  { name: 'Seated cable row',               detail: '3 × 10 @ 110 lbs', note: '' },
  { name: 'Planks / dead bugs / Pallof press', detail: '3 sets each',   note: 'Dead bugs: fatigue sets in around set 2' },
  { name: 'Cable triceps pushdown',         detail: '3 × 10 @ 35 lbs',  note: '' },
  { name: 'DB shoulder press',              detail: 'Pyramid',           note: '8×22.5 / 8×25 / 8×27.5 lbs — stay conservative, old injury' },
  { name: 'DB bicep curl',                  detail: '3 × 10 @ 25 lbs',  note: 'No 27.5 available — jump to 30 when ready' },
];
const WALK = [{ name: 'Treadmill walk', detail: '60 min', note: '3% incline · 3.5–3.6 mph' }];

const COT_SCHEDULE = [
  { date: '2026-04-12', chapters: 'Finish Prologue', pages: 'pp. 44–80', ppday: 37, endPage: 80 },
  { date: '2026-04-13', chapters: 'Ch 1: Time to Be Gone', pages: 'pp. 81–99', ppday: 19, endPage: 99 },
  { date: '2026-04-14', chapters: 'Ch 2: Two Captains', pages: 'pp. 100–114', ppday: 15, endPage: 114 },
  { date: '2026-04-23', chapters: 'Ch 3: A Fan of Colors\nCh 4: The Tale of a Doll', pages: 'pp. 115–153', ppday: 39, endPage: 153 },
  { date: '2026-04-24', chapters: 'Ch 5: The Forging of a Hammer\nCh 6: The Scent of a Dream', pages: 'pp. 154–189', ppday: 36, endPage: 189 },
  { date: '2026-04-25', chapters: "Ch 7: Blacksmith's Puzzle\nCh 8: Whirlpools of Color", pages: 'pp. 190–224', ppday: 35, endPage: 224 },
  { date: '2026-04-26', chapters: 'Ch 9: Traps', pages: 'pp. 225–252', ppday: 28, endPage: 252 },
  { date: '2026-04-27', chapters: 'Ch 10: A Blazing Beacon\nCh 11: Talk of Debts', pages: 'pp. 253–287', ppday: 35, endPage: 287 },
  { date: '2026-04-28', chapters: 'Ch 12: A Bargain\nCh 13: High Seats', pages: 'pp. 288–321', ppday: 34, endPage: 321 },
  { date: '2026-04-29', chapters: 'Ch 14: What Wise Ones Know\nCh 15: Gathering Darkness', pages: 'pp. 322–375', ppday: 54, endPage: 375 },
  { date: '2026-04-30', chapters: 'Ch 16: The Subject of Negotiations\nCh 17: Secrets', pages: 'pp. 376–419', ppday: 44, endPage: 419 },
  { date: '2026-05-01', chapters: 'Ch 18: A Chat with Siuan\nCh 19: Surprises', pages: 'pp. 420–462', ppday: 43, endPage: 462 },
  { date: '2026-05-02', chapters: 'Ch 20: In the Night\nCh 21: A Mark', pages: 'pp. 463–503', ppday: 41, endPage: 503 },
  { date: '2026-05-03', chapters: 'Ch 22: One Answer\nCh 23: Ornaments\nCh 24: A Strengthening Storm', pages: 'pp. 504–544', ppday: 41, endPage: 544 },
  { date: '2026-05-04', chapters: 'Ch 25: When to Wear Jewels\nCh 26: In So Habor', pages: 'pp. 545–569', ppday: 25, endPage: 569 },
  { date: '2026-05-05', chapters: 'Ch 27: What Must Be Done\nCh 28: A Cluster of Rosebuds', pages: 'pp. 570–612', ppday: 43, endPage: 612 },
  { date: '2026-05-06', chapters: 'Ch 29: Something Flickers', pages: 'pp. 613–634', ppday: 22, endPage: 634 },
  { date: '2026-05-07', chapters: 'Ch 30: What the Oath Rod Can Do', pages: 'pp. 635–662', ppday: 28, endPage: 662 },
  { date: '2026-05-08', chapters: 'Epilogue: An Answer', pages: 'pp. 663–666', ppday: 4, endPage: 666 },
];
const COT_TOTAL = 666;

const LICHT_SCHEDULE = [
  { date: '2026-04-24', range: 'pp. 46–89',   ppday: 43, endPage: 89 },
  { date: '2026-04-25', range: 'pp. 89–132',  ppday: 43, endPage: 132 },
  { date: '2026-04-26', range: 'pp. 132–175', ppday: 43, endPage: 175 },
  { date: '2026-04-27', range: 'pp. 175–218', ppday: 43, endPage: 218 },
  { date: '2026-04-28', range: 'pp. 218–261', ppday: 43, endPage: 261 },
  { date: '2026-04-29', range: 'pp. 261–303', ppday: 42, endPage: 303 },
  { date: '2026-04-30', range: 'pp. 303–346', ppday: 43, endPage: 346 },
  { date: '2026-05-01', range: 'pp. 346–388', ppday: 42, endPage: 388 },
  { date: '2026-05-02', range: 'pp. 388–430', ppday: 42, endPage: 430 },
  { date: '2026-05-03', range: 'pp. 430–471', ppday: 41, endPage: 471 },
];
const LICHT_TOTAL = 471;

// ── State ─────────────────────────────────────────────────────────────────────
let weightLog = [];
let settings = { duolingo_streak: 691, sober_date: '2026-01-11' };

// ── Helpers ───────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);
const daysSince = ds => Math.floor((Date.now() - new Date(ds + 'T12:00:00').getTime()) / 86400000);
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const greeting = () => { const h = new Date().getHours(); return h < 9 ? 'Good morning, Rob.' : h < 12 ? 'Morning, Rob.' : h < 17 ? 'Good afternoon, Rob.' : 'Good evening, Rob.'; };
const wType = () => { const d = new Date().getDay(); return [2, 4, 6].includes(d) ? 'lift' : d === 0 ? 'rest' : 'walk'; };
const toC = f => Math.round((f - 32) * 5 / 9);

// ── Supabase data loading ─────────────────────────────────────────────────────
async function loadData() {
  const [wRes, sRes] = await Promise.all([
    sb.from('weight_log').select('entry_date,weight_lbs').order('entry_date'),
    sb.from('brief_settings').select('key,value'),
  ]);
  if (wRes.data) weightLog = wRes.data.map(r => ({ date: r.entry_date, value: parseFloat(r.weight_lbs) }));
  if (sRes.data) sRes.data.forEach(r => { settings[r.key] = r.value; });
}

// ── Workout ───────────────────────────────────────────────────────────────────
function renderWorkout() {
  const t = wType();
  const el = document.getElementById('el-workout');
  if (t === 'rest') {
    el.innerHTML = `<div class="workout-box"><div class="workout-title">Rest day</div><div class="workout-sub">Sunday — full recovery</div></div>`;
    return;
  }
  const exs = t === 'lift' ? LIFT : WALK;
  el.innerHTML = `<div class="workout-box">
    <div class="workout-title">${t === 'lift' ? 'Lifting day' : 'Walk day'}</div>
    <div class="workout-sub">5am</div>
    <div class="ex-list">${exs.map(e => `
      <div class="ex-row">
        <div>
          <div class="ex-name">${e.name}</div>
          ${e.note ? `<div class="ex-note">${e.note}</div>` : ''}
        </div>
        <div class="ex-detail">${e.detail}</div>
      </div>`).join('')}
    </div>
  </div>`;
}

// ── Weight chart ──────────────────────────────────────────────────────────────
function drawChart() {
  if (!weightLog.length) return;
  const latest = weightLog[weightLog.length - 1].value;
  const pct = Math.round(Math.max(0, Math.min(100, (START_WEIGHT - latest) / (START_WEIGHT - GOAL_WEIGHT) * 100)));
  document.getElementById('w-current').textContent = latest + ' lbs';
  document.getElementById('w-goal-sub').textContent = `Goal: ${GOAL_WEIGHT} lbs · ${pct}% there`;
  document.getElementById('w-lost').textContent = (START_WEIGHT - latest).toFixed(1) + ' lbs';

  const canvas = document.getElementById('wt-chart');
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 680, H = 200;
  canvas.width = W; canvas.height = H;

  const vals = weightLog.map(e => e.value);
  const minV = Math.min(...vals, GOAL_WEIGHT) - 3;
  const maxV = Math.max(...vals) + 3;
  const PAD = { l: 42, r: 12, t: 10, b: 26 };
  const cW = W - PAD.l - PAD.r, cH = H - PAD.t - PAD.b, n = vals.length;
  const xOf = i => PAD.l + i / (n - 1) * cW;
  const yOf = v => PAD.t + cH - (v - minV) / (maxV - minV) * cH;

  const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const gridC = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const textC = isDark ? '#68685a' : '#9a9a92';

  ctx.clearRect(0, 0, W, H);
  [195, 200, 205, 210, 215, 220, 225].filter(v => v >= minV && v <= maxV).forEach(v => {
    const y = yOf(v);
    ctx.strokeStyle = gridC; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
    ctx.fillStyle = textC; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(v, PAD.l - 5, y + 3.5);
  });

  ctx.textAlign = 'center';
  weightLog.forEach((e, i) => {
    const d = new Date(e.date + 'T12:00:00');
    if (d.getDate() === 1 || i === 0) {
      ctx.fillStyle = textC;
      ctx.fillText(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), xOf(i), H - PAD.b + 14);
    }
  });

  // Goal line
  ctx.beginPath(); ctx.setLineDash([5, 4]); ctx.strokeStyle = '#4a7c1f'; ctx.lineWidth = 1.5;
  ctx.moveTo(xOf(0), yOf(GOAL_WEIGHT)); ctx.lineTo(xOf(n - 1), yOf(GOAL_WEIGHT));
  ctx.stroke(); ctx.setLineDash([]);

  // Fill
  ctx.beginPath(); ctx.moveTo(xOf(0), yOf(vals[0]));
  vals.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
  ctx.lineTo(xOf(n - 1), H - PAD.b); ctx.lineTo(xOf(0), H - PAD.b); ctx.closePath();
  ctx.fillStyle = 'rgba(186,117,23,0.08)'; ctx.fill();

  // Line
  ctx.beginPath(); ctx.strokeStyle = '#BA7517'; ctx.lineWidth = 1.8;
  vals.forEach((v, i) => i === 0 ? ctx.moveTo(xOf(i), yOf(v)) : ctx.lineTo(xOf(i), yOf(v)));
  ctx.stroke();

  // End dots
  [0, n - 1].forEach(i => {
    ctx.beginPath(); ctx.arc(xOf(i), yOf(vals[i]), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#BA7517'; ctx.fill();
  });
}

// ── Reading ───────────────────────────────────────────────────────────────────
function renderReading() {
  const t = today();
  const cotEntry = COT_SCHEDULE.find(s => s.date === t);
  const cotPast = COT_SCHEDULE.filter(s => s.date < t);
  const cotNext = cotEntry || (cotPast.length ? COT_SCHEDULE.find(s => s.date > t) : null);
  const cotDone = COT_SCHEDULE.filter(s => s.date <= t);
  const cotProg = cotDone.length ? { ep: cotDone[cotDone.length - 1].endPage, pct: Math.round(cotDone[cotDone.length - 1].endPage / COT_TOTAL * 100) } : { ep: 0, pct: 0 };

  const lichtEntry = LICHT_SCHEDULE.find(s => s.date === t);
  const lichtPast = LICHT_SCHEDULE.filter(s => s.date < t);
  const lichtNext = lichtEntry || (lichtPast.length ? LICHT_SCHEDULE.find(s => s.date > t) : null);
  const lichtDone = LICHT_SCHEDULE.filter(s => s.date <= t);
  const lichtProg = lichtDone.length ? { ep: lichtDone[lichtDone.length - 1].endPage, pct: Math.round(lichtDone[lichtDone.length - 1].endPage / LICHT_TOTAL * 100) } : { ep: 46, pct: Math.round(46 / LICHT_TOTAL * 100) };

  let html = '';

  html += `<div class="reading-box">`;
  html += `<div class="reading-book">Crossroads of Twilight · Target finish May 11</div>`;
  if (!cotNext) {
    html += `<div class="reading-chap">Complete! 🎉</div>`;
  } else {
    const lines = cotNext.chapters.split('\n').map(l => `<div>${l}</div>`).join('');
    const cu = !cotEntry && cotPast.length ? `<div class="catchup">Catch-up day</div>` : '';
    html += `<div class="reading-chap">${lines}</div><div class="reading-pages">${cotNext.pages} · ${cotNext.ppday} pp</div>${cu}`;
  }
  html += `</div>`;
  html += `<div class="progress-row"><span>Progress</span><span>${cotProg.pct}% (p. ${cotProg.ep} of ${COT_TOTAL})</span></div>`;
  html += `<div class="bar-wrap"><div class="bar-fill" style="width:${cotProg.pct}%;background:#4a7c1f;"></div></div>`;

  html += `<div class="reading-box">`;
  html += `<div class="reading-book">Licht Spiel · Daniel Kehlmann · Target finish May 3</div>`;
  if (!lichtNext) {
    html += `<div class="reading-chap">Complete! 🎉</div>`;
  } else {
    const cu = !lichtEntry && lichtPast.length ? `<div class="catchup">Catch-up day</div>` : '';
    html += `<div class="reading-chap">${lichtNext.range}</div><div class="reading-pages">${lichtNext.ppday} pp</div>${cu}`;
  }
  html += `</div>`;
  html += `<div class="progress-row"><span>Progress</span><span>${lichtProg.pct}% (p. ${lichtProg.ep} of ${LICHT_TOTAL})</span></div>`;
  html += `<div class="bar-wrap"><div class="bar-fill" style="width:${lichtProg.pct}%;background:#6b3fa0;"></div></div>`;

  document.getElementById('el-reading').innerHTML = html;
}

// ── Wellness ──────────────────────────────────────────────────────────────────
function renderWellness() {
  const soberDays = daysSince(settings.sober_date || '2026-01-11');
  const streak = parseInt(settings.duolingo_streak) || 691;
  document.getElementById('el-wellness').innerHTML = [
    { label: 'Alcohol-free days', value: soberDays, sub: `since ${new Date((settings.sober_date || '2026-01-11') + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, cls: 'card-green' },
    { label: 'Duolingo streak', value: streak + ' days', sub: 'Spanish', cls: 'card-teal' },
  ].map(c => `<div class="card ${c.cls}"><div class="card-label">${c.label}</div><div class="card-value">${c.value}</div><div class="card-sub">${c.sub}</div></div>`).join('');
}

// ── Weather & news from cache ─────────────────────────────────────────────────
async function loadWeatherNews() {
  const { data } = await sb.from('brief_cache').select('key,data,fetched_at').in('key', ['weather', 'news']);
  if (data) {
    const wRow = data.find(r => r.key === 'weather');
    const nRow = data.find(r => r.key === 'news');
    if (wRow) renderWeather(wRow.data, wRow.fetched_at);
    if (nRow) renderNews(nRow.data, nRow.fetched_at);
  }
  if (!data || data.length < 2) {
    document.getElementById('el-weather').innerHTML = '<div class="loading">No forecast cached yet — hit Refresh</div>';
    document.getElementById('el-news').innerHTML = '<div class="loading">No headlines cached yet — hit Refresh</div>';
  }
}

function renderWeather(weatherData, fetchedAt) {
  const note = fetchedAt ? `Updated ${new Date(fetchedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · NWS Nashville` : '';
  document.getElementById('el-weather').innerHTML = `<div class="weather-grid">${weatherData.map(w => `
    <div class="wd">
      <div class="wd-day">${w.day}</div>
      <div class="wd-date">${w.label}</div>
      <div class="wd-icon">${w.icon}</div>
      <div class="wd-hi">${w.hi}°F / ${toC(w.hi)}°C</div>
      <div class="wd-lo">${w.lo}°F / ${toC(w.lo)}°C</div>
      <div class="wd-cond">${w.cond}</div>
    </div>`).join('')}</div>`;
  document.getElementById('weather-note').textContent = note;
}

function renderNews(newsData, fetchedAt) {
  const note = fetchedAt ? `Updated ${new Date(fetchedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '';
  document.getElementById('el-news').innerHTML = newsData.map(n => `
    <div class="news-item">
      <div><span class="news-tag ${n.cat === 'ttrpg' ? 'tag-ttrpg' : 'tag-de'}">${n.cat === 'ttrpg' ? 'TTRPG' : 'Germany'}</span></div>
      <div class="news-hl">${n.hl}</div>
      <div class="news-src">${n.src}</div>
    </div>`).join('');
  document.getElementById('news-note').textContent = note;
}

// ── Refresh weather/news via edge function ────────────────────────────────────
async function refreshWeatherNews() {
  const btn = document.getElementById('refresh-btn');
  btn.disabled = true;
  btn.textContent = '↻ Refreshing...';
  document.getElementById('el-weather').innerHTML = '<div class="loading">Fetching forecast...</div>';
  document.getElementById('el-news').innerHTML = '<div class="loading">Fetching headlines...</div>';
  try {
    const { data, error } = await sb.functions.invoke('fetch-weather-news');
    if (error) throw error;
    if (data.weather) renderWeather(data.weather, new Date().toISOString());
    if (data.news) renderNews(data.news, new Date().toISOString());
  } catch (e) {
    document.getElementById('el-weather').innerHTML = '<div class="loading">Refresh failed — try again later</div>';
    document.getElementById('el-news').innerHTML = '<div class="loading">Refresh failed — try again later</div>';
  }
  btn.disabled = false;
  btn.textContent = '↻ Refresh';
}

// ── Log form ──────────────────────────────────────────────────────────────────
function onFieldChange() {
  const f = document.getElementById('log-field').value;
  document.getElementById('log-num').style.display = f === 'soberDate' ? 'none' : '';
  document.getElementById('log-date').style.display = f === 'soberDate' ? '' : 'none';
  if (f === 'soberDate') document.getElementById('log-date').value = settings.sober_date || '';
}

async function doLog() {
  const f = document.getElementById('log-field').value;
  const ok = document.getElementById('log-ok');

  if (f === 'weight') {
    const v = parseFloat(document.getElementById('log-num').value);
    if (isNaN(v)) return;
    await sb.from('weight_log').upsert({ entry_date: today(), weight_lbs: v }, { onConflict: 'entry_date' });
    const idx = weightLog.findIndex(e => e.date === today());
    if (idx >= 0) weightLog[idx].value = v;
    else { weightLog.push({ date: today(), value: v }); weightLog.sort((a, b) => a.date.localeCompare(b.date)); }
    drawChart();
    document.getElementById('log-num').value = '';
  } else if (f === 'duolingo') {
    const v = parseInt(document.getElementById('log-num').value);
    if (isNaN(v)) return;
    await sb.from('brief_settings').upsert({ key: 'duolingo_streak', value: String(v) }, { onConflict: 'key' });
    settings.duolingo_streak = v;
    renderWellness();
    document.getElementById('log-num').value = '';
  } else if (f === 'soberDate') {
    const v = document.getElementById('log-date').value;
    if (!v) return;
    await sb.from('brief_settings').upsert({ key: 'sober_date', value: v }, { onConflict: 'key' });
    settings.sober_date = v;
    renderWellness();
  }

  ok.style.display = 'block';
  setTimeout(() => ok.style.display = 'none', 2000);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
async function main() {
  document.getElementById('el-date').textContent = fmtDate(today());
  document.getElementById('el-greet').textContent = greeting();

  await loadData();
  renderWorkout();
  drawChart();
  renderReading();
  renderWellness();
  await loadWeatherNews();
}

main();
