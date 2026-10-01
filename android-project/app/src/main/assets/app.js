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

// Multilingual Dictionary (Santali ᱥᱟᱱᱛᱟᱲᱤ, Hindi हिन्दी, English) for Complete 1-Tap UI Localization
const translations = {
  Santali: {
    mobileAppTitle: "ᱮ.ᱟᱨ. ᱵᱷᱳᱠᱮᱥᱱᱟᱞ ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    offlineBadge: "⚡ ᱚᱯᱷᱞᱟᱭᱤᱱ ᱰᱤᱵᱤ ᱪᱟᱹᱞᱩ",
    selectLang: "ᱯᱟᱹᱨᱥᱤ:",
    headerLangLabel: "ᱯᱟᱹᱨᱥᱤ:",
    btnAdmin: "ᱣᱮᱵᱽ ᱮᱰᱢᱤᱱ",
    btnMobile: "ᱢᱳᱵᱟᱭᱤᱞ AR ᱮᱯ",

    // Home / Onboarding
    audioTitle: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱟᱲᱟᱝ ᱟᱧᱡᱚᱢ ᱢᱮ",
    audioSub: "ᱟᱲᱟᱝ ᱛᱮ ᱥᱮᱪᱮᱫ ᱟᱧᱡᱚᱢ ᱞᱟᱹᱜᱤᱫ ᱚᱛᱟᱭ ᱢᱮ",
    hwAccelTitle: "📱 ᱢᱳᱵᱟᱭᱤᱞ ᱦᱟᱨᱰᱣᱮᱨ ᱮᱠᱥᱮᱞᱮᱨᱮᱥᱚᱱ",
    hwAccelLbl: "ᱠᱮᱢᱮᱨᱟ AR ᱧᱮᱞ",
    hwAccelStatus: "ᱪᱟᱹᱞᱩ (᱓᱖᱐° ᱜᱟᱭᱨᱳ)",
    selectModuleTitle: "AR ᱥᱩᱨᱚᱠᱷᱟ ᱢᱳᱰᱤᱭᱩᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:",
    mod1Title: "ᱢᱳᱰᱤᱭᱩᱞ ᱑: ᱥᱮᱸᱜᱮᱞ ᱟᱨ PASS ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    mod1Sub: "ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱟᱨ AR ᱵᱟᱧᱪᱟᱣ",
    mod2Title: "ᱢᱳᱰᱤᱭᱩᱞ ᱒: ᱡᱚᱦᱚᱨ ᱜᱮᱥ ᱟᱨ ᱥᱩᱨᱚᱠᱷᱟ ᱡᱟᱭᱜᱟ",
    mod2Sub: "ᱜᱮᱥ ᱰᱤᱴᱮᱠᱴᱚᱨ HUD ᱟᱨ ᱔-ᱯᱤᱥ PPE",
    mod3Title: "ᱢᱳᱰᱤᱭᱩᱞ ᱓: ᱢᱮᱥᱤᱱ LOTO ᱥᱩᱨᱚᱠᱷᱟ ᱱᱤᱭᱚᱢ",
    mod3Sub: "ᱞᱚᱠ-ᱟᱣᱩᱴ ᱴᱮᱜ-ᱟᱣᱩᱴ ᱯᱟᱣᱟᱨ ᱵᱚᱸᱫᱽ",
    modCertTitle: "AR ᱠᱩᱠᱞᱤ ᱟᱨ QR ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ",
    modCertSub: "ᱢᱮᱫ-ᱢᱩᱸᱦᱟᱹᱰ ᱪᱤᱱᱦᱟᱹᱯ ᱟᱨ ᱜᱮᱴ ᱥᱤᱝᱠ",

    // Module 1: Fire & PASS
    fireTitle: "🔥 ᱥᱮᱸᱜᱮᱞ ᱟᱨ PASS ᱥᱤᱢᱩᱞᱮᱴᱚᱨ (ᱥᱟᱱᱛᱟᱲᱤ)",
    lblExtTitle: "᱑. ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱥᱟᱫᱷᱚᱱ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:",
    btnExtWater: "🚰 ᱫᱟᱜ (Water)",
    btnExtFoam: "🧼 ᱯᱷᱳᱢ (Foam)",
    btnExtCo2: "🧯 CO2 (ᱜᱮᱥ)",
    btnExtPowder: "💨 ᱯᱟᱣᱰᱚᱨ (DCP)",
    fireExtPrompt: "ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱛᱟᱱ ᱨᱮ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
    waterDanger: "❌ ᱠᱷᱚᱛᱨᱟ! ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱥᱮᱸᱜᱮᱞ ᱨᱮ ᱫᱟᱜ ᱟᱞᱚᱢ ᱫᱩᱞᱟ! CO2 ᱵᱮᱵᱷᱟᱨ ᱢᱮ᱾",
    extSelected: "ᱴᱷᱤᱠ ᱜᱮᱭᱟ: ᱮᱠᱥᱴᱤᱝᱜᱩᱭᱤᱥᱚᱨ ᱵᱟᱪᱷᱟᱣ ᱮᱱᱟ! ᱞᱟᱛᱟᱨ PASS ᱱᱤᱭᱚᱢ ᱯᱟᱸᱡᱟᱭ ᱢᱮ᱾",
    firePassTitle: "᱒. PASS ᱱᱤᱭᱚᱢ ᱫᱷᱟᱯ: ᱯᱤᱱ ᱚᱨ ➔ ᱱᱤᱥᱟᱱᱟ ➔ ᱫᱟᱵᱟᱣ ➔ ᱦᱤᱞᱟᱹᱣ",
    passP: "᱑. ᱯᱤᱱ ᱚᱨ",
    passA: "᱒. ᱱᱤᱥᱟᱱᱟ",
    passS1: "᱓. ᱫᱟᱵᱟᱣ",
    passS2: "᱔. ᱦᱤᱞᱟᱹᱣ",

    // Module 2: Gas & PPE
    gasTitle: "⚠️ ᱡᱚᱦᱚᱨ ᱜᱮᱥ HUD (ᱥᱟᱱᱛᱟᱲᱤ)",
    lblGasHudTitle: "ᱢᱟᱞᱴᱤ-ᱜᱮᱥ ᱰᱤᱴᱮᱠᱴᱚᱨ HUD",
    lblGasWarning: "⚠️ ᱪᱮᱛᱟᱣᱱᱤ: ᱡᱟᱹᱥᱛᱤ ᱜᱮᱥ ᱧᱟᱢ ᱟᱠᱟᱱᱟ!",
    lblPpeTitle: "ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱓D PPE ᱠᱤᱴ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:",
    txtPpeHelmet: "🪖 ᱠᱷᱟᱫᱟᱱ ᱦᱮᱞᱢᱮᱴ",
    txtPpeHarness: "🦺 ᱥᱮᱯᱷᱴᱤ ᱦᱟᱨᱱᱮᱥ",
    txtPpeMask: "😷 ᱜᱮᱥ ᱢᱟᱥᱠ",
    txtPpeDetector: "📟 ᱜᱮᱥ ᱰᱤᱴᱮᱠᱴᱚᱨ",
    ppeVerdictInitial: "ᱵᱷᱤᱛᱨᱤ ᱵᱚᱞᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱔ ᱜᱚᱴᱟᱝ PPE ᱦᱚᱨᱚᱜ ᱢᱮ᱾",
    ppeVerdictDone: "✅ ᱡᱚᱛᱚ PPE ᱦᱚᱨᱚᱜ ᱦᱩᱭ ᱮᱱᱟ! ᱵᱚᱞᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ ᱜᱮᱭᱟ᱾",

    // Module 3: LOTO
    lotoTitle: "🚜 ᱢᱮᱥᱤᱱ LOTO ᱥᱩᱨᱚᱠᱷᱟ ᱱᱤᱭᱚᱢ (ᱥᱟᱱᱛᱟᱲᱤ)",
    lotoCardTitle: "ᱞᱚᱠ-ᱟᱣᱩᱴ ᱴᱮᱜ-ᱟᱣᱩᱴ (LOTO) ᱯᱟᱣᱟᱨ ᱵᱚᱸᱫᱽ",
    lotoCardDesc: "ᱢᱮᱥᱤᱱ ᱥᱟᱯᱷᱟ ᱞᱟᱦᱟᱨᱮ Main Breaker Off ᱠᱟᱛᱮ Lock Out ᱢᱮ",
    lotoSwitchOn: "🔓 ᱢᱩᱬ ᱯᱟᱣᱟᱨ ON (ᱞᱚᱠ ᱞᱟᱹᱜᱤᱫ ᱚᱛᱟᱭ ᱢᱮ)",
    lotoSwitchOff: "🔒 LOTO ᱯᱟᱣᱟᱨ ᱵᱚᱸᱫᱽ ᱮᱱᱟ (ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱮᱱᱟ)",
    lotoVerdictDanger: "⚠️ ᱪᱮᱛᱟᱣᱱᱤ: ᱢᱮᱥᱤᱱ ᱪᱟᱹᱞᱩ ᱢᱮᱱᱟᱜ-ᱟ! ᱞᱟᱦᱟᱨᱮ LOTO ᱠᱚᱨᱟᱣ ᱢᱮ᱾",
    lotoVerdictSafe: "✅ ᱢᱮᱥᱤᱱ ᱯᱟᱣᱟᱨ ᱵᱚᱸᱫᱽ ᱮᱱᱟ᱾ ᱥᱟᱯᱷᱟ ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱥᱩᱨᱚᱠᱷᱤᱛ ᱜᱮᱭᱟ᱾",

    // Module 4: Hazard Scan & Quiz
    examStatusTitle: "DGMS ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱩᱨᱚᱠᱷᱟ ᱥᱴᱮᱴᱟᱥ",
    badgeTxtFire: "ᱥᱮᱸᱜᱮᱞ PASS",
    badgeTxtGas: "ᱜᱮᱥ & PPE",
    badgeTxtLoto: "LOTO ᱥᱩᱭᱤᱪ",
    badgeTxtExam: "ᱯᱚᱨᱤᱠᱷᱟ",
    phase1Title: "🎯 ᱫᱷᱟᱯ ᱑: ᱓D ᱠᱷᱟᱫᱟᱱ ᱵᱤᱯᱚᱛ ᱪᱤᱱᱦᱟᱹᱣ",
    phase1Desc: "ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱔ ᱜᱚᱴᱟᱝ ᱵᱤᱯᱚᱛ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:",
    hazardTag1: "⚡ ᱑᱑kV ᱠᱷᱩᱞᱟᱹ ᱛᱟᱨ",
    hazardTag2: "💨 ᱒.᱔% ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ",
    hazardTag3: "🛒 ᱵᱤᱱᱟ ᱪᱟᱠᱟ-ᱨᱳᱠ ᱴᱨᱚᱞᱤ",
    hazardTag4: "🪨 ᱪᱮᱛᱟᱱ ᱪᱷᱟᱛ ᱨᱟᱹᱯᱩᱫ",
    hazardsSpottedText: "ᱪᱤᱱᱦᱟᱹᱣ ᱮᱱᱟ",
    phase2Title: "📝 ᱫᱷᱟᱯ ᱒: DGMS ᱱᱤᱭᱚᱢ ᱠᱩᱠᱞᱤ",
    phase2PassThresh: "ᱯᱟᱥ: ≥᱘᱐% ᱞᱟᱹᱠᱛᱤ",
    q1Title: "᱑. ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱵᱤᱡᱽᱞᱤ ᱥᱮᱸᱜᱮᱞ ᱨᱮ ᱚᱠᱟ ᱥᱟᱫᱷᱚᱱ ᱵᱟᱝ ᱵᱮᱵᱷᱟᱨᱚᱜ-ᱟ?",
    q1OptA: "🚰 ᱫᱟᱜ (Water Jet) - ᱠᱷᱚᱛᱨᱟ!",
    q1OptB: "🧯 CO2 ᱜᱮᱥ",
    q1OptC: "💨 ᱰᱨᱟᱭ ᱯᱟᱣᱰᱚᱨ (DCP)",
    q2Title: "᱒. ᱜᱮᱥ HUD ᱨᱮ Methane (CH4) > ᱒.᱐% ᱧᱟᱢ ᱞᱮᱱᱠᱷᱟᱱ ᱯᱩᱭᱞᱩ ᱠᱟᱹᱢᱤ ᱪᱮᱫ?",
    q2OptA: "ᱯᱷᱮᱱ ᱪᱟᱹᱞᱩ ᱠᱟᱛᱮ ᱛᱟᱦᱮᱸᱱ ᱢᱮ",
    q2OptB: "🚨 ᱞᱚᱜᱚᱱ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ ᱟᱨ ᱥᱟᱨᱫᱟᱨ ᱞᱟᱹᱭᱟᱭ ᱢᱮ",
    q3Title: "᱓. CEA ᱱᱤᱭᱚᱢ ᱑᱑᱖ ᱞᱮᱠᱟᱛᱮ ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱨᱳᱞᱟᱨ ᱥᱟᱯᱷᱟ ᱞᱟᱦᱟᱨᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱦᱩᱭᱩᱜ-ᱟ?",
    q3OptA: "🔒 Breaker ᱵᱚᱸᱫᱽ ᱠᱟᱛᱮ LOTO ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱢᱮ",
    q3OptB: "ᱜᱟᱛᱮ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱞᱟᱹᱭᱟᱭ ᱢᱮ",
    lblCandScore: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱠᱳᱨ:",
    lblScoreThresh: "(ᱯᱟᱥ: ᱘᱐%)",
    btnSubmitExam: "ᱯᱚᱨᱤᱠᱷᱟ ᱡᱚᱢᱟᱭ ᱢᱮ",

    // Certificate
    certLockTitle: "DGMS ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱞᱚᱠ ᱢᱮᱱᱟᱜ-ᱟ",
    certLockDesc: "᱘᱐% ᱥᱠᱳᱨ ᱠᱟᱛᱮ ᱚᱯᱷᱤᱥᱤᱭᱟᱞ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱠᱷᱩᱞᱟᱹᱭ ᱢᱮ",
    certHeading: "DGMS ᱵᱷᱳᱠᱮᱥᱱᱟᱞ ᱥᱮᱯᱷᱴᱤ ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ",
    lblBreakdownTitle: "ᱥᱩᱨᱚᱠᱷᱟ ᱵᱤᱵᱚᱨᱚᱬ:",
    lblBkFire: "ᱥᱮᱸᱜᱮᱞ PASS ᱱᱤᱭᱚᱢ:",
    lblBkGas: "ᱡᱚᱦᱚᱨ ᱜᱮᱥ & 3D PPE:",
    lblBkLoto: "ᱢᱮᱥᱤᱱ LOTO ᱥᱩᱭᱤᱪ:",
    lblBkExam: "ᱵᱤᱯᱚᱛ ᱪᱤᱱᱦᱟᱹᱣ & ᱯᱚᱨᱤᱠᱷᱟ:",
    lblBtnClaim: "ᱥᱟᱹᱛ ᱟᱨ ᱥᱤᱝᱠ",
    lblBtnPrint: "ᱯᱨᱤᱱᱴ PDF",

    // Bottom Nav
    navLblHome: "ᱚᱲᱟᱜ",
    navLblFire: "ᱥᱮᱸᱜᱮᱞ",
    navLblGas: "ᱜᱮᱥ AR",
    navLblLoto: "LOTO",
    navLblCert: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ"
  },
  Hindi: {
    mobileAppTitle: "ए.आर. व्यावसायिक सुरक्षा सिमुलेटर",
    offlineBadge: "⚡ ऑफलाइन डेटाबेस सक्रिय",
    selectLang: "भाषा:",
    headerLangLabel: "भाषा:",
    btnAdmin: "वेब एडमिन",
    btnMobile: "मोबाइल AR ऐप",

    // Home / Onboarding
    audioTitle: "हिन्दी में आवाज निर्देश सुनें",
    audioSub: "आदिवासी कामगारों के लिए ध्वनि निर्देश सुनने हेतु टैप करें",
    hwAccelTitle: "📱 मोबाइल हार्डवेयर त्वरण",
    hwAccelLbl: "कैमरा AR व्यू",
    hwAccelStatus: "सक्रिय (360° जाइरोस्कोप)",
    selectModuleTitle: "AR सुरक्षा मॉड्यूल चुनें:",
    mod1Title: "मॉड्यूल 1: अग्नि सुरक्षा एवं PASS सिमुलेटर",
    mod1Sub: "अग्निशामक चयन एवं निकासी",
    mod2Title: "मॉड्यूल 2: जहरीली गैस एवं सीमित स्थान सुरक्षा",
    mod2Sub: "गैस डिटेक्टर HUD एवं 4-पीस PPE",
    mod3Title: "मॉड्यूल 3: भारी मशीनरी LOTO सुरक्षा नियम",
    mod3Sub: "लॉक-आउट टैग-आउट ब्रेकर आइसोलेशन",
    modCertTitle: "AR परीक्षा एवं QR प्रमाणपत्र जनरेटर",
    modCertSub: "बायोमेट्रिक मिलान एवं गेट सत्यापन",

    // Module 1: Fire & PASS
    fireTitle: "🔥 अग्नि सुरक्षा एवं PASS सिमुलेटर (हिन्दी)",
    lblExtTitle: "1. अग्निशामक का प्रकार चुनें:",
    btnExtWater: "🚰 पानी (Water)",
    btnExtFoam: "🧼 झाग (Foam)",
    btnExtCo2: "🧯 CO2 गैस",
    btnExtPowder: "💨 सूखा पाउडर (DCP)",
    fireExtPrompt: "प्रारंभ करने के लिए ऊपर अग्निशामक चुनें।",
    waterDanger: "❌ खतरा! बिजली या कोयले की आग पर पानी न डालें! CO2 का उपयोग करें।",
    extSelected: "सही चुनाव: अग्निशामक चुना गया! नीचे PASS तकनीक का पालन करें।",
    firePassTitle: "2. PASS तकनीक: पिन खींचें ➔ निशाना लगाएं ➔ दबाएं ➔ घुमाएं",
    passP: "1. पिन खींचें",
    passA: "2. निशाना लगाएं",
    passS1: "3. दबाएं",
    passS2: "4. घुमाएं",

    // Module 2: Gas & PPE
    gasTitle: "⚠️ जहरीली गैस एवं सीमित स्थान HUD (हिन्दी)",
    lblGasHudTitle: "मल्टी-गैस डिटेक्टर HUD",
    lblGasWarning: "⚠️ चेतावनी: जहरीली गैस का उच्च स्तर!",
    lblPpeTitle: "आवश्यक 3D सुरक्षा PPE किट पहनें:",
    txtPpeHelmet: "🪖 खनन हेलमेट",
    txtPpeHarness: "🦺 सुरक्षा हार्नेस",
    txtPpeMask: "😷 गैस मास्क",
    txtPpeDetector: "📟 गैस डिटेक्टर",
    ppeVerdictInitial: "प्रवेश के लिए सभी 4 PPE उपकरण पहनें।",
    ppeVerdictDone: "✅ सभी 4 PPE उपकरण पहने गए! प्रवेश सुरक्षित है।",

    // Module 3: LOTO
    lotoTitle: "🚜 भारी मशीनरी LOTO सुरक्षा नियम (हिन्दी)",
    lotoCardTitle: "लॉक-आउट टैग-आउट (LOTO) पावर ब्रेकर बंद",
    lotoCardDesc: "कन्वेयर या मशीनरी मरम्मत से पहले मेन ब्रेकर बंद कर ताला लगाएं।",
    lotoSwitchOn: "🔓 मेन पावर ON (लॉक आउट करने के लिए क्लिक करें)",
    lotoSwitchOff: "🔒 LOTO पावर ब्रेकर लॉक आउट (पैडलॉक लागू)",
    lotoVerdictDanger: "⚠️ चेतावनी: मशीन चालू है! प्रवेश से पहले LOTO करें।",
    lotoVerdictSafe: "✅ मशीन आइसोलेटेड। मरम्मत कार्य के लिए सुरक्षित।",

    // Module 4: Hazard Scan & Quiz
    examStatusTitle: "DGMS व्यावसायिक योग्यता स्थिति",
    badgeTxtFire: "अग्नि PASS",
    badgeTxtGas: "गैस & PPE",
    badgeTxtLoto: "LOTO स्विच",
    badgeTxtExam: "परीक्षा",
    phase1Title: "🎯 चरण 1: 3D खदान खतरा पहचान स्कैन",
    phase1Desc: "धनबाद कोयला सीम में सभी 4 प्रमुख खतरों की पहचान करें:",
    hazardTag1: "⚡ 11kV खुला केबल",
    hazardTag2: "💨 2.4% मीथेन गैस जमाव",
    hazardTag3: "🛒 बिना-रोक ढलान ट्रॉली",
    hazardTag4: "🪨 छत की कमजोर परत",
    hazardsSpottedText: "पहचाना गया",
    phase2Title: "📝 चरण 2: DGMS वैधानिक सुरक्षा प्रश्न",
    phase2PassThresh: "उत्तीर्ण: ≥80% अनिवार्य",
    q1Title: "1. कोयला खदान में बिजली की आग पर कौन सा अग्निशामक पूरी तरह वर्जित है?",
    q1OptA: "🚰 पानी की बौछार (घातक झटका)",
    q1OptB: "🧯 CO2 गैस",
    q1OptC: "💨 सूखा पाउडर (DCP)",
    q2Title: "2. यदि मल्टी-गैस HUD में मीथेन (CH4) > 2.0% दिखे, तो आपका पहला कदम क्या होगा?",
    q2OptA: "पंखा चलाकर काम जारी रखें",
    q2OptB: "🚨 हवा के रुख के विपरीत निकलें व ओवरमैन को बताएं",
    q3Title: "3. CEA नियम 116 के अनुसार कोयला कन्वेयर रोलर सफाई से पहले क्या अनिवार्य है?",
    q3OptA: "🔒 ब्रेकर बंद कर LOTO पैडलॉक लगाएं",
    q3OptB: "साथी कामगार को बता दें",
    lblCandScore: "उम्मीदवार योग्यता स्कोर:",
    lblScoreThresh: "(पास सीमा: 80%)",
    btnSubmitExam: "परीक्षा सबमिट करें",

    // Certificate
    certLockTitle: "DGMS प्रमाणपत्र लॉक है",
    certLockDesc: "सरकारी प्रमाणपत्र अनलॉक करने हेतु 80% या अधिक अंक प्राप्त करें।",
    certHeading: "DGMS व्यावसायिक सुरक्षा प्रमाण पत्र",
    lblBreakdownTitle: "योग्यता विवरण:",
    lblBkFire: "अग्नि PASS प्रोटोकॉल:",
    lblBkGas: "जहरीली गैस एवं 3D PPE:",
    lblBkLoto: "मशीनरी LOTO स्विच:",
    lblBkExam: "खतरा पहचान एवं परीक्षा:",
    lblBtnClaim: "प्रमाणित एवं सिंक करें",
    lblBtnPrint: "प्रिंट PDF",

    // Bottom Nav
    navLblHome: "होम",
    navLblFire: "अग्नि AR",
    navLblGas: "गैस AR",
    navLblLoto: "LOTO",
    navLblCert: "प्रमाणपत्र"
  },
  English: {
    mobileAppTitle: "AR Vocational Simulator",
    offlineBadge: "⚡ Offline DB Active",
    selectLang: "Language:",
    headerLangLabel: "Lang:",
    btnAdmin: "Web Admin",
    btnMobile: "Mobile AR App",

    // Home / Onboarding
    audioTitle: "Listen to Voice Guidance",
    audioSub: "Tap to play voice guidance for tribal recruits",
    hwAccelTitle: "📱 Mid-Range Hardware Acceleration",
    hwAccelLbl: "Camera AR Viewport",
    hwAccelStatus: "Active (Gyroscope 360° Fallback)",
    selectModuleTitle: "Select AR Vocational Safety Module:",
    mod1Title: "Module 1: Fire & PASS Simulator",
    mod1Sub: "Extinguisher Choice & AR Evacuation",
    mod2Title: "Module 2: Gas Leak & Confined Space",
    mod2Sub: "Multi-Gas Detector HUD & 4-Piece PPE",
    mod3Title: "Module 3: Machinery LOTO Protocol",
    mod3Sub: "Lock-Out Tag-Out Breaker Isolation",
    modCertTitle: "AR Quiz & QR Certificate Generator",
    modCertSub: "Anti-Proxy Face Match & Gate Sync",

    // Module 1: Fire & PASS
    fireTitle: "🔥 Fire Response & PASS Simulator (English)",
    lblExtTitle: "1. Select Extinguisher Type:",
    btnExtWater: "🚰 Water",
    btnExtFoam: "🧼 Foam",
    btnExtCo2: "🧯 CO2 Gas",
    btnExtPowder: "💨 Dry Powder",
    fireExtPrompt: "Select an extinguisher above to begin.",
    waterDanger: "❌ DANGER! Do NOT use Water on Electrical/Coal Fires! Use CO2 or Dry Powder.",
    extSelected: "Correct Choice: Extinguisher selected! Follow PASS Technique below.",
    firePassTitle: "2. PASS Technique Sequence: Pull ➔ Aim ➔ Squeeze ➔ Sweep",
    passP: "1. PULL",
    passA: "2. AIM",
    passS1: "3. SQUEEZE",
    passS2: "4. SWEEP",

    // Module 2: Gas & PPE
    gasTitle: "⚠️ Toxic Gas & Confined Space HUD (English)",
    lblGasHudTitle: "MULTI-GAS DETECTOR HUD",
    lblGasWarning: "⚠️ WARNING: HIGH GAS LEVEL DETECTED",
    lblPpeTitle: "Required 3D PPE Kit Verification:",
    txtPpeHelmet: "🪖 Mining Helmet",
    txtPpeHarness: "🦺 Safety Harness",
    txtPpeMask: "😷 Gas Rescuer Mask",
    txtPpeDetector: "📟 Gas Detector",
    ppeVerdictInitial: "Equip all 4 PPE items to authorize entrance.",
    ppeVerdictDone: "✅ ALL PPE EQUIPPED! Safe for Confined Space Entry.",

    // Module 3: LOTO
    lotoTitle: "🚜 Heavy Machinery LOTO Protocol (English)",
    lotoCardTitle: "Lock-Out Tag-Out (LOTO) Breaker Isolation",
    lotoCardDesc: "Isolate power before entering dumper or conveyor belt maintenance area.",
    lotoSwitchOn: "🔓 Main Power ON (Click to Lock Out)",
    lotoSwitchOff: "🔒 LOTO Breaker Switch LOCKED OUT (Padlock Applied)",
    lotoVerdictDanger: "⚠️ WARNING: Machine live! Perform LOTO before entry.",
    lotoVerdictSafe: "✅ Machine Breaker Isolated. Safe for Maintenance.",

    // Module 4: Hazard Scan & Quiz
    examStatusTitle: "DGMS Vocational Competency Status",
    badgeTxtFire: "Fire PASS",
    badgeTxtGas: "Gas & PPE",
    badgeTxtLoto: "LOTO Switch",
    badgeTxtExam: "Assessment",
    phase1Title: "🎯 Phase 1: 3D Mine Hazard Perception Scan",
    phase1Desc: "Identify all 4 critical hazards in the Dhanbad Coal Seam viewport:",
    hazardTag1: "⚡ 11kV Exposed Cable",
    hazardTag2: "💨 2.4% Methane Accumulation",
    hazardTag3: "🛒 Un-chocked Incline Haulage",
    hazardTag4: "🪨 Delaminated Roof Layer",
    hazardsSpottedText: "Identified",
    phase2Title: "📝 Phase 2: DGMS Statutory Scenario Questions",
    phase2PassThresh: "Pass: ≥80% Required",
    q1Title: "1. Which extinguisher is strictly PROHIBITED on electrical fires in coal seams?",
    q1OptA: "🚰 Water Jet (Fatal Shock)",
    q1OptB: "🧯 CO2 Gas",
    q1OptC: "💨 Dry Powder (DCP)",
    q2Title: "2. If your Multi-Gas HUD alerts Methane (CH4) > 2.0%, what is your immediate statutory action?",
    q2OptA: "Continue with fan",
    q2OptB: "🚨 Evacuate upwind & alert Overman",
    q3Title: "3. Under CEA Rule 116, what must be done before cleaning coal conveyor rollers?",
    q3OptA: "🔒 Isolate Breaker & Apply LOTO Padlock",
    q3OptB: "Just inform buddy worker",
    lblCandScore: "Candidate Competency Score:",
    lblScoreThresh: "(Threshold: 80%)",
    btnSubmitExam: "Submit Assessment",

    // Certificate
    certLockTitle: "DGMS Certificate Locked",
    certLockDesc: "Complete Hazard Perception & Score ≥ 80% on Statutory Scenarios to unlock official credential.",
    certHeading: "DGMS VOCATIONAL SAFETY CERTIFICATE",
    lblBreakdownTitle: "Competency Breakdown:",
    lblBkFire: "Fire PASS Protocol:",
    lblBkGas: "Toxic Gas & 3D PPE:",
    lblBkLoto: "Machinery LOTO Switch:",
    lblBkExam: "Hazard Perception & Exam:",
    lblBtnClaim: "Authorize & Sync",
    lblBtnPrint: "Print PDF",

    // Bottom Nav
    navLblHome: "Home",
    navLblFire: "Fire AR",
    navLblGas: "Gas AR",
    navLblLoto: "LOTO",
    navLblCert: "Cert QR"
  }
};

