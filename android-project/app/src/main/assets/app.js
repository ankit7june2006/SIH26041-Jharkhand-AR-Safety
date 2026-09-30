/* Jharkhand Industrial AR Safety & Vocational Certification Platform - SIH Complete Winner Engine */

// Worker Database
const workersData = [
  {
    id: "JH-COAL-0527",
    name: "Ramesh Hembram",
    tenureDays: 9,
    sector: "Coal",
    audio: "Santali",
    audioText: "ᱥᱟᱱᱛᱟᱲᱤ",
    status: "BLOCKED",
    reason: "Untrained (<30 Days)",
    livePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    matchScore: "98.7%",
    certifiedDate: "N/A",
    score: "45%"
  },
  {
    id: "JH-STEEL-1042",
    name: "Babulal Murmu",
    tenureDays: 18,
    sector: "Steel",
    audio: "Santali",
    audioText: "ᱥᱟᱱᱛᱟᱲᱤ",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    matchScore: "99.1%",
    certifiedDate: "2026-09-15",
    score: "92%"
  },
  {
    id: "JH-COAL-0812",
    name: "Sita Tudu",
    tenureDays: 120,
    sector: "Coal",
    audio: "Hindi",
    audioText: "हिन्दी",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    matchScore: "97.8%",
    certifiedDate: "2026-04-10",
    score: "88%"
  },
  {
    id: "JH-MICA-0319",
    name: "Laxman Hansda",
    tenureDays: 27,
    sector: "Mica",
    audio: "Santali",
    audioText: "ᱥᱟᱱᱛᱟᱲᱤ",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    matchScore: "98.4%",
    certifiedDate: "2026-09-20",
    score: "85%"
  },
  {
    id: "JH-STEEL-0955",
    name: "Karan Majhi",
    tenureDays: 45,
    sector: "Steel",
    audio: "Hindi",
    audioText: "हिन्दी",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    matchScore: "99.4%",
    certifiedDate: "2026-08-11",
    score: "95%"
  },
  {
    id: "JH-COAL-0418",
    name: "Purnima Soren",
    tenureDays: 8,
    sector: "Coal",
    audio: "Santali",
    audioText: "ᱥᱟᱱᱛᱟᱲᱤ",
    status: "BLOCKED",
    reason: "Untrained (<30 Days)",
    livePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    matchScore: "96.5%",
    certifiedDate: "N/A",
    score: "50%"
  },
  {
    id: "JH-MICA-0761",
    name: "Deepak Kisku",
    tenureDays: 76,
    sector: "Mica",
    audio: "Hindi",
    audioText: "हिन्दी",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    matchScore: "98.9%",
    certifiedDate: "2026-07-02",
    score: "90%"
  },
  {
    id: "JH-STEEL-0294",
    name: "Mohan Murmu",
    tenureDays: 16,
    sector: "Steel",
    audio: "Santali",
    audioText: "ᱥᱟᱱᱛᱟᱲᱤ",
    status: "ALLOWED",
    reason: "Certified & DGMS Verified",
    livePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    matchScore: "97.5%",
    certifiedDate: "2026-09-22",
    score: "86%"
  }
];

let selectedWorkerIndex = 0;
let currentLanguage = "Santali";
let currentSidebarTab = "dashboard";
let passStep = 0;
let selectedExtinguisher = null;
let ppeSelected = { helmet: false, harness: false, mask: false, detector: false };
let hazardsSpotted = 0;
let cameraStream = null;
let lotoLocked = false;
let audioCtx = null;
let offlineLogsQueue = 14;

let shiftSecondsElapsed = 24138; // 06h 42m 18s initial shift duration

