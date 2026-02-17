const STORAGE_KEY = "past-lifes-save-v2";
const TUTORIAL_KEY = "past-lifes-tutorial-seen-v1";

const scenarios = [
  {
    id: "aegean",
    era: "Late Bronze Age",
    place: "Aegean coast",
    class: "fisher family's youngest child",
    upbringing: "raised by storytellers and sailors",
    opening:
      "The sea has gone strange: bronze helmets wash ashore at dawn, and each evening the elders gather to argue whether war, gods, or greed has shifted the tides. Tonight they ask you to choose the village's next move.",
    mood: "Sea winds and whispered myths",
    emoji: "🌊",
  },
  {
    id: "ming",
    era: "Ming-era China",
    place: "river market town",
    class: "ink-maker apprentice",
    upbringing: "disciplined under strict mentors",
    opening:
      "A fire in the records hall has made old debts vanish. Traders celebrate, officials panic, and your master quietly asks whether truth, profit, or survival should guide your hands.",
    mood: "Lanterns over ledger books",
    emoji: "🏮",
  },
  {
    id: "industrial",
    era: "Industrial Revolution",
    place: "smoky textile city",
    class: "mill mechanic",
    upbringing: "self-taught among laborers",
    opening:
      "The looms scream louder every week and workers cough blood by candlelight. A defect in the main drive shaft could ruin the owners, save the workers, or enrich you if sold discreetly.",
    mood: "Steam, soot, and ambition",
    emoji: "⚙️",
  },
  {
    id: "harlem",
    era: "1920s Harlem",
    place: "jazz district",
    class: "club assistant",
    upbringing: "nurtured by artists and hustlers",
    opening:
      "After midnight, a singer leaves you a notebook full of forbidden verses. By sunrise, a promoter offers money for silence and a columnist offers fame for betrayal.",
    mood: "Bright brass and bold nights",
    emoji: "🎷",
  },
  {
    id: "orbital",
    era: "Near-future orbital colony",
    place: "ring habitat station",
    class: "food-systems technician",
    upbringing: "trained in communal survival",
    opening:
      "Hydroponic towers are failing in secret and command is hiding ration forecasts. If panic starts, people die. If truth spreads, power shifts. You are unexpectedly in the middle.",
    mood: "Neon dawn over recycled skies",
    emoji: "🛰️",
  },
];

const actions = [
  {
    id: "listen",
    tags: ["curiosity", "compassion"],
    label: "Hold a listening circle and gather perspectives before acting.",
    effect: { curiosity: 2, compassion: 1, clue: 5 },
    beat: "You sat with dockhands, widows, and merchants; in their contradictions, a deeper truth appeared.",
  },
  {
    id: "stabilize",
    tags: ["discipline", "ambition"],
    label: "Secure supplies and structure first, then decide policy.",
    effect: { discipline: 2, ambition: 1, clue: 4 },
    beat: "You imposed order quickly. People grumbled, but chaos eased.",
  },
  {
    id: "risk",
    tags: ["creativity", "resilience"],
    label: "Attempt a risky breakthrough others are too afraid to try.",
    effect: { creativity: 2, resilience: 1, health: -8, clue: 8 },
    beat: "The gamble nearly broke you, but it cracked open a hidden path.",
  },
  {
    id: "protect",
    tags: ["compassion", "resilience"],
    label: "Shield vulnerable people even if it damages your status.",
    effect: { compassion: 2, resilience: 1, ambition: -1, clue: 5 },
    beat: "You stood between power and the powerless, and people remembered.",
  },
  {
    id: "scheme",
    tags: ["cunning", "ambition"],
    label: "Trade influence quietly to steer events from the shadows.",
    effect: { cunning: 2, ambition: 1, compassion: -1, clue: 5 },
    beat: "Doors opened where none existed yesterday; your name stayed off the record.",
  },
  {
    id: "mastery",
    tags: ["discipline", "resilience"],
    label: "Commit to routine and sharpen your craft relentlessly.",
    effect: { discipline: 2, resilience: 1, creativity: -1, clue: 4 },
    beat: "In repetition, you became dependable, then indispensable.",
  },
  {
    id: "rally",
    tags: ["creativity", "compassion"],
    label: "Rally your community around a bold shared vision.",
    effect: { compassion: 1, ambition: 1, creativity: 1, clue: 6 },
    beat: "Your words turned fear into motion and strangers into allies.",
  },
  {
    id: "forbidden",
    tags: ["curiosity", "cunning"],
    label: "Investigate forbidden records despite personal risk.",
    effect: { curiosity: 2, cunning: 1, health: -6, clue: 7 },
    beat: "By candlelight and coded ledgers, you uncovered what was meant to stay buried.",
  },
  {
    id: "confess",
    tags: ["compassion", "discipline"],
    label: "Confess a hard truth publicly and accept the fallout.",
    effect: { compassion: 1, discipline: 1, health: -4, clue: 6 },
    beat: "The room froze, then fractured. You lost comfort and gained clarity.",
  },
  {
    id: "invent",
    tags: ["creativity", "curiosity"],
    label: "Prototype an unusual idea to solve today's crisis.",
    effect: { creativity: 2, curiosity: 1, clue: 6 },
    beat: "It was messy and imperfect, but it worked when it mattered.",
  },
];

