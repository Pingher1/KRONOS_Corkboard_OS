import React, { useState } from 'react';

const VA_PROFILES = {
  esha: {
    name: "ESHA (TEAM LEAD)",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80", // Premium Corporate Glass
    tools: ["fub", "homes", "har", "zillow", "realtor", "hcad", "fbcad", "dpr", "maps", "canva", "friend_zone"],
    clearance: "LEVEL_4_ALPHA"
  },
  agent_1: {
    name: "AGENT ALPHA (CALLER)",
    bg: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80", // Minimalist Modern Desk
    tools: ["fub", "zillow", "homes", "maps"],
    clearance: "LEVEL_1_STANDARD"
  },
  agent_2: {
    name: "AGENT BRAVO (CALLER)",
    bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80", // High-tech workstation
    tools: ["fub", "har", "realtor", "maps"],
    clearance: "LEVEL_1_STANDARD"
  },
  agent_3: {
    name: "AGENT CHARLIE (RESEARCH)",
    bg: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80", // Clean office space
    tools: ["fub", "hcad", "fbcad", "tsahc", "maps"],
    clearance: "LEVEL_2_RESEARCH"
  }
};

const T = {
  en: {
    portal: "KRONOS VA PORTAL",
    fub: "FOLLOW UP BOSS",
    homes: "HOMES.COM",
    har: "HAR.COM",
    zillow: "ZILLOW",
    realtor: "REALTOR.COM",
    hcad: "HCAD",
    fbcad: "FBCAD",
    canva: "CANVA DESIGN",
    friend_zone: "[ THE FRIEND ZONE ]",
    add: "+ ADD ASSET",
    deploy: "ACTIVE DEPLOYMENTS / PIPELINE OP",
    playground: "ASSET PLAYGROUND",
    playground_sub: "This panel syncs with the Top 10 Prescribed Apps. Clicking 'FOLLOW UP BOSS' will load the full CRM view directly into this window.",
    exit: "EXIT B2B PORTAL",
    t1_title: "TRM_01: SITEX_PRO EXTRACTION",
    t1_desc: "ENTER TARGETED ZIP CODE MATRIX TO INITIALIZE MULTI-THREADED BROKER EXTRACTION.",
    t1_btn: "[ EXECUTE SITEX PROTOCOL ]",
    t2_title: "TRM_02: FEDERAL DNC SCRUB",
    t2_desc: "+ DRAG & DROP RAW CSV FILE HERE",
    t2_btn: "[ INITIATE MASTER SCRUB ]",
    t3_title: "TRM_03: HAR.COM DATABRIDGE",
    t3_desc: "TARGET SPECIFIC LISTING FLAGS TO PULL FROM HAR MATRIX 24/7.",
    t3_btn: "[ ACTIVATE 24/7 DATABRIDGE ]",
    t4_title: "TRM_04: FOLLOWUP BOSS CRUX",
    t4_desc: "INJECT CLEAN, SCRUBBED LEAD BATCHES DIRECTLY INTO SPECIFIC FUB AGENT PIPELINES.",
    t4_btn: "[ PUSH BATCH TO CRM ]",
    dpr: "DOWN PAYMENT RESOURCE",
    tsahc: "TEXAS STATE HOUSING (TSAHC)",
    maps: "GOOGLE MAPS"
  },
  ur: {
    portal: "کرونوس وی اے پورٹل",
    fub: "فالو اپ باس (CRM)",
    homes: "ہومز ڈاٹ کام",
    har: "ایچ اے آر ڈاٹ کام (HAR)",
    zillow: "زیلو (Zillow)",
    realtor: "ریئلٹر ڈاٹ کام",
    hcad: "ہیرس کاؤنٹی ایپریزل (HCAD)",
    fbcad: "فورٹ بینڈ کاؤنٹی (FBCAD)",
    canva: "کینوا (Canva)",
    friend_zone: "[ فرینڈ زون ]",
    add: "+ اثاثہ شامل کریں",
    deploy: "فعال تعیناتیاں / پائپ لائن آپریشنز",
    playground: "توسیعی پینل",
    playground_sub: "یہ پینل آپ کے منتخب کردہ ٹاپ 10 ایپس کے ساتھ مطابقت رکھتا ہے۔ نیا صفحہ کھولنے کے لیے اوپر کلک کریں۔",
    exit: "مرکزی سسٹم سے باہر نکلیں",
    t1_title: "TRM_01: سائٹیکس ڈیٹا بازیافت",
    t1_desc: "بروکر کے اعداد و شمار نکالنے کے لئے زپ کوڈ درج کریں۔",
    t1_btn: "[ سائٹیکس پروٹوکول چلائیں ]",
    t2_title: "TRM_02: ریڈار ڈی این سی سکرب",
    t2_desc: "+ خام سی ایس وی فائل کو یہاں اپ لوڈ کریں",
    t2_btn: "[ ماسٹر سکرب شروع کریں ]",
    t3_title: "TRM_03: ایچ اے آر ڈیٹا برج",
    t3_desc: "مخصوص لسٹنگ کو فلٹر کرنے کے لئے ہدف بنائیں۔",
    t3_btn: "[ ڈیٹا برج کو آن کریں ]",
    t4_title: "TRM_04: فالو اپ باس روٹنگ",
    t4_desc: "صاف شدہ لیڈز کو براہ راست ایف یو بی پائپ لائنوں میں بھیجیں۔",
    t4_btn: "[ سی آر ایم میں اپ لوڈ کریں ]",
    dpr: "ڈاؤن پیمنٹ ریسورس (DPR)",
    tsahc: "ٹیکساس اسٹیٹ ہاؤسنگ (TSAHC)",
    maps: "گوگل میپس (MAPS)"
  }
};

