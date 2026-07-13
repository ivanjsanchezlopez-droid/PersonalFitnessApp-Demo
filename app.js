const KEY = "fitnessDemoV1";
const TYPES = ["Gym", "Swimming", "Mobility", "Hiking", "Open water"];
const LOAD_TYPES = ["Gym", "Swimming", "Hiking", "Open water"];

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return dateKey(d);
}
function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  d.setHours(0,0,0,0);
  return d;
}
function daysBetween(a, b) {
  const one = 86400000;
  const start = new Date(a);
  const end = new Date(b);
  start.setHours(12,0,0,0);
  end.setHours(12,0,0,0);
  return Math.round((end - start) / one);
}
function fmt(date) {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date + "T12:00:00"));
}
function escapeHtml(value) {
  return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

const ROUTINES = {
  gym: [
    { title: "Day 1 — Push", session: "Push", type: "Gym", items: [
      ["Bench Press", "4 × 4–6"], ["Incline Dumbbell Press", "3 × 8"], ["Landmine Press", "3 × 8 each side"], ["Lateral Raises", "3 × 12–15"], ["Dips", "3 × 6–10"], ["Triceps Rope Pushdown", "3 × 10–15"]
    ]},
    { title: "Day 2 — Pull", session: "Pull", type: "Gym", items: [
      ["Deadlift", "3 × 3–5"], ["Pull-ups", "4 × 5–8"], ["Chest-supported Row", "3 × 8–10"], ["Face Pull", "3 × 12–15"], ["Hammer Curl", "3 × 10–12"], ["Pallof Press", "3 × 10 each side"]
    ]},
    { title: "Day 3 — Legs", session: "Legs", type: "Gym", items: [
      ["Back Squat", "4 × 4–6"], ["Romanian Deadlift", "3 × 6–8"], ["Bulgarian Split Squat", "3 × 8 each side"], ["Hip Thrust", "3 × 8–10"], ["Leg Curl", "3 × 10–12"], ["Calf Raise", "3 × 12–15"]
    ]}
  ],
  swim: [
    { title: "Week 1 — Technique and changes", session: "Swim W1 S1", type: "Swimming", total: "2,000 m", items: [
      ["Warm-up", "300 m easy"], ["Technique", "4 × 50 m"], ["Kick", "300 m board"], ["Pull + paddles", "300 m Z3"], ["Pace changes", "8 × 100 m"], ["Cool down", "100 m"]
    ]},
    { title: "Week 1 — Z3 hypoxic", session: "Swim W1 S2", type: "Swimming", total: "2,000 m", items: [
      ["Warm-up", "300 m"], ["Progressive", "4 × 100 m"], ["Z3 hypoxic", "4 × 200 m"], ["Sprint", "4 × 50 m"], ["Backstroke", "100 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 2 — Strength endurance", session: "Swim W2 S1", type: "Swimming", total: "2,200 m", items: [
      ["Warm-up", "400 m"], ["Technique", "4 × 50 m"], ["Kick", "300 m"], ["Pull + paddles", "300 m Z3"], ["Z3", "6 × 100 m"], ["Z4", "4 × 50 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 2 — Aerobic threshold", session: "Swim W2 S2", type: "Swimming", total: "2,400 m", items: [
      ["Warm-up", "400 m"], ["Z3 hypoxic", "6 × 200 m"], ["Fast/easy", "8 × 50 m"], ["Backstroke", "200 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 3 — T15 control", session: "Swim W3 S1", type: "Swimming", total: "1,300 m + T15", items: [
      ["Warm-up", "300 m"], ["Technique", "4 × 50 m"], ["Z2", "4 × 100 m"], ["T15", "15 minutes steady hard"], ["Recovery technique", "4 × 50 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 3 — Threshold and speed", session: "Swim W3 S2", type: "Swimming", total: "2,400 m", items: [
      ["Warm-up", "400 m"], ["Z3", "8 × 100 m"], ["Z4", "4 × 100 m"], ["Fast 50s", "8 × 50 m"], ["Backstroke", "200 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 4 — Aerobic technical", session: "Swim W4 S1", type: "Swimming", total: "2,000 m", items: [
      ["Warm-up", "300 m"], ["Technique", "6 × 50 m"], ["Z2", "8 × 100 m"], ["Kick", "4 × 50 m"], ["Pull easy", "4 × 50 m"], ["Cool down", "200 m"]
    ]},
    { title: "Week 4 — Mixed quality", session: "Swim W4 S2", type: "Swimming", total: "2,400 m", items: [
      ["Warm-up", "400 m"], ["Progressive", "4 × 100 m"], ["Z3 hypoxic", "6 × 200 m"], ["Sprint", "4 × 50 m"], ["Cool down", "200 m"]
    ]}
  ]
};

const NUTRITION = [
  { time: "7:00 AM", title: "Breakfast", options: [
    "Oats, Greek yogurt, berries and peanut butter",
    "Eggs, whole-grain toast, avocado and fruit"
  ]},
  { time: "10:00 AM", title: "Morning snack", options: [
    "Protein shake with banana and skim milk",
    "Cottage cheese with fruit"
  ]},
  { time: "12:30 PM", title: "Lunch", options: [
    "Rice, beans, chicken breast, vegetables and olive oil",
    "Pasta, tuna, salad and avocado"
  ]},
  { time: "3:30 PM", title: "Afternoon snack", options: [
    "Whole-grain crackers, cheese and almonds",
    "Greek yogurt with granola"
  ]},
  { time: "Pre-workout", title: "Before training", options: [
    "Fruit + protein serving",
    "Toast + honey + coffee"
  ]},
  { time: "7:30 PM", title: "Dinner", options: [
    "Wrap with lean protein, beans and vegetables",
    "Lean beef pasta with salad"
  ]}
];

function makeDemoData() {
  const history = [
    [-27, "Gym", "Push"], [-26, "Swimming", "Swim W1 S1"], [-25, "Mobility", "Mobility"],
    [-24, "Gym", "Pull"], [-22, "Hiking", "Hiking"], [-20, "Gym", "Legs"],
    [-19, "Swimming", "Swim W1 S2"], [-17, "Gym", "Push"], [-16, "Mobility", "Mobility"],
    [-15, "Swimming", "Swim W2 S1"], [-13, "Gym", "Pull"], [-12, "Open water", "Open water swim"],
    [-10, "Gym", "Legs"], [-9, "Swimming", "Swim W2 S2"], [-7, "Mobility", "Mobility"],
    [-6, "Gym", "Push"], [-5, "Swimming", "Swim W3 S1"], [-4, "Gym", "Pull"],
    [-3, "Mobility", "Mobility"], [-2, "Gym", "Legs"], [-1, "Swimming", "Swim W3 S2"]
  ].map(([offset, type, session], i) => ({
    id: `demo-${i}`,
    date: addDays(offset),
    timestamp: new Date(new Date().setDate(new Date().getDate()+offset)).toISOString(),
    type, session
  }));

  return {
    history,
    body: [
      { date: addDays(-95), heightCm: 175, weightKg: 82.0, bmi: 26.8, muscleKg: 34.8, fatMassKg: 20.0, bodyFatPercent: 24.4, visceralFat: 8, waistHipRatio: 0.94, score: 74 },
      { date: addDays(-65), heightCm: 175, weightKg: 80.9, bmi: 26.4, muscleKg: 35.0, fatMassKg: 18.8, bodyFatPercent: 23.2, visceralFat: 8, waistHipRatio: 0.93, score: 76 },
      { date: addDays(-35), heightCm: 175, weightKg: 79.6, bmi: 26.0, muscleKg: 35.2, fatMassKg: 17.6, bodyFatPercent: 22.1, visceralFat: 7, waistHipRatio: 0.91, score: 78 },
      { date: addDays(-5), heightCm: 175, weightKg: 78.6, bmi: 25.7, muscleKg: 35.3, fatMassKg: 16.9, bodyFatPercent: 21.5, visceralFat: 7, waistHipRatio: 0.90, score: 80 }
    ],
    goals: [
      { title: "Weight range", initial: "82.0 kg", target: "78–80 kg", current: "78.6 kg", completed: true, startDate: addDays(-95), completionDate: addDays(-5) },
      { title: "Body fat", initial: "24.4%", target: "20–21%", current: "21.5%", completed: false, startDate: addDays(-95), completionDate: null },
      { title: "Maintain muscle mass", initial: "34.8 kg", target: "≥35 kg", current: "35.3 kg", completed: true, startDate: addDays(-95), completionDate: addDays(-35) },
      { title: "Visceral fat", initial: "Level 8", target: "Level 6–7", current: "Level 7", completed: true, startDate: addDays(-95), completionDate: addDays(-5) },
      { title: "Monthly consistency", initial: "8 sessions/month", target: "16 sessions/month", current: "15 sessions this month", completed: false, startDate: addDays(-35), completionDate: null }
    ],
    appointments: {
      psychologyNextDate: addDays(1),
      nutritionistNextDate: addDays(18),
      physioLastVisit: addDays(-55),
      physioIntervalWeeks: 8
    },
    recovery: {
      date: addDays(-2),
      painScore: 2,
      fatigue: "Medium",
      sleep: "Good",
      area: "Shoulder"
    }
  };
}

function loadState() {
  let stored = localStorage.getItem(KEY);
  if (!stored) {
    const initial = makeDemoData();
    localStorage.setItem(KEY, JSON.stringify(initial));
    return initial;
  }

  const state = JSON.parse(stored);

  // Backward-compatible migration for browsers that already opened demo v1.0.
  state.appointments = state.appointments || {};
  if (!("nutritionistNextDate" in state.appointments)) {
    state.appointments.nutritionistNextDate = addDays(18);
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  return state;
}
function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
function toast(message, actionLabel=null, action=null) {
  const t = document.getElementById("toast");
  document.getElementById("toastMessage").textContent = message;
  const btn = document.getElementById("toastAction");
  btn.hidden = !actionLabel;
  btn.textContent = actionLabel || "";
  btn.onclick = action || null;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 4000);
}

function renderRoutines(state) {
  function card(routine) {
    const doneToday = state.history.some(h => h.date === dateKey() && h.type === routine.type && h.session === routine.session);
    return `<details class="card">
      <summary>${escapeHtml(routine.title)}</summary>
      <div class="card-body">
        <ul class="routine-list">
          ${routine.items.map(([name, detail]) => `<li><strong>${escapeHtml(name)}</strong><span>${escapeHtml(detail)}</span></li>`).join("")}
        </ul>
        ${routine.total ? `<p class="total">Total: ${escapeHtml(routine.total)}</p>` : ""}
        <button class="complete-btn ${doneToday ? "done" : ""}" data-type="${routine.type}" data-session="${routine.session}" type="button">
          ${doneToday ? "Completed today · tap to remove" : "Mark session completed"}
        </button>
      </div>
    </details>`;
  }
  document.getElementById("gymRoutines").innerHTML = ROUTINES.gym.map(card).join("");
  document.getElementById("swimRoutines").innerHTML = ROUTINES.swim.map(card).join("");

  document.querySelectorAll(".complete-btn,.quick-activity[data-session]").forEach(btn => {
    const type = btn.dataset.type;
    const session = btn.dataset.session;
    const doneToday = state.history.some(h => h.date === dateKey() && h.type === type && h.session === session);
    btn.classList.toggle("done", doneToday);
    btn.addEventListener("click", () => toggleSession(type, session));
  });

  document.querySelectorAll(".cards").forEach(container => {
    container.querySelectorAll(":scope > details").forEach(details => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        container.querySelectorAll(":scope > details").forEach(other => {
          if (other !== details) other.open = false;
        });
      });
    });
  });
}

function toggleSession(type, session) {
  const state = loadState();
  const existing = state.history.find(h => h.date === dateKey() && h.type === type && h.session === session);
  if (existing) {
    state.history = state.history.filter(h => h.id !== existing.id);
    saveState(state);
    render();
    toast("Session removed.");
    return;
  }
  const item = { id: `user-${Date.now()}`, date: dateKey(), timestamp: new Date().toISOString(), type, session };
  state.history.push(item);
  saveState(state);
  render();
  toast("Session saved.", "Undo", () => {
    const next = loadState();
    next.history = next.history.filter(h => h.id !== item.id);
    saveState(next);
    render();
    toast("Session removed.");
  });
}

function calcStreak(history) {
  const dates = [...new Set(history.map(h => h.date))].sort().reverse();
  if (!dates.length) return 0;
  let cursor = new Date();
  cursor.setHours(12,0,0,0);
  const today = dateKey(cursor);
  const y = new Date(cursor); y.setDate(y.getDate()-1);
  if (dates[0] !== today && dates[0] !== dateKey(y)) return 0;
  if (dates[0] !== today) cursor.setDate(cursor.getDate()-1);
  let count = 0;
  for (const d of dates) {
    if (d === dateKey(cursor)) { count++; cursor.setDate(cursor.getDate()-1); }
    else if (d < dateKey(cursor)) break;
  }
  return count;
}

function renderConsistency(state) {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const week = state.history.filter(h => new Date(h.date+"T12:00:00") >= weekStart).length;
  const month = state.history.filter(h => new Date(h.date+"T12:00:00") >= monthStart).length;
  const streak = calcStreak(state.history);
  ["weekCount","overviewWeek"].forEach(id => document.getElementById(id).textContent = week);
  ["monthCount","overviewMonth"].forEach(id => document.getElementById(id).textContent = month);
  ["streakCount","overviewStreak"].forEach(id => document.getElementById(id).textContent = `${streak} days`);

  document.getElementById("typeSummary").innerHTML = TYPES.map(type => {
    const count = state.history.filter(h => h.type === type).length;
    return `<div class="type-row"><span>${type}</span><strong>${count}</strong></div>`;
  }).join("");

  document.getElementById("historyList").innerHTML = state.history
    .slice()
    .sort((a,b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 20)
    .map(item => `<div class="history-item">
      <div class="history-copy"><strong>${escapeHtml(item.session)}</strong><small>${escapeHtml(item.type)} · ${fmt(item.date)}</small></div>
      <button class="delete-session-btn" data-id="${item.id}" type="button">Delete</button>
    </div>`).join("");

  document.querySelectorAll(".delete-session-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = loadState();
      next.history = next.history.filter(h => h.id !== btn.dataset.id);
      saveState(next);
      render();
      toast("Session deleted.");
    });
  });
}

function renderGoals(state) {
  const active = state.goals.filter(g => !g.completed).length;
  const completed = state.goals.length - active;
  document.getElementById("activeGoalsCount").textContent = active;
  document.getElementById("completedGoalsCount").textContent = completed;
  document.getElementById("goalsList").innerHTML = state.goals.map(goal => {
    const days = goal.completed ? daysBetween(goal.startDate, goal.completionDate) : daysBetween(goal.startDate, dateKey());
    return `<article class="goal-card ${goal.completed ? "completed" : ""}">
      <h3>${goal.completed ? "✓ " : "○ "}${escapeHtml(goal.title)}</h3>
      <p class="muted">Target: ${escapeHtml(goal.target)}</p>
      <div class="goal-details">
        <div class="goal-detail"><span>Initial</span><strong>${escapeHtml(goal.initial)}</strong></div>
        <div class="goal-detail"><span>Current</span><strong>${escapeHtml(goal.current)}</strong></div>
        <div class="goal-detail"><span>Start date</span><strong>${fmt(goal.startDate)}</strong></div>
        <div class="goal-detail"><span>${goal.completed ? "Time to achieve" : "Days active"}</span><strong>${days} days</strong></div>
      </div>
      ${goal.completed ? '<span class="goal-badge">Completed goal</span>' : ''}
    </article>`;
  }).join("");
}

function renderRecovery(state) {
  const loadDates = state.history.filter(h => LOAD_TYPES.includes(h.type)).map(h => h.date);
  const last7 = loadDates.filter(d => daysBetween(d+"T12:00:00", new Date()) >= 0 && daysBetween(d+"T12:00:00", new Date()) < 7).length;
  const unique = [...new Set(loadDates)].sort().reverse();
  let streak = 0;
  let cursor = new Date(); cursor.setHours(12,0,0,0);
  for (const d of unique) {
    if (d === dateKey(cursor)) { streak++; cursor.setDate(cursor.getDate()-1); }
    else if (d < dateKey(cursor)) break;
  }

  const physioDue = new Date(state.appointments.physioLastVisit + "T12:00:00");
  physioDue.setDate(physioDue.getDate() + state.appointments.physioIntervalWeeks * 7);
  const physioDays = daysBetween(new Date(), physioDue);
  const card = document.getElementById("recoveryCard");
  card.classList.remove("status-green","status-yellow","status-orange","status-red");

  let status = "green";
  let title = "No current alerts";
  let message = "Training load and latest recovery check look manageable.";
  if (last7 >= 6 || streak >= 4 || physioDays <= 1) {
    status = "yellow";
    title = "Monitor recovery";
    message = "Recent load or appointment timing suggests prioritizing recovery and checking symptoms.";
  }
  card.classList.add(`status-${status}`);
  document.getElementById("recoveryStatus").textContent = status === "green" ? "Green" : "Yellow";
  document.getElementById("recoveryTitle").textContent = title;
  document.getElementById("recoveryMessage").textContent = message;
  document.getElementById("load7").textContent = last7;
  document.getElementById("loadStreak").textContent = streak;
  document.getElementById("physioDue").textContent = physioDays < 0 ? `Overdue ${Math.abs(physioDays)} days` : physioDays === 0 ? "Today" : physioDays === 1 ? "Tomorrow" : `In ${physioDays} days`;
}

function appointmentLabel(days, noun = "Appointment") {
  if (days < 0) return `${noun} was ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
  if (days === 0) return `${noun} today`;
  if (days === 1) return `${noun} tomorrow`;
  return `${noun} in ${days} days`;
}

function renderAppointments(state) {
  const psychDays = daysBetween(new Date(), new Date(state.appointments.psychologyNextDate + "T12:00:00"));
  document.getElementById("psychologyTitle").textContent = appointmentLabel(psychDays, "Session");
  document.getElementById("psychologyText").textContent = `${fmt(state.appointments.psychologyNextDate)} · sample reminder to verify time and modality.`;

  const due = new Date(state.appointments.physioLastVisit + "T12:00:00");
  due.setDate(due.getDate() + state.appointments.physioIntervalWeeks * 7);
  const physioDays = daysBetween(new Date(), due);
  document.getElementById("physioTitle").textContent = appointmentLabel(physioDays, "Preventive review");
  document.getElementById("physioText").textContent = `Last sample visit: ${fmt(state.appointments.physioLastVisit)} · interval: ${state.appointments.physioIntervalWeeks} weeks.`;

  const nutritionistDate = state.appointments.nutritionistNextDate || "";
  const input = document.getElementById("nutritionistDate");
  const card = document.getElementById("nutritionistCard");
  input.value = nutritionistDate;
  card.classList.remove("reminder-tomorrow", "reminder-today", "reminder-past");

  if (!nutritionistDate) {
    document.getElementById("nutritionistTitle").textContent = "Not scheduled yet";
    document.getElementById("nutritionistText").textContent = "Select the next nutritionist appointment date.";
    return;
  }

  const nutritionistDays = daysBetween(new Date(), new Date(nutritionistDate + "T12:00:00"));
  document.getElementById("nutritionistTitle").textContent = appointmentLabel(nutritionistDays);
  document.getElementById("nutritionistText").textContent = `${fmt(nutritionistDate)} · sample reminder to prepare recent progress and questions.`;

  if (nutritionistDays === 0) card.classList.add("reminder-today");
  else if (nutritionistDays === 1) card.classList.add("reminder-tomorrow");
  else if (nutritionistDays < 0) card.classList.add("reminder-past");
}

function renderNutrition() {
  document.getElementById("nutritionTimeline").innerHTML = NUTRITION.map(meal => `<details class="card">
    <summary><span>${meal.time}</span> ${meal.title}</summary>
    <div class="card-body">
      <div class="meal-options">
        ${meal.options.map((option, i) => `<article><h4>Option ${i+1}</h4><ul><li>${escapeHtml(option)}</li></ul></article>`).join("")}
      </div>
    </div>
  </details>`).join("");
}

function renderBody(state) {
  const records = state.body.slice().sort((a,b) => a.date.localeCompare(b.date));
  const latest = records.at(-1);
  const previous = records.at(-2);
  document.getElementById("bodyWeight").textContent = `${latest.weightKg.toFixed(1)} kg`;
  document.getElementById("bodyFat").textContent = `${latest.bodyFatPercent.toFixed(1)}%`;
  document.getElementById("bodyMuscle").textContent = `${latest.muscleKg.toFixed(1)} kg`;
  document.getElementById("bodyLatest").innerHTML = [
    ["Date", fmt(latest.date)], ["Height", `${latest.heightCm} cm`], ["BMI", latest.bmi.toFixed(1)], ["Fat mass", `${latest.fatMassKg.toFixed(1)} kg`],
    ["Visceral fat", `Level ${latest.visceralFat}`], ["Waist/hip ratio", latest.waistHipRatio.toFixed(2)], ["Score", latest.score]
  ].map(([k,v]) => `<div class="body-row"><span>${k}</span><strong>${v}</strong></div>`).join("");
  document.getElementById("bodyTrend").innerHTML = [
    ["Weight", latest.weightKg - previous.weightKg, "kg"], ["Muscle mass", latest.muscleKg - previous.muscleKg, "kg"],
    ["Fat mass", latest.fatMassKg - previous.fatMassKg, "kg"], ["Body fat", latest.bodyFatPercent - previous.bodyFatPercent, "pts"],
    ["Visceral fat", latest.visceralFat - previous.visceralFat, ""]
  ].map(([k,d,u]) => `<div class="body-row"><span>${k}</span><strong>${d > 0 ? "+" : ""}${d.toFixed(u ? 1 : 0)} ${u}</strong></div>`).join("");
}

function render() {
  const state = loadState();
  renderRoutines(state);
  renderConsistency(state);
  renderGoals(state);
  renderRecovery(state);
  renderAppointments(state);
  renderNutrition();
  renderBody(state);
}

document.getElementById("resetDemo").addEventListener("click", () => {
  if (!confirm("Reset demo data to the original sample state?")) return;
  localStorage.removeItem(KEY);
  render();
  toast("Demo data reset.");
});
document.getElementById("exportBackup").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(loadState(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `demo-fitness-backup-${dateKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("Demo backup exported.");
});

document.getElementById("saveNutritionistDate").addEventListener("click", () => {
  const selectedDate = document.getElementById("nutritionistDate").value;
  if (!selectedDate) {
    toast("Choose a nutritionist appointment date first.");
    return;
  }

  const state = loadState();
  state.appointments.nutritionistNextDate = selectedDate;
  saveState(state);
  render();
  toast("Nutritionist appointment saved.");
});

document.getElementById("clearNutritionistDate").addEventListener("click", () => {
  const state = loadState();
  state.appointments.nutritionistNextDate = "";
  saveState(state);
  render();
  toast("Nutritionist appointment cleared.");
});

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
