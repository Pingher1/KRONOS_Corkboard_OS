import React, { useState } from 'react';

// Mock Data for Social Media Brand Drops
const BRANDING_SCHEDULE = {
  15: {
    platform: 'Instagram / Facebook',
    content: 'Market Update: Houston Area Trends 🏡',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    time: '09:00 AM'
  },
  18: {
    platform: 'TikTok / YouTube Shorts',
    content: 'Just Listed Walkthrough: The Heights 📸',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    time: '12:30 PM'
  },
  22: {
    platform: 'LinkedIn / Email Blast',
    content: 'Investment Opportunities in 2026 📈',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    time: '08:00 AM'
  }
};

export default function SocialCalendar({ onClose }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dragActiveDay, setDragActiveDay] = useState(null); // Tracks which specific day cell is currently being hovered with a file
  const [showNewsModal, setShowNewsModal] = useState(false); // Controls the absolute 'Trending News' ingestion popup
  const [showMarketModal, setShowMarketModal] = useState(false); // Controls the 'Market Report' generator
  const [showListingModal, setShowListingModal] = useState(false); // Controls the 'Zillow Sync' generator

  // Handle Drag & Drop Logic for OS-Level Routing
  const handleDragOver = (e, day) => {
    e.preventDefault(); // Prevents the browser from opening the file
    setDragActiveDay(day);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActiveDay(null);
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    setDragActiveDay(null);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Physically caught the file from the Mac Desktop
      const fileName = files[0].name;
      alert(`[ KRONOS ROUTING ENGINE INTERCEPT ]\n\nFILE DETECTED: ${fileName}\nPayload intercepted for processing on Day ${day}.\n\n(Future action will trigger the Email/Task configuration modal here.)`);
    }
  };

  // Generate a generic 30-day grid
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[9950] flex items-center justify-center p-10 font-mono transition-all duration-500">
      
      {/* THE MAIN CALENDAR MODAL (LIQUID UI) */}
      <div className="w-full max-w-6xl h-full max-h-[850px] bg-[#020504]/95 border border-[#00ff00]/40 rounded-[40px] shadow-[0_0_80px_rgba(0,255,0,0.15)] relative flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="p-8 border-b border-[#00ff00]/20 flex justify-between items-center bg-gradient-to-r from-black via-[#00ff00]/5 to-black">
          <div>
             <h2 className="text-3xl font-bold tracking-[0.3em] text-[#00ff00] drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]">SOCIAL_MEDIA_MATRIX</h2>
             <p className="text-[10px] text-green-500/60 tracking-[4px] mt-2">D&D ENABLED / THE RICHARDSON TEAM BRANDING ALGORITHM</p>
          </div>
          <div className="flex gap-4 items-center">
            {/* INGESTION TRIGGER BUTTON */}
            <button 
               onClick={() => setShowNewsModal(true)}
               className="px-4 py-2 bg-[#010a01] border border-[#00ff00]/40 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] text-[#00ff00] text-[10px] font-bold tracking-[0.2em] rounded-full transition-all shadow-[inset_0_0_10px_rgba(0,255,0,0.2)]"
            >
               [ INGEST: TRENDING NEWS ]
            </button>
            <button 
               onClick={() => setShowMarketModal(true)}
               className="px-4 py-2 bg-[#010a01] border border-[#00ff00]/40 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] text-[#00ff00] text-[10px] font-bold tracking-[0.2em] rounded-full transition-all shadow-[inset_0_0_10px_rgba(0,255,0,0.2)]"
            >
               [ INGEST: MARKET REPORT ]
            </button>
            <button 
               onClick={() => setShowListingModal(true)}
               className="px-4 py-2 bg-[#010a01] border border-[#00ff00]/40 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] text-[#00ff00] text-[10px] font-bold tracking-[0.2em] rounded-full transition-all shadow-[inset_0_0_10px_rgba(0,255,0,0.2)]"
            >
               [ LISTING SYNC ]
            </button>
            
            <button onClick={onClose} className="w-12 h-12 border-2 border-red-500/50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)] tracking-widest font-bold">
              ✖
            </button>
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div className="flex-1 p-8 flex gap-8 overflow-hidden">
           
           {/* THE CALENDAR GRID */}
           <div className="flex-1 grid grid-cols-7 gap-3 overflow-y-auto hide-scrollbar content-start">
             {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
               <div key={day} className="text-center text-[10px] sm:text-xs tracking-[0.3em] text-[#00ff00]/50 mb-4 font-bold">{day}</div>
             ))}
             
             {/* Empty start days */}
             <div className="aspect-square bg-transparent"></div>
             <div className="aspect-square bg-transparent"></div>
                          {days.map(day => {
               const hasBrandDrop = BRANDING_SCHEDULE[day];
               return (
                 <div 
                   key={day} 
                   onClick={() => setSelectedDay(day)}
                   onDragOver={(e) => handleDragOver(e, day)}
                   onDragLeave={handleDragLeave}
                   onDrop={(e) => handleDrop(e, day)}
                   className={`relative aspect-[5/4] border rounded-2xl p-3 transition-all duration-300 group overflow-hidden ${dragActiveDay === day ? 'border-[#00ff00] bg-[#00ff00]/30 shadow-[0_0_30px_rgba(0,255,0,0.5)] scale-105 z-10' : hasBrandDrop ? 'border-[#00ff00]/60 bg-[#00ff00]/10 cursor-pointer hover:bg-[#00ff00]/20 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,0,0.2)]' : 'border-[#00ff00]/10 bg-black/40 hover:border-[#00ff00]/30 hover:bg-[#00ff00]/5'}`}
                 >
                   <span className={`text-lg font-bold ${hasBrandDrop ? 'text-[#00ff00] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]' : 'text-white/20'}`}>{day}</span>
                   
                   {hasBrandDrop && (
                     <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/5 to-transparent pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#00ff00]/80 shadow-[0_0_20px_rgba(0,255,0,0.6)] flex items-center justify-center">
                           <span className="text-xl animate-pulse">✨</span>
                        </div>
                     </>
                   )}
                 </div>
               );
             })}
           </div>

           {/* THE SIDEBAR MODAL (LIQUID BRANDING POP-UP PREVIEW) */}
           <div className={`w-[350px] shrink-0 bg-black/80 border border-[#00ff00]/40 rounded-[30px] flex flex-col relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_40px_rgba(0,0,0,0.9)] ${selectedDay && BRANDING_SCHEDULE[selectedDay] ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[50px] opacity-0 scale-95 pointer-events-none'}`}>
              
              {selectedDay && BRANDING_SCHEDULE[selectedDay] && (
                <>
                  <div className="w-full h-[250px] border-b border-[#00ff00]/30 relative overflow-hidden group">
                     {/* Glossy overlay effect to make it look 'liquid' */}
                     <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none rounded-t-[30px]"></div>
                     
                     <img src={BRANDING_SCHEDULE[selectedDay].image} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="Social Media" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020504] via-transparent to-transparent z-0"></div>
                     <span className="absolute bottom-6 left-6 text-[10px] font-bold tracking-[0.2em] bg-[#00ff00] text-black px-4 py-1.5 rounded-full drop-shadow-[0_0_10px_rgba(0,255,0,1)] z-20">
                       {BRANDING_SCHEDULE[selectedDay].platform}
                     </span>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                     <div>
                       <h3 className="text-[#00ff00] text-xl tracking-widest font-bold mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">BRANDING O/S DROP</h3>
                       <div className="bg-[#00ff00]/5 border border-[#00ff00]/20 p-5 rounded-xl">
                          <p className="text-white text-sm tracking-wide leading-relaxed">{BRANDING_SCHEDULE[selectedDay].content}</p>
                       </div>
                     </div>
                     
                     <div className="mt-8 border-t border-[#00ff00]/30 pt-6 flex justify-between items-center text-[10px] tracking-widest text-[#00ff00]/60">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_8px_rgba(0,255,0,1)] animate-pulse"></div> QUEUED</span>
                        <span className="font-bold">{BRANDING_SCHEDULE[selectedDay].time}</span>
                     </div>
                  </div>
                </>
              )}
           </div>
        </div>
      </div>
      
      {/* THE RSS SYNDICATION POP-UP MODAL (THE 'GLASS EDGE' OVERRIDE) */}
      {showNewsModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-[9999] flex justify-center items-center pointer-events-auto transition-all">
           
           <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#020504] border border-[#00ff00]/50 rounded-[30px] shadow-[0_0_100px_rgba(0,255,0,0.15)] overflow-hidden flex flex-col font-mono">
             {/* Header */}
             <div className="px-10 py-8 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/60">
                <div>
                   <h2 className="text-[#00ff00] text-2xl font-bold tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">TRENDING NEWS ROUTER</h2>
                   <p className="text-[#00ff00]/60 text-xs tracking-widest mt-2 bg-[#00ff00]/5 py-1 px-3 border border-[#00ff00]/20 inline-block rounded uppercase">
                     Select the topic you would like to generate a trending news post for.
                   </p>
                </div>
                <button onClick={() => setShowNewsModal(false)} className="w-10 h-10 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 rounded-full flex justify-center items-center transition-all tracking-widest">
                   ✖
                </button>
             </div>
             
             {/* Body */}
             <div className="p-10 flex-col gap-8 overflow-y-auto">
                {/* Search Target Sector */}
                <div className="flex gap-4 items-end mb-8 border-b border-[#00ff00]/20 pb-8">
                   <div className="flex-1 flex flex-col gap-2">
                       <label className="text-[#00ff00]/50 text-[10px] tracking-[0.2em] font-bold">TARGET GEOGRAPHIC RADIUS</label>
                       <div className="w-full bg-black/80 border-b-2 border-[#00ff00] text-[#00ff00] text-xl font-bold p-3 tracking-widest flex items-center shadow-[inset_0_0_15px_rgba(0,255,0,0.05)]">
                          <span>Sugar Land, Texas</span>
                       </div>
                   </div>
                   <div className="flex gap-4">
                      <button className="px-6 py-3 border border-[#00ff00] bg-[#00ff00]/20 hover:bg-[#00ff00] hover:text-black text-[#00ff00] tracking-widest font-bold text-xs rounded transition-all">LOCAL NEWS</button>
                      <button className="px-6 py-3 border border-[#00ff00]/30 bg-black hover:bg-[#00ff00]/30 text-[#00ff00]/70 tracking-widest font-bold text-xs rounded transition-all">TRENDING REAL ESTATE</button>
                   </div>
                </div>

                {/* Simulated Article Hook Cards */}
                <div className="flex flex-col gap-6">
                   {/* Card 1 */}
                   <div className="w-full bg-[#010a01] border border-[#00ff00]/30 hover:border-[#00ff00] rounded-xl p-6 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)] group hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                         <h3 className="text-[#00ff00] font-bold tracking-widest text-lg group-hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">Sugar Land Home Values Decline as Inventory Expands...</h3>
                         <button className="shrink-0 px-4 py-1.5 border border-[#00ff00]/50 hover:bg-[#00ff00] hover:text-black text-[#00ff00] rounded shadow-[0_0_10px_rgba(0,255,0,0.1)] text-[10px] tracking-widest transition-all">ROUTE TO CALENDAR +</button>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed tracking-wide mb-3">
                        Sugar Land's average home values have declined 0.8% over the past year to $436,193, with inventory reaching 551 active listings as of January 2026. The median days to pending has extended to 50 days, indicating a shift toward buyer leverage compared to previous years when homes sold faster and at premium prices...
                      </p>
                      <a href="#" className="text-green-400/80 text-xs underline underline-offset-4 tracking-widest hover:text-[#00ff00]">View source [HAR.com API]</a>
                   </div>

                   {/* Card 2 */}
                   <div className="w-full bg-[#010a01] border border-[#00ff00]/30 hover:border-[#00ff00] rounded-xl p-6 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)] group hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                         <h3 className="text-[#00ff00] font-bold tracking-widest text-lg group-hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">Balanced Market with Selective Buyer Advantage...</h3>
                         <button className="shrink-0 px-4 py-1.5 border border-[#00ff00]/50 hover:bg-[#00ff00] hover:text-black text-[#00ff00] rounded shadow-[0_0_10px_rgba(0,255,0,0.1)] text-[10px] tracking-widest transition-all">ROUTE TO CALENDAR +</button>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed tracking-wide mb-3">
                        Sugar Land's real estate market in 2026 is shifting toward a balanced landscape where buyers have increased negotiating power, though well-presented homes still attract significant competition. The market differs markedly from surrounding areas like Richmond, which has tilted more strongly toward buyers...
                      </p>
                      <a href="#" className="text-green-400/80 text-xs underline underline-offset-4 tracking-widest hover:text-[#00ff00]">View source [Houston Chronicle RSS]</a>
                   </div>

                   {/* Card 3 */}
                   <div className="w-full bg-[#010a01] border border-[#00ff00]/30 hover:border-[#00ff00] rounded-xl p-6 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)] group hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                         <h3 className="text-[#00ff00] font-bold tracking-widest text-lg group-hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">Major Infrastructure Projects Launching in 2026...</h3>
                         <button className="shrink-0 px-4 py-1.5 border border-[#00ff00]/50 hover:bg-[#00ff00] hover:text-black text-[#00ff00] rounded shadow-[0_0_10px_rgba(0,255,0,0.1)] text-[10px] tracking-widest transition-all">ROUTE TO CALENDAR +</button>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed tracking-wide mb-3">
                        Six significant city-funded development projects are underway in Sugar Land and Missouri City in 2026, including a $3.85 million police building redesign, preservation of the historic Char House, and the Lake Pointe Green residential redevelopment plan. These projects will enhance property values, amenities, and community appeal through 2026 and beyond...
                      </p>
                      <a href="#" className="text-green-400/80 text-xs underline underline-offset-4 tracking-widest hover:text-[#00ff00]">View source [City Data Index]</a>
                   </div>
                </div>

             </div>
           </div>
        </div>
      )}
      {/* THE MARKET REPORT POP-UP MODAL */}
      {showMarketModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-[9999] flex justify-center items-center pointer-events-auto transition-all">
           <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#020504] border border-[#00ff00]/50 rounded-[30px] shadow-[0_0_100px_rgba(0,255,0,0.15)] overflow-hidden flex flex-col font-mono">
             <div className="px-10 py-6 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/60">
                <div>
                   <h2 className="text-[#00ff00] text-xl font-bold tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">MARKET REPORT ENGINE</h2>
                   <p className="text-[#00ff00]/60 text-[10px] tracking-widest mt-2 uppercase">
                     Data pulled from trusted third-party providers. Verify local MLS conditions.
                   </p>
                </div>
                <button onClick={() => setShowMarketModal(false)} className="w-8 h-8 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 rounded-full flex justify-center items-center transition-all tracking-widest">
                   ✖
                </button>
             </div>
             
             <div className="p-10 flex-col gap-6 overflow-y-auto">
                {/* SETTINGS BLOCK */}
                <h3 className="text-[#00ff00] tracking-widest text-sm mb-4 border-b border-[#00ff00]/20 pb-2">SETTINGS PARAMETERS</h3>
                
                <div className="flex flex-col gap-4 mb-6">
                   <div>
                       <label className="text-[#00ff00]/50 text-[10px] tracking-[0.2em] font-bold">CITY ROUTING TARGET</label>
                       <input type="text" value="Houston-TX" className="w-full bg-black/80 border border-[#00ff00]/30 rounded text-[#00ff00] font-bold p-3 tracking-widest outline-none focus:border-[#00ff00] shadow-[inset_0_0_15px_rgba(0,255,0,0.05)]" readOnly />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="text-[#00ff00]/50 text-[10px] tracking-[0.2em] font-bold">PROPERTY TYPE</label>
                           <select className="w-full bg-black/80 border border-[#00ff00]/30 rounded text-[#00ff00] font-bold p-3 tracking-widest outline-none focus:border-[#00ff00] appearance-none cursor-pointer">
                              <option>Single Family</option>
                              <option>Condo / Townhouse</option>
                           </select>
                       </div>
                       <div>
                           <label className="text-[#00ff00]/50 text-[10px] tracking-[0.2em] font-bold">DATA TIMEFRAME</label>
                           <select className="w-full bg-black/80 border border-[#00ff00]/30 rounded text-[#00ff00] font-bold p-3 tracking-widest outline-none focus:border-[#00ff00] appearance-none cursor-pointer">
                              <option>7 Days</option>
                              <option>90 Days</option>
                           </select>
                       </div>
                   </div>
                </div>

                <h3 className="text-[#00ff00] tracking-widest text-sm mb-4 border-b border-[#00ff00]/20 pb-2 mt-4">EXECUTION MATRIX</h3>
                <div className="flex gap-4 items-center">
                    <button className="flex-1 py-4 bg-red-600 hover:bg-red-500 border border-red-400 text-white font-bold tracking-[0.3em] rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                       GENERATE TEMPLATE OVERLAYS
                    </button>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* THE PROPERTY LISTING SYNC POP-UP MODAL */}
      {showListingModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-[9999] flex justify-center items-center pointer-events-auto transition-all">
           <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#020504] border border-[#00ff00]/50 rounded-[30px] shadow-[0_0_100px_rgba(0,255,0,0.15)] overflow-hidden flex flex-col font-mono">
             <div className="px-10 py-6 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/60">
                <div>
                   <h2 className="text-[#00ff00] text-xl font-bold tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">LISTING SYNC OVERRIDE</h2>
                   <p className="text-[#00ff00]/60 text-[10px] tracking-widest mt-2 uppercase">
                     Turn active MLS/Zillow URLs into full multi-platform branded pipelines.
                   </p>
                </div>
                <button onClick={() => setShowListingModal(false)} className="w-8 h-8 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-500 rounded-full flex justify-center items-center transition-all tracking-widest">
                   ✖
                </button>
             </div>
             
             <div className="p-10 flex-col gap-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center py-6 mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#00ff00]/10 border border-[#00ff00]/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
                        <span className="text-3xl">🔗</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                   <label className="text-[#00ff00]/50 text-[10px] tracking-[0.2em] font-bold">PASTE ZILLOW / MLS URL HERE</label>
                   <input type="text" placeholder="https://www.zillow.com/homedetails/..." className="w-full bg-black/80 border border-[#00ff00]/50 rounded text-white font-mono p-4 tracking-wider outline-none focus:border-[#00ff00] focus:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all" />
                </div>

                <div className="flex gap-4 items-center">
                    <button className="flex-1 py-4 bg-red-600 hover:bg-red-500 border border-red-400 text-white font-bold tracking-[0.3em] rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)] uppercase">
                       Acknowledge & Sync Listing
                    </button>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
