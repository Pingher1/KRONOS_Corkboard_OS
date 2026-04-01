import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# Replace the text-based TRT Comms button with the logo and "Google Meets" text
old_button = """        {/* If the TRT logo is in public/assets/trt-logo.png, it will load here. Otherwise falls back to text */}
        <div className="text-[10px] font-black tracking-widest text-[#00ff00] group-hover:text-white transition-colors text-center leading-tight">
           T R T<br/><span className="text-[6px] text-[#00ff00]/60">COMMS</span>
        </div>"""

new_button = """        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <img src="/logo.png" alt="TRT" className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] filter transition-all duration-300 group-hover:brightness-150" />
          <span className="absolute -bottom-5 text-[8px] font-bold tracking-widest text-[#00ff00]/70 group-hover:text-[#00ff00] whitespace-nowrap drop-shadow-md pb-[-10px]">
            GOOGLE MEETS
          </span>
        </div>"""

if old_button in text:
    text = text.replace(old_button, new_button)
    print("Replaced logo")
else:
    print("WARNING: Could not find old TRT button string")

# Now inject the specific PROPERTY PRO V.A. COMMUNICATOR modal layout logic inside the setActiveAppPopup rendering block
old_modal_start = """            <h2 className="text-[#00ff00] font-black tracking-[0.3em] mb-4 text-center text-sm md:text-base border-b border-[#00ff00]/20 pb-4">
              {activeAppPopup.toUpperCase()}
            </h2>"""

new_modal_logic = """            <h2 className="text-[#00ff00] font-black tracking-[0.3em] mb-4 text-center text-sm md:text-base border-b border-[#00ff00]/20 pb-4">
              {activeAppPopup.toUpperCase()}
            </h2>
            
            {activeAppPopup === "PROPERTY PRO V.A. COMMUNICATOR" && (
                <div className="w-full h-full flex flex-col gap-4 mt-4 bg-black/50 p-4 border border-[#00ff00]/30 rounded-md shadow-[inset_0_0_30px_rgba(0,255,0,0.05)]">
                   <div className="text-center text-[#00ff00]/80 text-xs tracking-widest mb-2">[ GOOGLE MEETS SECURE PROXY LINK ESTABLISHED ]</div>
                   {/* Top Row: Two Columns */}
                   <div className="grid grid-cols-2 gap-4 h-[25%]">
                      <div className="border border-[#00ff00]/40 rounded bg-gradient-to-br from-[#002200] to-black flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                         <span className="text-[#00ff00]/60 text-[10px] tracking-widest font-mono">VIDEO SURVEILLANCE FEED</span>
                      </div>
                      <div className="border border-[#00ff00]/40 rounded bg-black flex flex-col items-center justify-center gap-2 p-2">
                         <span className="text-[#00ff00]/60 text-[10px] tracking-widest font-mono border-b border-[#00ff00]/20 pb-1 w-full text-center">COMMAND MENU</span>
                         <div className="w-full flex justify-around mt-1">
                            <span className="text-xs text-[#00ff00] hover:text-white cursor-pointer transition-colors px-2">🎤 MUTE</span>
                            <span className="text-xs text-[#00ff00] hover:text-white cursor-pointer transition-colors px-2 border-l border-[#00ff00]/30">📹 VIDEO</span>
                            <span className="text-xs text-[#00ff00] hover:text-white cursor-pointer transition-colors px-2 border-l border-[#00ff00]/30">🔊 VOL</span>
                         </div>
                      </div>
                   </div>
                   
                   {/* Middle Rows: Four Squares (2 rows, 2 cols) */}
                   <div className="grid grid-cols-2 gap-4 h-[50%]">
                      <div className="border border-[#00ff00]/30 rounded bg-[#020502] flex items-center justify-center hover:bg-[#002200] transition-colors cursor-crosshair">
                         <span className="text-[#00ff00]/40 text-xs">V.A. FEED 1</span>
                      </div>
                      <div className="border border-[#00ff00]/30 rounded bg-[#020502] flex items-center justify-center hover:bg-[#002200] transition-colors cursor-crosshair">
                         <span className="text-[#00ff00]/40 text-xs">V.A. FEED 2</span>
                      </div>
                      <div className="border border-[#00ff00]/30 rounded bg-[#020502] flex items-center justify-center hover:bg-[#002200] transition-colors cursor-crosshair">
                         <span className="text-[#00ff00]/40 text-xs">V.A. FEED 3</span>
                      </div>
                      <div className="border border-[#00ff00]/30 rounded bg-[#020502] flex items-center justify-center hover:bg-[#002200] transition-colors cursor-crosshair">
                         <span className="text-[#00ff00]/40 text-xs flex flex-col items-center"><span className="text-xl mb-1">+</span>INVITE</span>
                      </div>
                   </div>
                   
                   {/* Bottom Row: Controls */}
                   <div className="grid grid-cols-1 h-[15%]">
                      <button className="w-full h-full border border-[#00ff00]/60 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 transition-all rounded text-[#00ff00] tracking-[0.2em] font-black text-xs hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] flex items-center justify-center gap-3">
                         🔴 LOCK SCREEN SHARE [ ENTIRE SCREEN ONLY ]
                      </button>
                   </div>
                </div>
            )}"""

if "{activeAppPopup === \"PROPERTY PRO V.A. COMMUNICATOR\" &&" not in text:
    text = text.replace(old_modal_start, new_modal_logic)
    print("Injected Comms Layout logic")
else:
    print("WARNING: Comms layout already exists")

with open('src/App.jsx', 'w') as f:
    f.write(text)
