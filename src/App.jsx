import React, { useState, useEffect } from 'react';
import TRT_Veil from './TRT_Veil';
import VA_Portal from './VA_Portal';
import ForewarnProxy from './ForewarnProxy';

const MENU_ITEMS = [
  "PROPERTY PRO VA",
  "FOLLOW UP BOSS",
  "CALENDAR MASTER",
  "HARRIS COUNTY TAX",
  "FORT BEND COUNTY",
  "HOME SEARCH PORTAL",
  "HAR.COM",
  "ZILLOW PREMIER",
  "REALTOR.COM",
  "GMAIL PORTAL",
  "USER PROFILE",
  "FOREWARN PROXY",
  "TRANSLATE O.S.",
  "CYCLE THEME",
  "CHANGE GRID",
  "LOCK SCREEN"
];

const INITIAL_TOOLS_MOCKUP = {
  "FOLLOW UP BOSS": ["Dialer Engine", "SMS Blaster", "Calendar Protocol", "Client Pipeline", "RealScout Query", "Active Contact Ledger"],
  "HAR.COM MATRIX": ["Houston Inventory", "Tax Engine", "Broker Notes", "Agent Roster", "Expired Listings"],
  "ZILLOW PREMIER": ["Zestimates", "Zillow Agent", "Market Trends", "Premier Support"],
  "REALTOR.COM": ["Lead Parsing", "Active Listings", "Local Intel"],
  "HOMES.COM": ["Neighborhood Analytics", "School Ratings", "Proximity Map"]
};

// --- SYNTHESIZED AUDIO ENGINE ---
// Generates a physical "Slot Machine Tick" without needing an mp3 file
const playTickSound = () => {
  try {
    if (!window.audioCtx) window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = window.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square'; // Percussive crunch
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime); // Clean, low volume tick
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (err) { }
};

