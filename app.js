const STORAGE_KEY = "past-lifes-save-v1";

const scenarios = [
  {
    era: "Late Bronze Age",
    place: "Aegean coast",
    class: "fisher family's youngest child",
    upbringing: "raised by storytellers and sailors",
    opening:
      "Storms have swallowed trade ships for weeks. Your village asks you to choose whether to chase rumor, safety, or profit.",
    mood: "Sea winds and whispered myths",
    emoji: "🌊",
  },
  {
    era: "Ming-era China",
    place: "river market town",
    class: "ink-maker apprentice",
    upbringing: "disciplined under strict mentors",
    opening:
      "A magistrate's clerk offers extra pay for records that might hide someone's debt. Your workshop depends on your decision.",
    mood: "Lanterns over ledger books",
    emoji: "🏮",
  },
  {
    era: "Industrial Revolution",
    place: "smoky textile city",
    class: "mill mechanic",
    upbringing: "self-taught among laborers",
    opening:
      "A machine fault can be reported, sold, or weaponized during a worker strike. Every option could shape the city.",
    mood: "Steam, soot, and ambition",
    emoji: "⚙️",
  },
  {
    era: "1920s Harlem",
    place: "jazz district",
    class: "club assistant",
    upbringing: "nurtured by artists and hustlers",
    opening:
      "A poet asks for your help publishing risky work while a producer offers you a comfortable contract.",
    mood: "Bright brass and bold nights",
    emoji: "🎷",
  },
  {
    era: "Near-future orbital colony",
    place: "ring habitat station",
    class: "food-systems technician",
    upbringing: "trained in communal survival",
    opening:
      "An oxygen leak report was buried to avoid panic. You can expose it, patch quietly, or negotiate leverage.",
    mood: "Neon dawn over recycled skies",
    emoji: "🛰️",
  },
];

const actionPool = [
  {
    label: "Gather stories from strangers before deciding.",
    effect: { curiosity: 2, compassion: 1, clue: 6 },
    log: "You listened deeply and found hidden patterns.",
  },
  {
    label: "Take the practical path and secure resources first.",
    effect: { discipline: 2, ambition: 1, clue: 4 },
    log: "You chose stability and built leverage.",
  },
  {
    label: "Defy expectations and attempt a risky breakthrough.",
    effect: { creativity: 2, resilience: 1, health: -8, clue: 7 },
    log: "You gambled boldly and changed the narrative.",
  },
  {
    label: "Protect vulnerable people even if it costs you status.",
    effect: { compassion: 2, resilience: 1, ambition: -1, clue: 5 },
    log: "You chose people over prestige.",
  },
  {
    label: "Trade favors in the shadows for long-term advantage.",
    effect: { cunning: 2, ambition: 1, compassion: -1, clue: 5 },
    log: "You used quiet influence to shape events.",
  },
  {
    label: "Commit to relentless routine and master your craft.",
    effect: { discipline: 2, resilience: 1, creativity: -1, clue: 4 },
    log: "Your consistency turned into power.",
  },
  {
    label: "Rally your community around a shared vision.",
    effect: { compassion: 1, ambition: 1, creativity: 1, clue: 6 },
    log: "People moved because you made them believe.",
  },
  {
    label: "Investigate forbidden records despite the danger.",
    effect: { curiosity: 2, cunning: 1, health: -6, clue: 8 },
    log: "Truth came at a personal cost.",
  },
];

const identities = {
  curiosity: [
    "a forgotten cartographer whose maps helped refugees find safe passage",
    "a multilingual archivist who preserved stories erased by conquerors",
  ],
  compassion: [
    "a village healer remembered for easing famine and fear",
    "an underground teacher who built schools where none existed",
  ],
  ambition: [
    "a city founder who reshaped trade routes through relentless planning",
    "a reformist minister who forced corrupt elites to answer publicly",
  ],
  discipline: [
    "a master artisan whose techniques survived for centuries",
    "a military logistician who saved thousands through planning alone",
  ],
  resilience: [
    "a strike leader who endured prison and still won safer conditions",
    "an expedition survivor who turned hardship into communal law",
  ],
  cunning: [
    "an intelligence broker who prevented a war with carefully timed secrets",
    "a negotiator who played rival courts into a stable peace",
  ],
  creativity: [
    "a composer whose work revived hope in a fractured era",
    "a playwright who challenged power through satire and wit",
  ],
};

const baseState = () => ({
  scenario: structuredClone(scenarios[Math.floor(Math.random() * scenarios.length)]),
  turn: 1,
  maxTurns: 12,
  health: 100,
  clue: 0,
  echoes: 0,
  lifetimeEchoes: 0,
  pity: 0,
  over: false,
  discoveredIdentity: "",
  chronicle: ["Your memory fractures open. A new lifetime begins."],
  stats: {
    curiosity: 0,
    compassion: 0,
    ambition: 0,
    discipline: 0,
    resilience: 0,
    cunning: 0,
    creativity: 0,
  },
});

let state = baseState();