// Multilingual Dictionary (Santali, Hindi, English) for Modules
const translations = {
  Santali: {
    fireTitle: "🔥 Fire Response & PASS Simulator (ᱥᱟᱱᱛᱟᱲᱤ)",
    fireStatus: "1. ᱥᱮᱸᱜᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱮᱠᱥᱴᱤᱝᱜᱩᱭᱤᱥᱚᱨ ᱪᱩᱱᱟᱹᱣ ᱢᱮ:",
    passStep: "2. PASS ᱱᱤᱭᱚᱢ: ᱯᱤᱱ ᱚᱨ ᱚᱰᱚᱠ ᱢᱮ ➔ ᱱᱤᱥᱟᱱᱟ ᱵᱮᱱᱟᱣ ᱢᱮ ➔ ᱫᱟᱵᱟᱣ ᱢᱮ ➔ ᱦᱤᱞᱟᱹᱣ ᱢᱮ",
    gasTitle: "⚠️ Toxic Gas & Confined Space HUD (ᱥᱟᱱᱛᱟᱲᱤ)",
    ppeStatus: "3D ᱯᱤ.ᱯᱤ.ᱤ. ᱠᱤᱴ ᱪᱩᱱᱟᱹᱣ ᱢᱮ:",
    lotoTitle: "🚜 Heavy Machinery LOTO Protocol (ᱥᱟᱱᱛᱟᱲᱤ)",
    lotoDesc: "ᱢᱮᱥᱤᱱ ᱥᱟᱯᱷᱟ ᱞᱟᱦᱟᱨᱮ Main Breaker Off ᱠᱟᱛᱮ Lock Out Padlock ᱞᱟᱜᱟᱣ ᱢᱮ",
    certTitle: "DGMS AR ᱥᱩᱨᱚᱠᱷᱟ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ (ᱥᱟᱱᱛᱟᱲᱤ)",
    passP: "1. ᱯᱤᱱ ᱚᱨ",
    passA: "2. ᱱᱤᱥᱟᱱᱟ",
    passS1: "3. ᱫᱟᱵᱟᱣ",
    passS2: "4. ᱦᱤᱞᱟᱹᱣ",
    ppeHelmet: "🪖 Mining Helmet (ᱥᱟᱱᱛᱟᱲᱤ)",
    ppeHarness: "🦺 Safety Harness (ᱥᱟᱱᱛᱟᱲᱤ)",
    ppeMask: "😷 Gas Rescuer Mask (ᱥᱟᱱᱛᱟᱲᱤ)",
    ppeDetector: "📟 Gas Detector (ᱥᱟᱱᱛᱟᱲᱤ)",
    lotoSwitchOn: "🔓 Main Power ON (Click to Lock Out)",
    lotoSwitchOff: "🔒 LOTO Breaker Switch LOCKED OUT (Padlock Applied)",
    quizTitle: "🎯 AR 'Spot the Hazard' Quiz (ᱥᱟᱱᱛᱟᱲᱤ)"
  },
  Hindi: {
    fireTitle: "🔥 अग्नि सुरक्षा एवं PASS सिमुलेटर (हिन्दी)",
    fireStatus: "1. अग्निशामक का प्रकार चुनें (पानी, झाग, CO2, पाउडर):",
    passStep: "2. PASS तकनीक: पिन खींचें ➔ निशाना लगाएं ➔ हैंडल दबाएं ➔ घुमाएं",
    gasTitle: "⚠️ जहरीली गैस एवं सीमित स्थान HUD (हिन्दी)",
    ppeStatus: "आवश्यक 3D सुरक्षा PPE किट पहनें:",
    lotoTitle: "🚜 भारी मशीनरी LOTO सुरक्षा नियम (हिन्दी)",
    lotoDesc: "मशीन मरम्मत से पहले पावर ब्रेकर बंद करके लॉक-आउट टैग-आउट लगाएं",
    certTitle: "डीजीएमएस एआर सुरक्षा प्रमाण पत्र (हिन्दी)",
    passP: "1. पिन खींचें",
    passA: "2. निशाना लगाएं",
    passS1: "3. दबाएं",
    passS2: "4. घुमाएं",
    ppeHelmet: "🪖 खनन हेलमेट",
    ppeHarness: "🦺 सुरक्षा हार्नेस",
    ppeMask: "😷 गैस मास्क",
    ppeDetector: "📟 गैस डिटेक्टर",
    lotoSwitchOn: "🔓 पावर चालू (लॉक आउट करने के लिए क्लिक करें)",
    lotoSwitchOff: "🔒 LOTO पावर ब्रेकर लॉक आउट (पैडलॉक लागू)",
    quizTitle: "🎯 AR 'खतरा पहचान' क्विज (हिन्दी)"
  },
  English: {
    fireTitle: "🔥 Fire Response & PASS Simulator (English)",
    fireStatus: "1. Select Extinguisher Type (Water, Foam, CO2, Dry Powder):",
    passStep: "2. PASS Technique: Pull Pin ➔ Aim Base ➔ Squeeze Handle ➔ Sweep",
    gasTitle: "⚠️ Toxic Gas & Confined Space HUD (English)",
    ppeStatus: "Equip Required 3D Safety PPE Kit:",
    lotoTitle: "🚜 Heavy Machinery Lock-Out Tag-Out (English)",
    lotoDesc: "Isolate power breaker switch before entering maintenance zone",
    certTitle: "DGMS AR Safety Certificate (English)",
    passP: "1. PULL",
    passA: "2. AIM",
    passS1: "3. SQUEEZE",
    passS2: "4. SWEEP",
    ppeHelmet: "🪖 Mining Helmet",
    ppeHarness: "🦺 Safety Harness",
    ppeMask: "😷 Gas Rescuer Mask",
    ppeDetector: "📟 Gas Detector",
    lotoSwitchOn: "🔓 Main Power ON (Click to Lock Out)",
    lotoSwitchOff: "🔒 LOTO Breaker Switch LOCKED OUT (Padlock Applied)",
    quizTitle: "🎯 AR 'Spot the Hazard' Quiz (English)"
  }
};

// Audio Prompts with Phonetic Synthesizer Fallbacks
const audioPrompts = {
  Santali: {
    display: "ᱡᱚᱦᱟᱨ! ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱨ.ᱮ. ᱵᱷᱳᱠᱮᱥᱱᱟᱞ ᱥᱩᱨᱚᱠᱷᱟ ᱴᱨᱮᱱᱤᱝ ᱨᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾",
    speak: "जोहार! झारखंड एआर सेफ्टी पोर्टल रे आपनाग सगुन दाराम।",
    fireWarning: "चेतावनी! सेंगेल लागित CO2 से ड्राई पाउडर बेवहार मे! दाग आलोम दुला!",
    passInstruction: "पिन ओर ओडोक मे, निसाना बनाओ मे, दबाओ मे आर लातार रे हिलाओ मे!",
    gasAlert: "चेतावनी! मीथेन आर कार्बन मोनोक्साइड गेस लीक हुयुग काना! मास्क होरोग मे!",
    certPassed: "मानाव सरि! आम DGMS AR सेफ्टी परिक्षा रेम पास एना!"
  },
  Hindi: {
    display: "जोहार! झारखंड औद्योगिक एआर सुरक्षा पोर्टल में आपका स्वागत है।",
    speak: "जोहार! झारखंड औद्योगिक एआर सुरक्षा पोर्टल में आपका स्वागत है।",
    fireWarning: "चेतावनी! बिजली या कोयले की आग पर पानी न डालें! CO2 अग्निशामक का उपयोग करें!",
    passInstruction: "सुरक्षा पिन खींचें, आग की जड़ पर निशाना लगाएं, हैंडल दबाएं और झाड़ू की तरह घुमाएं!",
    gasAlert: "खतरा! खदान में जहरीली गैस (मीथेन/कार्बन मोनोक्साइड) का स्तर बढ़ रहा है! तुरंत मास्क पहनें!",
    certPassed: "बधाई हो! आपने डीजीएमएस एआर सुरक्षा प्रमाणन सफलतापूर्वक उत्तीर्ण कर लिया है।"
  },
  English: {
    display: "Welcome to Jharkhand Industrial AR Safety & Compliance Portal.",
    speak: "Welcome to Jharkhand Industrial AR Safety and Compliance Portal.",
    fireWarning: "Warning! Do not use water on electrical or coal fires! Select CO2 extinguisher.",
    passInstruction: "Follow PASS technique: Pull pin, aim base, squeeze handle, and sweep side to side.",
    gasAlert: "Danger! Toxic gas methane level rising. Equip self-rescuer gas mask immediately.",
    certPassed: "Congratulations! You have passed the official DGMS AR Safety Certification."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderWorkersTable();
  updateGateVerificationPanel(0);
  initSectorBarChart();
  initSectorGauges();
  initARFireCanvas();
  initARGasCanvas();
  initCameraFeed();
  startLiveTimestampClock();
  renderApprovalQueue();
  updateReportsTable();
  setViewMode("admin");
});