export default function VA_Portal({ setAppMode }) {
  const [activeProfile, setActiveProfile] = useState('esha');
  const [lang, setLang] = useState('en');

  const profile = VA_PROFILES[activeProfile];
  
  // Custom aesthetic mapping for specific tools
  const TOOL_STYLES = {
    fub: "bg-white hover:bg-blue-50 text-blue-600 border border-blue-100",
    homes: "bg-white hover:bg-purple-50 text-purple-600 border border-purple-100",
    har: "bg-white hover:bg-red-50 text-red-600 border border-red-100",
    zillow: "bg-white hover:bg-blue-50 text-blue-500 border border-blue-100",
    realtor: "bg-white hover:bg-red-50 text-red-600 border border-red-100",
    hcad: "bg-white hover:bg-green-50 text-green-700 border border-green-200",
    fbcad: "bg-white hover:bg-green-50 text-green-700 border border-green-200",
    maps: "bg-white hover:bg-yellow-50 text-yellow-700 border border-yellow-200",
    canva: "bg-white hover:bg-teal-50 text-teal-600 border border-teal-100",
    dpr: "bg-white hover:bg-teal-50 text-teal-700 border border-teal-200",
    tsahc: "bg-white hover:bg-blue-50 text-blue-800 border border-blue-200",
    friend_zone: "bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white animate-pulse border-pink-400"
  };
  
  return (
    <div 
      className="relative w-full h-screen overflow-hidden font-mono bg-white"
      style={{
        backgroundImage: `url(${profile.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* DAYTIME MODE: Bright frosted glass overlay instead of dark blackout */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md z-0"></div>

      {/* HEADER BAR - DYNAMIC PRESCRIBED DOCK */}
      <div className="relative z-10 w-full h-16 bg-white/70 border-b border-white/50 backdrop-blur-xl flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-gray-300">
             <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
             <div className="flex flex-col">
               <span className="text-gray-900 font-black tracking-[0.3em] text-sm drop-shadow-sm">{T[lang].portal}</span>
               <span className="text-blue-600 text-[8px] font-sans opacity-90 font-bold tracking-widest">{profile.clearance}</span>
             </div>
          </div>
          
          {/* THE DYNAMIC PRESCRIBED APP DOCK (Mapped to Profile) */}
          <div className="flex flex-wrap items-center gap-2 max-w-3xl">
             {profile.tools.map(toolKey => (
                 <button key={toolKey} className={`px-3 py-1 text-[10px] font-bold tracking-widest rounded transition-all shadow-sm ${TOOL_STYLES[toolKey] || "bg-white text-gray-700 border border-gray-200"}`}>
                    {toolKey === 'maps' && <span className="mr-1">📍</span>}
                    {toolKey === 'dpr' && <span className="mr-1">🏦</span>}
                    {toolKey === 'tsahc' && <span className="mr-1">🏛️</span>}
                    {T[lang][toolKey]}
                 </button>
             ))}
             <button className="px-3 py-1 bg-white/40 hover:bg-orange-50 text-orange-600 text-[10px] font-bold tracking-widest rounded transition-colors border border-orange-200 border-dashed backdrop-blur-sm">{T[lang].add}</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* LANGUAGE TOGGLE KEY - BRIGHT */}
          <button 
             onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
             className="px-4 py-1.5 bg-blue-500 text-white text-[10px] font-bold flex items-center gap-2 tracking-widest rounded hover:bg-blue-600 transition-colors shadow-md border border-blue-600"
          >
             [ {lang === 'en' ? 'URDU / ارد' : 'ENGLISH'} ]
          </button>

          {/* SIMULATED LOGIN PROFILES (For Dev Meeting Demonstration) */}
          <div className="flex flex-col border-l border-gray-300 pl-4 ml-2">
             <span className="text-[7px] text-blue-600 font-black tracking-[0.2em] uppercase mb-0.5">DEV DEMO: SWITCH USER</span>
             <select 
               className="bg-transparent border-none text-gray-900 font-black text-[10px] tracking-widest outline-none cursor-pointer uppercase py-0.5"
               value={activeProfile}
               onChange={(e) => setActiveProfile(e.target.value)}
             >
                <option value="esha">ESHA (TEAM LEAD)</option>
                <option value="agent_1">AGENT ALPHA</option>
                <option value="agent_2">AGENT BRAVO</option>
                <option value="agent_3">AGENT CHARLIE</option>
             </select>
          </div>

          <button 
             onClick={() => setAppMode('kronos')}
             className="px-4 py-1.5 ml-2 bg-white border border-red-200 text-red-600 text-[10px] font-bold tracking-widest rounded hover:bg-red-50 hover:border-red-500 transition-colors shadow-sm"
          >
             {T[lang].exit}
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE GRID - 2 PANELS ("First one locked, second one open playground") */}
      <div className="relative z-10 w-full h-[calc(100vh-64px)] p-6 flex gap-6">
         
         {/* PANEL 1: THE TACTICAL TERMINALS (LOCKED) - BRIGHT MODE */}
         <div className="w-[800px] h-full bg-white/70 backdrop-blur-2xl border border-white/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="w-full bg-white/90 px-4 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
               <h2 className="text-gray-900 text-xs font-black tracking-widest">{T[lang].deploy}</h2>
               <span className="text-blue-700 text-[9px] font-bold tracking-[0.2em] border border-blue-200 px-3 py-1 rounded-full bg-blue-50 shadow-inner">AUTH: VA_TIER_1</span>
            </div>

            <div className="flex-1 p-6 grid grid-cols-2 grid-rows-2 gap-6 overflow-y-auto">
                <TerminalBox 
                  color="emerald" 
                  title={T[lang].t1_title}
                  desc={T[lang].t1_desc}
                  btnLabel={T[lang].t1_btn}
                  endpoint="trm-01/sitex-extract"
                  body={{ zip_code: "77002", target_count: 150 }}
                />
                <TerminalBox 
                  color="amber" 
                  title={T[lang].t2_title}
                  desc={T[lang].t2_desc}
                  btnLabel={T[lang].t2_btn}
                  endpoint="trm-02/federal-scrub"
                  isUpload={true}
                />
                <TerminalBox 
                  color="indigo" 
                  title={T[lang].t3_title}
                  desc={T[lang].t3_desc}
                  btnLabel={T[lang].t3_btn}
                  endpoint="trm-03/har-databridge"
                  tags={["EXPIRED", "PROBATE", "RETAIL"]}
                />
                <TerminalBox 
                  color="rose" 
                  title={T[lang].t4_title}
                  desc={T[lang].t4_desc}
                  btnLabel={T[lang].t4_btn}
                  endpoint="trm-04/fub-routing"
                  isDropdown={true}
                  body={{ pipeline_flag: "FLIP_PIPELINE_1", authorized_agent: "VA_TEAM_ALPHA" }}
                />
            </div>
         </div>

         {/* PANEL 2: THE OPEN PLAYGROUND (CRM FRAME / CALL SCRIPTS) - DAYTIME MODE */}
         <div className="flex-1 h-full bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 relative flex flex-col shadow-2xl group">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-500 text-2xl bg-white/50">+</div>
                <h3 className="text-gray-900 tracking-widest text-lg font-black">{T[lang].playground}</h3>
                <p className="text-gray-600 font-semibold text-xs tracking-widest mt-2 max-w-sm mx-auto">{T[lang].playground_sub}</p>
             </div>
             
             {/* Example Legal Script Overlay for VAs - High Contrast Daytime */}
             <div className="mt-auto p-5 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg shadow-sm flex flex-col gap-2">
                <span className="text-yellow-700 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                  <span className="text-lg">⚠</span> TREC LEGAL COMPLIANCE PROTOCOL
                </span>
                <p className="text-gray-800 text-sm leading-relaxed font-sans font-medium">
                   "Hello, my name is [NAME] calling on behalf of The Richardson Team. We are currently looking to book appointments for [SERVICE]. I cannot discuss specific real estate pricing or contracts as I am an administrative assistant. Would you like me to schedule a licensed agent to come out?"
                </p>
             </div>
         </div>
      </div>
    </div>
  );
}

// Reusable Terminal Box Logic for the Daytime VA view
function TerminalBox({ color, title, desc, btnLabel, endpoint, body, isUpload, tags, isDropdown }) {
   const handleExecute = async () => {
      try {
          const payload = body ? {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
          } : { method: "POST" };
          const res = await fetch(`http://134.199.195.34:8000/${endpoint}`, payload);
          const data = await res.json();
          alert("CLOUD BRIDGE SUCCESS:\n" + data.message);
      } catch (e) {
          alert("KRONOS CLOUD WARNING: " + e.message);
      }
   };

   // Map colors to clean, bright daytime equivalents
   const getBorderColor = () => `border-${color}-300`;
   const getTitleColor = () => `text-${color}-700`;
   const getBgColor = () => `bg-white/80`;
   const getButtonColor = () => `bg-${color}-500 hover:bg-${color}-600 text-white`;

   return (
      <div className={`p-5 ${getBgColor()} border-2 ${getBorderColor()} flex flex-col gap-4 relative isolate group rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all`}>
         <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <h3 className={`${getTitleColor()} font-black tracking-widest text-xs uppercase ${title.includes('TRM_') ? 'font-mono' : 'font-sans'}`}>{title}</h3>
            <span className={`${getTitleColor()} text-[8px] animate-pulse flex items-center gap-1 font-bold`}><span className="text-[12px]">●</span> ACTIVE</span>
         </div>
         
         <p className={`text-gray-600 font-semibold text-[9px] tracking-[0.2em] leading-relaxed uppercase pr-4`}>{desc}</p>
         
         {!isUpload && !tags && !isDropdown && (
             <input type="text" placeholder="ENTER ZIP (e.g. 77002)" className={`w-full bg-white border border-gray-300 text-gray-900 font-mono font-bold text-sm p-3 rounded-lg outline-none focus:border-${color}-500 focus:ring-2 focus:ring-${color}-500/20 shadow-inner`} />
         )}
         
         {isUpload && (
             <div className={`w-full h-24 border-2 border-dashed ${getBorderColor()} bg-${color}-50/50 rounded-lg flex items-center justify-center text-${color}-600/60 font-black text-[10px] tracking-[0.3em] hover:bg-${color}-50 transition-colors cursor-pointer`}>
                 {desc}
             </div>
         )}

         {tags && (
             <div className="flex gap-2 w-full mt-2">
                {tags.map((t, i) => (
                    <button key={i} className={`flex-1 py-3 bg-white text-${color}-600 font-black hover:bg-${color}-50 border border-${color}-200 shadow-sm text-[10px] tracking-[0.2em] rounded-lg transition-all`}>{t}</button>
                ))}
             </div>
         )}
         
         {isDropdown && (
            <div className="w-full relative mt-2">
                <select className={`w-full bg-white border border-gray-300 text-gray-800 font-black text-xs p-3 rounded-lg appearance-none outline-none tracking-widest cursor-pointer hover:bg-gray-50 transition-colors uppercase shadow-sm focus:border-${color}-500`}>
                    <option>SELECT FUB DESTINATION</option>
                    <option>TIER 1: HIGH INTENT ACQUISITION</option>
                    <option>TIER 2: ZILLOW PREMIER OVERFLOW</option>
                </select>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs`}>▼</div>
            </div>
         )}

         <button 
            onClick={handleExecute}
            className={`w-full py-4 mt-auto ${getButtonColor()} font-black text-xs tracking-[0.4em] transition-all rounded-lg uppercase shadow-md`}
         >
            {btnLabel}
         </button>
      </div>
   );
}