const identityProfiles = {
  curiosity: [
    {
      name: "Ilyas Maren",
      dob: "Born 1168 CE",
      era: "High Medieval caravan age",
      life: "A mapmaker who charted dangerous inland crossings and secretly marked safe wells for displaced families.",
      likes: "Star catalogs, river songs, and collecting foreign proverbs.",
      good: "His atlas later guided thousands through famine years.",
      bad: "A governor accused him of aiding smugglers; his workshop was burned.",
      regret: "He regretted never returning home to reconcile with his brother.",
    },
  ],
  compassion: [
    {
      name: "Amara Tesfaye",
      dob: "Born 1842",
      era: "Late imperial trade expansion",
      life: "A healer and organizer who turned abandoned shrines into relief kitchens during crop failure.",
      likes: "Medicinal herbs, lullabies, and writing letters for people who could not write.",
      good: "She built a volunteer network that reduced winter deaths.",
      bad: "Officials blamed her for unrest and exiled her from her district.",
      regret: "She wished she had documented her remedies more carefully for future apprentices.",
    },
  ],
  ambition: [
    {
      name: "Tobias Kline",
      dob: "Born 1699",
      era: "Early mercantile city-states",
      life: "A relentless civic planner who redesigned ports and transformed a declining harbor into a regional power.",
      likes: "Mechanical clocks, contract games, and architectural sketches.",
      good: "His canal reforms created jobs and stabilized food imports.",
      bad: "He crushed a workers' strike and carried that guilt privately for years.",
      regret: "He wished he had shared power sooner with the very people who built his success.",
    },
  ],
  discipline: [
    {
      name: "Sora Nishimura",
      dob: "Born 1911",
      era: "Interwar industrial modernization",
      life: "A precision instrument artisan whose quality standards became national benchmarks.",
      likes: "Tea at dawn, steel calipers, and handwritten routines.",
      good: "Her methods prevented catastrophic factory failures during wartime shortages.",
      bad: "She drove herself into illness and lost years to exhaustion.",
      regret: "She wished she had allowed herself a family life beyond her workshop.",
    },
  ],
  resilience: [
    {
      name: "Mateo Ruiz",
      dob: "Born 1876",
      era: "Railroad frontier expansion",
      life: "A rail crew foreman who survived repeated disasters and became a labor safety advocate.",
      likes: "Boxing drills, bitter coffee, and repairing broken tools for younger workers.",
      good: "He led the campaign that won mandatory brake inspections.",
      bad: "He spent months blacklisted and nearly lost his home.",
      regret: "He regretted not writing to his daughter during his longest strike.",
    },
  ],
  cunning: [
    {
      name: "Nadia Volkov",
      dob: "Born 1735",
      era: "Age of rival courts",
      life: "A code broker and negotiator who traded secrets to prevent border wars.",
      likes: "Cipher puzzles, winter theater, and observing people at diplomatic dinners.",
      good: "She orchestrated a prisoner exchange that prevented escalation.",
      bad: "Friends questioned her loyalty, and isolation shadowed her later life.",
      regret: "She wished she'd trusted someone enough to tell the full truth.",
    },
  ],
  creativity: [
    {
      name: "Elias Monroe",
      dob: "Born 1898",
      era: "Jazz age social upheaval",
      life: "A composer-journalist whose satirical revues challenged corrupt officials and lifted public morale.",
      likes: "Upright piano jams, midnight printing presses, and street photography.",
      good: "His touring show funded legal defense for censored artists.",
      bad: "He was repeatedly censored and briefly jailed for sedition.",
      regret: "He wished he had spent less time chasing applause and more preserving his manuscripts.",
    },
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
  storyBeat:
    "Your first instinct stirs as the world watches. Choose carefully—this lifetime is already reacting to you.",
  previousChoices: [],
  discoveredIdentity: "",
  chronicle: ["Your memory fractures open. A new lifetime begins."],
  shownTutorial: JSON.parse(localStorage.getItem(TUTORIAL_KEY) || "false"),
  tipsSeen: {},
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
  storyBeat: document.getElementById("storyBeat"),
  choices: document.getElementById("choices"),
  chronicle: document.getElementById("chronicle"),
  endScreen: document.getElementById("endScreen"),
  endTitle: document.getElementById("endTitle"),
  endSummary: document.getElementById("endSummary"),
  identityCard: document.getElementById("identityCard"),
  tutorialToast: document.getElementById("tutorialToast"),
  tutorialTitle: document.getElementById("tutorialTitle"),
  tutorialText: document.getElementById("tutorialText"),
  tutorialDismiss: document.getElementById("tutorialDismiss"),
};

function statLeader() {
  return Object.entries(state.stats).sort((a, b) => b[1] - a[1])[0][0];
}

function storyForChoice(choice, rewardHit) {
  const transition = rewardHit
    ? "A sudden flash of memory interrupts the moment."
    : "The consequences settle in as people around you adapt.";
  return `${choice.beat} ${transition}`;
}

function chooseActions() {
  const lead = statLeader();
  const recent = new Set(state.previousChoices.slice(-4));
  const preferred = actions.filter(
    (a) => a.tags.includes(lead) && !recent.has(a.id)
  );
  const fallback = actions.filter((a) => !recent.has(a.id));
  const pool = [...preferred, ...fallback];
  const picked = [];
  while (pool.length && picked.length < 3) {
    const ix = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(ix, 1)[0]);
  }
  return picked;
}

