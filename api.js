
// Ahora detecta correctamente si es localhost o GitHub Pages
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = IS_LOCAL ? `${window.location.origin}/api` : 'https://free-api-live-football-data.p.rapidapi.com';

const DIRECT_HEADERS = {
  'x-rapidapi-key':  '2a37e40317mshaffc60a5fe87c93p1b6a92jsncab3bde2709a',
  'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com'
};

const API_CACHE = {};

async function apiFetch(endpoint) {
  if (API_CACHE[endpoint]) return API_CACHE[endpoint];
  const fullUrl = `${API_BASE}${endpoint}`;
  const opts = IS_LOCAL ? { method: 'GET' } : { method: 'GET', headers: DIRECT_HEADERS };
  const res = await fetch(fullUrl, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  API_CACHE[endpoint] = data;
  return data;
}

const CURRENT_SEASON = 2024;

async function fetchStandings(leagueId) {
  try {
    const data = await apiFetch(`/football-get-standings?leagueid=${leagueId}&season=${CURRENT_SEASON}`);
    const standings = data?.response?.[0]?.league?.standings?.[0];
    if (standings && standings.length > 0) return standings;
    if (Array.isArray(data?.response)) return data.response;
    return [];
  } catch(e) { return []; }
}

function rowToTeam(row, leagueName) {
  const t = row.team || {}, all = row.all || { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } };
  const home = row.home || { win: 0, draw: 0, lose: 0 }, away = row.away || { win: 0, draw: 0, lose: 0 };
  const formStr = (row.form || '').slice(-5);
  const lastFive = formStr.length === 5 ? formStr.split('') : ['W', 'D', 'W', 'D', 'W'];
  const played = all.played || 1, gf = all.goals?.for || 0, ga = all.goals?.against || 0;

  return {
    apiId: t.id, apiLogo: t.logo, league: leagueName, position: row.rank || 1, played,
    won: all.win || 0, drawn: all.draw || 0, lost: all.lose || 0, goalsFor: gf, goalsAgainst: ga,
    homeWon: home.win || 0, homeDrawn: home.draw || 0, homeLost: home.lose || 0,
    awayWon: away.win || 0, awayDrawn: away.draw || 0, awayLost: away.lose || 0, lastFive,
    xGFor: +(gf / played * 0.93).toFixed(2), xGAgainst: +(ga / played * 0.93).toFixed(2),
    shotsPerMatch: +(11 + (gf / played) * 2.2).toFixed(1), shotsOnTargetPerMatch: +(3.8 + (gf / played) * 1.3).toFixed(1),
    recentMatchDates: [0, 4, 8, 12, 16], cleanSheets: Math.max(0, Math.round(played * 0.28 * (1 - ga / (played * 2.5))))
  };
}

async function fetchLast5(teamId) {
  try { return (await apiFetch(`/football-team-last5matches?teamid=${teamId}`))?.response || []; } catch(e) { return []; }
}

function parseLast5(fixtures, teamId) {
  return fixtures.slice(0, 5).map(fix => {
    const isHome = fix.teams?.home?.id === teamId, hg = fix.goals?.home ?? 0, ag = fix.goals?.away ?? 0;
    if (hg === ag) return 'D';
    if ((isHome && hg > ag) || (!isHome && ag > hg)) return 'W';
    return 'L';
  });
}

async function enrichTeamForm(teamName) {
  const team = TEAMS[teamName];
  if (!team?.apiId) return;
  try {
    const fixtures = await fetchLast5(team.apiId);
    if (fixtures.length >= 5) {
      team.lastFive = parseLast5(fixtures, team.apiId);
      const now = Date.now();
      team.recentMatchDates = fixtures.slice(0, 5).map(f => Math.max(0, Math.round((now - new Date(f.fixture?.date || Date.now()).getTime()) / 86400000)));
    }
  } catch(e) {}
}

async function fetchH2H(id1, id2) {
  try { const data = await apiFetch(`/football-headtohead?firstTeamId=${id1}&secondTeamId=${id2}`); return data?.response?.fixtures || data?.response || []; } catch(e) { return []; }
}

async function loadH2HForMatch(homeTeam, awayTeam) {
  const hId = TEAMS[homeTeam]?.apiId, aId = TEAMS[awayTeam]?.apiId;
  if (!hId || !aId) return [];
  const fixtures = await fetchH2H(hId, aId);
  return fixtures.slice(0, 10).map(fix => ({ home: fix.teams?.home?.name || homeTeam, away: fix.teams?.away?.name || awayTeam, hg: fix.goals?.home ?? 0, ag: fix.goals?.away ?? 0, date: fix.fixture?.date?.slice(0, 10) || '—' }));
}

async function loadLiveData(leaguesToLoad, onProgress) {
  const teamsOut = {}; let loaded = 0;
  for (const [leagueName, leagueId] of Object.entries(leaguesToLoad)) {
    onProgress?.(`${leagueName}…`);
    const rows = await fetchStandings(leagueId);
    rows.forEach(row => { if (row?.team?.name) teamsOut[row.team.name] = rowToTeam(row, leagueName); });
    loaded += rows.length;
  }
  return { teams: teamsOut, loaded };
}