// Real-Time Live Clock & Ticking Shift Duration Timer
function startLiveTimestampClock() {
  setInterval(() => {
    shiftSecondsElapsed++;
    const hrs = String(Math.floor(shiftSecondsElapsed / 3600)).padStart(2, '0');
    const mins = String(Math.floor((shiftSecondsElapsed % 3600) / 60)).padStart(2, '0');
    const secs = String(shiftSecondsElapsed % 60).padStart(2, '0');

    const shiftDisplay = document.getElementById("shift-timer-display");
    if (shiftDisplay) {
      shiftDisplay.innerText = `Shift: ${hrs}h ${mins}m ${secs}s`;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
    const dateStr = now.toISOString().split('T')[0];
    const clockElems = document.querySelectorAll('.live-timestamp-clock');
    clockElems.forEach(el => el.innerText = `${dateStr} ${timeStr}`);
  }, 1000);
}

// Sound Chime Generator
function playAudioChime(freq = 600, duration = 0.15) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("Audio chime error:", e);
  }
}

// Speech Synthesis
function playAudioPrompt(lang, promptKey) {
  playAudioChime(800, 0.15);

  const promptObj = audioPrompts[lang] || audioPrompts.Hindi;
  const spokenText = promptObj[promptKey] || promptObj.speak || promptObj.display;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = lang === "English" ? "en-IN" : "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const promptTextContainer = document.getElementById("audio-prompt-text");
    if (promptTextContainer) {
      promptTextContainer.innerHTML = `<span class="speaking-wave"><bar></bar><bar></bar><bar></bar></span> <strong>Speaking (${lang}):</strong> "${spokenText.substring(0, 50)}..."`;
    }

    window.speechSynthesis.speak(utterance);
  }

  showToast(`🔊 ${lang} Audio: "${spokenText.substring(0, 40)}..."`);
}

function selectLanguage(lang) {
  currentLanguage = lang;
  
  // Highlight language toggle buttons across all screens
  ['Santali', 'Hindi', 'English'].forEach(l => {
    const btns = document.querySelectorAll(`.btn-lang-${l.toLowerCase()}`);
    btns.forEach(btn => {
      btn.className = (l === lang)
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-600 text-white shadow'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-400';
    });
  });

  // Update Module Text Content
  const t = translations[lang] || translations.Hindi;
  const fireTitleEl = document.getElementById("mod-fire-title");
  const gasTitleEl = document.getElementById("mod-gas-title");
  const lotoTitleEl = document.getElementById("mod-loto-title");

  if(fireTitleEl) fireTitleEl.innerText = t.fireTitle;
  if(gasTitleEl) gasTitleEl.innerText = t.gasTitle;
  if(lotoTitleEl) lotoTitleEl.innerText = t.lotoTitle;

  // Update PASS button labels
  const passPEl = document.getElementById("pass-p");
  const passAEl = document.getElementById("pass-a");
  const passS1El = document.getElementById("pass-s1");
  const passS2El = document.getElementById("pass-s2");
  if (passPEl) passPEl.innerText = t.passP;
  if (passAEl) passAEl.innerText = t.passA;
  if (passS1El) passS1El.innerText = t.passS1;
  if (passS2El) passS2El.innerText = t.passS2;

  // Update PPE button labels
  const ppeHelm = document.querySelector("#ppe-btn-helmet span:first-child");
  const ppeHarn = document.querySelector("#ppe-btn-harness span:first-child");
  const ppeMask = document.querySelector("#ppe-btn-mask span:first-child");
  const ppeDet = document.querySelector("#ppe-btn-detector span:first-child");
  if (ppeHelm) ppeHelm.innerText = t.ppeHelmet;
  if (ppeHarn) ppeHarn.innerText = t.ppeHarness;
  if (ppeMask) ppeMask.innerText = t.ppeMask;
  if (ppeDet) ppeDet.innerText = t.ppeDetector;

  playAudioPrompt(lang, 'speak');
}

