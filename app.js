const STORAGE_KEY = "past-lifes-save-v4";
const TUTORIAL_KEY = "past-lifes-tutorial-seen-v1";

const scenarios = [
  {
    id: "swiss-ww2",
    era: "Switzerland, 1942",
    place: "Village near the German border",
    role: "Dairy farmer and militia reservist",
    upbringing: "Raised in a strict Catholic valley family",
    emoji: "🇨🇭",
    mood: "Neutral country, dangerous secrets",
    opening:
      "You are Jakob Meier, a farmer balancing ration quotas, border patrol duty, and a failing marriage. One freezing night, you return early from the barns and see your wife Elise embracing Oberleutnant Otto Keller, a German officer assigned to cross-border coordination. In wartime neutrality, one accusation can destroy a family, expose a smuggling ring, or start an international incident.",
    startNode: "discover-affair",
    nodes: {
      "discover-affair": {
        title: "December 1942 — The Barn Door",
        text: "You watch from the shadows as Elise hands Keller a leather notebook. He kisses her, then leaves through the orchard path. The notebook looks like your old ration ledger.",
        choices: [
          {
            text: "Report Keller to Swiss command for compromising neutrality.",
            consequence:
              "At dawn, you file a formal complaint. The captain warns you Keller has friends in Bern and tells you to produce proof within 72 hours.",
            effects: { discipline: 2, ambition: 1, clue: 8 },
            next: "report-fallout",
          },
          {
            text: "Quietly gather evidence before accusing anyone.",
            consequence:
              "You say nothing publicly. Instead, you track hoofprints, hidden letters, and grain shipments that do not match village records.",
            effects: { curiosity: 2, cunning: 1, clue: 9 },
            next: "evidence-trail",
          },
          {
            text: "Confront Elise tonight and demand the truth.",
            consequence:
              "Elise denies the affair, then hisses that Keller can have you arrested as a smuggler by morning if you keep pushing.",
            effects: { compassion: 1, resilience: 1, clue: 7 },
            next: "elise-threat",
          },
        ],
      },
      "report-fallout": {
        title: "72 Hours Later — Command Office",
        text: "Your captain privately admits he suspects Keller is buying Swiss dairy to feed German intelligence outposts. If you fail now, your accusation will be filed as slander.",
        choices: [
          {
            text: "Ask the village priest to witness Keller's meetings and testify.",
            consequence:
              "The priest agrees, but insists you protect refugee families he has been hiding in church cellars.",
            effects: { compassion: 2, discipline: 1, clue: 8 },
            next: "priest-alliance",
          },
          {
            text: "Leak the story to a Zurich journalist to force a public inquiry.",
            consequence:
              "The article sparks outrage, but you are labeled reckless for risking Switzerland's fragile neutrality.",
            effects: { ambition: 2, creativity: 1, health: -5, clue: 8 },
            next: "public-inquiry",
          },
          {
            text: "Meet Keller privately and blackmail him into leaving Elise and the village.",
            consequence:
              "Keller smirks, offers money, and says he can make your debt disappear if you keep quiet.",
            effects: { cunning: 2, ambition: 1, clue: 6 },
            next: "keller-deal",
          },
        ],
      },
      "evidence-trail": {
        title: "January 1943 — Ledger Room",
        text: "You discover altered invoices proving butter shipments were rerouted to covert military buyers. The same routes are being used to move Jewish refugees across mountain passes.",
        choices: [
          {
            text: "Turn the ledger over to command and protect state order first.",
            consequence:
              "Authorities raid the route, catching Keller's couriers but also endangering refugee families mid-crossing.",
            effects: { discipline: 2, ambition: 1, compassion: -1, clue: 8 },
            next: "order-first",
          },
          {
            text: "Give the ledger to resistance couriers and help move families safely.",
            consequence:
              "You spend ten nights guiding carts through snow to reroute people before the crackdown begins.",
            effects: { compassion: 2, resilience: 1, health: -8, clue: 10 },
            next: "resistance-route",
          },
          {
            text: "Confront Elise with the ledger and ask her to choose you or Keller.",
            consequence:
              "She breaks down and admits she was coerced after Keller threatened your younger brother at the border post.",
            effects: { compassion: 2, curiosity: 1, clue: 8 },
            next: "elise-confession",
          },
        ],
      },
      "elise-threat": {
        title: "Same Night — Kitchen Table",
        text: "Elise says Keller has witnesses ready to accuse you of black-market trading. She claims she met him only to keep you alive.",
        choices: [
          {
            text: "Strike her in anger and throw her out.",
            consequence:
              "You lash out. Neighbors hear screams. By sunrise, military police arrive with forged statements naming you violent and disloyal.",
            effects: { health: -20, resilience: -1, clue: 4 },
            next: "arrested",
          },
          {
            text: "Beg for forgiveness and ask her to help expose Keller together.",
            consequence:
              "Elise agrees on one condition: you must protect the refugee route she has been secretly financing.",
            effects: { compassion: 2, resilience: 1, clue: 8 },
            next: "joint-plot",
          },
          {
            text: "Leave the house and hide at your cousin's mountain cabin.",
            consequence:
              "You vanish for ten days. Keller brands you a fugitive, but the distance gives you time to plan.",
            effects: { resilience: 2, cunning: 1, clue: 7 },
            next: "mountain-hideout",
          },
        ],
      },
      "priest-alliance": {
        title: "Spring 1943 — Church Cellar",
        text: "Testimony and ledgers expose Keller's extortion network. Bern quietly reassigns him to avoid diplomatic embarrassment.",
        endingKey: "swiss-whistleblower",
      },
      "public-inquiry": {
        title: "Spring 1943 — National Press",
        text: "The inquiry confirms corruption but you become a polarizing symbol. Some hail you as brave; others blame you for border tensions.",
        endingKey: "swiss-public-figure",
      },
      "keller-deal": {
        title: "1944 — Paid Silence",
        text: "You take Keller's deal. The farm survives, but the ledger disappears and families on the route are captured within months.",
        endingKey: "swiss-compromised",
      },
      "order-first": {
        title: "1943 — Neutrality Enforced",
        text: "You help authorities dismantle Keller's network, but your report also shutters humanitarian corridors during a brutal winter.",
        endingKey: "swiss-order",
      },
      "resistance-route": {
        title: "1943–1944 — Alpine Crossings",
        text: "Your rerouting efforts help dozens of families survive and later become part of documented Swiss civilian rescue histories.",
        endingKey: "swiss-resistance",
      },
      "elise-confession": {
        title: "1943 — A Marriage Under Siege",
        text: "You and Elise testify together. Keller is removed, but your marriage never recovers from fear and manipulation.",
        endingKey: "swiss-reconciler",
      },
      arrested: {
        title: "1943 — Detention Ward",
        text: "You are jailed on fabricated charges for months. By release, Keller has already vanished and your land is seized.",
        endingKey: "swiss-imprisoned",
      },
      "joint-plot": {
        title: "1943 — Double Testimony",
        text: "Your combined testimony triggers a covert audit. Keller's supply cell collapses, and Elise's role in sheltering refugees is later recognized.",
        endingKey: "swiss-joint",
      },
      "mountain-hideout": {
        title: "1943 — Ten Days Later",
        text: "From the cabin you intercept a courier and recover names linking Keller to wartime smuggling and blackmail.",
        endingKey: "swiss-hunter",
      },
    },
    endings: {
      "swiss-whistleblower": {
        title: "Identity Unlocked",
        summary: "You used testimony and evidence to alter a local wartime power structure.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "discipline",
          life: "A farmer-reservist who exposed a cross-border corruption cell while preserving a civilian refuge network.",
          likes: "Livestock breeding records, church choirs, and alpine trail maps.",
          good: "His case informed stricter oversight of wartime border procurement in his canton.",
          bad: "He lived under constant suspicion of being either pro-German or anti-state.",
          regret: "He regretted waiting so long to involve allies before confronting Keller.",
        },
      },
      "swiss-public-figure": {
        title: "Identity Unlocked",
        summary: "You forced public accountability but paid a personal cost.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "ambition",
          life: "A farmer who made a private scandal a national corruption debate during wartime neutrality.",
          likes: "Editorial pages, dairy auctions, and political debates.",
          good: "Journal archives credit his leak with exposing hidden military supply favoritism.",
          bad: "He was blacklisted from canton contracts for nearly a decade.",
          regret: "He wished he had protected his family better before going public.",
        },
      },
      "swiss-compromised": {
        title: "This life fades...",
        summary: "You survived by compromise, while history moved on without your truth.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "cunning",
          life: "A farmer who chose private security over public justice during a wartime extortion crisis.",
          likes: "Quiet bookkeeping, solo hunting trips, and guarded conversations.",
          good: "He kept the farm solvent through years of rationing.",
          bad: "Families tied to Keller's route suffered after the evidence vanished.",
          regret: "He regretted taking the payoff that silenced him.",
        },
      },
      "swiss-order": {
        title: "Identity Unlocked",
        summary: "You prioritized state control, stabilizing one system while harming another.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "discipline",
          life: "A militia-minded farmer who enforced neutrality policy with strict loyalty to command.",
          likes: "Inspection routines, military drills, and orderly ledgers.",
          good: "He helped dismantle an officer extortion ring.",
          bad: "His report unintentionally closed escape corridors for refugees.",
          regret: "He wished he had planned protections before triggering the raids.",
        },
      },
      "swiss-resistance": {
        title: "Identity Unlocked",
        summary: "Your choices directly preserved lives during wartime displacement.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "compassion",
          life: "A border farmer who redirected transport lines to save refugees during the war's deadliest winters.",
          likes: "Mountain mules, hand-drawn route maps, and oral family histories.",
          good: "Postwar testimony linked him to documented rescue corridors in his region.",
          bad: "He suffered frost injury and permanent nerve pain from repeated night crossings.",
          regret: "He regretted endangering his brother without telling him why.",
        },
      },
      "swiss-reconciler": {
        title: "Identity Unlocked",
        summary: "You chose painful truth and partial repair over revenge.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "compassion",
          life: "A farmer who exposed blackmail through testimony with his wife during a dangerous wartime scandal.",
          likes: "Woodworking, market days, and evening prayers.",
          good: "Their joint testimony ended Keller's local influence.",
          bad: "Trust in the marriage never fully returned.",
          regret: "He wished he had noticed Elise's fear much earlier.",
        },
      },
      "swiss-imprisoned": {
        title: "This life fades...",
        summary: "Violence destroyed your credibility and handed power to your enemy.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "resilience",
          life: "A farmer undone by one violent night during a period of wartime paranoia.",
          likes: "Horse tack repair, valley fairs, and old militia songs.",
          good: "After release he mentored younger workers rebuilding seized farms.",
          bad: "His prison record shadowed every job application.",
          regret: "He regretted raising his hand in anger more than any other decision.",
        },
      },
      "swiss-joint": {
        title: "Identity Unlocked",
        summary: "Alliance under pressure changed the ending of your village's wartime crisis.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "resilience",
          life: "A farmer who rebuilt trust long enough to expose an officer-led smuggling and coercion network.",
          likes: "Apple pressing, fence repair, and mountain hymn festivals.",
          good: "Their testimony prevented further disappearances on the route.",
          bad: "Both were ostracized by parts of the village for years.",
          regret: "He wished he had asked for help before the crisis spiraled.",
        },
      },
      "swiss-hunter": {
        title: "Identity Unlocked",
        summary: "Retreat gave you time to hunt the truth and return with evidence.",
        profile: {
          name: "Jakob Meier",
          dob: "Born 1908",
          era: "World War II Switzerland",
          definingTrait: "curiosity",
          life: "A farmer who used patient surveillance to map a covert wartime courier chain.",
          likes: "Field journals, snow tracking, and mechanical watches.",
          good: "His intercepted courier papers exposed names previously untouchable in canton politics.",
          bad: "Months in hiding nearly bankrupted his household.",
          regret: "He regretted the fear his disappearance caused his younger sister.",
        },
      },
    },
  },
  {
    id: "berlin-wall",
    era: "East Berlin, 1989",
    place: "State radio maintenance depot",
    role: "Broadcast technician",
    upbringing: "Son of loyal party members",
    emoji: "🧱",
    mood: "A city about to split open",
    opening:
      "You are Anja Vogel, a radio technician at a state station in East Berlin. You discover a memo ordering signal disruption during upcoming Monday demonstrations in Leipzig. That same week, thousands gather in what becomes a turning point of the Peaceful Revolution that leads to the Berlin Wall's fall.",
    startNode: "memo-found",
    nodes: {
      "memo-found": {
        title: "October 1989 — Locked Equipment Room",
        text: "The memo specifies frequencies used by churches coordinating peaceful protests. Your supervisor tells you to prepare jammers by Sunday.",
        choices: [
          {
            text: "Obey orders and install jammers.",
            consequence: "You complete the setup overnight, but secretly copy the frequency list.",
            effects: { discipline: 2, clue: 7 },
            next: "jammer-ready",
          },
          {
            text: "Leak the memo to church organizers.",
            consequence: "A pastor receives the warning and shifts communication to backup channels.",
            effects: { compassion: 2, cunning: 1, clue: 9 },
            next: "leak-aftermath",
          },
          {
            text: "Sabotage the jammers so they fail during the protest.",
            consequence: "You swap key tubes and recalibrate output to collapse under load.",
            effects: { creativity: 2, resilience: 1, health: -5, clue: 10 },
            next: "sabotage-risk",
          },
        ],
      },
      "jammer-ready": {
        title: "Two Days Later — Demonstration Night",
        text: "Crowds still coordinate using hand signals and runners. Your copied list could expose a wider crackdown plan.",
        choices: [
          {
            text: "Hand the list to a West German journalist at Checkpoint Charlie.",
            consequence: "Foreign press publishes the plan, making mass arrests politically costly.",
            effects: { ambition: 2, clue: 9 },
            next: "berlin-end-journal",
          },
          {
            text: "Burn the copy and stay invisible.",
            consequence: "You keep your position and survive the chaos, but others carry the risk alone.",
            effects: { cunning: 1, clue: 5 },
            next: "berlin-end-silent",
          },
        ],
      },
      "leak-aftermath": {
        title: "Leipzig Monday Protest",
        text: "Backup channels work; turnout swells. Security units hesitate as numbers grow beyond expected limits.",
        choices: [
          {
            text: "Continue leaks by passing police deployment maps.",
            consequence: "Route changes avoid major clashes and help keep demonstrations nonviolent.",
            effects: { compassion: 2, curiosity: 1, clue: 10 },
            next: "berlin-end-leaker",
          },
          {
            text: "Stop now and protect your family from retaliation.",
            consequence: "You cut ties to contacts and wait out the revolution from home.",
            effects: { resilience: 1, clue: 6 },
            next: "berlin-end-withdraw",
          },
        ],
      },
      "sabotage-risk": {
        title: "Control Room, 9:17 PM",
        text: "The jammers fail exactly when chants grow loud. Security officers suspect internal sabotage and begin interrogations.",
        choices: [
          {
            text: "Confess and claim moral objection to suppressing peaceful protest.",
            consequence: "You are detained, but your statement spreads among workers and adds pressure against violent response.",
            effects: { resilience: 2, compassion: 1, health: -10, clue: 10 },
            next: "berlin-end-confess",
          },
          {
            text: "Frame a corrupt supervisor and escape through transit tunnels.",
            consequence: "You survive by deception and reach West Berlin days before the Wall opens.",
            effects: { cunning: 2, creativity: 1, clue: 8 },
            next: "berlin-end-escape",
          },
        ],
      },
      "berlin-end-journal": {
        title: "Identity Unlocked",
        text: "Your leak fed international pressure in the final month before the Wall opened.",
        endingKey: "berlin-journal",
      },
      "berlin-end-silent": {
        title: "This life fades...",
        text: "History changed around you while you protected only your own safety.",
        endingKey: "berlin-silent",
      },
      "berlin-end-leaker": {
        title: "Identity Unlocked",
        text: "You helped keep demonstrations coordinated and less deadly during a historic transition.",
        endingKey: "berlin-leaker",
      },
      "berlin-end-withdraw": {
        title: "Identity Unlocked",
        text: "You survived by caution, carrying a private role in public change.",
        endingKey: "berlin-withdraw",
      },
      "berlin-end-confess": {
        title: "Identity Unlocked",
        text: "Your confession became a worker-rumor legend of conscience over fear.",
        endingKey: "berlin-confess",
      },
      "berlin-end-escape": {
        title: "Identity Unlocked",
        text: "You reached the other side before the border cracked open for everyone.",
        endingKey: "berlin-escape",
      },
    },
    endings: {
      "berlin-journal": {
        title: "Identity Unlocked",
        summary: "You turned technical access into historical leverage.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "ambition",
          life: "A radio technician whose documentation reached foreign press before the Wall fell.",
          likes: "Circuit diagrams, protest songs on cassette, and tram-window people watching.",
          good: "Her leak constrained state escalation in a critical week.",
          bad: "Former colleagues branded her a traitor for years.",
          regret: "She regretted not warning her brother before surveillance intensified.",
        },
      },
      "berlin-silent": {
        title: "This life fades...",
        summary: "You chose safety over influence.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "cunning",
          life: "A technician who witnessed collapse from inside the system but avoided direct action.",
          likes: "Night shifts, old radios, and quiet apartment dinners.",
          good: "She kept her family fed through uncertain transition months.",
          bad: "She carried guilt over friends detained during protests.",
          regret: "She wished she had done one thing that clearly helped others.",
        },
      },
      "berlin-leaker": {
        title: "Identity Unlocked",
        summary: "Your leaks supported nonviolent civic coordination.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "compassion",
          life: "A technician who quietly supplied protest networks with timing and route intelligence.",
          likes: "Choir rehearsals, technical manuals, and handwritten route maps.",
          good: "Several marches avoided confrontation due to her information.",
          bad: "She lived with continuous informant paranoia.",
          regret: "She regretted losing contact with the pastor who took her first leak.",
        },
      },
      "berlin-withdraw": {
        title: "Identity Unlocked",
        summary: "You balanced fear, family, and partial resistance.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "resilience",
          life: "A technician who made one decisive intervention, then protected loved ones through the transition.",
          likes: "Family chess nights, tram repair forums, and archive photography.",
          good: "Her first warning still helped one major demonstration adapt.",
          bad: "Silence later strained relationships with activist friends.",
          regret: "She wished she had trusted her network longer.",
        },
      },
      "berlin-confess": {
        title: "Identity Unlocked",
        summary: "You accepted punishment to make a public moral stand.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "resilience",
          life: "A state technician who openly refused suppression orders during the revolution's decisive phase.",
          likes: "Worker poetry circles, soldering benches, and documentary screenings.",
          good: "Her detention testimony spread through factories and encouraged defiance.",
          bad: "She lost years of pension eligibility after regime change.",
          regret: "She regretted the fear her mother endured during detention.",
        },
      },
      "berlin-escape": {
        title: "Identity Unlocked",
        summary: "You survived by improvisation and deception.",
        profile: {
          name: "Anja Vogel",
          dob: "Born 1962",
          era: "East Germany, 1989 Peaceful Revolution",
          definingTrait: "creativity",
          life: "A technician who sabotaged state hardware and escaped before reunification began.",
          likes: "Signal puzzles, underground clubs, and experimental theater.",
          good: "Her sabotage gave demonstrators a crucial communication window.",
          bad: "A framed supervisor lost his post and never forgave her.",
          regret: "She regretted not returning sooner to explain what she had done.",
        },
      },
    },
  },
];

