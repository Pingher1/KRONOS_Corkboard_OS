with open('src/App.jsx', 'r') as f:
    text = f.read()

import re

# Find the block from {showUserProfile && ( down to the end of the second block.
old_block_pattern = r'\{showUserProfile && \(\s*<div className="fixed inset-0.*?<\/div>\s*\)\}\s*\{showUserProfile && \(\s*<div className="fixed inset-0.*?<\/div>\s*\)\}'

new_block = """{showUserProfile && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 pointer-events-auto bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-[#00ff00]/40 bg-[#020504] overflow-hidden">
            
            {/* Header */}
            <div className="flex-none p-6 border-b border-[#00ff00]/20 flex justify-between items-center bg-black/40">
               <h2 className="text-xl sm:text-2xl font-black tracking-[0.4em] uppercase text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">OPERATOR PROFILE JACKET</h2>
               <button onClick={() => setShowUserProfile(false)} className="text-[#00ff00] hover:text-white transition-colors text-2xl font-black px-4 shadow-[0_0_10px_rgba(0,255,0,0.2)]">✕</button>
            </div>
            
            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto overflow-x-hidden">
               
               {/* Left Panel: Personal Info & Assets */}
               <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#00ff00]/20 flex flex-col gap-6">
                  
                  {/* Photo & Identity */}
                  <div className="flex gap-4 items-center p-4 bg-black/40 border border-[#00ff00]/20 rounded-xl shadow-inner">
                     <div className="w-24 h-24 rounded-lg border-2 border-[#00ff00] bg-[#00ff00]/5 flex items-center justify-center text-4xl overflow-hidden relative group cursor-pointer hover:bg-[#00ff00]/20 transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                        👤
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[9px] text-[#00ff00] font-bold tracking-widest text-center">UPLOAD<br/>POLAROID</span>
                        </div>
                     </div>
                     <div className="flex-1 flex flex-col gap-2">
                        <input type="text" defaultValue="ESHA (TEAM LEAD)" className="w-full bg-transparent border-b border-[#00ff00]/30 pb-1 text-[#00ff00] text-lg font-black tracking-widest focus:outline-none focus:border-[#00ff00] placeholder-[#00ff00]/40"/>
                        <input type="tel" defaultValue="+1 (555) 019-8372" className="w-full bg-transparent border-b border-[#00ff00]/30 pb-1 text-[#00ff00]/80 text-xs font-bold tracking-widest focus:outline-none focus:border-[#00ff00] placeholder-[#00ff00]/40"/>
                        <p className="text-[10px] text-[#00ff00]/50 mt-1 tracking-widest font-black">CLEARANCE: VANGUARD OPS</p>
                     </div>
                  </div>

                  {/* Notepad */}
                  <div className="flex-1 flex flex-col bg-black/40 border border-[#00ff00]/20 rounded-xl overflow-hidden shadow-inner">
                     <div className="bg-[#00ff00]/10 p-2 border-b border-[#00ff00]/20">
                        <span className="text-[10px] text-[#00ff00] font-black tracking-widest px-2 drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">OPERATIONAL NOTEPAD</span>
                     </div>
                     <textarea className="flex-1 w-full bg-transparent p-4 text-[#00ff00] text-sm font-mono focus:outline-none resize-none placeholder-[#00ff00]/20 leading-relaxed" placeholder="Operator scratchpad... Data does not sync to master cloud."></textarea>
                  </div>
               </div>
               
               {/* Right Panel: Data Integration Connections */}
               <div className="flex-1 p-6 flex flex-col gap-6 bg-[#00ff00]/5">
                  <div className="mb-2">
                     <h3 className="text-lg font-black tracking-[0.3em] text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]">EXTERNAL DATA INTEGRATIONS</h3>
                     <p className="text-[#00ff00]/50 text-[10px] tracking-widest mt-1">ALL CONNECTED CHANNELS ARE MONITORED BY KRONOS OVERSEER PROTOCOLS</p>
                  </div>

                  <div className="flex flex-col gap-3">
                     {/* Facebook */}
                     <div className="flex items-center justify-between p-4 bg-black/60 border border-blue-500/40 rounded-lg shadow-[0_0_15px_rgba(0,0,255,0.1)]">
                        <div className="flex flex-col">
                           <span className="text-blue-400 font-black tracking-widest text-sm text-shadow">FACEBOOK API</span>
                           <span className="text-blue-500/60 text-[9px] tracking-[0.2em] font-bold">STATUS: DISCONNECTED</span>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black tracking-widest rounded transition-all shadow-[0_0_10px_rgba(0,0,255,0.5)]">LINK METRICS</button>
                     </div>

                     {/* LinkedIn */}
                     <div className="flex items-center justify-between p-4 bg-black/60 border border-cyan-500/40 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                        <div className="flex flex-col">
                           <span className="text-cyan-400 font-black tracking-widest text-sm">LINKEDIN PROFESSIONAL</span>
                           <span className="text-[#00ff00] text-[9px] tracking-[0.2em] font-bold">STATUS: ACTIVE & SYNCING</span>
                        </div>
                        <button className="px-6 py-2 border border-cyan-500/50 hover:bg-cyan-900/40 text-cyan-400 text-[10px] font-black tracking-widest rounded transition-all">MANAGE LINK</button>
                     </div>

                     {/* Instagram */}
                     <div className="flex items-center justify-between p-4 bg-black/60 border border-pink-500/40 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                        <div className="flex flex-col">
                           <span className="text-pink-400 font-black tracking-widest text-sm">INSTAGRAM GRID</span>
                           <span className="text-pink-500/60 text-[9px] tracking-[0.2em] font-bold">STATUS: DISCONNECTED</span>
                        </div>
                        <button className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white text-[10px] font-black tracking-widest rounded transition-all shadow-[0_0_10px_rgba(255,0,255,0.4)]">LINK METRICS</button>
                     </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#00ff00]/20">
                     <p className="text-[#00ff00]/40 text-[9px] tracking-widest leading-relaxed">
                        ** NOTICE: Connecting personal assets grants KRONOS architectural oversight of incoming and outgoing pipeline data streams.
                     </p>
                  </div>
               </div>

            </div>
          </div>
        </div>
      )}"""

# We'll use re.sub just to be safe
new_text = re.sub(old_block_pattern, new_block, text, flags=re.DOTALL)
if new_text == text:
    print("FAILED TO REPLACE")
else:
    with open('src/App.jsx', 'w') as f:
        f.write(new_text)
    print("SUCCESSFULLY REPLACED")