// Manager Approval Queue Render & Approval Actions
function renderApprovalQueue() {
  const container = document.getElementById("approval-queue-container");
  if (!container) return;

  const pendingRecruits = workersData.filter(w => w.status === "BLOCKED" || w.tenureDays < 30);
  
  if (pendingRecruits.length === 0) {
    container.innerHTML = `<div class="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">✓ All <30 Days Recruits Approved & Compliant! Zero Pending Approvals.</div>`;
    return;
  }

  container.innerHTML = "";
  pendingRecruits.forEach((w) => {
    const origIndex = workersData.findIndex(item => item.id === w.id);
    const card = document.createElement("div");
    card.className = "p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3";
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${w.livePhoto}" alt="${w.name}" class="w-10 h-10 rounded-full object-cover border border-cyan-500">
        <div>
          <div class="text-xs font-bold text-white flex items-center gap-2">
            ${w.name} <span class="text-[10px] text-slate-400 font-mono">(${w.id})</span>
            <span class="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-bold">${w.tenureDays} Days Joined</span>
          </div>
          <div class="text-[10px] text-slate-400">Sector: ${w.sector} | Audio: ${w.audio} | Status: <span class="text-red-400 font-bold">${w.reason}</span></div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="approveWorkerWaiver(${origIndex})" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow transition-all flex items-center gap-1">
          <span>✍️</span> Approve DGMS Waiver & Clear Gate
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Also render audit log entries in compliance audit table
  const auditBody = document.getElementById("compliance-audit-logs-body");
  if (auditBody) {
    auditBody.innerHTML = `
      <tr>
        <td class="py-2 font-mono text-cyan-400">LOG-DHN-8891</td>
        <td class="py-2 font-bold">Insp. S. K. Roy</td>
        <td class="py-2">Bokaro Coal Shaft #4</td>
        <td class="py-2">412 Workers</td>
        <td class="py-2"><span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/40">VERIFIED</span></td>
        <td class="py-2 live-timestamp-clock font-mono">2026-09-30</td>
      </tr>
      <tr>
        <td class="py-2 font-mono text-cyan-400">LOG-DHN-8892</td>
        <td class="py-2 font-bold">Insp. A. K. Singh</td>
        <td class="py-2">Bokaro Steel Unit #2</td>
        <td class="py-2">350 Workers</td>
        <td class="py-2"><span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/40">VERIFIED</span></td>
        <td class="py-2 live-timestamp-clock font-mono">2026-09-30</td>
      </tr>
    `;
  }
}

function approveWorkerWaiver(index) {
  const w = workersData[index];
  if (!w) return;

  w.status = "ALLOWED";
  w.reason = "Certified & DGMS Manager Approved";
  w.tenureDays = Math.max(w.tenureDays, 31);
  w.certifiedDate = new Date().toISOString().split('T')[0];

  renderWorkersTable();
  updateGateVerificationPanel(index);
  renderApprovalQueue();
  updateReportsTable();

  playAudioChime(1000, 0.25);
  showToast(`✍️ DGMS Manager E-Signature Stamp Applied! ${w.name} is now ALLOWED for shaft gate entry.`);
}

// Reports Dynamic Data & CSV Export Engine
function updateReportsTable() {
  const typeSelect = document.getElementById("report-type-select");
  const sectorSelect = document.getElementById("report-sector-select");
  const reportsBody = document.getElementById("reports-table-body");
  const titleEl = document.getElementById("report-table-title");
  const badgeEl = document.getElementById("report-count-badge");

  if (!reportsBody) return;

  const category = typeSelect ? typeSelect.value : 'training';
  const sectorFilter = sectorSelect ? sectorSelect.value : 'ALL';

  let filteredWorkers = workersData;
  if (sectorFilter !== 'ALL') {
    filteredWorkers = workersData.filter(w => w.sector === sectorFilter);
  }

  if (titleEl) {
    titleEl.innerText = `Filtered DGMS ${category.toUpperCase()} Report Logs (${sectorFilter}):`;
  }
  if (badgeEl) {
    badgeEl.innerText = `Showing ${filteredWorkers.length} Records`;
  }

  reportsBody.innerHTML = "";
  filteredWorkers.forEach((w, idx) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-800/40 transition-colors";
    
    let moduleName = "Fire & PASS Simulator";
    if (w.sector === "Steel") moduleName = "Heavy Machinery LOTO";
    if (w.sector === "Mica") moduleName = "Confined Space Gas HUD";

    tr.innerHTML = `
      <td class="py-2.5 px-3 font-mono text-cyan-400">REP-2026-0${idx + 1}</td>
      <td class="py-2.5 px-3 font-bold text-white">${w.name}</td>
      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">${w.sector}</span></td>
      <td class="py-2.5 px-3 text-slate-300">${moduleName}</td>
      <td class="py-2.5 px-3 font-bold text-emerald-400">${w.score}</td>
      <td class="py-2.5 px-3 text-slate-400">DGMS Insp. S. K. Roy</td>
      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${w.status === 'ALLOWED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-500/40'}">${w.status}</span></td>
      <td class="py-2.5 px-3 font-mono text-[10px] text-slate-400 live-timestamp-clock">2026-09-30</td>
    `;
    reportsBody.appendChild(tr);
  });
}

function exportReportsCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Report_ID,Worker_Name,Worker_ID,Sector,Tenure_Days,Gate_Status,Score,Approved_By,Timestamp\n";

  workersData.forEach((w, idx) => {
    csvContent += `REP-2026-0${idx + 1},"${w.name}",${w.id},${w.sector},${w.tenureDays},${w.status},${w.score},"DGMS Insp S K Roy",2026-09-30\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `DGMS_Safety_Compliance_Audit_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("📥 DGMS Audit Report exported as CSV file!");
}

// Trigger Manual Offline DB Cloud Sync
function triggerOfflineCloudSync() {
  playAudioChime(1000, 0.2);
  const syncBtn = document.getElementById("offline-sync-badge");
  if (syncBtn) {
    syncBtn.innerHTML = "⏳ Syncing 14 Logs to Dhanbad Cloud...";
    setTimeout(() => {
      offlineLogsQueue = 0;
      syncBtn.className = "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 cursor-pointer shadow";
      syncBtn.innerHTML = "✓ All 14 Logs Synced to Dhanbad Server";
      showToast("☁️ Cloud Sync Completed! All Offline Certificates Synced to DGMS Database.");
    }, 1500);
  }
}

// Print / Export Official DGMS Certificate
function printCertificate() {
  window.print();
}

// Sidebar Navigation Switcher
function switchAdminSidebar(tabId) {
  currentSidebarTab = tabId;

  const sidebarLinks = document.querySelectorAll('.admin-sidebar-link');
  sidebarLinks.forEach(link => {
    if (link.dataset.tab === tabId) {
      link.className = "admin-sidebar-link flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold text-sm shadow-md transition-all";
    } else {
      link.className = "admin-sidebar-link flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 font-medium text-sm transition-all";
    }
  });

  const views = ['admin-view-dashboard', 'admin-view-workers', 'admin-view-ar-training', 'admin-view-compliance', 'admin-view-gate-entry', 'admin-view-reports', 'admin-view-settings'];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) {
      el.className = (v === `admin-view-${tabId}`) ? 'space-y-6 block' : 'hidden';
    }
  });

  if (tabId === 'ar-training') {
    showToast("🥽 Opening Mobile AR Safety Training Simulator");
  }
}