function pickScenario(previousRecent = [], avoidScenarioId = "") {
  const unseen = scenarios.filter(
    (scenario) => scenario.id !== avoidScenarioId && !previousRecent.includes(scenario.id)
  );
  const differentFromCurrent = scenarios.filter((scenario) => scenario.id !== avoidScenarioId);
  const eligible = unseen.length ? unseen : differentFromCurrent.length ? differentFromCurrent : scenarios;
  return structuredClone(eligible[Math.floor(Math.random() * eligible.length)]);
}

const baseState = ({
  carriedLifetimeEchoes = 0,
  previousRecent = [],
  avoidScenarioId = "",
  shownTutorial = JSON.parse(localStorage.getItem(TUTORIAL_KEY) || "false"),
} = {}) => {
  const scenario = pickScenario(previousRecent, avoidScenarioId);
  const recentScenarioIds = [scenario.id, ...previousRecent.filter((id) => id !== scenario.id)].slice(
    0,
    Math.max(1, scenarios.length - 1)
  );

  return {
    scenario,
    currentNodeId: scenario.startNode,
    recentScenarioIds,
    turn: 1,
    maxTurns: 8,
    health: 100,
    clue: 0,
    echoes: 0,
    lifetimeEchoes: carriedLifetimeEchoes,
    pity: 0,
    over: false,
    storyBeat: "Your first move will decide who controls the next chapter.",
    discoveredIdentity: "",
    chronicle: ["A memory opens: you step into another real life."],
    shownTutorial,
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
  };
};

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