const el = {
  statusGrid: document.getElementById("statusGrid"),
  sceneImage: document.getElementById("sceneImage"),
  sceneKicker: document.getElementById("sceneKicker"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneText: document.getElementById("sceneText"),
  choices: document.getElementById("choices"),
  chronicle: document.getElementById("chronicle"),
  endScreen: document.getElementById("endScreen"),
  endTitle: document.getElementById("endTitle"),
  endSummary: document.getElementById("endSummary"),
  identityCard: document.getElementById("identityCard"),
};

function randomChoices() {
  return [...actionPool].sort(() => Math.random() - 0.5).slice(0, 3);
}

function statLeader() {
  return Object.entries(state.stats).sort((a, b) => b[1] - a[1])[0][0];
}

function reinforcementReward() {
  const chance = Math.min(0.22 + state.pity * 0.08, 0.55);
  if (Math.random() < chance) {
    const reward = Math.ceil(Math.random() * 5) + 1;
    state.echoes += reward;
    state.lifetimeEchoes += reward;
    state.pity = 0;
    state.clue += 4;
    state.chronicle.push(
      `Random reinforcement: you gained ${reward} Echo Shards from a sudden memory flash.`
    );
  } else {
    state.pity += 1;
  }
}

function renderImage() {
  const { emoji, era, place } = state.scenario;
  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='460' height='280'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#4e3d91'/>
        <stop offset='100%' stop-color='#192235'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='42%' text-anchor='middle' font-size='72'>${emoji}</text>
    <text x='50%' y='70%' text-anchor='middle' fill='white' font-family='sans-serif' font-size='24'>${era}</text>
    <text x='50%' y='82%' text-anchor='middle' fill='#d2cbff' font-family='sans-serif' font-size='16'>${place}</text>
  </svg>`);
  el.sceneImage.src = `data:image/svg+xml,${svg}`;
}

function renderStatus() {
  const stats = [
    ["Turn", `${state.turn}/${state.maxTurns}`],
    ["Health", state.health],
    ["Identity Clue", state.clue],
    ["Echo Shards", `${state.echoes} (total ${state.lifetimeEchoes})`],
    ["Leading Trait", statLeader()],
  ];
  el.statusGrid.innerHTML = stats
    .map(
      ([k, v]) => `<article class="stat-card"><small>${k}</small><p>${v}</p></article>`
    )
    .join("");
}

function renderScene() {
  const s = state.scenario;
  el.sceneKicker.textContent = `${s.mood} · ${s.upbringing}`;
  el.sceneTitle.textContent = `${s.era} — ${s.class}`;
  el.sceneText.textContent = s.opening;
  renderImage();
}

function renderChoices() {
  if (state.over) {
    el.choices.innerHTML = "";
    return;
  }
  const options = randomChoices();
  el.choices.innerHTML = "";
  options.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    btn.onclick = () => applyChoice(choice);
    el.choices.appendChild(btn);
  });
}

function renderChronicle() {
  el.chronicle.innerHTML = state.chronicle
    .slice()
    .reverse()
    .slice(0, 12)
    .map((entry) => `<li>${entry}</li>`)
    .join("");
}

function resolveEnding(reason) {
  state.over = true;
  const mainTrait = statLeader();
  const picks = identities[mainTrait];
  const identity = picks[Math.floor(Math.random() * picks.length)];
  state.discoveredIdentity = identity;
  el.endScreen.classList.remove("hidden");
  el.endTitle.textContent = reason === "death" ? "This life fades..." : "Identity Unlocked";
  el.endSummary.textContent =
    reason === "death"
      ? "Your body failed before your search ended, but memory gave you one final truth."
      : "Your choices aligned and memory crystallized into a clear past self.";
  el.identityCard.innerHTML = `<h3>You once were...</h3>
    <p><strong>${identity.charAt(0).toUpperCase() + identity.slice(1)}.</strong></p>
    <p>Your defining trait in this run was <em>${mainTrait}</em>, supported by ${state.echoes} Echo Shards and a clue score of ${state.clue}.</p>
    <p>You may continue your trans-lifetime search with your total shards intact, or begin from silence.</p>`;
}

function applyChoice(choice) {
  if (state.over) return;
  Object.entries(choice.effect).forEach(([key, value]) => {
    if (key in state.stats) state.stats[key] += value;
    else state[key] += value;
  });
  state.turn += 1;
  state.health = Math.max(0, Math.min(100, state.health));
  state.clue = Math.max(0, state.clue);
  state.chronicle.push(choice.log);
  reinforcementReward();

  if (state.health <= 0) {
    resolveEnding("death");
  } else if (state.clue >= 70 || state.turn > state.maxTurns) {
    resolveEnding("discovery");
  }
  refresh();
}

function refresh() {
  renderStatus();
  renderScene();
  renderChoices();
  renderChronicle();
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  state.chronicle.push("Game saved to memory archive.");
  refresh();
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.chronicle.push("No save found in the archive.");
    return refresh();
  }
  state = JSON.parse(raw);
  state.chronicle.push("Save loaded. The thread reconnects.");
  refresh();
}

function startNewGame(resetMeta = false) {
  const carriedEchoes = resetMeta ? 0 : state.lifetimeEchoes;
  state = baseState();
  state.lifetimeEchoes = carriedEchoes;
  el.endScreen.classList.add("hidden");
  refresh();
}

document.getElementById("saveBtn").onclick = saveGame;
document.getElementById("loadBtn").onclick = loadGame;
document.getElementById("restartBtn").onclick = () => startNewGame(false);
document.getElementById("newGameBtn").onclick = () => startNewGame(false);
document.getElementById("continueRunBtn").onclick = () => {
  const carried = state.lifetimeEchoes;
  startNewGame(false);
  state.lifetimeEchoes = carried;
  state.chronicle.unshift("You carry your Echo Shards into another life.");
  refresh();
};
document.getElementById("resetBtn").onclick = () => {
  localStorage.removeItem(STORAGE_KEY);
  startNewGame(true);
};

refresh();