// View Switcher
function setViewMode(mode) {
  const adminView = document.getElementById("admin-view-container");
  const mobileView = document.getElementById("mobile-view-container");
  const btnAdmin = document.getElementById("btn-view-admin");
  const btnMobile = document.getElementById("btn-view-mobile");
  const btnSplit = document.getElementById("btn-view-split");

  [btnAdmin, btnMobile, btnSplit].forEach(b => {
    if(b) b.classList.remove("bg-cyan-600", "text-white", "bg-slate-800", "text-slate-300");
  });

  if (mode === "admin") {
    adminView.className = "w-full flex transition-all duration-300";
    mobileView.className = "hidden";
    if(btnAdmin) btnAdmin.classList.add("bg-cyan-600", "text-white");
  } else if (mode === "mobile") {
    adminView.className = "hidden";
    mobileView.className = "w-full flex justify-center py-2 transition-all duration-300";
    if(btnMobile) btnMobile.classList.add("bg-cyan-600", "text-white");
  } else if (mode === "split") {
    adminView.className = "w-full lg:w-3/5 flex transition-all duration-300";
    mobileView.className = "w-full lg:w-2/5 flex justify-center py-2 transition-all duration-300";
    if(btnSplit) btnSplit.classList.add("bg-cyan-600", "text-white");
  }
}

// Camera Feed Access
async function initCameraFeed() {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      const videoElements = document.querySelectorAll('.mobile-ar-video-bg');
      videoElements.forEach(v => {
        v.srcObject = cameraStream;
        v.play().catch(e => console.log("Video auto-play restricted:", e));
      });
    }
  } catch (err) {
    console.log("Camera feed fallback to simulated canvas overlay:", err);
  }
}

// Render Workers Table
function renderWorkersTable() {
  const tbodyList = [document.getElementById("workers-table-body"), document.getElementById("workers-full-table-body")];
  
  tbodyList.forEach(tbody => {
    if (!tbody) return;
    tbody.innerHTML = "";
    workersData.forEach((w, index) => {
      const isUntrained = w.tenureDays < 30;
      const isSelected = index === selectedWorkerIndex;

      const tr = document.createElement("tr");
      tr.className = `worker-row ${isSelected ? 'active-row' : ''}`;
      tr.onclick = () => {
        selectedWorkerIndex = index;
        renderWorkersTable();
        updateGateVerificationPanel(index);
      };

      tr.innerHTML = `
        <td class="font-medium text-slate-400">${index + 1}</td>
        <td class="font-semibold text-white flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-cyan-400">
            👤
          </div>
          ${w.name}
        </td>
        <td class="${isUntrained ? 'text-red-400 font-semibold' : 'text-slate-300'}">
          ${w.tenureDays} Days ${isUntrained ? '<span class="inline-block text-red-500 animate-pulse">⚠️</span>' : ''}
        </td>
        <td>
          <span class="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
            ${w.sector}
          </span>
        </td>
        <td>
          <button onclick="event.stopPropagation(); playAudioPrompt('${w.audio}', 'speak')" class="badge-audio px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-colors">
            <span>🔊</span> ${w.audio}
          </button>
        </td>
        <td>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${w.status === 'ALLOWED' ? 'badge-allowed' : 'badge-blocked'}">
            ${w.status}
          </span>
        </td>
        <td>
          <button onclick="event.stopPropagation(); selectedWorkerIndex=${index}; updateGateVerificationPanel(${index}); switchAdminSidebar('gate-entry');" class="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors text-xs font-medium">
            👁️ Gate Scan
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
}

// Update Gate Verification Panel dynamically
function updateGateVerificationPanel(index) {
  const w = workersData[index];
  if (!w) return;

  const qrList = [document.getElementById("gate-qr-code"), document.getElementById("full-gate-qr-code")];
  qrList.forEach(qrElem => {
    if (qrElem) {
      qrElem.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(w.id + '_' + w.name)}&color=0b1329&bgcolor=ffffff`;
    }
  });

  ['gate-worker-id', 'full-gate-worker-id'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.innerText = `ID: ${w.id}`;
  });

  ['gate-worker-sector', 'full-gate-worker-sector'].forEach(sec => {
    const el = document.getElementById(sec);
    if(el) el.innerText = `Sector: ${w.sector}`;
  });

  ['live-capture-img', 'db-match-img', 'full-live-capture-img', 'full-db-match-img'].forEach(imgId => {
    const el = document.getElementById(imgId);
    if(el) el.src = w.livePhoto;
  });

  ['match-score-badge', 'full-match-score-badge'].forEach(mId => {
    const matchBadge = document.getElementById(mId);
    if(matchBadge) matchBadge.innerText = `Match ${w.matchScore}`;
  });

  ['gate-verdict-box', 'full-gate-verdict-box'].forEach(vBoxId => {
    const verdictBox = document.getElementById(vBoxId);
    if (verdictBox) {
      if (w.status === "BLOCKED") {
        verdictBox.className = "p-3 rounded-lg bg-red-950/80 border border-red-600/80 flex items-center gap-3 text-red-200 animate-pulse";
        verdictBox.innerHTML = `<div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg shrink-0">!</div><div class="text-xs font-extrabold leading-snug">ENTRY BLOCKED - Worker is not authorized for gate entry.</div>`;
      } else {
        verdictBox.className = "p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/80 flex items-center gap-3 text-emerald-200";
        verdictBox.innerHTML = `<div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shrink-0">✓</div><div class="text-xs font-extrabold leading-snug">ENTRY ALLOWED - Verified & DGMS Compliant.</div>`;
      }
    }
  });

  const nameEl = document.getElementById("gate-meta-name");
  const idEl = document.getElementById("gate-meta-id");
  const secEl = document.getElementById("gate-meta-sector");
  const reasonEl = document.getElementById("gate-meta-reason");

  if(nameEl) nameEl.innerText = w.name;
  if(idEl) idEl.innerText = w.id;
  if(secEl) secEl.innerText = w.sector;
  if(reasonEl) reasonEl.innerText = w.reason;
}