function currentNode() {
  return state.scenario.nodes[state.currentNodeId];
}

function reinforcementReward() {
  const chance = Math.min(0.2 + state.pity * 0.08, 0.55);
  if (Math.random() < chance) {
    const reward = Math.ceil(Math.random() * 4) + 1;
    state.echoes += reward;
    state.lifetimeEchoes += reward;
    state.pity = 0;
    state.clue += 3;
    state.chronicle.push(`Memory surge: +${reward} Echo Shards.`);
    maybeShowTip("echo", "Echo Shards", "Echo Shards are random reinforcement rewards. They represent sudden memory clarity.");
  } else {
    state.pity += 1;
  }
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
  const node = currentNode();
  const stats = [
    ["Chapter", `${state.turn}/${state.maxTurns}`],
    ["Health", state.health],
    ["Identity Clue", state.clue],
    ["Echo Shards", `${state.echoes} (total ${state.lifetimeEchoes})`],
    ["Current Moment", node.title],
  ];
  el.statusGrid.innerHTML = stats
    .map(([k, v]) => `<article class="stat-card"><small>${k}</small><p>${v}</p></article>`)
    .join("");
}

function renderScene() {
  const s = state.scenario;
  el.sceneKicker.textContent = `${s.mood} · ${s.upbringing}`;
  el.sceneTitle.textContent = `${s.era} — ${s.role}`;
  el.sceneText.textContent = s.opening;
  renderImage();
}

