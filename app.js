// ================================================================
// 1. BASES DE DATOS PROGOL (INTEGRADAS PARA EVITAR ERRORES DE CARGA)
// ================================================================
const progol_ms_analisis = [
    { "casillero": 1, "torneo": "Concacaf Champions Cup", "local": { "equipo": "Nashville SC", "liga": "MLS" }, "visitante": { "equipo": "Tigres UANL", "liga": "Liga MX" }, "pronostico_estadistico": "Local (L) o Empate (E)" },
    { "casillero": 2, "torneo": "Amistoso", "local": { "equipo": "Los Angeles FC", "liga": "MLS" }, "visitante": { "equipo": "Toluca", "liga": "Liga MX" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 3, "torneo": "Champions League", "local": { "equipo": "Paris SG", "liga": "Ligue 1" }, "visitante": { "equipo": "Bayern Munich", "liga": "Bundesliga" }, "pronostico_estadistico": "Empate (E) o Visita (V)" },
    { "casillero": 4, "torneo": "Competición Europea", "local": { "equipo": "Atlético de Madrid", "liga": "LaLiga" }, "visitante": { "equipo": "Arsenal", "liga": "Premier League" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 5, "torneo": "Competición Europea", "local": { "equipo": "SC Braga", "liga": "Primeira Liga" }, "visitante": { "equipo": "Friburgo", "liga": "Bundesliga" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 6, "torneo": "Premier League", "local": { "equipo": "Nottingham", "liga": "Premier League" }, "visitante": { "equipo": "Aston Villa", "liga": "Premier League" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 7, "torneo": "Amistoso", "local": { "equipo": "Rayo Vallecano", "liga": "LaLiga" }, "visitante": { "equipo": "Estrasburgo", "liga": "Ligue 1" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 8, "torneo": "Amistoso", "local": { "equipo": "Shakhtar", "liga": "Ucrania" }, "visitante": { "equipo": "Crystal Palace", "liga": "Premier League" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 9, "torneo": "Copa Sudamericana", "local": { "equipo": "Cruzeiro", "liga": "Brasileirão" }, "visitante": { "equipo": "Boca Juniors", "liga": "Argentina" }, "pronostico_estadistico": "Empate (E)" }
];

const progol_principal = [
    { "casillero": 1, "torneo": "Liga MX", "local": { "equipo": "América" }, "visitante": { "equipo": "Pumas UNAM" }, "pronostico_estadistico": "Empate (E) o Visita (V)" },
    { "casillero": 2, "torneo": "Liga MX", "local": { "equipo": "Tigres UANL" }, "visitante": { "equipo": "Guadalajara" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 3, "torneo": "Liga MX", "local": { "equipo": "Atlas" }, "visitante": { "equipo": "Cruz Azul" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 4, "torneo": "Liga MX", "local": { "equipo": "Toluca" }, "visitante": { "equipo": "Pachuca" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 5, "torneo": "Premier League", "local": { "equipo": "Newcastle" }, "visitante": { "equipo": "Brighton" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 6, "torneo": "Premier League", "local": { "equipo": "Man. United" }, "visitante": { "equipo": "Liverpool" }, "pronostico_estadistico": "Local (L) o Empate (E)" },
    { "casillero": 7, "torneo": "Bundesliga", "local": { "equipo": "Hoffenheim" }, "visitante": { "equipo": "Stuttgart" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 8, "torneo": "Bundesliga", "local": { "equipo": "Leverkusen" }, "visitante": { "equipo": "Leipzig" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 9, "torneo": "Serie A", "local": { "equipo": "Como 1907" }, "visitante": { "equipo": "Napoli" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 10, "torneo": "Eredivisie", "local": { "equipo": "Ajax" }, "visitante": { "equipo": "PSV" }, "pronostico_estadistico": "Visita (V) o Empate (E)" },
    { "casillero": 11, "torneo": "Primeira Liga", "local": { "equipo": "Rio Ave" }, "visitante": { "equipo": "Gil Vicente" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 12, "torneo": "MLS", "local": { "equipo": "Toronto FC" }, "visitante": { "equipo": "San Jose" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 13, "torneo": "Grecia", "local": { "equipo": "OFI Creta" }, "visitante": { "equipo": "Aris" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 14, "torneo": "Grecia", "local": { "equipo": "PAOK" }, "visitante": { "equipo": "Olympiacos" }, "pronostico_estadistico": "Local (L)" }
];

const progol_revancha = [
    { "casillero": 1, "torneo": "LaLiga", "local": { "equipo": "Alavés" }, "visitante": { "equipo": "Athletic Bilbao" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 2, "torneo": "Bundesliga", "local": { "equipo": "Werder Bremen" }, "visitante": { "equipo": "Augsburgo" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 3, "torneo": "Bundesliga", "local": { "equipo": "Union Berlin" }, "visitante": { "equipo": "Colonia" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 4, "torneo": "Bundesliga", "local": { "equipo": "St. Pauli" }, "visitante": { "equipo": "Mainz 05" }, "pronostico_estadistico": "Empate (E)" },
    { "casillero": 5, "torneo": "Serie A", "local": { "equipo": "Udinese" }, "visitante": { "equipo": "Torino" }, "pronostico_estadistico": "Visita (V)" },
    { "casillero": 6, "torneo": "Eredivisie", "local": { "equipo": "AZ Alkmaar" }, "visitante": { "equipo": "Twente" }, "pronostico_estadistico": "Local (L)" },
    { "casillero": 7, "torneo": "Brasileirão", "local": { "equipo": "Internacional" }, "visitante": { "equipo": "Fluminense" }, "pronostico_estadistico": "Visita (V) o Empate (E)" }
];

// ================================================================
// 2. LÓGICA DE INTERFAZ Y PREDICCIÓN
// ================================================================
const homeSelect = document.getElementById('home-team'), awaySelect = document.getElementById('away-team');
const predictBtn = document.getElementById('predict-btn'), resultsSection = document.getElementById('results-section');
const statusBanner = document.getElementById('status-banner'), statusText = document.getElementById('status-text');
const leagueFilter = document.getElementById('league-filter');

const LEAGUES_TO_LOAD = { "Premier League": 39, "La Liga": 140, "Bundesliga": 78, "Serie A": 135, "Ligue 1": 61, "Liga MX": 262, "MLS": 253, "Brasileirão": 71, "Argentine Primera": 128, "Champions League": 2, "Copa Libertadores": 13 };

function showStatus(msg, type = "info") { statusText.textContent = msg; statusBanner.className = `status-banner ${type}`; statusBanner.style.display = "flex"; }
function hideStatus() { statusBanner.style.display = "none"; }

function populateDropdowns(teamsObj) {
  const grouped = {};
  Object.entries(teamsObj).forEach(([name, t]) => { const lg = t.league || "Other"; if (!grouped[lg]) grouped[lg] = []; grouped[lg].push(name); });
  leagueFilter.innerHTML = '<option value="">All Leagues</option>';
  Object.keys(grouped).sort().forEach(lg => { const opt = document.createElement("option"); opt.value = lg; opt.textContent = lg; leagueFilter.appendChild(opt); });
  buildSelectOptions(grouped, "");
}

function buildSelectOptions(grouped, filterLeague) {
  [homeSelect, awaySelect].forEach(sel => {
    const prev = sel.value; sel.innerHTML = ""; const keys = filterLeague ? [filterLeague] : Object.keys(grouped).sort();
    keys.forEach(lg => {
      if (!grouped[lg]) return; const grp = document.createElement("optgroup"); grp.label = lg;
      grouped[lg].sort().forEach(name => { const opt = document.createElement("option"); opt.value = name; opt.textContent = name; grp.appendChild(opt); });
      sel.appendChild(grp);
    });
    if (prev && sel.querySelector(`option[value="${prev}"]`)) sel.value = prev;
  });
}

leagueFilter.addEventListener("change", () => {
  const grouped = {}; Object.entries(TEAMS).forEach(([name, t]) => { const lg = t.league || "Other"; if (!grouped[lg]) grouped[lg] = []; grouped[lg].push(name); });
  buildSelectOptions(grouped, leagueFilter.value);
});

function getCurrentWeights() {
  const w = {}; document.querySelectorAll('.weight-slider').forEach(s => w[s.dataset.key] = parseFloat(s.value));
  const total = Object.values(w).reduce((a, b) => a + b, 0); Object.keys(w).forEach(k => w[k] /= total); return w;
}

function renderForm(lastFive) { return lastFive.map(r => `<span class="form-pill ${r}">${r}</span>`).join(''); }
function animateBar(el, pct) { el.style.width = "0%"; setTimeout(() => { el.style.width = pct + "%"; }, 80); }

function renderTeamStats(teamName, containerId, isHome) {
  const t = TEAMS[teamName], hg = t.homeWon + t.homeDrawn + t.homeLost, ag = t.awayWon + t.awayDrawn + t.awayLost;
  document.getElementById(containerId).innerHTML = `
    <div class="stat-card-title" style="color:${isHome ? "var(--home-color)" : "var(--away-color)"}">${t.apiLogo ? `<img src="${t.apiLogo}" style="width:22px;height:22px;object-fit:contain;margin-right:6px;vertical-align:middle" onerror="this.style.display='none'"/>` : ""}${isHome ? "🏠 HOME" : "✈️ AWAY"} · ${teamName}</div>
    <div class="stat-row"><span class="stat-key">Season Record</span><span class="stat-val">${t.won}W / ${t.drawn}D / ${t.lost}L</span></div>
    <div class="stat-row"><span class="stat-key">League / Position</span><span class="stat-val">${t.league} #${t.position}</span></div>
    <div class="stat-row"><span class="stat-key">Goals F / A</span><span class="stat-val">${t.goalsFor} / ${t.goalsAgainst}</span></div>
    <div class="stat-row"><span class="stat-key">Home Win %</span><span class="stat-val">${hg > 0 ? ((t.homeWon / hg) * 100).toFixed(0) : 0}% (${t.homeWon}W ${t.homeDrawn}D ${t.homeLost}L)</span></div>
    <div class="stat-row"><span class="stat-key">Away Win %</span><span class="stat-val">${ag > 0 ? ((t.awayWon / ag) * 100).toFixed(0) : 0}% (${t.awayWon}W ${t.awayDrawn}D ${t.awayLost}L)</span></div>
    <div class="stat-row"><span class="stat-key">xG For / Against</span><span class="stat-val">${t.xGFor} / ${t.xGAgainst}</span></div>
    <div class="stat-row"><span class="stat-key">Last 5 Form</span><span class="stat-val"><div class="form-pills">${renderForm(t.lastFive)}</div></span></div>
  `;
}

function renderComponentBars(comp, hName, aName) {
  document.getElementById('component-bars').innerHTML = `<div style="display:grid;grid-template-columns:90px 1fr 1fr;gap:.5rem;margin-bottom:.75rem;font-size:.72rem;font-weight:700;letter-spacing:1px;text-transform:uppercase"><div></div><div style="text-align:right;color:var(--home-color)">${hName}</div><div style="color:var(--away-color)">${aName}</div></div>` + `<div class="component-bars">` + [ {key:"form",label:"Form"},{key:"attack",label:"Attack"},{key:"defense",label:"Defense"},{key:"homeAdv",label:"Home/Away"},{key:"h2h",label:"H2H"},{key:"position",label:"Position"} ].map(({key,label}) => `<div class="component-bar-row"><span class="comp-label">${label}</span><div class="comp-bar-wrap" style="flex-direction:row-reverse"><span class="comp-score home-score">${(comp.home[key]*100).toFixed(0)}%</span><div class="comp-bar-track"><div class="comp-bar-fill home-fill" style="width:${(comp.home[key]*100).toFixed(0)}%"></div></div></div><div class="comp-bar-wrap"><div class="comp-bar-track"><div class="comp-bar-fill away-fill" style="width:${(comp.away[key]*100).toFixed(0)}%"></div></div><span class="comp-score away-score">${(comp.away[key]*100).toFixed(0)}%</span></div></div>`).join('') + `</div>`;
}

async function renderH2H(homeTeam, awayTeam) {
  const wrap = document.getElementById('h2h-table-wrap'); wrap.innerHTML = `<div class="no-data">⏳ Loading H2H data…</div>`;
  let matches = []; try { matches = await loadH2HForMatch(homeTeam, awayTeam); } catch(e) {}
  if (!matches.length) matches = getH2HMatches(homeTeam, awayTeam);
  if (!matches.length) { wrap.innerHTML = `<div class="no-data">⚠️ No head-to-head matches found.</div>`; return; }
  wrap.innerHTML = `<table class="h2h-table"><thead><tr><th>Date</th><th>Home</th><th>Score</th><th>Away</th><th>Result</th></tr></thead><tbody>${matches.map(m => { const hw = m.hg > m.ag, aw = m.hg < m.ag, dw = m.hg === m.ag; return `<tr><td>${m.date}</td><td>${m.home}</td><td class="score-cell">${m.hg} – ${m.ag}</td><td>${m.away}</td><td class="${dw ? "result-draw" : (m.home === homeTeam && hw) || (m.home === awayTeam && aw) ? "result-home" : "result-away"}">${dw ? "Draw" : (m.home === homeTeam && hw) || (m.home === awayTeam && aw) ? homeTeam+" Win" : awayTeam+" Win"}</td></tr>`; }).join('')}</tbody></table>`;
}

async function runPrediction() {
  const homeTeam = homeSelect.value, awayTeam = awaySelect.value;
  if (!homeTeam || !awayTeam || homeTeam === awayTeam) { alert('Please select two different teams.'); return; }
  showStatus("🔄 Fetching live form data…", "info"); try { await Promise.all([enrichTeamForm(homeTeam), enrichTeamForm(awayTeam)]); } catch(e) {} hideStatus();
  let result; try { result = predictMatch(homeTeam, awayTeam, getCurrentWeights()); } catch(e) { alert('Prediction error: ' + e.message); return; }

  resultsSection.classList.remove('visible'); void resultsSection.offsetWidth; resultsSection.classList.add('visible');
  document.getElementById('match-home-name').textContent = homeTeam; document.getElementById('match-away-name').textContent = awayTeam;
  ['home', 'draw', 'away'].forEach(type => document.getElementById(`badge-${type}-val`).textContent = result[type === 'home' ? 'homeWin' : type === 'away' ? 'awayWin' : 'draw'] + '%');
  const chip = document.getElementById('confidence-chip'); chip.className = `confidence-chip ${result.confidence.toLowerCase()}`; chip.innerHTML = `${{High:'🟢',Medium:'🟡',Low:'🔴'}[result.confidence]} Confidence: ${result.confidence}`;

  ['home', 'draw', 'away'].forEach(type => { const val = result[type === 'home' ? 'homeWin' : type === 'away' ? 'awayWin' : 'draw']; animateBar(document.getElementById(`bar-${type}`), val); document.getElementById(`val-${type}`).textContent = val + '%'; });
  document.getElementById('bar-label-home').textContent = homeTeam + ' Win'; document.getElementById('bar-label-away').textContent = awayTeam + ' Win';
  renderTeamStats(homeTeam, 'home-stats-content', true); renderTeamStats(awayTeam, 'away-stats-content', false);
  document.getElementById('factors-list').innerHTML = result.factors.map(f => `<div class="factor-item">${f}</div>`).join('');
  renderComponentBars(result.components, homeTeam, awayTeam); renderH2H(homeTeam, awayTeam);
  resultsSection.scrollIntoView({ behavior:'smooth', block:'start' });
}

// ================================================================
// 3. INICIALIZACIÓN (AQUÍ DIBUJAMOS LOS PANELES)
// ================================================================
document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('.weight-slider').forEach(s => s.addEventListener('input', () => document.getElementById(`w-val-${s.dataset.key}`).textContent = parseFloat(s.value).toFixed(2)));
  
  // DIBUJAR PANELES DE PROGOL INMEDIATAMENTE
  initProgolIntegration();

  predictBtn.addEventListener('click', runPrediction);
  [homeSelect, awaySelect].forEach(sel => sel.addEventListener('change', () => { if (resultsSection.classList.contains('visible')) runPrediction(); }));
  
  showStatus("🌐 Loading live data from API…", "info");
  try {
    const live = await loadLiveData(LEAGUES_TO_LOAD, msg => showStatus("🌐 " + msg, "info"));
    Object.assign(TEAMS, live.teams); populateDropdowns(TEAMS);
    if (Object.keys(live.teams).length > 0) { showStatus(`✅ Live data loaded — ${Object.keys(live.teams).length} teams updated`, "success"); setTimeout(hideStatus, 4000); }
    else { showStatus("⚠️ API returned no data — using local dataset", "warn"); setTimeout(hideStatus, 5000); }
  } catch(e) { showStatus("⚠️ API unavailable — using local dataset", "warn"); setTimeout(hideStatus, 5000); }
});

function initProgolIntegration() {
  procesarYRenderizar(progol_ms_analisis, 'progol-grid-ms');
  procesarYRenderizar(progol_principal, 'progol-grid-principal');
  procesarYRenderizar(progol_revancha, 'progol-grid-revancha');
  populateDropdowns(TEAMS);
}

function procesarYRenderizar(arrayDatos, containerId) {
  // Inyectar equipos a TEAMS para que el motor matemático los lea
  arrayDatos.forEach(match => {
    [match.local, match.visitante].forEach(t => {
      if (!TEAMS[t.equipo]) {
        const pj = 15, g = 6, e = 4, p = 5, gf = 18, gc = 15;
        TEAMS[t.equipo] = {
          league: t.liga || match.torneo || "Progol", 
          position: t.posicion_actual || t.posicion || 10, 
          played: pj, won: g, drawn: e, lost: p, goalsFor: gf, goalsAgainst: gc,
          homeWon: 4, homeDrawn: 2, homeLost: 1, awayWon: 2, awayDrawn: 2, awayLost: 4,
          lastFive: ['W','D','L','W','D'],
          xGFor: +(gf/pj * 0.93).toFixed(2), xGAgainst: +(gc/pj * 0.93).toFixed(2),
          shotsPerMatch: 11.5, shotsOnTargetPerMatch: 4.0, recentMatchDates: [0, 7, 14, 21, 28], cleanSheets: 4,
        };
      }
      TEAMS[t.equipo].progolData = t; 
    });
  });

  // Renderizar las tarjetas visuales
  const grid = document.getElementById(containerId);
  if (grid) {
    grid.innerHTML = arrayDatos.map(p => `
      <div class="progol-card" onclick="loadProgolMatch('${p.local.equipo}', '${p.visitante.equipo}')">
        <div class="progol-meta">Casillero ${p.casillero} • ${p.torneo}</div>
        <div class="progol-matchup"><span class="home">${p.local.equipo}</span><span class="vs-text">VS</span><span class="away">${p.visitante.equipo}</span></div>
        <div class="progol-stats-mini">🧠 <strong>Pronóstico:</strong> ${p.pronostico_estadistico}</div>
      </div>`).join('');
  }
}

window.loadProgolMatch = function(homeTeam, awayTeam) {
  leagueFilter.value = "";
  leagueFilter.dispatchEvent(new Event('change'));

  homeSelect.value = homeTeam; 
  awaySelect.value = awayTeam; 
  runPrediction();
};