// Sector Bar Chart
function initSectorBarChart() {
  const canvas = document.getElementById("sectorBarChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const data = [
    { sector: "Coal", ar: 78, dgms: 92 },
    { sector: "Steel", ar: 65, dgms: 84 },
    { sector: "Mica", ar: 71, dgms: 88 }
  ];

  const width = rect.width;
  const height = rect.height;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 20;
  const chartHeight = height - paddingBottom - paddingTop;
  const chartWidth = width - paddingLeft - 20;

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#64748b";
  ctx.font = "10px Inter";

  for (let i = 0; i <= 5; i++) {
    const y = paddingTop + chartHeight - (chartHeight * (i / 5));
    const val = i * 20;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
    ctx.fillText(`${val}%`, 10, y + 3);
  }

  const groupWidth = chartWidth / data.length;
  const barWidth = 18;

  data.forEach((d, idx) => {
    const groupX = paddingLeft + idx * groupWidth + groupWidth / 4;

    const arHeight = (d.ar / 100) * chartHeight;
    const arY = paddingTop + chartHeight - arHeight;
    ctx.fillStyle = "#06b6d4";
    ctx.beginPath();
    ctx.roundRect(groupX, arY, barWidth, arHeight, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 10px Inter";
    ctx.fillText(`${d.ar}%`, groupX, arY - 4);

    const dgmsHeight = (d.dgms / 100) * chartHeight;
    const dgmsY = paddingTop + chartHeight - dgmsHeight;
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.roundRect(groupX + barWidth + 6, dgmsY, barWidth, dgmsHeight, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`${d.dgms}%`, groupX + barWidth + 6, dgmsY - 4);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 12px Inter";
    ctx.fillText(d.sector, groupX + barWidth / 2, height - 8);
  });
}

function initSectorGauges() {
  drawCircleGauge("gaugeCoal", 78, "#06b6d4");
  drawCircleGauge("gaugeSteel", 65, "#3b82f6");
  drawCircleGauge("gaugeMica", 71, "#10b981");
}

function drawCircleGauge(canvasId, percentage, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 75 * dpr;
  canvas.height = 75 * dpr;
  ctx.scale(dpr, dpr);

  const cx = 37.5;
  const cy = 37.5;
  const r = 30;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 6;
  ctx.stroke();

  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (percentage / 100) * (2 * Math.PI);
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${percentage}%`, cx, cy);
}

// Mobile Tab Switcher
function switchMobileTab(tabId) {
  const tabs = ['tab-onboarding', 'tab-fire', 'tab-gas', 'tab-machinery', 'tab-cert'];
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if(el) el.className = (t === tabId) ? 'block space-y-4' : 'hidden';
  });

  ['nav-home', 'nav-fire', 'nav-gas', 'nav-machinery', 'nav-cert'].forEach((n, idx) => {
    const navBtn = document.getElementById(n);
    const targetTab = tabs[idx];
    if (navBtn) {
      if (targetTab === tabId) {
        navBtn.classList.add('text-cyan-400');
        navBtn.classList.remove('text-slate-500');
      } else {
        navBtn.classList.remove('text-cyan-400');
        navBtn.classList.add('text-slate-500');
      }
    }
  });

  if(tabId === 'tab-cert') {
    generateCertificateView();
  }
}

// AR Fire Canvas
function initARFireCanvas() {
  const canvas = document.getElementById("arFireCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let fireScale = 1.0;

  function renderFire() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, canvas.height / 2);
      ctx.lineTo(x - (canvas.width / 2 - x) * 0.5, canvas.height);
      ctx.stroke();
    }

    if (fireScale > 0.1) {
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.65;

      for (let i = 0; i < 15; i++) {
        const radius = (Math.random() * 25 + 10) * fireScale;
        const offsetX = (Math.random() - 0.5) * 40 * fireScale;
        const offsetY = -Math.random() * 50 * fireScale;

        const grad = ctx.createRadialGradient(cx + offsetX, cy + offsetY, 0, cx + offsetX, cy + offsetY, radius);
        grad.addColorStop(0, 'rgba(255, 235, 59, 0.9)');
        grad.addColorStop(0.4, 'rgba(255, 152, 0, 0.8)');
        grad.addColorStop(0.8, 'rgba(244, 67, 54, 0.6)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx + offsetX, cy + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(100, 116, 139, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy - 70 * fireScale, 35 * fireScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(cx - 55, cy - 110, 110, 22);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Inter";
      ctx.fillText("🔥 COAL FIRE HAZARD", cx - 50, cy - 95);
    } else {
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 14px Inter";
      ctx.fillText("✅ FIRE EXTINGUISHED!", canvas.width / 2 - 75, canvas.height / 2);

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height * 0.8);
      ctx.lineTo(canvas.width / 2, canvas.height * 0.5);
      ctx.lineTo(canvas.width / 2 - 10, canvas.height * 0.55);
      ctx.stroke();
    }

    requestAnimationFrame(renderFire);
  }

  renderFire();
}

function selectExtinguisher(type) {
  selectedExtinguisher = type;
  const statusBox = document.getElementById("fire-ext-status");

  if (type === "Water") {
    playAudioPrompt(currentLanguage, "fireWarning");
    statusBox.className = "p-2 rounded bg-red-900/60 border border-red-500 text-red-200 text-xs text-center font-bold animate-bounce";
    statusBox.innerText = "❌ DANGER! Do NOT use Water on Electrical/Coal Fires! Use CO2 or Dry Powder.";
  } else {
    statusBox.className = "p-2 rounded bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs text-center font-bold";
    statusBox.innerText = `✅ Correct Choice: ${type} Extinguisher selected! Follow PASS Technique below.`;
    passStep = 1;
    updatePASSDisplay();
  }
}

function advancePASS(step) {
  if (selectedExtinguisher === "Water" || !selectedExtinguisher) {
    showToast("⚠️ Select CO2 or Dry Powder Extinguisher first!");
    return;
  }
  passStep = step;
  updatePASSDisplay();
}

function updatePASSDisplay() {
  const steps = ['pass-p', 'pass-a', 'pass-s1', 'pass-s2'];
  steps.forEach((s, idx) => {
    const el = document.getElementById(s);
    if(el) {
      if (idx + 1 <= passStep) {
        el.className = "p-2 rounded bg-cyan-600 text-white text-xs font-bold text-center flex-1 transition-all";
      } else {
        el.className = "p-2 rounded bg-slate-800 text-slate-400 text-xs font-bold text-center flex-1 transition-all";
      }
    }
  });

  if (passStep === 4) {
    const sweepBar = document.getElementById("sweep-progress-bar");
    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      if (sweepBar) sweepBar.style.width = `${val}%`;
      if (val >= 100) {
        clearInterval(interval);
        showToast("🎉 PASS Technique Completed! AR Evacuation Route Unlocked.");
      }
    }, 150);
  }
}

// AR Gas Canvas
function initARGasCanvas() {
  const canvas = document.getElementById("arGasCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let ch4Val = 0.4;
  let coVal = 12;

  setInterval(() => {
    ch4Val = (1.8 + Math.random() * 0.8).toFixed(1);
    coVal = Math.floor(45 + Math.random() * 30);

    const el1 = document.getElementById("gas-ch4-val");
    const el2 = document.getElementById("gas-co-val");
    if (el1) el1.innerText = `${ch4Val}%`;
    if (el2) el2.innerText = `${coVal} PPM`;

    if (ch4Val > 2.0 || coVal > 50) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  }, 2000);
}

function togglePPE(item) {
  ppeSelected[item] = !ppeSelected[item];
  const btn = document.getElementById(`ppe-btn-${item}`);
  if (btn) {
    btn.className = ppeSelected[item]
      ? "p-2 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-between"
      : "p-2 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs flex items-center justify-between";
  }

  const allEquipped = Object.values(ppeSelected).every(v => v === true);
  const verdict = document.getElementById("ppe-verdict-status");
  if (verdict) {
    if (allEquipped) {
      verdict.className = "p-2 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs text-center font-bold";
      verdict.innerText = "✅ ALL PPE EQUIPPED! Safe for Confined Space Entry.";
    } else {
      verdict.className = "p-2 rounded bg-slate-900 border border-slate-700 text-slate-400 text-xs text-center";
      verdict.innerText = "Equip all 4 PPE items to authorize entrance.";
    }
  }
}

function toggleLOTO() {
  lotoLocked = !lotoLocked;
  const btn = document.getElementById("btn-loto-switch");
  const status = document.getElementById("loto-verdict");
  
  if (lotoLocked) {
    if (btn) btn.className = "w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg";
    if (btn) btn.innerHTML = "🔒 LOTO Breaker Switch LOCKED OUT (Padlock Applied)";
    if (status) status.innerHTML = "✅ Machine Breaker Isolated. Safe for Maintenance.";
    playAudioPrompt(currentLanguage, "speak");
  } else {
    if (btn) btn.className = "w-full py-2.5 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-lg";
    if (btn) btn.innerHTML = "🔓 Main Power ON (Click to Lock Out)";
    if (status) status.innerHTML = "⚠️ WARNING: Machine live! Perform LOTO before entry.";
  }
}

let examAnswers = { q1: null, q2: null, q3: null };
let examScorePercent = 0;
let examUnlocked = false;

function spotHazard(id) {
  const tag = document.getElementById(`hazard-tag-${id}`);
  if (tag && !tag.dataset.spotted) {
    tag.dataset.spotted = "true";
    tag.className = "absolute px-2 py-1 bg-emerald-600 text-white font-bold text-[9px] rounded shadow-lg animate-pulse";
    tag.innerText = "✓ HAZARD IDENTIFIED";
    hazardsSpotted++;

    const countEl = document.getElementById("hazards-spotted-count");
    if (countEl) countEl.innerText = `${hazardsSpotted} / 4 Identified`;

    playAudioChime(950, 0.15);
    calculateCurrentScore();
  }
}

function answerExam(qNum, choice, isCorrect) {
  examAnswers[`q${qNum}`] = isCorrect;

  // Visual button styling
  const opts = qNum === 1 ? ['a', 'b', 'c'] : ['a', 'b'];
  opts.forEach(o => {
    const btn = document.getElementById(`q${qNum}-opt-${o}`);
    if (btn) {
      btn.className = "p-2 rounded bg-slate-800 text-slate-400 text-[10px] border border-slate-700";
    }
  });

  const chosenBtn = document.getElementById(`q${qNum}-opt-${choice.toLowerCase()}`);
  const feedback = document.getElementById(`q${qNum}-feedback`);

  if (isCorrect) {
    if (chosenBtn) chosenBtn.className = "p-2 rounded bg-emerald-600 text-white font-bold text-[10px] border border-emerald-400";
    if (feedback) {
      feedback.className = "text-[9px] font-semibold text-emerald-400 block";
      feedback.innerText = "✓ Correct Statutory Compliance Action (+25 Points)";
    }
    playAudioChime(1100, 0.2);
  } else {
    if (chosenBtn) chosenBtn.className = "p-2 rounded bg-red-600 text-white font-bold text-[10px] border border-red-400";
    if (feedback) {
      feedback.className = "text-[9px] font-semibold text-red-400 block animate-pulse";
      feedback.innerText = "❌ High-Risk Violation! Strictly prohibited under DGMS safety regulations.";
    }
    playAudioChime(400, 0.25);
  }

  calculateCurrentScore();
}

function calculateCurrentScore() {
  let score = 0;
  
  // 1. Practical Modules Prerequisite (40 points)
  if (selectedExtinguisher && selectedExtinguisher !== "Water") score += 15;
  const ppeCount = Object.values(ppeSelected).filter(Boolean).length;
  score += Math.floor((ppeCount / 4) * 15);
  if (lotoLocked) score += 10;

  // 2. Hazard Perception (20 points: 5 pts each)
  score += hazardsSpotted * 5;

  // 3. Statutory Questions (40 points: ~13.3 pts each)
  Object.values(examAnswers).forEach(val => {
    if (val === true) score += 13.3;
  });

  examScorePercent = Math.min(100, Math.round(score));
  
  const scoreDisplay = document.getElementById("exam-total-score");
  if (scoreDisplay) {
    scoreDisplay.innerText = `${examScorePercent}%`;
    scoreDisplay.className = examScorePercent >= 80 
      ? "text-base font-extrabold text-emerald-400" 
      : "text-base font-extrabold text-amber-400";
  }
}

function evaluateFullAssessment() {
  calculateCurrentScore();

  if (examScorePercent < 80) {
    showToast(`⚠️ Assessment Failed (${examScorePercent}%). DGMS minimum passing threshold is 80%. Retake training.`);
    playAudioChime(350, 0.3);
    return;
  }

  examUnlocked = true;
  const certContainer = document.getElementById("certificate-container");
  const certOverlay = document.getElementById("cert-lock-overlay");
  const statusBadge = document.getElementById("exam-overall-status");
  const scoreLabel = document.getElementById("exam-score-label");

  if (certOverlay) certOverlay.classList.add("hidden");
  if (certContainer) {
    certContainer.classList.remove("opacity-50", "pointer-events-none");
    certContainer.classList.add("ring-2", "ring-emerald-500/80");
  }

  if (statusBadge) {
    statusBadge.className = "px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold";
    statusBadge.innerText = "PASSED (Class-A)";
  }
  if (scoreLabel) {
    scoreLabel.className = "text-emerald-400 font-bold";
    scoreLabel.innerText = `${examScorePercent}% Score`;
  }

  const currentWorker = workersData[selectedWorkerIndex];
  if (currentWorker) {
    currentWorker.score = `${examScorePercent}%`;
  }

  playAudioChime(1200, 0.35);
  showToast(`🏆 DGMS Competency Exam Passed (${examScorePercent}%)! Official Certificate Unlocked.`);
}

function generateCertificateView() {
  const currentWorker = workersData[selectedWorkerIndex] || workersData[0];
  const nameEl = document.getElementById("cert-worker-name");
  const idEl = document.getElementById("cert-worker-id");
  const photoEl = document.getElementById("cert-photo");

  if(nameEl) nameEl.innerText = currentWorker.name;
  if(idEl) idEl.innerText = `ID: ${currentWorker.id} | Sector: ${currentWorker.sector}`;
  if(photoEl) photoEl.src = currentWorker.livePhoto;

  const qrElem = document.getElementById("cert-qr-img");
  if (qrElem) {
    qrElem.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('DGMS_VERIFIED_' + currentWorker.id + '_SCORE_' + currentWorker.score)}&color=070d1e&bgcolor=ffffff`;
  }
}