function renderStoryBeat() {
  const node = currentNode();
  el.storyBeat.innerHTML = `<h3>${node.title}</h3><p>${node.text}</p><p><em>${state.storyBeat}</em></p>`;
}

function renderChoices() {
  const node = currentNode();
  if (state.over || node.endingKey || !node.choices?.length) {
    el.choices.innerHTML = "";
    return;
  }
  el.choices.innerHTML = "<h3>Choose your next action</h3>";
  node.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
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

function resolveEnding(reason, endingKey) {
  state.over = true;
  const ending = state.scenario.endings[endingKey];
  const profile = ending.profile;
  state.discoveredIdentity = profile.name;
  el.endScreen.classList.remove("hidden");
  el.endTitle.textContent = ending.title || (reason === "death" ? "This life fades..." : "Identity Unlocked");
  el.endSummary.textContent = ending.summary;
  el.identityCard.innerHTML = `
    <h3>${profile.name}</h3>
    <p><strong>${profile.dob}</strong> · <strong>${profile.era}</strong></p>
    <p><em>Defining trait:</em> ${profile.definingTrait} (your run's strongest trait: ${statLeader()})</p>
    <p>${profile.life}</p>
    <p><strong>They loved:</strong> ${profile.likes}</p>
    <p><strong>A bright chapter:</strong> ${profile.good}</p>
    <p><strong>A hard chapter:</strong> ${profile.bad}</p>
    <p><strong>Regret carried forward:</strong> ${profile.regret}</p>
    <p>Run totals: clue score ${state.clue}, Echo Shards ${state.echoes}.</p>
  `;
}

function applyChoice(choice) {
  if (state.over) return;

  Object.entries(choice.effects || {}).forEach(([key, value]) => {
    if (key in state.stats) state.stats[key] += value;
    else state[key] += value;
  });

  state.turn += 1;
  state.health = Math.max(0, Math.min(100, state.health));
  state.clue = Math.max(0, state.clue);
  state.storyBeat = choice.consequence;
  state.chronicle.push(choice.consequence);

  reinforcementReward();

  state.currentNodeId = choice.next;
  const node = currentNode();

  if (state.clue >= 10) {
    maybeShowTip("clue", "Identity Clue", "Clues represent how much historical truth you've recovered in this life.");
  }

  if (state.turn === 2) {
    maybeShowTip("story", "Story Branching", "Every option now comes directly from your previous decision in this same storyline.");
  }

  if (state.health <= 0) {
    resolveEnding("death", Object.keys(state.scenario.endings)[0]);
  } else if (node.endingKey) {
    resolveEnding("discovery", node.endingKey);
  } else if (state.turn > state.maxTurns) {
    const fallback = Object.keys(state.scenario.endings)[0];
    resolveEnding("discovery", fallback);
  }

  refresh();
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
  maybeShowTip("save", "Save System", "Use Load Game to continue this exact branch later.");
  refresh();
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.chronicle.push("No save found in the archive.");
    return refresh();
  }

  state = JSON.parse(raw);

  if (!Array.isArray(state.recentScenarioIds)) {
    state.recentScenarioIds = state.scenario?.id ? [state.scenario.id] : [];
  }
  if (!state.storyBeat) {
    state.storyBeat = "The timeline resumes from where you left it.";
  }
  if (!state.currentNodeId || !state.scenario?.nodes?.[state.currentNodeId]) {
    state.currentNodeId = state.scenario.startNode;
  }

  state.chronicle.push("Save loaded. The timeline reconnects.");
  refresh();
}