// Audio Prompts with Phonetic Synthesizer Fallbacks (Santali Ol Chiki -> Hindi Phonetics for TTS engines)
const audioPrompts = {
  Santali: {
    display: "ᱡᱚᱦᱟᱨ! ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱨ.ᱮ. ᱵᱷᱳᱠᱮᱥᱱᱟᱞ ᱥᱩᱨᱚᱠᱷᱟ ᱴᱨᱮᱱᱤᱝ ᱨᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾",
    speak: "जोहार! झारखंड एआर सेफ्टी वोकेशनल ट्रेनिंग रे आपनाग सगुन दाराम। सुरखित ताहेन मे आर नियम मानो मे।",
    fireWarning: "चेतावनी! बिजली आर कोयला सेंगेल रे दाग आलोम दुला! CO2 से ड्राई पाउडर Extinguisher बेवहार मे!",
    passInstruction: "पास नियम: पिन ओर ओडोक मे, निसाना बनाओ मे, हैंडल दबाओ मे आर हिलाओ मे!",
    gasAlert: "खतरा! खदान रे मिथेन आर कार्बन मोनोक्साइड गेस लीक हुयुग काना! तुरंत मास्क होरोग मे!",
    certPassed: "मानाव सरि! आम DGMS AR वोकेशनल सेफ्टी परिक्षा रेम पास एना! आपनाग लाइसेंस गेट रे सिंक एना।"
  },
  Hindi: {
    display: "जोहार! झारखंड औद्योगिक एआर सुरक्षा पोर्टल में आपका स्वागत है।",
    speak: "जोहार! झारखंड औद्योगिक एआर सुरक्षा एवं व्यावसायिक प्रशिक्षण पोर्टल में आपका स्वागत है। सुरक्षित रहें, सतर्क रहें।",
    fireWarning: "चेतावनी! बिजली या कोयले की आग पर पानी कभी न डालें! CO2 या सूखा पाउडर अग्निशामक का उपयोग करें!",
    passInstruction: "PASS तकनीक: सुरक्षा पिन खींचें, आग की जड़ पर निशाना लगाएं, हैंडल दबाएं और झाड़ू की तरह घुमाएं!",
    gasAlert: "खतरा! खदान में जहरीली मीथेन गैस का स्तर बढ़ रहा है! तुरंत सेल्फ-रेस्क्यूअर गैस मास्क पहनें!",
    certPassed: "बधाई हो! आपने डीजीएमएस व्यावसायिक एआर सुरक्षा प्रमाणन सफलतापूर्वक उत्तीर्ण कर लिया है।"
  },
  English: {
    display: "Welcome to Jharkhand Industrial AR Safety & Vocational Compliance Portal.",
    speak: "Welcome to Jharkhand Industrial AR Safety and Vocational Certification Portal. Stay safe and compliant.",
    fireWarning: "Warning! Never use water on electrical or coal seam fires! Select CO2 or dry powder extinguisher.",
    passInstruction: "PASS technique: Pull safety pin, aim at fire base, squeeze handle, and sweep side to side.",
    gasAlert: "Danger! Toxic methane gas level rising. Equip self-rescuer gas mask immediately.",
    certPassed: "Congratulations! You have passed the official DGMS AR Vocational Safety Certification."
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
  const savedLang = localStorage.getItem('jh_ar_language') || "Santali";
  selectLanguage(savedLang, false);
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

// Voice Speech Synthesis - Bridge to Native Android TTS in APK with Browser WebSpeech fallback
function playAudioPrompt(lang, promptKey = "speak") {
  const selectedLang = lang || currentLanguage || "Santali";
  const promptObj = audioPrompts[selectedLang] || audioPrompts.Hindi;
  const spokenText = promptObj[promptKey] || promptObj.speak || promptObj.display;

  // 1. Play tactile acoustic chime
  playAudioChime(800, 0.15);

  // 2. Execute via Native Android TTS Bridge if running inside Android APK
  let playedNative = false;
  if (window.AndroidTTS && typeof window.AndroidTTS.speak === "function") {
    try {
      window.AndroidTTS.speak(spokenText, selectedLang);
      playedNative = true;
    } catch (e) {
      console.warn("AndroidTTS native call failed:", e);
    }
  }

  // 3. Fallback to Web Speech API if in web browser
  if (!playedNative && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = (selectedLang === "English") ? "en-IN" : "hi-IN";
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("speechSynthesis call failed:", e);
    }
  }

  const promptTextContainer = document.getElementById("audio-prompt-text");
  if (promptTextContainer) {
    promptTextContainer.innerHTML = `<span class="speaking-wave"><bar></bar><bar></bar><bar></bar></span> <strong>Speaking (${selectedLang}):</strong> "${spokenText.substring(0, 45)}..."`;
  }

  showToast(`🔊 ${selectedLang}: "${spokenText.substring(0, 40)}..."`);
}

// Helper to safely set element innerText
function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) {
    el.innerText = val;
  }
}

