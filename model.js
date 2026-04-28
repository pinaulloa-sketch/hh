const DEFAULT_WEIGHTS = { form: 0.28, attack: 0.18, defense: 0.16, home: 0.14, h2h: 0.12, position: 0.08, fatigue: 0.04 };

function calcFormScore(team) {
  const weights = [0.10, 0.15, 0.20, 0.25, 0.30], values = { W: 1.0, D: 0.4, L: 0.0 }; let score = 0;
  team.lastFive.forEach((r, i) => { score += values[r] * weights[i]; }); return score;
}

function calcAttackScore(team) { 
    return Math.min(((team.goalsFor / team.played) * 0.5 + (team.xGFor || (team.goalsFor / team.played)) * 0.35 + ((team.shotsOnTargetPerMatch || 5) / 10) * 0.15) / 3.5, 1); 
}

function calcDefenseScore(team) { 
    return Math.max(0, 1 - (((team.goalsAgainst / team.played) * 0.55 + (team.xGAgainst || (team.goalsAgainst / team.played)) * 0.45) / 3.5)); 
}

function calcHomeScore(team, isHome) { 
    if (!isHome) return 0.25; 
    const homeMatches = team.homeWon + team.homeDrawn + team.homeLost; 
    return 0.35 + (homeMatches > 0 ? (team.homeWon + team.homeDrawn * 0.5) / homeMatches : 0.5) * 0.65; 
}

// VERSIÓN CORREGIDA: A prueba de fallos si H2H no está definido
function calcH2HScore(homeTeam, awayTeam, forHome) {
  const baseH2H = (typeof H2H !== 'undefined') ? H2H : {};
  let entry = baseH2H[`${homeTeam}_${awayTeam}`] || baseH2H[`${awayTeam}_${homeTeam}`];
  
  if (!entry) return 0.5; 
  
  let [hw, d, aw] = entry; 
  if (baseH2H[`${awayTeam}_${homeTeam}`] && !baseH2H[`${homeTeam}_${awayTeam}`]) [hw, aw] = [aw, hw];
  
  const total = hw + d + aw; 
  return total === 0 ? 0.5 : (forHome ? (hw + d * 0.4) / total : (aw + d * 0.4) / total);
}

function calcPositionScore(team) { 
    return Math.max(0, 1 - (team.position - 1) / 19); 
}

function calcFatigueScore(team) {
  const dates = team.recentMatchDates || [0,7,14,21,28], gaps = [];
  for (let i = 1; i < dates.length; i++) gaps.push(dates[i] - dates[i-1]);
  return Math.max(0, Math.min(1, (8 - (gaps.reduce((a,b) => a+b, 0) / gaps.length)) / 8));
}

function predictMatch(homeTeamName, awayTeamName, weights = DEFAULT_WEIGHTS) {
  const home = TEAMS[homeTeamName], away = TEAMS[awayTeamName];
  if (!home || !away) throw new Error("Team not found in dataset");

  const c = {
    hForm: calcFormScore(home), aForm: calcFormScore(away),
    hAttack: calcAttackScore(home), aAttack: calcAttackScore(away),
    hDefense: calcDefenseScore(home), aDefense: calcDefenseScore(away),
    hHome: calcHomeScore(home, true), aHome: calcHomeScore(away, false),
    hH2H: calcH2HScore(homeTeamName, awayTeamName, true), aH2H: calcH2HScore(homeTeamName, awayTeamName, false),
    hPos: calcPositionScore(home), aPos: calcPositionScore(away),
    hFatigue: calcFatigueScore(home), aFatigue: calcFatigueScore(away)
  };

  const hScore = weights.form*c.hForm + weights.attack*c.hAttack + weights.defense*c.hDefense + weights.home*c.hHome + weights.h2h*c.hH2H + weights.position*c.hPos - weights.fatigue*c.hFatigue;
  const aScore = weights.form*c.aForm + weights.attack*c.aAttack + weights.defense*c.aDefense + weights.home*c.aHome + weights.h2h*c.aH2H + weights.position*c.aPos - weights.fatigue*c.aFatigue;

  const k = 6, expH = Math.exp(k * hScore), expA = Math.exp(k * aScore), sum = expH + expA;
  const rawHome = expH / sum, rawAway = expA / sum, diff = Math.abs(hScore - aScore);
  const drawBump = 0.35 * Math.exp(-12 * diff * diff);

  let homeWin = rawHome * (1 - drawBump), awayWin = rawAway * (1 - drawBump), draw = drawBump;
  const total = homeWin + draw + awayWin; homeWin /= total; draw /= total; awayWin /= total;
  const leading = Math.max(homeWin, awayWin), confidence = leading > 0.60 ? "High" : leading > 0.48 ? "Medium" : "Low";

  return {
    homeWin: +(homeWin * 100).toFixed(1), draw: +(draw * 100).toFixed(1), awayWin: +(awayWin * 100).toFixed(1),
    confidence, factors: buildFactors(homeTeamName, awayTeamName, c, { homeWin, draw, awayWin }),
    rawScores: { home: +hScore.toFixed(4), away: +aScore.toFixed(4) },
    components: { home: { form: c.hForm, attack: c.hAttack, defense: c.hDefense, homeAdv: c.hHome, h2h: c.hH2H, position: c.hPos, fatigue: c.hFatigue }, away: { form: c.aForm, attack: c.aAttack, defense: c.aDefense, homeAdv: c.aHome, h2h: c.aH2H, position: c.aPos, fatigue: c.aFatigue } }
  };
}

function buildFactors(hName, aName, c, probs) {
  const msgs = [], formDiff = c.hForm - c.aForm;
  if (Math.abs(formDiff) > 0.1) msgs.push(`📈 <strong>${formDiff > 0 ? hName : aName}</strong> has ${Math.abs(formDiff) > 0.25 ? "significantly better" : "better"} recent form.`);
  else msgs.push(`📊 Both teams show <strong>similar recent form</strong>.`);
  msgs.push(`🏟️ <strong>${hName}</strong> enjoys home advantage.`);
  const hAttDef = c.hAttack - (1 - c.aDefense), aAttDef = c.aAttack - (1 - c.hDefense);
  if (hAttDef > aAttDef + 0.05) msgs.push(`⚽ <strong>${hName}'s</strong> attack outperforms <strong>${aName}'s</strong> defense.`);
  else if (aAttDef > hAttDef + 0.05) msgs.push(`⚽ <strong>${aName}'s</strong> attack poses a significant threat to <strong>${hName}</strong>.`);
  if (Math.abs(c.hH2H - c.aH2H) > 0.15) msgs.push(`📜 Historically, <strong>${c.hH2H > c.aH2H ? hName : aName}</strong> dominates this matchup.`);
  if (c.hFatigue > 0.6 || c.aFatigue > 0.6) msgs.push(`😓 <strong>${c.hFatigue > c.aFatigue ? hName : aName}</strong> may be affected by fatigue.`);
  if (probs.draw > 0.30) msgs.push(`🤝 A <strong>draw</strong> is a real possibility.`);
  return msgs;
}