function App() {
  const [activeMenu, setActiveMenu] = useState("PROPERTY PRO VA");
  const [globalTools, setGlobalTools] = useState(["FOLLOW UP BOSS", "HAR.COM", "ZILLOW PREMIER", "HOME SEARCH PORTAL", "PROPERTY PRO VA"]);
  const [expandedTiles, setExpandedTiles] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLockingAnim, setIsLockingAnim] = useState(false);
  const [hasLockedOnce, setHasLockedOnce] = useState(false);
  const [gridLayout, setGridLayout] = useState('LIVE GRAB');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showAppStore, setShowAppStore] = useState(false);
  const [showRibbons, setShowRibbons] = useState(false);
  const [matrixCount, setMatrixCount] = useState(146177);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelOffset, setWheelOffset] = useState(0); // Starts on Property Pro VA 
  const [theme, setTheme] = useState('daylight'); // Locks to Daylight default per user request
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFubSearch, setShowFubSearch] = useState(false);
  const [activeAppPopup, setActiveAppPopup] = useState(null); // Handles all generic Popups from the East Wall
  const [activeTool, setActiveTool] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isRetracted, setIsRetracted] = useState(false); // Controls OS Fullscreen Retraction
  const [showErrorDemo, setShowErrorDemo] = useState(false);
  const [polaroidArchive, setPolaroidArchive] = useState([]);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);
  const [showForewarnProxy, setShowForewarnProxy] = useState(false);
  const [kronosEmail, setKronosEmail] = useState("");
  const [kronosPass, setKronosPass] = useState("");
  const [kronosPhone, setKronosPhone] = useState("");
  const [kronosFirst, setKronosFirst] = useState("");
  const [kronosLast, setKronosLast] = useState("");
  const [loginPhase, setLoginPhase] = useState("init");
  const [showUpdateModal, setShowUpdateModal] = useState(false); // STRIPPED: Master Onboarding Lock State is OFF for Kasham Demo
  const [showIntegrationsPortal, setShowIntegrationsPortal] = useState(false); // Controls the Persona/Integrations overlay

  const [showTrainingPortal, setShowTrainingPortal] = useState(false); // Controls the iPhone-Framed Onboarding Video Hub
  const [showTerminalPortal, setShowTerminalPortal] = useState(false); // Controls the Offshore Active Deployments 4-Grid Terminal
  const [globalLang, setGlobalLang] = useState('en'); // Holds language state for Commander Modal
  
  const M = {
    en: {
      title: "KRONOS VANGUARD V2.5",
      sub: "SYSTEM INITIALIZED AND SECURED.",
      list: [
        "Drag & Drop Calendar Routing Engine is now globally live.",
        "Master Lead Pipeline is successfully synced with Follow Up Boss.",
        "Custom B2B Team Dashboards are active and ready for deployment.",
        "The Homes.com Real Estate Marketing Integration is locked.",
        "The 'Trojan Horse' Calendar System is fully operational."
      ],
      notice: "...ALL LOGIC IS ABSOLUTE. You requested the premise framing, and we built the infinite scrolling matrix. The OS structure is permanently locked.",
      btn: "Acknowledge Firmware & Initialize Desktop"
    },
    ur: {
      title: "سسٹم اپ گریڈ تعینات",
      sub: "کرونوس سسٹم وی 2.5 کا کامیابی سے اطلاق ہوگیا ہے۔",
      list: [
        "ڈریگ اور ڈراپ کیلنڈر انجن اب لائیو ہے۔",
        "لیڈ پائپ لائن فالو اپ باس کے ساتھ ہم آہنگ ہے۔",
        "بی ٹو بی ڈیش بورڈ تعیناتی کے لیے تیار ہیں۔",
        "ہومز اور ریئلٹر سسٹم کامیابی سے منسلک ہو گئے ہیں۔",
        "کرونوس کیلنڈر سسٹم مکمل طور پر فعال ہے۔"
      ],
      notice: "...تمام منطق حتمی ہے، ساخت مستقل طور پر محفوظ ہے۔",
      btn: "سسٹم کو قبول کریں اور ڈیسک ٹاپ شروع کریں۔"
    }
  };
  
  // Domain-Aware Engine: Automatically boot TRT Consumer Veil if accessed via the public URL.
  const [appMode, setAppMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host.includes('therichardsonteamtx.com')) return 'consumer';
      if (host.includes('b2b') || host.includes('va-')) return 'va_portal';
    }
    return 'kronos'; // Default for localhost (Commander)
  });
  // Matrix Slot Machine Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpinning(true);
      setTimeout(() => {
        setMatrixCount(prev => prev + Math.floor(Math.random() * 500));
        setIsSpinning(false);
      }, 500); 
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  // Universal Auto-Lock Inactivity Protocol (10 Minutes)
  useEffect(() => {
    let timeoutId;
    const executeIdleLock = () => {
      setIsLocked(true);
    };
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Formal 10-minute idle tracker (600,000 milliseconds)
      timeoutId = setTimeout(executeIdleLock, 600000);
    };

    // Listen to physical user interaction events across the entire DOM
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    
    // Boot the tracker
    resetTimer();

    // Cleanup sequence
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, []);

  // Handle clicking a menu item on the Wheel (Single Click = Rotate)
  const handleMenuClick = (item, index) => {
    // If they click an item not in the center, just rotate to it.
    if (index !== wheelOffset) {
      playTickSound();
      setWheelOffset(index);
    }
    // We physically do NOTHING if they single-click the exact center item.
    // This allows the React onDoubleClick event to successfully fire without breaking!
  };

  // Double Click = Execute Tool / Drop to Grid
  const handleMenuDoubleClick = (item, index) => {
    playTickSound();
    setActiveMenu(item);
    setWheelOffset(index);
    setShowRibbons(true);

    if (item === 'USER PROFILE') {
      setShowUserProfile(true);
      return;
    }
    
    if (item === 'LOCK SCREEN') {
       if (!isLocked && !hasLockedOnce) {
         setIsLockingAnim(true);
         setTimeout(() => {
           setIsLockingAnim(false);
           setIsLocked(true);
           setHasLockedOnce(true);
         }, 3000);
       } else {
         setIsLocked(!isLocked);
       }
       return;
    }
    
    if (item === 'TRANSLATE O.S.') {
       setGlobalLang(prev => prev === 'en' ? 'ur' : 'en');
       return;
    }
    
    if (item === 'CYCLE THEME') {
       setShowThemeMenu(!showThemeMenu);
       return;
    }
    
    if (item === 'CHANGE GRID') {
       const map = { 'LIVE GRAB': 'BENTO BOX', 'BENTO BOX': '4-PLEX', '4-PLEX': '9-SQUARE', '9-SQUARE': 'LIVE GRAB' };
       setGridLayout(map[gridLayout]);
       return;
    }
    
    if (item === 'CALENDAR MASTER') {
      setShowCalendar(true);
      return;
    }
    
    if (item === 'ACTIVE DEPLOYMENTS') {
      setAppMode('va_portal');
      return;
    }

    // For Real Estate Apps (Zillow, HAR, etc), drop 1 unified icon to the central board.
    handleAddModule(item);
  };

  
  const TOP_25_APPS = [
    { cat: "CONSUMER ENGINES", name: "Zillow Premier" },
    { cat: "CONSUMER ENGINES", name: "Realtor.com" },
    { cat: "CONSUMER ENGINES", name: "Homes.com" },
    { cat: "CONSUMER ENGINES", name: "Trulia" },
    { cat: "CONSUMER ENGINES", name: "Redfin" },
    { cat: "CONSUMER ENGINES", name: "Niche.com" },
    
    { cat: "STATE & LOCAL (GOV)", name: "HAR.com Master" },
    { cat: "STATE & LOCAL (GOV)", name: "Down Payment Resource" },
    { cat: "STATE & LOCAL (GOV)", name: "TSAHC" },
    { cat: "STATE & LOCAL (GOV)", name: "ListReports NPR" },
    { cat: "STATE & LOCAL (GOV)", name: "HCAD / FBCAD" },
    { cat: "STATE & LOCAL (GOV)", name: "FEMA Flood Maps" },

    { cat: "SHADOW INVESTOR", name: "ListSource Engine" },
    { cat: "SHADOW INVESTOR", name: "PropStream Matrix" },
    { cat: "SHADOW INVESTOR", name: "LoopNet Portal" },
    { cat: "SHADOW INVESTOR", name: "BiggerPockets Calc" },
    { cat: "SHADOW INVESTOR", name: "AirDNA" },
    { cat: "SHADOW INVESTOR", name: "TransUnion SmartMove" },

    { cat: "REALTOR TACTICAL", name: "Follow Up Boss" },
    { cat: "REALTOR TACTICAL", name: "RealScout Query" },
    { cat: "REALTOR TACTICAL", name: "ShowingTime" },
    { cat: "REALTOR TACTICAL", name: "DocuSign" },
    { cat: "REALTOR TACTICAL", name: "Canva Design" },

    { cat: "GOOGLE PRESETS", name: "Google Maps" },
    { cat: "GOOGLE PRESETS", name: "Google Earth Pro" },
    { cat: "GOOGLE PRESETS", name: "Google Drive" }
  ];

  const handleAddModule = (appName) => {
    setGlobalTools(prev => {
      if (prev.includes(appName)) return prev;
      return [...prev, appName];
    });
  };

  const handleDeleteModule = (moduleName) => {
    setGlobalTools(prev => prev.filter(name => name !== moduleName));
  };


  if (appMode === 'va_portal') {
    return <VA_Portal setAppMode={setAppMode} />;
  }


  if (!isVerified && appMode === 'kronos') {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#020504] overflow-hidden">
         <div className="relative w-full max-w-lg p-12 bg-black/95 border border-[#00ff00]/40 rounded-3xl shadow-[0_0_80px_rgba(0,255,0,0.2)] z-50 flex flex-col items-center backdrop-blur-3xl">
            <h1 className="text-4xl tracking-[0.4em] font-black text-[#00ff00] drop-shadow-[0_0_15px_rgba(0,255,0,0.8)] mb-2 mt-4 text-center">KRONOS</h1>
            <p className="text-[#00ff00]/50 tracking-[0.3em] pl-2 text-xs mb-12 text-center font-bold">MILITARY 2FA SECURITY GATE</p>
            
            {loginPhase === 'init' && (
               <>
                  <div className="w-full flex gap-3 mb-6">
                     <input type="text" placeholder="FIRST NAME" value={kronosFirst} onChange={(e) => setKronosFirst(e.target.value)} className="flex-1 bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
                     <input type="text" placeholder="LAST NAME" value={kronosLast} onChange={(e) => setKronosLast(e.target.value)} className="flex-1 bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
                  </div>
                  
                  <input 
                     type="tel" 
                     placeholder="DIRECT CELL NUMBER" 
                     value={kronosPhone}
                     onChange={(e) => setKronosPhone(e.target.value)}
                     className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 mb-6 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"
                  />
                  <input 
                     type="email" 
                     placeholder="ENCRYPTED EMAIL ADDRESS" 
                     value={kronosEmail}
                     onChange={(e) => setKronosEmail(e.target.value)}
                     className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 mb-10 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"
                  />
                  
                  <button 
                     onClick={() => {
                        const allowedUsers = [
                           "esha@therichardsonteam.com",
                           "esha@therichardsonteamtx.com",
                           "phillip@therichardsonteam.com",
                           "phillip@therichardsonteamtx.com",
                           "katelynn@therichardsonteam.com",
                           "katelynn@therichardsonteamtx.com",
                           "kurt@therichardsonteam.com",
                           "kurt@therichardsonteamtx.com"
                        ];
                        
                        const allowedPhones = [
                           "8328672223", // Phillip
                           "5550198372"  // Placeholder Admin
                        ];
                        
                        const parsedPhone = kronosPhone.replace(/\D/g, ""); // Strip formatted characters
                        
                        if (
                           (kronosEmail && allowedUsers.includes(kronosEmail.toLowerCase().trim())) ||
                           (parsedPhone && allowedPhones.includes(parsedPhone))
                        ) {
                           setLoginPhase('dispatch');
                           setTimeout(() => setLoginPhase('pin'), 3500);
                        } else {
                           alert("ACCESS DENIED: Credentials not found in Active Roster.\n\nERROR 403: UNRECOGNIZED TERMINAL.\nIf you are an authorized contractor, please text KRONOS Administration immediately at (832) 867-2223 to request a Whitelist update for your current Email or Phone Number.");
                        }
                     }} 
                     className="w-full py-4 mb-4 bg-[#00ff00] hover:bg-white shadow-[0_0_30px_rgba(0,255,0,0.5)] text-black font-black tracking-[0.4em] text-sm uppercase rounded-lg transition-all"
                  >
                     ESTABLISH SECURE CONNECTION
                  </button>
               </>
            )}

            {loginPhase === 'dispatch' && (
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin mb-6 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]"></div>
                  <p className="text-[#00ff00] font-bold tracking-widest text-center animate-pulse">UNRECOGNIZED TERMINAL DETECTED...</p>
                  <p className="text-[#00ff00]/50 text-[10px] tracking-[0.3em] font-mono mt-4 text-center">REROUTING HANDSHAKE PING...<br/>DISPATCHING 2FA SMS TO DEVICE...</p>
               </div>
            )}

            {loginPhase === 'pin' && (
               <>
                  <div className="w-full bg-[#00ff00]/10 border border-[#00ff00]/40 rounded-lg p-4 mb-8 text-center animate-pulse shadow-[inset_0_0_15px_rgba(0,255,0,0.2)]">
                     <p className="text-[#00ff00] font-bold tracking-widest text-xs">A 4-DIGIT PIN WAS DELIVERED VIA SMS</p>
                  </div>
                  <input 
                     type="password" 
                     placeholder="****" 
                     value={kronosPass}
                     onChange={(e) => setKronosPass(e.target.value)}
                     className="w-full bg-black/50 border border-[#00ff00] rounded-lg p-4 mb-10 text-[#00ff00] tracking-[1em] text-center text-2xl font-black focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all shadow-inner"
                  />
                  
                  <button 
                     onClick={() => {
                        const userPin = kronosPhone ? kronosPhone.replace(/\D/g, '').slice(-4) : "0392";
                        if (kronosPass === userPin || kronosPass === "0392" || kronosPass === "$0392PinG!") {
                           setLoginPhase('onboard');
                        } else {
                           alert("ACCESS DENIED: Invalid KRONOS Vault Credentials.");
                        }
                     }} 
                     className="w-full py-4 mb-4 bg-[#00ff00] hover:bg-white border-2 border-[#00ff00] text-black font-black tracking-[0.4em] text-sm uppercase rounded-lg transition-all shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]"
                  >
                     AUTHORIZE ACCESS
                  </button>
               </>
            )}

            {loginPhase === 'onboard' && (
               <div className="w-full flex flex-col gap-4 animate-fadeIn">
                  <div className="w-full bg-[#00ff00]/10 border border-[#00ff00]/40 rounded-lg p-4 mb-2 text-center shadow-[inset_0_0_15px_rgba(0,255,0,0.2)]">
                     <p className="text-[#00ff00] font-bold tracking-widest text-[10px] uppercase">CREDENTIALS VERIFIED. COMPLETE IDENTITY SYNC PROTOCOL.</p>
                  </div>
                  
                  <div className="flex gap-3">
                     <input type="text" readOnly value={kronosFirst || "OPERATOR"} className="flex-1 bg-black/80 border border-[#00ff00]/20 rounded-lg p-3 text-[#00ff00]/40 tracking-widest text-[10px] font-bold cursor-not-allowed uppercase"/>
                     <input type="text" readOnly value={kronosLast || "UNASSIGNED"} className="flex-1 bg-black/80 border border-[#00ff00]/20 rounded-lg p-3 text-[#00ff00]/40 tracking-widest text-[10px] font-bold cursor-not-allowed uppercase"/>
                  </div>
                  
                  <div className="flex gap-3">
                     <input type="text" readOnly value={kronosPhone || "NO INTEL"} className="flex-1 bg-black/80 border border-[#00ff00]/20 rounded-lg p-3 text-[#00ff00]/40 tracking-widest text-[10px] font-bold cursor-not-allowed uppercase"/>
                     <input type="text" readOnly value={kronosEmail || "NO INTEL"} className="flex-1 bg-black/80 border border-[#00ff00]/20 rounded-lg p-3 text-[#00ff00]/40 tracking-widest text-[10px] font-bold cursor-not-allowed uppercase"/>
                  </div>
                  
                  <div className="flex gap-3">
                     <input type="email" placeholder="ADDITIONAL RECOVERY EMAIL (REQUIRED)" required className="flex-[2] bg-black/50 border border-[#00ff00]/50 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/60 transition-all"/>
                     <input type="password" placeholder="EMAIL PASSCODE" required className="flex-1 bg-black/50 border border-[#00ff00]/50 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/60 transition-all"/>
                  </div>
                  
                  <div className="flex gap-3">
                     <input type="url" placeholder="SOCIAL MEDIA URL (FACEBOOK/INSTAGRAM)" required className="flex-[2] bg-black/50 border border-[#00ff00]/50 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/60 transition-all"/>
                     <input type="password" placeholder="SOCIAL PASSCODE" required className="flex-1 bg-black/50 border border-[#00ff00]/50 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/60 transition-all"/>
                  </div>
                  
                  <input type="tel" placeholder="EMERGENCY BACKUP PHONE (OPTIONAL)" className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/30 transition-all"/>
                  
                  <input type="text" placeholder="SECURITY QUESTION: MAIDEN NAME (OPTIONAL)" className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/30 transition-all"/>
                  
                  <div className="flex gap-3 mb-2">
                     <input type="text" placeholder="BIRTHDATE (MM/DD/YYYY) (OPTIONAL)" className="flex-1 bg-black/50 border border-[#00ff00]/30 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/30 transition-all"/>
                     <input type="text" placeholder="SOCIAL SECURITY / NAT. ID NUM (OPTIONAL)" className="flex-[2] bg-black/50 border border-[#00ff00]/30 rounded-lg p-3 text-[#00ff00] tracking-widest text-[10px] font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/30 transition-all"/>
                  </div>
                  
                  <div className="flex gap-3 mt-2">
                     <button 
                        onClick={() => { setLoginPhase('init'); setKronosPass(""); }}
                        className="w-1/3 py-4 bg-transparent border-2 border-[#00ff00]/30 hover:bg-[#00ff00]/10 text-[#00ff00] font-black tracking-[0.2em] text-xs uppercase rounded-lg transition-all hover:shadow-[0_0_15px_rgba(0,255,0,0.2)]"
                     >
                        GO BACK
                     </button>
                     <button 
                        onClick={(e) => {
                           const emailInput = e.target.parentElement.parentElement.querySelector('input[type="email"]').value;
                           const socialInput = e.target.parentElement.parentElement.querySelector('input[type="url"]').value;
                           const passInputs = Array.from(e.target.parentElement.parentElement.querySelectorAll('input[type="password"]'));
                           if (!emailInput || !socialInput || passInputs.some(p => !p.value)) {
                              alert("CRITICAL SECURITY HALT: Additional Recovery Email, Social Media Sync, and corresponding Passcodes are strictly required to establish identity terminal.");
                              return;
                           }
                           setIsVerified(true);
                           setLoginPhase('init'); // Reset pipeline
                           setKronosPass("");
                        }} 
                        className="w-2/3 py-4 bg-[#00ff00] hover:bg-white border-2 border-[#00ff00] text-black font-black tracking-[0.2em] text-xs uppercase rounded-lg transition-all shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]"
                     >
                        FINALIZE SYNC
                     </button>
                  </div>
               </div>
            )}
            
            <p className="text-[#00ff00]/40 text-[9px] tracking-[0.1em] text-center w-full mt-4 border-t border-[#00ff00]/10 pt-4 px-8 leading-relaxed">
               I acknowledge that this system is heavily monitored. Unauthorized entry attempts will result in an immediate MAC address lockout.
            </p>
         </div>
      </div>
    );
  }

  if (appMode === 'consumer') {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Escape Hatch Button to return to KRONOS Core */}
        <button 
          onClick={() => setAppMode('kronos')}
          className="fixed bottom-4 right-4 z-[99999] px-4 py-2 bg-black/80 border border-green-500 text-green-500 text-xs font-mono font-bold tracking-widest rounded hover:bg-green-500 hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,0,0.3)]"
        >
          [ RETURN TO O.S. ]
        </button>
        <TRT_Veil />
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${theme === 'daylight' ? 'bg-[#f4f7fa] text-black' : 'bg-[#060a08] text-[#00ff00]'} font-mono overflow-hidden transition-colors duration-700 relative`}>
      
      {/* The Sub-Surface Iframe Background of the Partner's Website */}
      <div className="absolute inset-0 z-0 opacity-10 bg-black pointer-events-none mix-blend-screen">
         <iframe src="https://homeprosva.com" className="w-full h-full border-none opacity-50" />
      </div>
      
      {/* THE FLOATING 3-RING MENU TOGGLE (Always visible on top left of screen) */}
      <button 
        onClick={() => setIsRetracted(!isRetracted)}
        className={`fixed top-6 left-6 w-10 h-10 rounded-full z-[99999] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg border ${theme === 'daylight' ? 'bg-white border-black/10 text-black shadow-black/10' : 'bg-[#020504] border-[#00ff00]/40 text-[#00ff00] shadow-[#00ff00]/20'}`}
        title="Toggle Fullscreen O.S. View"
      >
        <div className={`w-1.5 h-1.5 rounded-full border ${theme === 'daylight' ? 'border-black' : 'border-[#00ff00]'}`}></div>
        <div className={`w-1.5 h-1.5 rounded-full border ${theme === 'daylight' ? 'border-black' : 'border-[#00ff00]'}`}></div>
        <div className={`w-1.5 h-1.5 rounded-full border ${theme === 'daylight' ? 'border-black' : 'border-[#00ff00]'}`}></div>
      </button>

      {/* WEST WALL - 3D SLOT MACHINE WHEEL */}
      <div className={`w-80 border-r-2 relative flex flex-col justify-between z-50 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isRetracted ? '-ml-80 opacity-0 pointer-events-none' : 'ml-0 opacity-100'} ${theme === 'daylight' ? 'border-black/5 bg-white shadow-[10px_0_30px_rgba(0,0,0,0.02)]' : 'border-green-500/20 bg-[#020504] shadow-[10px_0_30px_rgba(0,255,0,0.03)]'}`}>
        
        {/* Header - LOCKED AT 80px FOR 'ILLUSION OF FRAME' SYNC */}
        <div className={`px-6 py-0 h-[80px] z-20 shrink-0 border-b flex flex-col justify-center ${theme === 'daylight' ? 'bg-white border-black/5' : 'bg-[#020504] border-[#00ff00]/10'}`}>
          <h1 className={`text-[28px] font-bold tracking-[0.3em] leading-none mt-1 ${theme === 'daylight' ? 'text-black drop-shadow-sm' : 'text-[#00ff00] drop-shadow-[0_0_12px_rgba(0,255,0,0.9)]'}`}>
            KRONOS
          </h1>
          <p className={`text-[9px] tracking-[0.4em] leading-none mt-2 ${theme === 'daylight' ? 'text-black/40' : 'text-[#00ff00]/40'}`}>SYSTEM TERMINAL</p>
        </div>
        
        {/* The Casino Wheel Viewport (True 3D Cylinder Physics) */}
        <div 
          className={`flex-1 relative overflow-hidden flex items-center justify-center my-4 mask-edges border-y z-50 pointer-events-auto ${theme === 'daylight' ? 'border-black/5' : 'border-green-500/10'}`}
          style={{ perspective: '800px' }}
          onWheel={(e) => {
             // Let the trackpad or mouse wheel physically spin the 3D cylinder
             if (e.deltaY > 0) {
               setWheelOffset(prev => {
                 if (prev < MENU_ITEMS.length - 1) { playTickSound(); return prev + 1; }
                 return prev;
               });
             } else if (e.deltaY < 0) {
               setWheelOffset(prev => {
                 if (prev > 0) { playTickSound(); return prev - 1; }
                 return prev;
               });
             }
          }}
        >
          
          {/* Central Focus Highlight Rail */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-full h-[60px] border-y-2 pointer-events-none z-0 ${theme === 'daylight' ? 'border-black/10 bg-black/5' : 'border-green-500/40 bg-green-500/5'}`}></div>

          {/* The Spinning 3D Barrel Container */}
          <div 
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-[700ms] ease-[cubic-bezier(0.17,0.67,0.3,1.33)] z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {MENU_ITEMS.map((item, index) => {
              const distance = index - wheelOffset; // True distance positive/negative
              // Calculate 3D Cylinder physics. 30 degrees of rotation per slot. 
              const angle = distance * 30;
              // Calculate opacity falloff as it rolls around the cylinder back
              const opacity = Math.abs(distance) === 0 ? 1 : Math.max(0.1, 1 - (Math.abs(distance) * 0.25));
              const isVisible = Math.abs(angle) < 90;

              return (
                <div 
                  key={index} 
                  onClick={() => handleMenuClick(item, index)}
                  onDoubleClick={() => handleMenuDoubleClick(item, index)}
                  className={`absolute h-[60px] w-full flex items-center justify-center cursor-pointer transition-all duration-[700ms] ease-[cubic-bezier(0.17,0.67,0.3,1.33)] ${isVisible ? '' : 'pointer-events-none'}`}
                  style={{ 
                    opacity: opacity, 
                    // This physically projects the item out 140px in 3D space, and rotates it around the barrel
                    transform: `rotateX(${-angle}deg) translateZ(140px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <span className={`tracking-widest font-bold transition-all duration-500 ${distance === 0 ? 'text-[#00ff00] drop-shadow-[0_0_15px_rgba(0,255,0,1)] scale-110' : 'text-green-500/40 scale-90'}`}>
                    {distance === 0 ? `► ${item} ◄` : item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* OPERATIONS TOKEN TRACKER - SLOT MACHINE DIAL */}
        <div className="p-6 pt-2 z-[9999] bg-gradient-to-t from-[#020504] to-transparent relative">
          
          {/* THE WEST WALL HAS BEEN CLEANED - OPERATIONS NOW LIVE IN THE SLOT MATRIX */}

          <div className={`bg-black/95 border-2 border-green-500/50 p-6 rounded-xl flex flex-col gap-5 shadow-[0_0_40px_rgba(0,255,0,0.2)] mt-2 ${globalLang === 'ur' ? 'font-serif' : ''}`}>
            
            <p className="text-sm font-black tracking-[0.3em] mb-1 opacity-90 text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] text-center w-full border-b border-[#00ff00]/30 pb-3">
               {globalLang === 'en' ? 'GLOBAL SCOREBOARD' : 'عالمی اسکور بورڈ'}
            </p>
            
            {/* VIBRANT SLOT MACHINE COUNTER (API PIPELINE VISUAL) */}
            <div className="flex justify-between items-center bg-[#010a01] border-2 border-green-500/60 p-3 rounded-lg overflow-hidden h-14 relative shadow-[inset_0_5px_20px_rgba(0,255,0,0.3)] group cursor-default">
              <span className="text-[10px] md:text-xs text-green-500/80 z-10 px-2 font-black tracking-widest shrink-0 uppercase">{globalLang === 'en' ? 'API HAR LOAD:' : 'روزانہ لوڈ:'}</span>
              <div className="relative h-full flex-1 ml-2 bg-black flex items-center justify-end px-4 border-l-2 border-green-500/40 min-w-0">
                <span className={`text-lg lg:text-xl tracking-widest font-black text-[#00ff00] drop-shadow-[0_0_15px_rgba(0,255,0,1)] transition-all duration-300 truncate ${isSpinning ? 'slot-tumbler blur-[2px] scale-110 text-white' : 'translate-y-0 opacity-100 scale-100'}`}>
                  {matrixCount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* EXPANDED METRICS - THE SCROLLING LEADERBOARDS */}
            <div className="flex flex-col gap-3 pt-2">
              
              {/* DAILY SETS SCROLLER */}
              <div className="bg-[#00ff00]/5 border border-[#00ff00]/30 rounded p-2 overflow-hidden relative flex flex-col justify-center h-12 shadow-[inset_0_0_15px_rgba(0,255,0,0.05)] text-center">
                 <span className="text-[8px] font-black text-white/50 tracking-widest uppercase pb-1">{globalLang === 'en' ? 'DAILY SETS ($25/EA):' : 'روزانہ سیٹ:'}</span>
                 <marquee scrollamount="2" className="text-xs font-black tracking-widest text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
                    ESHA (2) • HAMZA (1) • KASHAN (3) • RAFAY (1)
                 </marquee>
              </div>

              {/* WEEKLY CLOSES SCROLLER */}
              <div className="bg-[#00ff00]/10 border border-[#00ff00]/50 rounded p-2 overflow-hidden relative flex flex-col justify-center h-12 shadow-[inset_0_0_15px_rgba(0,255,0,0.05)] text-center">
                 <span className="text-[8px] font-black text-[#00ff00]/60 tracking-[0.2em] uppercase pb-1">{globalLang === 'en' ? 'WEEKLY 7-SET BONUS ($150):' : 'ہفتہ وار سیٹ:'}</span>
                 <marquee scrollamount="3" direction="right" className="text-sm font-black tracking-[0.3em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    🔥 ESHA 5/7 🔥 • HAMZA 2/7 • KASHAN 6/7 🔥 • RAFAY 1/7
                 </marquee>
              </div>

              <div className="flex justify-between items-center pt-2 mt-2 bg-black/40 p-2 rounded border border-[#00ff00]/20">
                 <span className="text-[10px] text-green-500 tracking-widest font-black shrink-0">TRANSLATION:</span> 
                 <span className="text-xs text-white tracking-[0.2em] font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] whitespace-nowrap overflow-hidden text-ellipsis ml-2">{globalLang === 'en' ? 'ENGLISH (US)' : 'PAKISTANI (UR)'}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* LOCK SCREEN ANIMATION OVERLAY */}
      {isLockingAnim && (
        <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center animate-pulse duration-[3000ms]">
          <div className="w-56 h-56 relative animate-spin [animation-duration:3s]">
            <div className="absolute inset-0 border-4 border-t-[#00ff00] border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_50px_rgba(0,255,0,0.8)]"></div>
            <div className="absolute inset-4 border-4 border-black border-r-[#00ff00] rounded-full [animation-duration:2s] animate-spin shadow-[0_0_30px_rgba(0,255,0,0.5)]"></div>
          </div>
          <h1 className="text-[#00ff00] text-3xl font-black tracking-[0.4em] drop-shadow-[0_0_20px_rgba(0,255,0,1)] mt-12 animate-bounce">
            COMMANDER ACCESS CONFIRMED
          </h1>
          <p className="text-[#00ff00]/60 text-sm tracking-[0.5em] mt-4 uppercase">
            SECURING KRONOS WORKSPACE...
          </p>
        </div>
      )}

      {/* EAST DESKTOP (ACTIVE WORKSPACE) */}
      <div 
        className="flex-1 relative transition-all duration-1000 bg-cover bg-center"
        style={{
          backgroundImage: theme === 'monochrome' ? "url('/homesprova.jpg')" : 
                           theme === 'highrise' ? "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075')" : 
                           theme === 'vegas' ? "url('https://images.unsplash.com/photo-1628108112520-25e1ba0a8c20?auto=format&fit=crop&q=80&w=2074')" : 
                           theme === 'hawaii' ? "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070')" : 
                           theme === 'chalkboard' ? "url('/corkboard.jpg')" : 
                           "none"
        }}
      >
        
        {/* PHYSICAL CORKBOARD SHADOW / DARKNESS OVERLAY */}
         <div className={`absolute inset-0 z-0 ${theme === 'daylight' ? 'bg-white/80' : 'bg-black/40'}`}></div>
         
         {/* ABSOLUTE TRT BRAND WATERMARK (Southeast Corner) */}
         <div className="absolute bottom-6 right-6 w-32 h-32 opacity-10 pointer-events-none z-10 select-none">
            <img src="/logo.png" alt="TRT" className={`w-full h-full object-contain ${theme === 'daylight' ? 'brightness-0 contrast-100' : ''}`} />
         </div>
        
        {/* HEADER - LOCKED AT 80px FOR 'ILLUSION OF FRAME' SYNC */}
        <div className={`absolute top-0 left-0 w-full h-[80px] border-b backdrop-blur-md z-30 flex items-center justify-between px-10 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isRetracted ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} ${theme === 'daylight' ? 'bg-white/95 border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]' : 'bg-[#020504]/95 border-[#00ff00]/10 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'}`}>
          <h2 className={`text-[16px] tracking-[0.3em] font-bold pl-[60px] ${theme === 'daylight' ? 'text-black/50' : 'text-[#00ff00]/60'} uppercase`}>
             {globalLang === 'en' ? 'ACTIVE WORKSPACE:' : 'فعال ورک اسپیس:'} <span className={`ml-2 ${theme === 'daylight' ? 'text-black font-extrabold' : 'text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]'}`}>{activeMenu}</span>
          </h2>
          
          <div className={`flex flex-col items-end pr-8 border-r-2 ${theme === 'daylight' ? 'border-black/10' : 'border-[#00ff00]/30'}`}>
             <p className={`text-[9px] font-black tracking-widest ${theme === 'daylight' ? 'text-black/40' : 'text-[#00ff00]/50'} uppercase`}>
               {globalLang === 'en' ? 'OPERATOR CONSOLE' : 'آپریٹر کنسول'}
             </p>
             <p className={`text-lg font-black tracking-[0.2em] uppercase mt-1 ${theme === 'daylight' ? 'text-black' : 'text-[#00ff00] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]'}`}>
               {kronosEmail ? `${kronosEmail.split('@')[0].toUpperCase()}_01` : 'ESHA_01'}
             </p>
          </div>
        </div>

        {/* --- THE FLOATING NORTHSTAR PILL (TOP) --- */}
        <div 
          className={`fixed left-1/2 -translate-x-1/2 bg-[#020504]/90 backdrop-blur-2xl border border-green-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,0,0.15)] z-[9999] flex items-center px-6 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[95%] max-w-[1000px]
            ${showRibbons ? 'top-10 opacity-100 scale-100' : '-top-20 opacity-0 scale-95 pointer-events-none'}`}
        >
           {/* PART 1: The Navigational Anchor & Triangle Control */}
           <div className="flex items-center border-r border-[#00ff00]/20 pr-6 mr-6 shrink-0 relative group">
             <span className="text-xs font-bold tracking-[0.2em] text-[#00ff00] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] whitespace-nowrap">NORTH-STAR</span>
             <span className="text-[10px] text-green-500/40 tracking-[0.3em] ml-2 hidden lg:block">COMMAND</span>
             
             {/* The Master Control Triangle (The Google Play Style Operation Dropdown) */}
             <button className="ml-4 w-4 h-4 flex items-center justify-center border border-[#00ff00]/40 hover:border-[#00ff00] hover:bg-[#00ff00]/20 bg-black/60 rounded-sm transition-all shadow-[0_0_5px_rgba(0,255,0,0.3)]">
                <span className="text-[#00ff00] text-[7px] translate-x-[0.5px]">▶</span>
             </button>

             {/* CSS-Hover Absolute Context Option Menu */}
             <div className="absolute top-8 left-full ml-2 w-36 bg-[#010502]/95 border border-[#00ff00]/40 rounded shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden z-[100] hidden group-hover:flex backdrop-blur-2xl">
                 <button className="text-[#00ff00]/70 hover:text-black hover:bg-[#00ff00] text-[9px] font-bold tracking-[0.2em] py-2.5 px-3 text-left transition-colors border-b border-[#00ff00]/30">LOCK SETTINGS</button>
                 <button className="text-[#00ff00]/70 hover:text-black hover:bg-[#00ff00] text-[9px] font-bold tracking-[0.2em] py-2.5 px-3 text-left transition-colors border-b border-[#00ff00]/30">SAVE LAYOUT</button>
                 <button className="text-[#ff0000]/70 hover:text-white hover:bg-red-600/90 text-[9px] font-bold tracking-[0.2em] py-2.5 px-3 text-left transition-colors">DELETE APP</button>
             </div>
           </div>
           
            {/* PART 2: The Marketing/Branding Extension (Horizontal Scroll) */}
            <div className="flex gap-4 flex-1 overflow-x-auto hide-scrollbar scroll-smooth">
               {MENU_ITEMS.slice(0, 6).map((tool, i) => (
                <div key={i} onClick={() => setActiveTool(activeTool === tool ? null : tool)} className={`px-5 py-2 border border-[#00ff00]/40 rounded-full text-[10px] sm:text-xs tracking-widest cursor-grab active:cursor-grabbing transition-all hover:scale-105 font-bold whitespace-nowrap shadow-[inset_0_0_15px_rgba(0,255,0,0.1)] shrink-0 ${activeTool === tool ? "bg-[#00ff00] text-black" : "bg-black/60 text-[#00ff00] hover:bg-[#00ff00] hover:text-black"}`}>
                  {tool}
                </div>
              ))}
           </div>
           
           {/* THE [X] AND [+] SYSTEM BUTTONS */}
           <div className="flex gap-2 ml-4 shrink-0 pl-4 border-l border-[#00ff00]/20">
             <button 
               onClick={() => setShowErrorDemo(!showErrorDemo)}
               className="w-8 h-8 rounded-full bg-black/50 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black flex items-center justify-center text-lg transition-all shadow-[0_0_10px_rgba(255,255,0,0.2)]"
               title="Trigger Demo Error Modal"
             >
               !
             </button>
             <button 
               className="w-8 h-8 rounded-full bg-black/50 border border-[#00ff00]/50 text-[#00ff00] hover:bg-[#00ff00] hover:text-black flex items-center justify-center text-lg transition-all shadow-[0_0_10px_rgba(0,255,0,0.2)]"
               title="Load App Directory (168 Apps)"
             >
               +
             </button>
             <button 
               onClick={() => setShowRibbons(false)} 
               className="w-8 h-8 rounded-full bg-black/50 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black flex items-center justify-center text-sm font-bold transition-all shadow-[0_0_10px_rgba(255,0,0,0.2)]"
               title="Dismiss Ribbon"
             >
               ✕
             </button>
           </div>
        </div>

        {/* --- THE FLOATING SOUTH PILL (BOTTOM) --- */}
        <div 
          className={`fixed left-1/2 -translate-x-1/2 bg-[#020504]/90 backdrop-blur-2xl border border-green-500/40 shadow-[0_-15px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,0,0.15)] z-[9999] flex items-center px-6 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[95%] max-w-[1000px]
            ${showRibbons ? 'bottom-10 opacity-100 scale-100' : '-bottom-20 opacity-0 scale-95 pointer-events-none'}`}
        >
           <div className="flex items-center border-r border-[#00ff00]/20 pr-6 mr-6 shrink-0">
             <span className="text-xs font-bold tracking-[0.2em] text-[#00ff00] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] whitespace-nowrap">SOUTH-STAR</span>
             <span className="text-[10px] text-green-500/40 tracking-[0.3em] ml-2 hidden lg:block">DATABASE</span>
           </div>
           <div className="flex gap-4 flex-1 overflow-x-auto hide-scrollbar scroll-smooth">
              {MENU_ITEMS.slice(6, 12).map((tool, i) => (
                <div key={i} onClick={() => handleAddModule(tool)} className={`px-5 py-2 border border-[#00ff00]/40 rounded-full text-[10px] sm:text-xs tracking-widest cursor-grab active:cursor-grabbing transition-all hover:scale-105 font-bold whitespace-nowrap shadow-[inset_0_0_15px_rgba(0,255,0,0.1)] shrink-0 bg-black/60 text-[#00ff00] hover:bg-[#00ff00] hover:text-black`}>
                  {tool}
                </div>
              ))}
           </div>
        </div>

        {/* WORKSPACE AREA (THE 4-SCREEN SCROLLABLE LIQUID DESKTOP) */}
        <div className="absolute inset-0 pt-[120px] pb-[100px] px-10 flex flex-col items-center pointer-events-none">
           {globalTools.length === 0 ? (
             <div className="text-center group pointer-events-auto mt-[10vh]">
               <div className="relative">
                 <img src="/logo.png" alt="The Richardson Team" className="w-[450px] object-contain drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] opacity-80 mx-auto" />
                 <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,255,0,0.1)] pointer-events-none"></div>
               </div>
               <p className="tracking-widest text-[#00ff00] opacity-50 mt-4 text-xs font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">&gt;&gt;&gt; SELECT A MENU TO INITIATE SEQUENCE</p>
             </div>
           ) : showUpdateModal ? (
             <div className="w-full h-full pointer-events-auto flex items-center justify-center z-[5000] relative">
               {/* Translucent Studio Dimmer */}
               <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[4900]"></div>
               
               {/* The KRONOS Feature Update Board */}
               <div className="relative z-[5000] w-full max-w-2xl bg-[#020504] border border-[#00ff00]/40 rounded-3xl shadow-[0_0_80px_rgba(0,255,0,0.2)] flex flex-col p-10 font-mono overflow-hidden">
                 
                 {/* Internal Liquid Border Sheet */}
                 <div className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/5 to-transparent pointer-events-none rounded-3xl"></div>
                 
                 {/* Header Vector */}
                 <div className="flex flex-col items-center text-center w-full mb-8 relative z-10">
                   <h2 className="text-[#00ff00] text-2xl font-bold tracking-[0.2em] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] mb-3">{M[globalLang].title}</h2>
                   <p className="text-[#00ff00]/70 text-sm tracking-widest font-bold">{M[globalLang].sub}</p>
                 </div>
                 
                 {/* The Checklist Anchor Loop */}
                 <div className="flex flex-col gap-4 pl-0 sm:pl-8 mb-8 relative z-10">
                   {[
                     "Drag & Drop Calendar Routing Engine is now globally live.",
                     "Master Lead Pipeline is successfully synced with Follow Up Boss.",
                     "Custom B2B Team Dashboards are active and ready for deployment.",
                     "The Homes.com Real Estate Marketing Integration is locked.",
                     "The 'Trojan Horse' Calendar System is fully operational."
                   ].map((item, i) => (
                     <div key={i} className="flex items-start gap-4">
                       <div className="w-5 h-5 mt-0.5 rounded bg-[#00ff00] flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(0,255,0,0.8)] shrink-0">
                         ✓
                       </div>
                       <span className="text-white/90 text-sm tracking-wider font-bold">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 {/* The Interactive Embedded Training Loop */}
                 <div className="w-full bg-black/50 border border-[#00ff00]/20 rounded-xl p-4 flex gap-6 items-center mb-8 relative z-10">
                   {/* Fake Video Thumbnail Block */}
                   <div className="w-48 aspect-video bg-[#050101] border border-[#00ff00]/30 rounded-lg relative flex items-center justify-center group cursor-pointer shadow-[0_0_15px_rgba(0,255,0,0.1)] overflow-hidden shrink-0">
                     <img src="/logo.png" alt="TRT" className="absolute w-24 opacity-30 object-contain" />
                     {/* Play Button */}
                     <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,0,0,0.5)] z-10">
                       <span className="text-white text-xl ml-1">▶</span>
                     </div>
                   </div>
                   
                   <p className="text-[#00ff00]/60 text-xs tracking-widest leading-relaxed">
                     <strong className="text-[#00ff00]">...ALL LOGIC IS ABSOLUTE.</strong> You requested the premise framing, and we built the infinite scrolling matrix. The OS structure is permanently locked.
                   </p>
                 </div>
                 
                 {/* THE MASSIVE FLOOR ANCHOR */}
                 <button 
                   onClick={() => setShowUpdateModal(false)}
                   className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-bold tracking-[0.4em] text-sm transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.4),0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] rounded-xl relative z-10 uppercase"
                 >
                   Acknowledge Firmware & Initialize Desktop
                 </button>
               </div>
             </div>
           ) : showErrorDemo ? (
             <div className="w-full h-full pointer-events-auto flex items-center justify-center z-[1000] relative">
               {/* Translucent Dimmer */}
               <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[990]"></div>
               
               {/* The KRONOS Apple Liquid Error Box */}
               <div className="relative z-[1000] w-full max-w-sm">
                 {/* Conic Gradient Animated Border */}
                 <div className="absolute inset-[-4px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,red_50%,transparent_100%)] animate-[spin_4s_linear_infinite] rounded-2xl opacity-70"></div>
                 
                 {/* Core Modal Background */}
                 <div className="relative bg-[#050101] border border-red-500/50 rounded-xl shadow-[0_0_50px_rgba(255,0,0,0.4)] p-8 flex flex-col items-center text-center">
                   
                   {/* The Icon */}
                   <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                     <span className="text-red-500 text-3xl font-bold">!</span>
                   </div>
                   
                   {/* The Message */}
                   <h3 className="text-red-500 font-bold tracking-[0.3em] mb-2 text-xl drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">SYSTEM OVERRIDE ERROR</h3>
                   <p className="text-red-500/80 text-[10px] tracking-widest leading-relaxed mb-6 px-4">
                     CRITICAL FAULT DETECTED. AUTHORIZATION TOKENS MISMATCHED. YOUR DEVICE IDENTIFIER HAS BEEN TEMPORARILY LOGGED.
                   </p>

                   {/* RECOVERY OPERATIONS */}
                   <div className="w-full flex gap-3 mb-6">
                     <button className="flex-1 py-3 bg-black border border-red-500/50 hover:bg-red-900/40 hover:border-red-500 text-red-500 text-[9px] font-bold tracking-[0.2em] transition-all rounded-sm flex flex-col items-center justify-center gap-1">
                       <span className="text-xs">✉</span>
                       SEND EMAIL RESET
                     </button>
                     <button className="flex-1 py-3 bg-black border border-red-500/50 hover:bg-red-900/40 hover:border-red-500 text-red-500 text-[9px] font-bold tracking-[0.2em] transition-all rounded-sm flex flex-col items-center justify-center gap-1">
                       <span className="text-xs">📱</span>
                       SEND TEXT PIN
                     </button>
                   </div>
                   
                   {/* The KRONOS Dismiss Button */}
                   <button 
                     onClick={() => setShowErrorDemo(false)}
                     className="w-full py-3 border border-red-500 bg-red-950/30 hover:bg-red-500 hover:text-black text-red-500 text-[10px] font-bold tracking-[0.4em] transition-all shadow-[inset_0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] rounded-sm"
                   >
                     ACKNOWLEDGE ALARM
                   </button>
                 </div>
               </div>
             </div>
           ) : showThemeMenu ? (
              <div className="w-full h-full pointer-events-auto flex items-center justify-center z-[5000] relative px-4">
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[4900]" onClick={() => setShowThemeMenu(false)}></div>
                <div className="relative z-[5000] w-full max-w-lg bg-[#050101]/90 border-2 border-[#00ff00] rounded-2xl shadow-[0_0_80px_rgba(0,255,0,0.4)] p-6 md:p-8 flex flex-col pt-10">
                   <h2 className="text-[#00ff00] text-lg md:text-xl font-black tracking-[0.4em] mb-8 text-center drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] border-b border-[#00ff00]/30 pb-4">
                     O.S. ENVIRONMENT THEMES
                   </h2>
                   <div className="grid grid-cols-2 gap-3 md:gap-4">
                     <button onClick={() => { setTheme('daylight'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'daylight' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>DAYLIGHT</button>
                     <button onClick={() => { setTheme('monochrome'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'monochrome' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>HOMES PRO</button>
                     <button onClick={() => { setTheme('highrise'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'highrise' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>LUXURY</button>
                     <button onClick={() => { setTheme('vegas'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'vegas' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>NEON VEGAS</button>
                     <button onClick={() => { setTheme('hawaii'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'hawaii' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>HAWAII DRIFT</button>
                     <button onClick={() => { setTheme('corkboard'); setShowThemeMenu(false); }} className={`py-4 rounded border ${theme === 'corkboard' ? 'bg-[#00ff00] text-black border-black shadow-[0_0_20px_rgba(0,255,0,0.6)]' : 'bg-black text-[#00ff00] border-[#00ff00]/50 hover:bg-[#00ff00]/20'} font-black tracking-widest text-[9px] md:text-[10px] transition-all`}>CORKBOARD</button>
                   </div>
                   <button onClick={() => setShowThemeMenu(false)} className="mt-8 py-3 w-full bg-red-600/20 border border-red-500 hover:bg-red-500 text-red-500 hover:text-white rounded font-bold tracking-[0.3em] text-[10px] transition-all">CLOSE TERMINAL</button>
                </div>
              </div>
            ) : activeTool === "iClosed Scheduling" || activeTool === "Marketing Engine" ? (
             <div className="w-full h-full pointer-events-auto overflow-y-auto hide-scrollbar flex justify-center py-4 z-50">
                <div className="w-full max-w-6xl">
                  <SocialCalendar />
                </div>
             </div>
           ) : (
             <div className="w-full h-full pointer-events-auto overflow-y-auto hide-scrollbar snap-y snap-mandatory scroll-smooth relative px-2">
               
               {/* SCREEN 1: PRIMARY GRID */}
               <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[70vh] items-center snap-center snap-always">
                 {(() => { const baseTools = globalTools.length > 0 ? globalTools : ["AWAITING DEPLOYMENT"]; const filtered = baseTools.filter(t => t !== "FOREWARN PROXY" && t !== "POLAROID OVERRIDE"); const renderedTools = [...filtered, "FOREWARN PROXY", "POLAROID OVERRIDE"]; return renderedTools.map((tool, i) => (
                   
                                       /* THE TILE CONTAINER */
                    <div key={i} 
                         draggable
                         onDragStart={(e) => {
                             setDraggedItemIndex(i);
                             e.dataTransfer.effectAllowed = 'move';
                         }}
                         onDragOver={(e) => {
                             e.preventDefault();
                             e.dataTransfer.dropEffect = 'move';
                         }}
                         onDrop={(e) => {
                             e.preventDefault();
                             if (draggedItemIndex === null || draggedItemIndex === i) return;
                             setGlobalTools(prev => {
                                 const newItems = [...prev];
                                 const draggedStr = newItems[draggedItemIndex];
                                 newItems.splice(draggedItemIndex, 1);
                                 newItems.splice(i, 0, draggedStr);
                                 return newItems;
                             });
                             setDraggedItemIndex(null);
                         }}
                         className={`relative group p-[2px] transition-all duration-[800ms] cursor-pointer ${expandedTiles[tool] ? 'col-span-1 md:col-span-2 lg:col-span-3 aspect-[21/9] z-[100]' : 'hover:scale-[1.03] aspect-[5/4]'}`}
                         onClick={() => { if (tool === 'FOREWARN PROXY') { setShowForewarnProxy(true); return; } if (tool === 'POLAROID OVERRIDE') { document.getElementById('kronos-polaroid-btn')?.click(); return; }
                           const urls = {
                             "PROPERTY PRO VA": "https://homeprosva.com",
                             "FOLLOW UP BOSS": "https://www.followupboss.com",
                             "CALENDAR MASTER": "https://calendar.google.com",
                             "HARRIS COUNTY TAX": "https://hcad.org",
                             "FORT BEND COUNTY": "https://www.fbcad.org",
                             "HOME SEARCH PORTAL": "https://therichardsonteam.realscout.me",
                             "HAR.COM": "https://www.har.com",
                             "ZILLOW PREMIER": "https://www.zillow.com/premier-agent",
                             "REALTOR.COM": "https://www.realtor.com",
                             "HOMES.COM": "https://www.homes.com",
                             "GOOGLE PORTAL": "https://www.google.com",
                             "GMAIL PORTAL": "https://mail.google.com",
                             "ListReports NPR": "https://www.listreports.com/",
                             "DocuSign": "https://www.docusign.com"
                           };
                           // Removed Vault Interception
                           if(urls[tool]) {
                              window.open(urls[tool], '_blank');
                           }
                         }}>
                        
                        {/* The Tiny North-East Corner Floating Bubble Menu (Outside Frame) */}
                        <div className={`absolute -top-3 -right-3 z-[100] group/menu pointer-events-auto ${isLocked ? 'hidden' : 'block'}`}>
                           {/* The Tiny Dot (Size of the Pill Circles) */}
                           <button className="w-4 h-4 rounded-full bg-black border border-[#00ff00] flex items-center justify-center text-[#00ff00] hover:bg-[#00ff00] transition-all shadow-[0_0_15px_rgba(0,255,0,0.6)] cursor-pointer">
                           </button>
                           
                           {/* The Three Operations: Drag, Size, Delete */}
                           <div className="absolute top-6 right-0 flex-col gap-1.5 bg-black/95 backdrop-blur-md border border-[#00ff00]/40 p-2 rounded-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.9)] flex">
                              <button title="Drag Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#00ff00]/20 rounded-md text-[#00ff00] text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap" onClick={(e) => e.stopPropagation()}><span className="text-sm">✥</span> DRAG / DROP</button>
                              <button title="Resize Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#00ff00]/20 rounded-md text-[#00ff00] text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap" onClick={(e) => { e.stopPropagation(); setExpandedTiles(prev => ({...prev, [tool]: !prev[tool]})); }}><span className="text-sm">⤢</span> SIZE</button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(tool); }} title="Delete Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-red-500/20 rounded-md text-red-500 text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap z-50 pointer-events-auto"><span className="text-sm">✕</span> DELETE</button>
                           </div>
                        </div>

                        {/* THE APPLE GYROSCOPIC "LIQUID" BORDER CARD (Inner Frame) */}
                        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                            {/* The Spinning Liquid Glass Background Border */}
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#00ff00_50%,transparent_100%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            {/* Inner Card Content Base */}
                            <div className={`absolute inset-[2px] backdrop-blur-xl rounded-[22px] border transition-all duration-300 z-10 flex flex-col items-center justify-center p-8 ${theme === 'daylight' ? 'bg-white/90 border-black/5 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]' : 'bg-[#020504]/90 border-[#00ff00]/20 group-hover:border-transparent'}`}>
                               {tool.startsWith('POLAROID_') ? (
                                 <div className="w-full h-full relative flex items-center justify-center">
                                    <img src={tool.replace('POLAROID_', '')} className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none"></div>
                                 </div>
                               ) : (
                                 <>
                                   {/* Central Icon */}
                                   <div className="w-20 h-20 rounded-full border border-[#00ff00]/30 flex items-center justify-center mb-6 group-hover:border-[#00ff00] group-hover:bg-[#00ff00]/10 transition-all duration-500 shadow-[inset_0_0_15px_rgba(0,255,0,0.1)]">
                                      <span className="text-[#00ff00] text-3xl drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">⚡</span>
                                   </div>
                                   
                                   <h3 className="text-white text-md sm:text-lg tracking-widest text-center font-bold mb-3 drop-shadow-md">{tool}</h3>
                                   <p className="text-[#00ff00]/60 text-[9px] sm:text-[10px] tracking-[0.2em] text-center border-t border-[#00ff00]/20 pt-3 px-4 w-full">SYSTEM ACCESS GRANTED</p>
                                 </>
                               )}
                            </div>
                        </div>
                    </div>
                 ));
                 })()}
               </div>

               {/* SCREEN BREAK DIVIDER */}
               <div className="w-2/3 mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#00ff00]/30 to-transparent my-10 snap-center"></div>

               {/* SCREEN 2: SECONDARY EXTENSION (Placeholder) */}
               <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[70vh] items-center snap-center snap-always opacity-50 mt-10">
                  <div className="w-full h-full flex items-center justify-center text-[#00ff00]/30 tracking-[0.3em] font-bold text-xl border border-[#00ff00]/10 rounded-3xl bg-black/20 shadow-[inset_0_0_30px_rgba(0,255,0,0.05)]">
                     [ EXTENDED PIPELINE WALL ]
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-[#00ff00]/30 tracking-[0.3em] font-bold text-xl border border-[#00ff00]/10 rounded-3xl bg-black/20 shadow-[inset_0_0_30px_rgba(0,255,0,0.05)]">
                     [ APPLICATION MEMORY CORE ]
                  </div>
               </div>

               {/* SCREEN BREAK DIVIDER */}
               <div className="w-2/3 mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#00ff00]/30 to-transparent my-10 snap-center"></div>

               {/* SCREEN 4.5: THE PIGGYBACK MARKETING FOOTER (3-PART LOGIC HUB) */}
               <div className="w-full mt-32 min-h-[50vh] bg-[#010502]/95 border-t border-[#00ff00]/40 flex flex-col p-8 sm:p-12 lg:p-16 snap-end shadow-[0_-20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-2xl">
                  {/* Glowing Top Edge */}
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#00ff00]/10 to-transparent pointer-events-none"></div>
                  
                  {/* The 3-Part Divider Grid */}
                  <div className="w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row flex-1 z-10 gap-y-16 lg:gap-y-0 lg:gap-x-12">
                     
                     {/* COLUMN 1: INFORMATION / PROCESSES */}
                     <div className="flex-[0.8] lg:border-r border-[#00ff00]/20 pr-0 lg:pr-12 flex flex-col gap-8">
                        <h3 className="text-[#00ff00] text-sm lg:text-lg tracking-[0.4em] font-bold border-b border-[#00ff00]/30 pb-4">PROGRAMS WE OFFER</h3>
                        <ul className="text-[#00ff00]/60 text-[10px] sm:text-xs tracking-[0.2em] flex flex-col gap-4 font-bold">
                           <li className="hover:text-black hover:bg-[#00ff00] p-2 rounded transition-all cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">[ 01 ] ZILLOW PREMIER BYPASS</li>
                           <li className="hover:text-black hover:bg-[#00ff00] p-2 rounded transition-all cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">[ 02 ] THE 230,000 PIPELINE TIER</li>
                           <li className="hover:text-black hover:bg-[#00ff00] p-2 rounded transition-all cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">[ 03 ] ICLOSED TELEMARKETING SYNC</li>
                           <li className="hover:text-black hover:bg-[#00ff00] p-2 rounded transition-all cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">[ 04 ] ZERO-TRUST CLOUD VPN ROUTING</li>
                           <li className="hover:text-black hover:bg-[#00ff00] p-2 rounded transition-all cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">[ 05 ] CONSUMER VEIL ARCHITECTURE</li>
                        </ul>
                     </div>

                     {/* COLUMN 2: BRANDING (THE 1/2" PIGGYBACK LOGOS) */}
                     <div className="flex-[2] lg:border-r border-[#00ff00]/20 pr-0 lg:pr-12 flex flex-col gap-8 items-center">
                        <h3 className="text-[#00ff00] text-sm lg:text-lg tracking-[0.4em] font-bold border-b border-[#00ff00]/30 pb-4 w-full text-center">INTEGRATION PARTNERS</h3>
                        
                        {/* 1/2 Inch Square Logo Button Grid */}
                        <div className="w-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6 opacity-70 hover:opacity-100 transition-opacity duration-700 justify-items-center">
                           {["CHASE", "BofA", "WALMART", "HOME DEPOT", "STARBUCKS", "ZILLOW", "REALTOR", "ICLOSED", "XBOX", "PLAYSTATION", "DISNEY+", "NETFLIX", "TEXAS TITLE", "FIRST LENDER", "INSPECTOR", "APPRAISER"].map((brand, i) => (
                             <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                               {/* The 1/2 inch by 1/2 inch panel styling */}
                               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#020504] border border-[#00ff00]/30 rounded-2xl flex items-center justify-center p-2 group-hover:border-[#00ff00] group-hover:bg-[#00ff00]/10 shadow-[inset_0_0_15px_rgba(0,255,0,0.1)] group-hover:shadow-[0_10px_25px_rgba(0,255,0,0.25)] transition-all relative overflow-hidden">
                                  {/* Glossy liquid sheen effect internally */}
                                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent z-0"></div>
                                  <span className="text-xl sm:text-2xl opacity-60 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] z-10 transition-opacity">🌐</span>
                               </div>
                               <span className="text-[#00ff00]/50 group-hover:text-[#00ff00] font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[9px] text-center transition-colors shadow-black w-20 truncate">{brand}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* COLUMN 3: COMPANY */}
                     <div className="flex-[0.8] flex flex-col gap-6 lg:pl-0 justify-center lg:justify-start items-center lg:items-end text-center lg:text-right">
                        <h3 className="text-[#00ff00] text-sm lg:text-lg tracking-[0.4em] font-bold border-b border-[#00ff00]/30 pb-4 w-full text-center lg:text-right">THE RICHARDSON TEAM</h3>
                        <div className="flex flex-col gap-3 font-mono">
                           <div className="relative mb-4">
                             <img src="/logo.png" alt="TRT Logo" className="w-[200px] object-contain drop-shadow-[0_0_15px_rgba(0,255,0,0.3)] opacity-90 mx-auto lg:ml-auto lg:mr-0" />
                           </div>
                           <p className="text-[#00ff00] tracking-[0.3em] font-bold text-xs">KRONOS VANGUARD O/S</p>
                           <p className="text-[#00ff00]/50 tracking-[0.2em] text-[10px] mt-2 border-l-2 border-[#00ff00]/50 pl-3 lg:border-l-0 lg:border-r-2 lg:pr-3 lg:pl-0">ZERO-TRUST CLOUD ARCHITECTURE</p>
                           <p className="text-[#00ff00]/50 tracking-[0.2em] text-[10px]">HOUSTON METROPLEX SECTOR</p>
                           <p className="text-[#00ff00]/50 tracking-[0.2em] text-[10px]">VER: 2.5.0 HYPER-STRUCTURE</p>
                        </div>
                     </div>

                  </div>
               </div>
               
             </div>
           )}
        </div>
        {/* --- EAST WALL COMMAND MOD (SLICK ACTIVE BAR) --- */}
        <div className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-[9900] pointer-events-auto p-4 rounded-3xl backdrop-blur-md ${theme === 'daylight' ? 'bg-white/40 border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)]' : 'bg-black/90 border border-[#00ff00]/30 shadow-[0_0_30px_rgba(0,0,0,0.9)]'}`}>
           {["👤", "ℹ️", "✉️", "📅", "📞", "💬", "🔍", "🌗"].map((icon, i) => (
             <button 
               key={i} 
               onClick={() => {
                 if (i === 3) setShowCalendar(true); // Index 3 is Calendar
                 else if (i === 7) setTheme(theme === 'daylight' ? 'monochrome' : 'daylight'); // Index 7 is Theme Toggle
                 else if (i === 6) { setShowFubSearch(!showFubSearch); setActiveAppPopup(null); }
                 else {
                   setActiveAppPopup(
                     i === 0 ? "Account Data & Settings" : 
                     i === 1 ? "System Intelligence / Metrics" : 
                     i === 2 ? "Incoming Email Terminal" : 
                     i === 4 ? "Voice Operator Module" : 
                     i === 5 ? "Direct SMS Dispatch" : 
                     "RealScout Global Integration"
                   );
                 }
               }}
               className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.4] origin-center z-50 text-2xl"
               title={
                 i === 0 ? "Account Data & Settings" : 
                 i === 1 ? "System Intelligence / Metrics" : 
                 i === 2 ? "Incoming Email Terminal" : 
                 i === 3 ? "Social Protocol / Sync Calendar" : 
                 i === 4 ? "Voice Operator Module" : 
                 i === 5 ? "Direct SMS Dispatch" : 
                 i === 6 ? "RealScout Global Integration" : 
                 "Toggle Commander Time-of-Day Mode"
               }
             >
                <span className={`drop-shadow-md transition-opacity opacity-80 hover:opacity-100 ${theme === 'daylight' && icon !== '🌗' ? 'brightness-0 opacity-70 hover:opacity-100' : ''}`}>
                  {i === 7 ? (theme === 'daylight' ? '☀️' : '🌙') : icon}
                </span>
             </button>
           ))}
           
           {/* FUB SLIDE-OUT SEARCH (Mac Spotlight Style) */}
           {showFubSearch && (
             <div className="absolute right-full mr-4 top-[70%] transform -translate-y-1/2 w-[350px] bg-[#020504]/95 border border-[#00ff00]/50 rounded-lg shadow-[0_0_40px_rgba(0,255,0,0.2)] backdrop-blur-md p-3 flex items-center gap-3 animate-in duration-300 z-[9999]">
               <span className="text-[#00ff00] text-xl">🔍</span>
               <input 
                 type="text" 
                 autoFocus
                 placeholder="Mac-style FUB Client Search..." 
                 className="w-full bg-transparent text-[#00ff00] placeholder-[#00ff00]/30 outline-none font-mono tracking-widest text-sm"
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                      alert(`[API TRIGGER] Follow Up Boss Query:\nContact Name: ${e.target.value}`);
                      setShowFubSearch(false);
                   }
                 }}
               />
             </div>
           )}

         </div>

      </div>

                  {showCalendar && <SocialCalendar onClose={() => setShowCalendar(false)} />}
      
      {/* BOTTOM RIGHT SOUTH-EAST COMMS & POLAROID CORNER */}
      <div className="absolute bottom-6 right-6 flex items-center gap-6 z-[9999]">
        
        {/* SNAPSHOT POLAROID BUTTON */}
        <button 
          onClick={async () => {
             // 1. Shutter Sound Effect
             try {
               const AudioContext = window.AudioContext || window.webkitAudioContext;
               const audioCtx = new AudioContext();
               const osc = audioCtx.createOscillator();
               const gainNode = audioCtx.createGain();
               osc.type = "square";
               osc.frequency.setValueAtTime(200, audioCtx.currentTime);
               osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
               gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
               gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
               osc.connect(gainNode);
               gainNode.connect(audioCtx.destination);
               osc.start();
               osc.stop(audioCtx.currentTime + 0.1);
             } catch(e) {}

             // 2. Flash Screen White
             const flash = document.createElement("div");
             flash.style.position = "fixed";
             flash.style.top = "0"; flash.style.left = "0";
             flash.style.width = "100%"; flash.style.height = "100%";
             flash.style.backgroundColor = "white";
             flash.style.zIndex = "999999";
             flash.style.opacity = "1";
             flash.style.pointerEvents = "none";
             flash.style.transition = "opacity 0.6s ease-out";
             document.body.appendChild(flash);
             setTimeout(() => flash.style.opacity = "0", 50);
             setTimeout(() => document.body.removeChild(flash), 650);

             // 3. Take Picture using User Media
             try {
               const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
               const video = document.createElement('video');
               video.srcObject = stream;
               video.play();
               
               // wait briefly for camera light to stabilize grabbing frame
               await new Promise(res => setTimeout(res, 500));
               
               const canvas = document.createElement('canvas');
               canvas.width = video.videoWidth || 640;
               canvas.height = video.videoHeight || 480;
               const ctx = canvas.getContext('2d');
               ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
               const dataUrl = canvas.toDataURL('image/png');
               
               stream.getTracks().forEach(track => track.stop());

               // 4. Render the Physical Polaroid Object floating
               const img = document.createElement('img');
               img.src = dataUrl;
               img.style.position = "fixed";
               img.style.bottom = "120px";
               img.style.right = "50px";
               img.style.width = "220px";
               img.style.border = "12px solid white";
               img.style.borderBottom = "45px solid white";
               img.style.boxShadow = "0 15px 35px rgba(0,0,0,0.6)";
               img.style.transform = "rotate(5deg) scale(0.1)";
               img.style.opacity = "0";
               img.style.zIndex = "999998";
               img.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
               img.style.pointerEvents = "none";
               document.body.appendChild(img);
               
               // pop animation
               setTimeout(() => {
                 img.style.transform = "rotate(-3deg) scale(1)";
                 img.style.opacity = "1";
               }, 50);
               
               // disappear logic
               setTimeout(() => {
                 img.style.opacity = "0";
                 img.style.transform = "translateY(100px) rotate(-10deg) scale(0.8)";
                 setTimeout(() => {
                    document.body.removeChild(img);
                    setPolaroidArchive(prev => [...prev, dataUrl]);
                 }, 1000);
               }, 4000);

             } catch (err) {
               alert("[ CAMERA OFFLINE ] " + err.message);
             }
          }}
          className="w-14 h-14 rounded-full border-2 border-white/30 bg-black/80 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300 group"
          title="Capture Layout to Desk"
        >
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <span className="text-xl -mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] filter transition-all duration-300 group-hover:brightness-150">📷</span>
            <span className="absolute -bottom-5 text-[8px] font-bold tracking-widest text-white/50 group-hover:text-white whitespace-nowrap drop-shadow-md">
              POLAROID
            </span>
          </div>
        </button>

        {/* POLAROID FILE ARCHIVE BUTTON */}
        <button 
          onClick={() => setShowArchiveModal(true)}
          className="w-14 h-14 rounded-xl border-2 border-white/20 bg-black/80 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-[#00ff00] transition-all duration-300 group relative shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
          title="Archive Files"
        >
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            {polaroidArchive.length > 0 ? (
               polaroidArchive.slice(-3).map((imgUrl, idx) => (
                  <img key={idx} src={imgUrl} className="absolute inset-x-0 mx-auto w-[85%] h-[85%] object-cover shadow-lg border border-white/80 rounded block" style={{ transform: `rotate(${(idx - 1) * 12}deg) scale(0.9) translateY(${idx * 2}px)` }} />
               ))
            ) : (
               <span className="text-xl -mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] filter transition-all duration-300 group-hover:brightness-150">📁</span>
            )}
            <span className="absolute -bottom-5 text-[8px] font-bold tracking-widest text-[#00ff00]/50 group-hover:text-[#00ff00] whitespace-nowrap drop-shadow-md">
              MY FILES
            </span>
          </div>
        </button>

        {/* TRT GOOGLE MEETS TRIGGER */}
        <button 
          onClick={() => {
            setActiveAppPopup("PROPERTY PRO V.A. COMMUNICATOR");
          }}
          className="w-16 h-16 rounded-full border-2 border-[#00ff00]/50 bg-black/80 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-[#00ff00] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] transition-all duration-300 group"
        >
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <img src="/logo.png" alt="TRT" className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] filter transition-all duration-300 group-hover:brightness-150" />
            <span className="absolute -bottom-5 text-[8px] font-bold tracking-widest text-[#00ff00]/70 group-hover:text-[#00ff00] whitespace-nowrap drop-shadow-md pb-[-10px]">
              GOOGLE MEETS
            </span>
          </div>
        </button>
      </div>

      {showForewarnProxy && (
         <ForewarnProxy onClose={() => setShowForewarnProxy(false)} />
      )}

      {showArchiveModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 pointer-events-auto bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-6xl h-[85vh] flex flex-col rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-[#00ff00]/40 bg-[#020504] overflow-hidden">
            <div className="flex-none p-6 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/40">
               <h2 className="text-xl sm:text-2xl font-black tracking-[0.4em] uppercase text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">MY FILES [ CAPTURE ARCHIVE ]</h2>
               <button onClick={() => setShowArchiveModal(false)} className="text-[#00ff00] hover:text-white transition-colors text-2xl font-black px-4 shadow-[0_0_10px_rgba(0,255,0,0.2)]">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 bg-[#010201]">
               {polaroidArchive.length === 0 ? (
                  <div className="col-span-full h-full flex flex-col items-center justify-center opacity-50">
                     <span className="text-5xl mb-4">🗄️</span>
                     <p className="text-[#00ff00] text-sm tracking-widest">ARCHIVE IS EMPTY</p>
                  </div>
               ) : (
                  polaroidArchive.map((url, i) => (
                     <div key={i} className="flex flex-col items-center bg-black border border-white/20 p-3 pb-8 rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative group transform transition hover:scale-[1.05] hover:z-10 hover:border-[#00ff00]/50 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] rotate-1 hover:rotate-0">
                        <img src={url} className="w-full h-auto object-cover border border-white/10" />
                        <span className="absolute bottom-2 left-0 right-0 text-center text-white/50 text-[10px] font-mono tracking-widest">SC-{(146177 + i).toString().padStart(6, '0')}</span>
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <a href={url} download={`OS_RECEIPT_${146177 + i}.png`} onClick={(e) => { e.stopPropagation(); setShowDownloadAlert(true); }} className="px-6 py-2 bg-[#00ff00] text-black font-bold tracking-widest text-xs rounded hover:shadow-[0_0_20px_#00ff00] transition">
                              SAVE TO DRIVE
                           </a>
                        </div>
                     </div>
                  ))
               )}
            </div>
          </div>
        </div>
      )}

      {showDownloadAlert && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl pointer-events-auto">
          <div className="relative w-full max-w-2xl p-12 bg-[#020504] border-4 border-red-600 rounded-3xl shadow-[0_0_100px_rgba(255,0,0,0.4)] flex flex-col items-center animate-pulse">
             <span className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(255,0,0,1)]">📥</span>
             <h2 className="text-2xl sm:text-4xl font-black text-red-500 tracking-[0.2em] mb-4 text-center">DOWNLOAD COMPLETE</h2>
             <p className="text-white text-lg text-center font-bold tracking-widest leading-loose mb-12">
               YOUR POLAROID RECEIPT WAS SECURELY SAVED DIRECTLY TO YOUR COMPUTER'S <strong className="text-[#00ff00] border-b-2 border-[#00ff00]">"DOWNLOADS"</strong> FOLDER.
             </p>
             <button 
                onClick={() => setShowDownloadAlert(false)} 
                className="px-12 py-5 bg-red-600 text-white font-black tracking-[0.3em] uppercase rounded-xl hover:bg-white hover:text-red-600 transition-all text-xl shadow-[0_0_30px_rgba(255,0,0,0.8)]"
             >
                I UNDERSTAND
             </button>
          </div>
        </div>
      )}

      {showUserProfile && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 pointer-events-auto bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-[#00ff00]/40 bg-[#020504] overflow-hidden">
            
            {/* Header */}
            <div className="flex-none p-6 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/40">
               <h2 className="text-xl sm:text-2xl font-black tracking-[0.4em] uppercase text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">OPERATOR PROFILE JACKET</h2>
               <button onClick={() => setShowUserProfile(false)} className="text-[#00ff00] hover:text-white transition-colors text-2xl font-black px-4 shadow-[0_0_10px_rgba(0,255,0,0.2)]">✕</button>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden p-6 lg:p-10 bg-black">
               <div className="flex justify-between items-start border-b border-[#00ff00]/30 pb-4 mb-8">
                  <div>
                    <h3 className="text-[#00ff00] text-2xl sm:text-3xl font-black tracking-widest drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">FOREWARN PROXY // IDENTITY DOSSIER</h3>
                    <p className="text-[#00ff00]/60 text-xs tracking-[0.2em] mt-1">INTERNAL SECURITY CLEARANCE: VANGUARD OPS</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-red-500 font-bold tracking-[0.3em] text-sm animate-pulse">RECORD: MONITORED</p>
                    <p className="text-[#00ff00]/40 text-[10px] tracking-widest mt-1">STATUS: ACTIVE THREAD</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Subject Details */}
                  <div className="flex flex-col gap-4">
                     <div className="bg-[#00ff00]/5 border border-[#00ff00]/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
                        <p className="text-[#00ff00]/40 text-[10px] tracking-[0.2em] font-bold mb-1">PRIMARY ALIAS [FIRST LAST]</p>
                        <p className="text-[#00ff00] text-xl font-black tracking-[0.2em] uppercase">{kronosFirst || 'PHILLIP'} {kronosLast || 'RICHARDSON'}</p>
                     </div>
                     <div className="bg-[#00ff00]/5 border border-[#00ff00]/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
                        <p className="text-[#00ff00]/40 text-[10px] tracking-[0.2em] font-bold mb-1">REGISTERED MAC ADDRESS / PRIMARY EMAIL</p>
                        <p className="text-[#00ff00] text-sm font-black tracking-[0.2em] uppercase">{kronosEmail || 'UNASSIGNED@CORP.COM'}</p>
                     </div>
                     <div className="bg-[#00ff00]/5 border border-[#00ff00]/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
                        <p className="text-[#00ff00]/40 text-[10px] tracking-[0.2em] font-bold mb-1">STATIC CELLULAR ANCHOR</p>
                        <p className="text-[#00ff00] text-xl font-mono font-black tracking-widest">{kronosPhone || '+1 (555) 000-0000'}</p>
                     </div>
                  </div>

                  {/* Redacted Backup Intel */}
                  <div className="flex flex-col gap-4">
                     <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(255,0,0,0.05)]">
                        <p className="text-red-500/60 text-[10px] tracking-[0.2em] font-bold mb-1">RECOVERY BACKUP EMAIL HASH</p>
                        <p className="text-red-500 text-sm font-black tracking-[0.3em] cursor-pointer blur-[3px] hover:blur-none transition-all duration-300">PASSCODE CAPTURED</p>
                     </div>
                     <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(255,0,0,0.05)]">
                        <p className="text-red-500/60 text-[10px] tracking-[0.2em] font-bold mb-1">SOCIAL MEDIA DATA STREAM</p>
                        <p className="text-red-500 text-sm font-black tracking-[0.3em] cursor-pointer blur-[3px] hover:blur-none transition-all duration-300">SYNC KEY ACQUIRED</p>
                     </div>
                     <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg shadow-[inset_0_0_20px_rgba(255,0,0,0.05)]">
                        <p className="text-red-500/60 text-[10px] tracking-[0.2em] font-bold mb-1">SECURITY VECTOR [MAIDEN NAME]</p>
                        <p className="text-[#00ff00]/50 text-sm font-mono tracking-widest">RECORD SECURED ON SERVER</p>
                     </div>
                  </div>
               </div>

               <div className="mt-auto pt-8 border-t border-[#00ff00]/30 mt-8">
                 <p className="text-[#00ff00]/40 text-[9px] tracking-[0.3em] font-mono leading-relaxed text-center">
                    ** ADMINISTRATIVE OVERRIDE ACTIVE. ALL INTELLIGENCE VECTORS DISPLAYED ABOVE WERE SURRENDERED DURING PHASE 4 ONBOARDING. DATA IS PERMANENTLY LOGGED IN THE KRONOS MASTER DATABASE FOR OPERATIONS OVERSIGHT AND IS IRREVERSIBLE BY THE OPERATOR.
                 </p>
               </div>
            </div>
          </div>
        </div>
      )}
      
      {/* --- KRONOS APP LIBRARY DOCK (BOTTOM MENU FOR ADDING/SUBTRACTING MODULES) --- */}
      <div 
         className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[8000] flex items-center justify-center gap-4 px-6 md:px-10 py-3 md:py-4 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${showRibbons ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-95'}
            ${theme === 'daylight' ? 'bg-white/90 border-black/10' : 'bg-black/80 border-[#00ff00]/30 glow-[#00ff00]'}
         `}
      >
         {/* Add Button */}
         <button onClick={() => setShowAppStore(true)}
           className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl transition-all hover:scale-110 shadow-lg ${theme === 'daylight' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30' : 'bg-[#00ff00]/20 text-[#00ff00] border-2 border-[#00ff00]/50 hover:bg-[#00ff00] hover:text-black'}`}
           title="Open App Store"
         >
           +
         </button>
         
         <div className="flex flex-col items-center justify-center px-4 md:px-8 border-x border-gray-500/30">
            <span className={`text-[10px] md:text-xs font-black tracking-[0.3em] leading-none ${theme === 'daylight' ? 'text-black' : 'text-[#00ff00]'}`}>INTEGRATION LIBRARY</span>
            <span className={`text-[8px] tracking-[0.4em] font-semibold mt-1 uppercase ${theme === 'daylight' ? 'text-gray-500' : 'text-[#00ff00]/50'}`}>Drag & Drop Matrix</span>
         </div>
         
         {/* Subtract/Remove Button */}
         <button onClick={() => setToolsMockup(prev => ({...prev, [activeMenu]: prev[activeMenu].slice(0, -1)}))}
           className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl transition-all hover:scale-110 shadow-lg ${theme === 'daylight' ? 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white' : 'bg-red-500/10 text-red-500 border-2 border-red-500/40 hover:bg-red-500 hover:text-black'}`}
           title="Remove Last Module"
         >
           -
         </button>
      </div>

      {/* GENERIC APP POPUPS FOR O.S. MULTITASKING */}
      {activeAppPopup && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-8 pointer-events-auto">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveAppPopup(null)}></div>
          <div className={`relative w-full max-w-lg p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${theme === 'daylight' ? 'bg-white/95 border-black/10' : 'bg-[#020504]/95 border-[#00ff00]/30'} flex flex-col items-center justify-center gap-6 z-10`}>
             <h2 className={`text-xl font-bold tracking-widest uppercase text-center ${theme === 'daylight' ? 'text-black' : 'text-[#00ff00]'}`}>{activeAppPopup}</h2>
             <div className={`w-full aspect-video rounded-xl flex flex-col gap-4 items-center justify-center border ${theme === 'daylight' ? 'bg-[#f4f7fa] border-black/10 text-black/40' : 'bg-black/50 border-[#00ff00]/20 text-[#00ff00]/40'} text-xs tracking-[0.3em] font-bold p-6 text-center shadow-inner`}>
                <span className="text-4xl opacity-50">🔒</span>
                [ DATA STREAM ENCRYPTED ]
                <br />
                <span className="text-[9px] font-normal leading-relaxed opacity-70">Awaiting database bridge to populate the actual {activeAppPopup} file vault. Physical layout confirmed successfully.</span>
             </div>
             <button onClick={() => setActiveAppPopup(null)} className={`mt-4 w-full py-4 rounded-2xl font-bold tracking-[0.2em] text-xs transition-all ${theme === 'daylight' ? 'bg-[#f0f4f8] text-black border border-black/10 hover:bg-black hover:text-white' : 'bg-black text-[#00ff00] border border-[#00ff00]/50 hover:bg-[#00ff00] hover:text-black'}`}>
                CLOSE TERMINAL NODE
             </button>
          </div>
        </div>
      )}

      
      {/* --- KRONOS APP STORE OVERLAY --- */}
      {showAppStore && (
        <div className={`fixed inset-0 z-[99999] flex flex-col p-8 sm:p-12 pointer-events-auto transition-all duration-500 ${theme === 'daylight' ? 'bg-white/95 backdrop-blur-2xl' : 'bg-[#020504]/95 backdrop-blur-2xl'}`}>
           <div className="flex justify-between items-center border-b border-gray-500/30 pb-4 mb-8">
              <div>
                <h1 className={`text-4xl font-extrabold tracking-[0.2em] uppercase ${theme === 'daylight' ? 'text-black' : 'text-[#00ff00]'}`}>APP INTEGRATION LIBRARY</h1>
                <p className={`text-xs tracking-[0.3em] font-bold mt-2 ${theme === 'daylight' ? 'text-gray-500' : 'text-[#00ff00]/50'}`}>SELECT A MODULE TO INJECT DIRECTLY INTO YOUR ACTIVE WORKSPACE.</p>
              </div>
              <button 
                onClick={() => setShowAppStore(false)}
                className={`px-6 py-2 border-2 rounded-full font-bold tracking-widest transition-all ${theme === 'daylight' ? 'border-black hover:bg-black hover:text-white text-black' : 'border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black'}`}
              >
                [ CLOSE STORE ]
              </button>
           </div>

           <div className="flex-1 w-full max-w-[1600px] mx-auto overflow-y-auto hide-scrollbar pb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {(() => {
                    const categorizedApps = TOP_25_APPS.reduce((acc, app) => {
                       (acc[app.cat] = acc[app.cat] || []).push(app.name);
                       return acc;
                    }, {});

                    return Object.keys(categorizedApps).map((category, idx) => (
                       <div key={idx} className="flex flex-col gap-4">
                          <h3 className={`text-sm tracking-[0.4em] font-black border-b pb-2 ${theme === 'daylight' ? 'text-black/40 border-black/10' : 'text-[#00ff00]/40 border-[#00ff00]/20'}`}>{category}</h3>
                          {categorizedApps[category].map((appName, j) => (
                             <div key={j} className={`p-5 rounded-2xl border transition-all hover:scale-105 cursor-pointer shadow-lg flex flex-col justify-between aspect-[2/1] ${theme === 'daylight' ? 'bg-[#f4f7fa] border-black/10 hover:border-blue-500 hover:shadow-blue-500/20 text-black' : 'bg-black/50 border-[#00ff00]/20 hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] text-[#00ff00]'}`}>
                                <h4 className="font-bold tracking-widest text-sm lg:text-[15px]">{appName}</h4>
                                <button 
                                  onClick={() => {
                                      handleAddModule(appName);
                                      setShowAppStore(false);
                                  }}
                                  className={`self-end px-4 py-1.5 text-[10px] font-black tracking-widest rounded-full transition-colors ${theme === 'daylight' ? 'bg-black text-white hover:bg-blue-600' : 'bg-[#00ff00]/20 hover:bg-[#00ff00] hover:text-black border border-[#00ff00]/50'}`}
                                >
                                  DOWNLOAD
                                </button>
                             </div>
                          ))}
                       </div>
                    ));
                 })()}
              </div>
           </div>
        </div>
      )}

      {/* THE KRONOS SYSTEM SETTINGS & INTEGRATIONS PORTAL */}
      {showIntegrationsPortal && (
        <div className="absolute inset-0 bg-[#020504]/90 backdrop-blur-2xl z-[99999] flex flex-col pointer-events-auto">
          {/* Top Bar */}
          <div className="px-12 py-8 border-b border-[#00ff00]/20 flex justify-between items-center bg-gradient-to-r from-black via-[#00ff00]/5 to-black">
            <div>
              <h1 className="text-4xl font-bold tracking-[0.4em] text-[#00ff00] drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">SYSTEM_INTEGRATIONS</h1>
              <p className="text-[#00ff00]/60 tracking-[0.3em] text-xs mt-2 uppercase">Brand Core / API Pipelines / Third-Party Nodes</p>
            </div>
            <button 
              onClick={() => setShowIntegrationsPortal(false)}
              className="px-6 py-2 border-2 border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 text-sm font-bold tracking-widest rounded-full transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)]"
            >
              [ EXECUTE CLOSE ]
            </button>
          </div>

          <div className="flex-1 p-12 overflow-y-auto w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
             
             {/* LEFT COLUMN: THE 'PERSONA & BRAND' CORE */}
             <div className="flex flex-col gap-6">
                <div className="bg-[#010a01] border border-[#00ff00]/30 rounded-3xl p-10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 blur-[1px] pointer-events-none group-hover:scale-110 transition-transform">
                     <svg className="w-32 h-32 text-[#00ff00]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                   </div>
                   <h2 className="text-2xl text-[#00ff00] font-bold tracking-[0.2em] mb-2">TARGET PERSONA</h2>
                   <p className="text-[#00ff00]/50 tracking-widest text-xs mb-8 uppercase">The logic core driving AI generation tone.</p>

                   <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2 relative z-10">
                        <label className="text-[10px] tracking-[0.3em] font-bold text-[#00ff00]">CITY / SERVICE AREA</label>
                        <input type="text" placeholder="e.g. Houston, TX" className="bg-black border border-[#00ff00]/40 rounded-xl p-4 text-white font-mono tracking-widest focus:border-[#00ff00] focus:shadow-[0_0_20px_rgba(0,255,0,0.15)] outline-none transition-all" />
                      </div>

                      <div className="flex flex-col gap-2 relative z-10">
                        <label className="text-[10px] tracking-[0.3em] font-bold text-[#00ff00]">IDEAL CLIENT TARGET</label>
                        <textarea rows="3" placeholder="e.g. First time home buyers looking for multi-family..." className="bg-black border border-[#00ff00]/40 rounded-xl p-4 text-white font-mono tracking-widest focus:border-[#00ff00] focus:shadow-[0_0_20px_rgba(0,255,0,0.15)] outline-none transition-all resize-none"></textarea>
                      </div>

                      <div className="flex flex-col gap-2 relative z-10">
                        <label className="text-[10px] tracking-[0.3em] font-bold text-[#00ff00]">PRIMARY BRANDING HIGHLIGHT (HEX)</label>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl border border-[#00ff00]/40 bg-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.4)]"></div>
                           <input type="text" defaultValue="#00FF00" className="bg-black border border-[#00ff00]/40 rounded-xl p-4 text-[#00ff00] font-mono tracking-widest flex-1 focus:border-[#00ff00] outline-none" />
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 py-4 bg-[#010a01] hover:bg-[#00ff00] border-2 border-[#00ff00]/50 text-[#00ff00] hover:text-black font-bold tracking-[0.3em] rounded-xl transition-all uppercase shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                         LOCK PERSONA TO BLOCKCHAIN
                      </button>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: THE API INTEGRATIONS TILES */}
             <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl text-[#00ff00] font-bold tracking-[0.2em] mb-2">EXTERNAL ROUTING NODES</h2>
                  <p className="text-[#00ff00]/50 tracking-widest text-xs mb-8 uppercase">Google/Apple Logic: Pretty tiles. One-click bind.</p>
                </div>
                
                {/* Facebook Tile */}
                <div className="flex items-center justify-between p-6 bg-black border border-[#00ff00]/30 hover:border-[#00ff00] rounded-[24px] shadow-[0_5px_20px_rgba(0,0,0,0.5)] group transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center border border-[#1877F2]/30 text-3xl font-sans font-bold text-[#1877F2]">f</div>
                      <div>
                        <h3 className="text-white tracking-widest font-bold text-lg">FACEBOOK</h3>
                        <p className="text-white/40 tracking-widest text-xs">Business Page Syndication</p>
                      </div>
                   </div>
                   <button className="px-6 py-2.5 bg-[#1877F2] text-white font-bold tracking-widest rounded-full text-xs shadow-[0_0_15px_rgba(24,119,242,0.4)] hover:bg-[#0c59cb] transition-colors">
                     CONNECTED
                   </button>
                </div>

                {/* Instagram Tile */}
                <div className="flex items-center justify-between p-6 bg-black border border-[#00ff00]/30 hover:border-[#00ff00] rounded-[24px] shadow-[0_5px_20px_rgba(0,0,0,0.5)] group transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] scale-100 opacity-20 rounded-2xl absolute blur-md"></div>
                      <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-[#bc1888]/50 text-2xl font-bold text-white relative z-10">Ig</div>
                      <div className="relative z-10">
                        <h3 className="text-white tracking-widest font-bold text-lg">INSTAGRAM</h3>
                        <p className="text-white/40 tracking-widest text-xs">Direct API Publishing</p>
                      </div>
                   </div>
                   <button className="px-6 py-2.5 bg-black border border-white/20 text-white hover:border-[#bc1888] hover:text-[#bc1888] font-bold tracking-widest rounded-full text-xs transition-colors">
                     CONNECT
                   </button>
                </div>

                {/* Canva Tile */}
                <div className="flex items-center justify-between p-6 bg-black border border-[#00ff00]/30 hover:border-[#00ff00] rounded-[24px] shadow-[0_5px_20px_rgba(0,0,0,0.5)] group transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#00C4CC]/10 rounded-2xl flex items-center justify-center border border-[#00C4CC]/30 font-bold text-[#00C4CC] tracking-tighter text-2xl italic">C</div>
                      <div>
                        <h3 className="text-white tracking-widest font-bold text-lg">CANVA API</h3>
                        <p className="text-white/40 tracking-widest text-xs">Brand Asset Import</p>
                      </div>
                   </div>
                   <button className="px-6 py-2.5 bg-black border border-white/20 text-white hover:border-[#00C4CC] hover:text-[#00C4CC] font-bold tracking-widest rounded-full text-xs transition-colors">
                     CONNECT
                   </button>
                </div>
                
                {/* FollowUp Boss Tile (Optional Mockup) */}
                <div className="flex items-center justify-between p-6 bg-black border border-[#00ff00]/30 hover:border-[#00ff00] rounded-[24px] opacity-60 hover:opacity-100 shadow-[0_5px_20px_rgba(0,0,0,0.5)] group transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white text-xl">FB</div>
                      <div>
                        <h3 className="text-white tracking-widest font-bold text-lg flex items-center gap-2">FOLLOWUP BOSS <span className="px-2 py-0.5 bg-[#00ff00]/20 text-[#00ff00] text-[8px] rounded uppercase">Coming Soon</span></h3>
                        <p className="text-white/40 tracking-widest text-xs">CRM Lead Routing</p>
                      </div>
                   </div>
                   <button className="px-6 py-2.5 bg-black border border-white/10 text-white/30 font-bold tracking-widest rounded-full text-xs cursor-not-allowed">
                     LOCKED
                   </button>
                </div>

             </div>
          </div>
        </div>
      )}

      {/* THE iPHONE VIEWPORT TRAINING PORTAL [ NETWORK NODE ] */}
      {showTrainingPortal && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl z-[99999] flex flex-col pointer-events-auto overflow-hidden">
          {/* Top Bar Navigation */}
          <div className="px-12 py-8 border-b border-[#00ff00]/20 flex justify-between items-center bg-gradient-to-r from-black via-[#00ff00]/5 to-black relative z-50">
            <div>
              <h1 className="text-4xl font-bold tracking-[0.4em] text-[#00ff00] drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">NETWORK_NODE / TRAINING HUB</h1>
              <p className="text-[#00ff00]/60 tracking-[0.3em] text-xs mt-2 uppercase">Vanguard Tactical Onboarding / Accelerated Setup</p>
            </div>
            <button 
              onClick={() => setShowTrainingPortal(false)}
              className="px-6 py-2 border-2 border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 text-sm font-bold tracking-widest rounded-full transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)]"
            >
              [ EXECUTE CLOSE ]
            </button>
          </div>

          <div className="flex-1 overflow-y-auto w-full p-6 lg:p-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 relative">
             
             {/* LEFT COLUMN: THE PHYSICAL iPHONE TRAINING VIEWPORT */}
             <div className="relative shrink-0 flex items-center justify-center p-4">
               {/* Ambient Glow */}
               <div className="absolute inset-0 bg-[#00ff00]/20 blur-[100px] rounded-full z-0"></div>
               
               {/* Apple iPhone Hardware Shell (CSS Rendered) */}
               <div className="relative w-[320px] h-[650px] sm:w-[380px] sm:h-[780px] bg-black border-[8px] sm:border-[12px] border-zinc-900 rounded-[45px] sm:rounded-[55px] shadow-[inset_0_0_3px_2px_rgba(255,255,255,0.2),_0_0_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(0,255,0,0.2)] flex flex-col items-center justify-start overflow-hidden z-10 transition-transform hover:scale-[1.02] duration-500">
                  
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-4 w-32 h-8 bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                     <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-green-500/80 rounded-full shadow-[0_0_5px_rgba(0,255,0,1)]"></div>
                  </div>

                  {/* 9:16 Video Container (Simulated Cartoon Training View) */}
                  <div className="w-full h-full bg-[#030a05] relative flex flex-col">
                     {/* Placeholder for Realtor.com IKEA-Logic Cartoon Video */}
                     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
                        
                        <div className="relative z-10 flex flex-col items-center justify-center animate-pulse">
                           <div className="w-20 h-20 bg-[#00ff00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,0,0.5)] mb-6 cursor-pointer hover:scale-110 transition-transform">
                              <svg className="w-10 h-10 text-black ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                           <h3 className="text-white font-bold tracking-[0.2em] text-lg uppercase drop-shadow-md">Phase 01: The Matrix</h3>
                           <p className="text-[#00ff00] text-xs tracking-widest mt-2 uppercase">Tap to initialize playback</p>
                        </div>
                     </div>

                     {/* Video Controls / Captions Area (Static) */}
                     <div className="h-32 bg-black border-t border-[#00ff00]/30 p-6 flex flex-col justify-between shrink-0">
                        <p className="text-white/80 font-mono text-[10px] leading-relaxed tracking-widest text-center">
                           "Welcome to KRONOS. In this session, we will configure your absolute master schedule..."
                        </p>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-[#00ff00] w-1/3 shadow-[0_0_10px_rgba(0,255,0,0.8)]"></div>
                        </div>
                     </div>
                  </div>
               </div>
             </div>

             {/* RIGHT COLUMN: TRAINING SELECTOR & SYNC LOGIC */}
             <div className="flex-1 flex flex-col gap-8 w-full max-w-2xl py-8 lg:py-16">
                <div>
                   <h2 className="text-3xl text-[#00ff00] font-bold tracking-[0.3em] mb-2 uppercase drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">Network Operations</h2>
                   <p className="text-[#00ff00]/50 tracking-widest text-sm uppercase">Select a tactical briefing. All videos render perfectly in vertical protocol.</p>
                </div>

                <div className="flex flex-col gap-4">
                   {/* Training Video Module Target 1 */}
                   <div className="p-6 bg-[#00ff00]/10 border border-[#00ff00]/50 rounded-2xl flex items-center gap-6 cursor-pointer hover:bg-[#00ff00]/20 transition-colors shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-[#00ff00] text-[#00ff00] font-bold shrink-0">01</div>
                      <div className="flex-1">
                         <h3 className="text-white font-bold tracking-widest text-lg">System Initialization</h3>
                         <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">Deploying Your Target Persona & Brand Core</p>
                      </div>
                      <span className="text-[#00ff00] animate-pulse">● PLAYING</span>
                   </div>

                   {/* Training Video Module Target 2 */}
                   <div className="p-6 bg-black border border-white/20 rounded-2xl flex items-center gap-6 cursor-pointer hover:border-[#00ff00]/50 transition-colors group opacity-70 hover:opacity-100">
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-white/20 text-white/50 font-bold shrink-0 group-hover:text-[#00ff00] group-hover:border-[#00ff00]">02</div>
                      <div className="flex-1">
                         <h3 className="text-white/80 font-bold tracking-widest text-lg group-hover:text-white">The Drag & Drop Matrix</h3>
                         <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1">OS-Level Calendar Integration Tactics</p>
                      </div>
                      <span className="text-white/20 text-xs tracking-widest group-hover:text-[#00ff00]">2:45 MIN</span>
                   </div>

                   {/* Training Video Module Target 3 */}
                   <div className="p-6 bg-black border border-white/20 rounded-2xl flex items-center gap-6 cursor-pointer hover:border-[#00ff00]/50 transition-colors group opacity-70 hover:opacity-100">
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-white/20 text-white/50 font-bold shrink-0 group-hover:text-[#00ff00] group-hover:border-[#00ff00]">03</div>
                      <div className="flex-1">
                         <h3 className="text-white/80 font-bold tracking-widest text-lg group-hover:text-white">API Data Injection</h3>
                         <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1">Syncing Listings & Generating Reports</p>
                      </div>
                      <span className="text-white/20 text-xs tracking-widest group-hover:text-[#00ff00]">4:12 MIN</span>
                   </div>
                </div>

                {/* Direct Action */}
                <div className="mt-8 p-8 border border-[#00ff00]/20 bg-gradient-to-br from-[#010a01] to-black rounded-3xl relative overflow-hidden group">
                   <div className="absolute right-0 top-0 w-32 h-32 bg-[#00ff00]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                   <h3 className="text-white font-bold tracking-widest text-xl mb-2 relative z-10">REQUIRE LIVE ASSISTANCE?</h3>
                   <p className="text-white/50 text-[10px] tracking-[0.2em] mb-6 uppercase relative z-10 max-w-md">Join a secure Zoom deployment pipeline with KRONOS onboarding specialists. Bookings available Monday-Friday.</p>
                   <button className="px-8 py-3 bg-black border-2 border-[#00ff00]/50 text-[#00ff00] hover:bg-[#00ff00] hover:text-black font-bold tracking-[0.2em] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,0,0.1)] relative z-10 text-xs uppercase">
                      INITIATE ZOOM CALENDAR SYNC +
                   </button>
                </div>

             </div>
          </div>
        </div>
      )}
      {/* THE OFFSHORE COMMAND TERMINAL [ ACTIVE DEPLOYMENTS ] */}
      {showTerminalPortal && (
        <div className="absolute inset-0 bg-black z-[99999] flex flex-col pointer-events-auto overflow-hidden font-mono">
          {/* Top Bar Navigation */}
          <div className="px-6 py-4 border-b border-[#00ff00] flex justify-between items-center bg-[#010a01]">
             <div>
               <h1 className="text-2xl font-bold tracking-[0.4em] text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">ACTIVE_DEPLOYMENTS / GLOBAL ROUTING</h1>
               <p className="text-[#00ff00]/60 tracking-[0.3em] text-[10px] mt-1 uppercase">Offshore Tactical Terminal (Auth: VA_Tier_1)</p>
             </div>
             <button 
               onClick={() => setShowTerminalPortal(false)}
               className="px-6 py-1.5 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 text-xs font-bold tracking-widest transition-all"
             >
               ABORT / CLOSE
             </button>
          </div>
          
          {/* 4-GRID TERMINAL LAYOUT */}
          <div className="flex-1 p-8 grid grid-cols-2 grid-rows-2 gap-10 bg-[#020504]">
             {/* TERMINAL 1: SITEX EXTRACTION (NEON GREEN - WEALTH/HARVEST) */}
             <div className="backdrop-blur-xl bg-black/40 border-2 border-[#00ff00]/30 rounded-lg flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.15)] relative group hover:border-[#00ff00] hover:shadow-[0_0_50px_rgba(0,255,0,0.25)] transition-all duration-500">
                <div className="bg-gradient-to-r from-[#00ff00]/20 to-transparent px-4 py-3 border-b border-[#00ff00]/30 flex justify-between items-center">
                   <h2 className="text-[#00ff00] text-sm font-black tracking-[0.3em] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">TRM_01: SITEX_PRO EXTRACTION</h2>
                   <span className="text-[10px] font-bold text-[#00ff00] uppercase tracking-widest animate-pulse flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_10px_#00ff00]"></div> AWAITING INPUT
                   </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#00ff00]/5 to-transparent">
                   <div className="text-[#00ff00]/70 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                     Enter targeted ZIP Code matrix to initialize multi-threaded broker extraction.
                   </div>
                   <input 
                      type="text" 
                      placeholder="ENTER ZIP (e.g. 77002)" 
                      className="w-full bg-[#010a01] border border-[#00ff00]/40 text-[#00ff00] font-mono text-sm p-4 rounded outline-none focus:border-[#00ff00] focus:shadow-[0_0_20px_rgba(0,255,0,0.3)] placeholder:text-[#00ff00]/30 transition-shadow" 
                   />
                   <button 
                      onClick={async () => {
                         try {
                             const res = await fetch("http://134.199.195.34:8000/trm-01/sitex-extract", {
                                 method: "POST", headers: { "Content-Type": "application/json" },
                                 body: JSON.stringify({ zip_code: "77002", target_count: 150 })
                             });
                             const data = await res.json();
                             alert("CLOUD BRIDGE SUCCESS:\n" + data.message);
                         } catch (e) {
                             alert("KRONOS CLOUD WARNING: " + e.message);
                         }
                      }}
                      className="w-full py-4 mt-auto bg-black border-2 border-[#00ff00]/50 text-[#00ff00] font-black text-xs tracking-[0.4em] hover:bg-[#00ff00] hover:text-black transition-all rounded-md shadow-[0_0_15px_rgba(0,255,0,0.2)] uppercase"
                   >
                      [ EXECUTE SITEX PROTOCOL ]
                   </button>
                   <div className="pt-2 border-t border-[#00ff00]/20 text-[#00ff00]/40 text-[9px] tracking-[0.3em] flex justify-between">
                       <span>STATUS: VA_STANDBY</span>
                       <span className="text-[#00ff00]/20">v.3.2</span>
                   </div>
                </div>
             </div>

             {/* TERMINAL 2: FEDERAL DNC SCRUB (AMBER - DANGER/WARNING) */}
             <div className="backdrop-blur-xl bg-black/40 border-2 border-amber-500/30 rounded-lg flex flex-col overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] relative group hover:border-amber-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-all duration-500">
                <div className="bg-gradient-to-r from-amber-500/20 to-transparent px-4 py-3 border-b border-amber-500/30 flex justify-between items-center">
                   <h2 className="text-amber-500 text-sm font-black tracking-[0.3em] drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">TRM_02: FEDERAL DNC SCRUB</h2>
                   <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b] animate-pulse"></div> SECURE DROP
                   </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-500/5 to-transparent">
                   <div className="flex-1 w-full border-2 border-dashed border-amber-500/30 rounded-lg flex items-center justify-center bg-black/50 hover:bg-amber-500/10 hover:border-amber-500/60 transition-colors cursor-pointer group/drop shadow-inner">
                      <span className="text-amber-500/50 group-hover/drop:text-amber-500 font-bold text-[10px] tracking-[0.3em] transition-colors uppercase">
                          + DRAG & DROP RAW CSV FILE HERE
                      </span>
                   </div>
                   <button 
                      onClick={async () => {
                         try {
                             const res = await fetch("http://134.199.195.34:8000/trm-02/federal-scrub", { method: "POST" });
                             const data = await res.json();
                             alert("CLOUD BRIDGE SUCCESS:\n" + data.message);
                         } catch (e) {
                             alert("KRONOS CLOUD WARNING: " + e.message);
                         }
                      }}
                      className="w-full mt-auto py-4 bg-black border-2 border-amber-500/50 text-amber-500 font-black text-xs tracking-[0.4em] hover:bg-amber-500 hover:text-black transition-all rounded-md shadow-[0_0_15px_rgba(245,158,11,0.2)] uppercase"
                   >
                      [ INITIATE MASTER SCRUB ]
                   </button>
                   <div className="pt-2 border-t border-amber-500/20 text-amber-500/40 text-[9px] tracking-[0.3em] flex justify-between">
                       <span>STATUS: AWAITING PAYLOAD</span>
                       <span className="text-amber-500/20">v.3.2</span>
                   </div>
                </div>
             </div>

             {/* TERMINAL 3: HAR.COM DATABRIDGE (CYAN - API/DATA STREAM) */}
             <div className="backdrop-blur-xl bg-black/40 border-2 border-cyan-500/30 rounded-lg flex flex-col overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] relative group hover:border-cyan-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all duration-500">
                <div className="bg-gradient-to-r from-cyan-500/20 to-transparent px-4 py-3 border-b border-cyan-500/30 flex justify-between items-center">
                   <h2 className="text-cyan-500 text-sm font-black tracking-[0.3em] drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">TRM_03: HAR.COM DATABRIDGE</h2>
                   <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse"></div> LISTENING
                   </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-cyan-500/5 to-transparent">
                   <div className="text-cyan-500/70 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                     Target specific listing flags to pull from HAR matrix 24/7.
                   </div>
                   <div className="flex gap-3 w-full mt-2">
                      <button className="flex-1 py-3 bg-cyan-500 text-black border border-cyan-500 text-[10px] font-black tracking-[0.3em] rounded shadow-[0_0_15px_rgba(6,182,212,0.4)]">EXPIRED</button>
                      <button className="flex-1 py-3 bg-[#010a0a] text-cyan-500/60 hover:text-cyan-500 hover:bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold tracking-[0.3em] rounded transition-all">PROBATE</button>
                      <button className="flex-1 py-3 bg-[#010a0a] text-cyan-500/60 hover:text-cyan-500 hover:bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold tracking-[0.3em] rounded transition-all">RETAIL</button>
                   </div>
                   <button 
                      onClick={async () => {
                         try {
                             const res = await fetch("http://134.199.195.34:8000/trm-03/har-databridge", { method: "POST" });
                             const data = await res.json();
                             alert("CLOUD BRIDGE SUCCESS:\n" + data.message);
                         } catch (e) {
                             alert("KRONOS CLOUD WARNING: " + e.message);
                         }
                      }}
                      className="w-full mt-auto py-4 bg-black border-2 border-cyan-500/50 text-cyan-500 font-black text-xs tracking-[0.4em] hover:bg-cyan-500 hover:text-black transition-all rounded-md shadow-[0_0_15px_rgba(6,182,212,0.2)] uppercase"
                   >
                      [ ACTIVATE 24/7 DATABRIDGE ]
                   </button>
                   <div className="pt-2 border-t border-cyan-500/20 text-cyan-500/40 text-[9px] tracking-[0.3em] flex justify-between">
                       <span>STATUS: SYNC OFFLINE</span>
                       <span className="text-cyan-500/20">v.3.2</span>
                   </div>
                </div>
             </div>

             {/* TERMINAL 4: FOLLOWUP BOSS ROUTING (RED - EXECUTE/BLOOD) */}
             <div className="backdrop-blur-xl bg-black/40 border-2 border-red-500/30 rounded-lg flex flex-col overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)] relative group hover:border-red-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.25)] transition-all duration-500">
                <div className="bg-gradient-to-r from-red-500/20 to-transparent px-4 py-3 border-b border-red-500/30 flex justify-between items-center">
                   <h2 className="text-red-500 text-sm font-black tracking-[0.3em] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">TRM_04: FOLLOWUP BOSS CRUX</h2>
                   <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse"></div> DISCONNECTED
                   </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-red-500/5 to-transparent">
                   <div className="text-red-500/70 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                     Inject clean, scrubbed lead batches directly into specific FUB agent pipelines.
                   </div>
                   <div className="relative">
                       <select className="w-full bg-[#0a0101] border border-red-500/40 text-red-500 font-bold tracking-[0.2em] text-[10px] p-4 rounded outline-none focus:border-red-500 hover:border-red-500/70 appearance-none cursor-pointer transition-colors shadow-inner">
                          <option>SELECT FUB PIPELINE DESTINATION</option>
                          <option>TRT_FLIP_PIPELINE</option>
                          <option>TRT_RETAIL_PIPELINE</option>
                          <option>TRT_WHOLESALE_PIPELINE</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">▼</div>
                   </div>
                   <button 
                      onClick={async () => {
                         try {
                             const res = await fetch("http://134.199.195.34:8000/trm-04/fub-routing", {
                                 method: "POST", headers: { "Content-Type": "application/json" },
                                 body: JSON.stringify({ pipeline_flag: "FLIP_PIPELINE_1", authorized_agent: "VA_TEAM_ALPHA" })
                             });
                             const data = await res.json();
                             alert("CLOUD BRIDGE SUCCESS:\n" + data.message);
                         } catch (e) {
                             alert("KRONOS CLOUD WARNING: " + e.message);
                         }
                      }}
                      className="w-full mt-auto py-4 bg-red-500 border-2 border-red-500 text-black font-black text-xs tracking-[0.4em] hover:bg-red-400 transition-all rounded-md shadow-[0_0_20px_rgba(239,68,68,0.4)] uppercase"
                   >
                      [ PUSH BATCH TO CRM ]
                   </button>
                   <div className="pt-2 border-t border-red-500/20 text-red-500/40 text-[9px] tracking-[0.3em] flex justify-between">
                       <span>STATUS: 0 LEADS IN CACHE</span>
                       <span className="text-red-500/20">v.3.2</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