// Single-Tap Instant 3-Language UI & Audio Switcher
function selectLanguage(lang, shouldSpeak = true) {
  if (!translations[lang]) lang = "Santali";
  currentLanguage = lang;
  try {
    localStorage.setItem('jh_ar_language', lang);
  } catch (e) {}

  // 1. Highlight all 1-tap language toggle buttons across desktop, mobile bar, and in-module headers
  ['Santali', 'Hindi', 'English'].forEach(l => {
    const btns = document.querySelectorAll(`.btn-lang-${l.toLowerCase()}`);
    btns.forEach(btn => {
      if (l === lang) {
        btn.className = btn.className
          .replace(/bg-slate-800 text-slate-300|bg-slate-800 text-slate-400|border-slate-700/g, '')
          .trim() + ' bg-cyan-600 text-white shadow-md border-cyan-300 scale-105';
      } else {
        btn.className = btn.className
          .replace(/bg-cyan-600 text-white shadow-md border-cyan-300 scale-105|bg-cyan-600 text-white shadow/g, '')
          .trim() + ' bg-slate-800 text-slate-400 border-slate-700';
      }
    });
  });

  const t = translations[lang];

  // 2. Header & Global UI Localization
  setText("mobile-app-title", t.mobileAppTitle);
  setText("mobile-offline-badge", t.offlineBadge);
  setText("lbl-select-lang", t.selectLang);
  setText("header-lang-label", t.headerLangLabel);
  setText("btn-lbl-admin", t.btnAdmin);
  setText("btn-lbl-mobile", t.btnMobile);

  // 3. Home / Onboarding Tab
  setText("audio-prompt-title", t.audioTitle);
  setText("audio-prompt-sub", t.audioSub);
  setText("hw-accel-title", t.hwAccelTitle);
  setText("hw-accel-lbl", t.hwAccelLbl);
  setText("hw-accel-status", t.hwAccelStatus);
  setText("select-module-title", t.selectModuleTitle);
  setText("mod-1-title", t.mod1Title);
  setText("mod-1-sub", t.mod1Sub);
  setText("mod-2-title", t.mod2Title);
  setText("mod-2-sub", t.mod2Sub);
  setText("mod-3-title", t.mod3Title);
  setText("mod-3-sub", t.mod3Sub);
  setText("mod-cert-title", t.modCertTitle);
  setText("mod-cert-sub", t.modCertSub);

  // 4. Module 1: Fire & PASS Simulator
  setText("mod-fire-title", t.fireTitle);
  setText("lbl-ext-title", t.lblExtTitle);
  setText("btn-ext-water", t.btnExtWater);
  setText("btn-ext-foam", t.btnExtFoam);
  setText("btn-ext-co2", t.btnExtCo2);
  setText("btn-ext-powder", t.btnExtPowder);
  setText("fire-pass-title", t.firePassTitle);
  setText("pass-p", t.passP);
  setText("pass-a", t.passA);
  setText("pass-s1", t.passS1);
  setText("pass-s2", t.passS2);

  // 5. Module 2: Toxic Gas & Confined Space
  setText("mod-gas-title", t.gasTitle);
  setText("lbl-gas-hud-title", t.lblGasHudTitle);
  setText("lbl-gas-warning", t.lblGasWarning);
  setText("lbl-ppe-title", t.lblPpeTitle);
  setText("txt-ppe-helmet", t.txtPpeHelmet);
  setText("txt-ppe-harness", t.txtPpeHarness);
  setText("txt-ppe-mask", t.txtPpeMask);
  setText("txt-ppe-detector", t.txtPpeDetector);

  // 6. Module 3: Machinery LOTO
  setText("mod-loto-title", t.lotoTitle);
  setText("loto-card-title", t.lotoCardTitle);
  setText("loto-card-desc", t.lotoCardDesc);
  const btnLoto = document.getElementById("btn-loto-switch");
  const verdictLoto = document.getElementById("loto-verdict");
  if (btnLoto) btnLoto.innerText = lotoLocked ? t.lotoSwitchOff : t.lotoSwitchOn;
  if (verdictLoto) verdictLoto.innerText = lotoLocked ? t.lotoVerdictSafe : t.lotoVerdictDanger;

  // 7. Module 4: Hazard Scan & Statutory Exam
  setText("exam-status-title", t.examStatusTitle);
  setText("badge-txt-fire", t.badgeTxtFire);
  setText("badge-txt-gas", t.badgeTxtGas);
  setText("badge-txt-loto", t.badgeTxtLoto);
  setText("badge-txt-exam", t.badgeTxtExam);
  setText("phase-1-title", t.phase1Title);
  setText("phase-1-desc", t.phase1Desc);
  setText("hazard-tag-1", t.hazardTag1);
  setText("hazard-tag-2", t.hazardTag2);
  setText("hazard-tag-3", t.hazardTag3);
  setText("hazard-tag-4", t.hazardTag4);
  setText("phase-2-title", t.phase2Title);
  setText("phase-2-pass-thresh", t.phase2PassThresh);
  setText("q1-title", t.q1Title);
  setText("q1-opt-a", t.q1OptA);
  setText("q1-opt-b", t.q1OptB);
  setText("q1-opt-c", t.q1OptC);
  setText("q2-title", t.q2Title);
  setText("q2-opt-a", t.q2OptA);
  setText("q2-opt-b", t.q2OptB);
  setText("q3-title", t.q3Title);
  setText("q3-opt-a", t.q3OptA);
  setText("q3-opt-b", t.q3OptB);
  setText("lbl-cand-score", t.lblCandScore);
  setText("lbl-score-thresh", t.lblScoreThresh);
  setText("btn-submit-exam", t.btnSubmitExam);

  // 8. DGMS Vocational Certificate Screen
  setText("cert-lock-title", t.certLockTitle);
  setText("cert-lock-desc", t.certLockDesc);
  setText("cert-heading", t.certHeading);
  setText("lbl-breakdown-title", t.lblBreakdownTitle);
  setText("lbl-bk-fire", t.lblBkFire);
  setText("lbl-bk-gas", t.lblBkGas);
  setText("lbl-bk-loto", t.lblBkLoto);
  setText("lbl-bk-exam", t.lblBkExam);
  setText("lbl-btn-claim", t.lblBtnClaim);
  setText("lbl-btn-print", t.lblBtnPrint);

  // 9. Bottom Navigation Bar
  setText("nav-lbl-home", t.navLblHome);
  setText("nav-lbl-fire", t.navLblFire);
  setText("nav-lbl-gas", t.navLblGas);
  setText("nav-lbl-loto", t.navLblLoto);
  setText("nav-lbl-cert", t.navLblCert);

  // 10. Trigger spoken audio guidance
  if (shouldSpeak) {
    playAudioPrompt(lang, 'speak');
  }
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

  // Re-apply language translations to ensure all dynamic elements in this tab are localized
  selectLanguage(currentLanguage, false);

  if (tabId === 'tab-fire') {
    playAudioPrompt(currentLanguage, 'fireWarning');
  } else if (tabId === 'tab-gas') {
    playAudioPrompt(currentLanguage, 'gasAlert');
  } else if (tabId === 'tab-machinery') {
    playAudioPrompt(currentLanguage, 'passInstruction');
  } else if (tabId === 'tab-cert') {
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
  const t = translations[currentLanguage] || translations.Santali;

  if (type === "Water") {
    playAudioPrompt(currentLanguage, "fireWarning");
    if (statusBox) {
      statusBox.className = "p-2 rounded bg-red-900/60 border border-red-500 text-red-200 text-xs text-center font-bold animate-bounce";
      statusBox.innerText = t.waterDanger;
    }
  } else {
    if (statusBox) {
      statusBox.className = "p-2 rounded bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs text-center font-bold";
      statusBox.innerText = `✅ ${t.extSelected} (${type})`;
    }
    passStep = 1;
    updatePASSDisplay();
    playAudioPrompt(currentLanguage, "passInstruction");
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
  const t = translations[currentLanguage] || translations.Santali;
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
      verdict.innerText = t.ppeVerdictDone;
      playAudioPrompt(currentLanguage, "gasAlert");
    } else {
      verdict.className = "p-2 rounded bg-slate-900 border border-slate-700 text-slate-400 text-xs text-center";
      verdict.innerText = t.ppeVerdictInitial;
    }
  }
}