function reinforcementReward() {
  const chance = Math.min(0.22 + state.pity * 0.08, 0.58);
  if (Math.random() < chance) {
    const reward = Math.ceil(Math.random() * 5) + 1;
    state.echoes += reward;
    state.lifetimeEchoes += reward;
    state.pity = 0;
    state.clue += 4;
    state.chronicle.push(`Random reinforcement: +${reward} Echo Shards.`);
    maybeShowTip("echo", "Echo Shards", "Echo Shards are unpredictable rewards. Keep making choices to trigger more memory flashes.");
    return true;
  }
  state.pity += 1;
  return false;
}

function renderImage() {
  const { emoji, era, place } = state.scenario;
  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='460' height='280'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#6a48b0'/>
        <stop offset='100%' stop-color='#131d30'/>
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
    .map(([k, v]) => `<article class="stat-card"><small>${k}</small><p>${v}</p></article>`)
    .join("");
}

function renderScene() {
  const s = state.scenario;
  el.sceneKicker.textContent = `${s.mood} · ${s.upbringing}`;
  el.sceneTitle.textContent = `${s.era} — ${s.class}`;
  el.sceneText.textContent = s.opening;
  renderImage();
}

function renderStoryBeat() {
  el.storyBeat.innerHTML = `<h3>What just happened</h3><p>${state.storyBeat}</p>`;
}