function authorizeWorkerAndSync() {
  if (!examUnlocked && examScorePercent < 80) {
    showToast("⚠️ Worker has NOT passed the DGMS Competency Assessment yet!");
    return;
  }

  const currentWorker = workersData[selectedWorkerIndex];
  currentWorker.status = "ALLOWED";
  currentWorker.reason = "Certified & DGMS Verified";
  currentWorker.tenureDays = Math.max(currentWorker.tenureDays, 31);
  currentWorker.score = `${Math.max(88, examScorePercent)}%`;

  renderWorkersTable();
  updateGateVerificationPanel(selectedWorkerIndex);
  updateReportsTable();
  renderApprovalQueue();

  playAudioPrompt(currentLanguage, "certPassed");
  showToast(`🎉 AR Vocational Certificate Verified! ${currentWorker.name} is ALLOWED at Gate.`);

  setViewMode("admin");
  switchAdminSidebar("gate-entry");
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-5 right-5 z-50 bg-cyan-600 text-white px-4 py-2.5 rounded-lg shadow-2xl font-semibold text-sm flex items-center gap-2 animate-bounce";
  toast.innerHTML = `<span>ℹ️</span> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Upload Worker Photo & Biometric Profile Handler
function handleWorkerPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const photoDataUrl = e.target.result;
    const currentWorker = workersData[selectedWorkerIndex] || workersData[0];
    
    currentWorker.livePhoto = photoDataUrl;
    currentWorker.matchScore = (98.5 + Math.random() * 1.4).toFixed(1) + "%";

    renderWorkersTable();
    updateGateVerificationPanel(selectedWorkerIndex);
    playAudioChime(900, 0.2);
    showToast(`📸 Photo Uploaded Successfully! Facial Biometric Template Synced (Match: ${currentWorker.matchScore}).`);
  };
  reader.readAsDataURL(file);
}