function startNewGame({ resetMeta = false, carryMessage = "" } = {}) {
  const prior = state;
  state = baseState({
    carriedLifetimeEchoes: resetMeta ? 0 : prior.lifetimeEchoes,
    previousRecent: resetMeta ? [] : prior.recentScenarioIds || [],
    avoidScenarioId: prior.scenario?.id || "",
    shownTutorial: prior.shownTutorial,
  });

  if (carryMessage) {
    state.chronicle.unshift(carryMessage);
  }

  el.endScreen.classList.add("hidden");
  refresh();
}

document.getElementById("saveBtn").onclick = saveGame;
document.getElementById("loadBtn").onclick = loadGame;
document.getElementById("restartBtn").onclick = () => startNewGame({ resetMeta: false });
document.getElementById("newGameBtn").onclick = () =>
  startNewGame({
    resetMeta: false,
    carryMessage: "A new life begins in a different historical path.",
  });
document.getElementById("continueRunBtn").onclick = () =>
  startNewGame({
    resetMeta: false,
    carryMessage: "Your Echo Shards persist as you continue the search across a new life.",
  });
document.getElementById("resetBtn").onclick = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TUTORIAL_KEY);
  startNewGame({ resetMeta: true, carryMessage: "All memories wiped. A completely fresh cycle starts." });
};
el.tutorialDismiss.onclick = dismissTip;

if (!state.shownTutorial) {
  maybeShowTip("intro", "Welcome to Past Lifes", "You are in a real historical storyline. Each choice creates the next scene directly.");
}

refresh();