function toggleLOTO() {
  lotoLocked = !lotoLocked;
  const btn = document.getElementById("btn-loto-switch");
  const status = document.getElementById("loto-verdict");
  const t = translations[currentLanguage] || translations.Santali;
  
  if (lotoLocked) {
    if (btn) {
      btn.className = "w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg";
      btn.innerText = t.lotoSwitchOff;
    }
    if (status) {
      status.className = "text-[10px] text-emerald-400 font-bold";
      status.innerText = t.lotoVerdictSafe;
    }
    playAudioPrompt(currentLanguage, "passInstruction");
  } else {
    if (btn) {
      btn.className = "w-full py-2.5 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-lg";
      btn.innerText = t.lotoSwitchOn;
    }
    if (status) {
      status.className = "text-[10px] text-amber-400 font-bold";
      status.innerText = t.lotoVerdictDanger;
    }
  }
}

let examAnswers = { q1: null, q2: null, q3: null };
let examScorePercent = 0;
let examUnlocked = false;

function spotHazard(id) {
  const tag = document.getElementById(`hazard-tag-${id}`);
  const t = translations[currentLanguage] || translations.Santali;
  if (tag && !tag.dataset.spotted) {
    tag.dataset.spotted = "true";
    tag.className = "absolute px-2 py-1 bg-emerald-600 text-white font-bold text-[9px] rounded shadow-lg animate-pulse";
    tag.innerText = "✓ " + (t.hazardsSpottedText || "Identified");
    hazardsSpotted++;

    const countEl = document.getElementById("hazards-spotted-count");
    if (countEl) countEl.innerText = `${hazardsSpotted} / 4 ${t.hazardsSpottedText || "Identified"}`;

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
  playAudioPrompt(currentLanguage, "certPassed");
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