function renderChoices() {
  if (state.over) {
    el.choices.innerHTML = "";
    return;
  }
  const options = chooseActions();
  el.choices.innerHTML = "<h3>What will you do next?</h3>";
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
  const trait = statLeader();
  const profile = identityProfiles[trait][0];
  state.discoveredIdentity = `${profile.name} (${trait})`;
  el.endScreen.classList.remove("hidden");
  el.endTitle.textContent = reason === "death" ? "This life fades..." : "Identity Unlocked";
  el.endSummary.textContent =
    reason === "death"
      ? "You did not survive this lifetime, but your final memories still reveal who you were."
      : "Your choices cohered into a distinct former identity.";
  el.identityCard.innerHTML = `
    <h3>${profile.name}</h3>
    <p><strong>${profile.dob}</strong> · <strong>${profile.era}</strong></p>
    <p><em>Defining trait:</em> ${trait}</p>
    <p>${profile.life}</p>
    <p><strong>They loved:</strong> ${profile.likes}</p>
    <p><strong>A bright chapter:</strong> ${profile.good}</p>
    <p><strong>A hard chapter:</strong> ${profile.bad}</p>
    <p><strong>Regret carried forward:</strong> ${profile.regret}</p>
    <p>In this run, your clue score (${state.clue}) and Echo Shards (${state.echoes}) aligned with this life pattern.</p>
  `;
}

function applyChoice(choice) {
  if (state.over) return;

  Object.entries(choice.effect).forEach(([key, value]) => {
    if (key in state.stats) state.stats[key] += value;
    else state[key] += value;
  });

  state.previousChoices.push(choice.id);
  state.turn += 1;
  state.health = Math.max(0, Math.min(100, state.health));
  state.clue = Math.max(0, state.clue);

  const rewardHit = reinforcementReward();
  state.storyBeat = storyForChoice(choice, rewardHit);
  state.chronicle.push(choice.beat);

  if (state.clue >= 12) {
    maybeShowTip("clue", "Identity Clue", "Clue points track how close you are to recovering a full past-life identity.");
  }

  if (state.health < 60) {
    maybeShowTip("health", "Health", "Risky choices can reduce Health. If it reaches 0, the life ends early.");
  }

  if (state.health <= 0) {
    resolveEnding("death");
  } else if (state.clue >= 70 || state.turn > state.maxTurns) {
    resolveEnding("discovery");
  }

  refresh();
}

function maybeShowTip(key, title, text) {
  if (state.shownTutorial || state.tipsSeen[key]) return;
  state.tipsSeen[key] = true;
  el.tutorialTitle.textContent = title;
  el.tutorialText.textContent = text;
  el.tutorialToast.classList.remove("hidden");
}

function dismissTip() {
  el.tutorialToast.classList.add("hidden");
  const sawAny = Object.keys(state.tipsSeen).length > 0;
  if (sawAny) {
    state.shownTutorial = true;
    localStorage.setItem(TUTORIAL_KEY, "true");
  }
}

function refresh() {
  renderStatus();
  renderScene();
  renderStoryBeat();
  renderChoices();
  renderChronicle();
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  state.chronicle.push("Game saved to memory archive.");
  maybeShowTip("save", "Save System", "You can load this run later from the Load Game button.");
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
  localStorage.removeItem(TUTORIAL_KEY);
  startNewGame(true);
};
el.tutorialDismiss.onclick = dismissTip;

if (!state.shownTutorial) {
  maybeShowTip("intro", "Welcome to Past Lifes", "Top cards show your progress. Pick choices to build your story and reveal a past identity.");
}

refresh();
