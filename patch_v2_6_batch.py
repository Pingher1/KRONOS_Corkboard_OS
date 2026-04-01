import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Global Sticky Grid: Replace toolsMockup with globalTools
content = content.replace(
    '  const [toolsMockup, setToolsMockup] = useState({});',
    '  const [globalTools, setGlobalTools] = useState([]);\n  const [expandedTiles, setExpandedTiles] = useState({});'
)

# Replace handleAddModule logic
old_handleAddModule = """  const handleAddModule = (appName) => {
    setToolsMockup(prev => {
      const currentList = prev[activeMenu] || [];
      if (currentList.includes(appName)) return prev; // Avoid exact duplicates if wanted
      return { ...prev, [activeMenu]: [...currentList, appName] };
    });
  };"""
new_handleAddModule = """  const handleAddModule = (appName) => {
    setGlobalTools(prev => {
      if (prev.includes(appName)) return prev;
      return [...prev, appName];
    });
  };"""
content = content.replace(old_handleAddModule, new_handleAddModule)

# Replace handleDeleteModule logic
old_handleDeleteModule = """  const handleDeleteModule = (moduleName) => {
    setToolsMockup(prev => {
      const currentList = prev[activeMenu] || [];
      return { ...prev, [activeMenu]: currentList.filter(name => name !== moduleName) };
    });
  };"""
new_handleDeleteModule = """  const handleDeleteModule = (moduleName) => {
    setGlobalTools(prev => prev.filter(name => name !== moduleName));
  };"""
content = content.replace(old_handleDeleteModule, new_handleDeleteModule)

# Fix map functions for grid and ribbons
content = content.replace("""(toolsMockup[activeMenu] || ["Dummy Tool 1", "Dummy Tool 2"]).map""", """(globalTools.length > 0 ? globalTools : ["AWAITING DEPLOYMENT"]).map""")
content = content.replace("""(toolsMockup[activeMenu] || ["AWAITING DEPLOYMENT"]).map""", """(globalTools.length > 0 ? globalTools : ["AWAITING DEPLOYMENT"]).map""")

# In the map, update the class for tile expansion
old_tile_class = """className="relative group p-[2px] transition-transform duration-500 hover:scale-[1.03] cursor-pointer aspect-[5/4]\""""
new_tile_class = """className={`relative group p-[2px] transition-all duration-[800ms] cursor-pointer ${expandedTiles[tool] ? 'col-span-1 md:col-span-2 lg:col-span-3 aspect-[21/9] z-[100]' : 'hover:scale-[1.03] aspect-[5/4]'}`}"""
content = content.replace(old_tile_class, new_tile_class)

# Fix Resize button click
old_resize_btn = """<button title="Resize Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#00ff00]/20 rounded-md text-[#00ff00] text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap" onClick={(e) => e.stopPropagation()}><span className="text-sm">⤢</span> SIZE</button>"""
new_resize_btn = """<button title="Resize Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#00ff00]/20 rounded-md text-[#00ff00] text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap" onClick={(e) => { e.stopPropagation(); setExpandedTiles(prev => ({...prev, [tool]: !prev[tool]})); }}><span className="text-sm">⤢</span> SIZE</button>"""
content = content.replace(old_resize_btn, new_resize_btn)

# Remove generic grid popup logic intercept for apps that aren't Zillow/HAR etc by completely removing setActiveAppPopup(tool)
# The user wants tiles to be purely visual elements right now without 'DATA STREAM ENCRYPTED' vaults intercepting
content = content.replace("}{ /* else */setActiveAppPopup(tool); }", "}")
# specifically the lines where urls[tool] exists
patch_url = """                           if(urls[tool]) {
                              window.open(urls[tool], '_blank');
                           } else {
                              setActiveAppPopup(tool);
                           }"""
fixed_url = """                           // Removed Vault Interception
                           if(urls[tool]) {
                              window.open(urls[tool], '_blank');
                           }"""
content = content.replace(patch_url, fixed_url)



# 2. Add 2FA Front Door Blockade at the top of render
front_door_code = """
  if (!isVerified && appMode === 'kronos') {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#020504] overflow-hidden">
         <div className="relative w-full max-w-lg p-12 bg-black/95 border border-[#00ff00]/40 rounded-3xl shadow-[0_0_80px_rgba(0,255,0,0.2)] z-50 flex flex-col items-center backdrop-blur-3xl">
            <h1 className="text-4xl tracking-[0.4em] font-black text-[#00ff00] drop-shadow-[0_0_15px_rgba(0,255,0,0.8)] mb-2 mt-4 text-center">KRONOS</h1>
            <p className="text-[#00ff00]/50 tracking-[0.3em] pl-2 text-xs mb-12 text-center font-bold">MILITARY 2FA SECURITY GATE</p>
            
            <div className="w-full flex gap-3 mb-6">
               <input type="text" placeholder="FIRST NAME" className="flex-1 bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
               <input type="text" placeholder="LAST NAME" className="flex-1 bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
            </div>
            
            <input type="tel" placeholder="DIRECT CELL NUMBER" className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 mb-6 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
            <input type="email" placeholder="ENCRYPTED EMAIL ADDRESS" className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 mb-6 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
            <input type="password" placeholder="SSN (LAST 4 DIGITS)" className="w-full bg-black/50 border border-[#00ff00]/30 rounded-lg p-4 mb-10 text-[#00ff00] tracking-widest text-xs font-bold focus:outline-none focus:border-[#00ff00] focus:bg-[#00ff00]/5 placeholder-[#00ff00]/20 transition-all shadow-inner"/>
            
            <button 
               onClick={() => setIsVerified(true)} 
               className="w-full py-4 mb-4 bg-[#00ff00] hover:bg-white border-2 border-[#00ff00] text-black font-black tracking-[0.4em] text-sm uppercase rounded-lg transition-all shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]"
            >
               AUTHORIZE ACCESS
            </button>
            
            <p className="text-[#00ff00]/40 text-[9px] tracking-[0.1em] text-center w-full mt-4 border-t border-[#00ff00]/10 pt-4 px-8 leading-relaxed">
               I acknowledge that this system is heavily monitored. Unauthorized entry attempts will result in an immediate MAC address lockout.
            </p>
         </div>
      </div>
    );
  }
"""
content = content.replace("  if (appMode === 'consumer') {", front_door_code + "\n  if (appMode === 'consumer') {")


# 3 & 4. Fix Theme Button Z-Index & Button Contrast, and Re-link Global Lang Toggle
old_buttons = """          {/* THE 4 PRIME OPERATION BUTTONS (WEST WALL) */}
          <div className="mb-4 relative flex flex-wrap gap-2">
            <button 
              onClick={() => {
                const map = { 'LIVE GRAB': 'BENTO BOX', 'BENTO BOX': '4-PLEX', '4-PLEX': '9-SQUARE', '9-SQUARE': 'LIVE GRAB' };
                setGridLayout(map[gridLayout]);
              }}
              className="w-full py-2 border border-[#00ff00]/40 bg-[#00ff00]/5 hover:bg-[#00ff00]/20 rounded text-[10px] tracking-[0.2em] font-bold text-[#00ff00] transition-colors shadow-inner"
            >
              [ LAYOUT: {gridLayout} ]
            </button>
            
            <button 
               className="flex-1 py-1.5 border border-[#00ff00]/30 bg-[#010a01] hover:bg-[#00ff00]/10 rounded text-[9px] tracking-[0.2em] font-bold text-[#00ff00] transition-colors"
            >
               [ LANG: EN ]
            </button>
            
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex-1 py-1.5 border border-[#00ff00]/30 bg-[#010a01] hover:bg-[#00ff00]/10 rounded text-[9px] tracking-widest font-bold text-[#00ff00] transition-colors"
            >
              [ THEME ]
            </button>

            <button 
               onClick={() => setIsLocked(!isLocked)}
               className={`w-full py-2 mt-1 border rounded text-[10px] tracking-[0.3em] font-black transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${isLocked ? 'bg-red-600 text-white border-red-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]' : 'bg-green-600 text-black border-green-500'}`}
            >
               {isLocked ? "WORKSPACE SECURED" : "DEPLOY O.S. LOCK"}
            </button>
            
            {/* Theme Pop-up Menu */}
            <div className={`absolute left-0 bottom-8 w-full bg-black/95 backdrop-blur-md border border-[#00ff00]/50 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.2)] overflow-x-auto hide-scrollbar flex flex-col gap-1 p-2 transition-all duration-300 ${showThemeMenu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>"""

new_buttons = """          {/* THE 4 PRIME OPERATION BUTTONS (WEST WALL) */}
          <div className="mb-4 relative flex flex-wrap gap-2">
            
            {/* Theme Pop-up Menu OVERRIDING BUTTONS */}
            <div className={`absolute left-0 bottom-[110%] w-full bg-[#020504]/95 backdrop-blur-xl border-2 border-[#00ff00] rounded-lg shadow-[0_15px_40px_rgba(0,255,0,0.5)] flex flex-col gap-1 p-2 transition-all duration-[400ms] z-[99999] ${showThemeMenu ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-4 scale-95 pointer-events-none'}`}>
               <button onClick={() => setTheme('monochrome')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'monochrome' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>KRONOS MONO</button>
               <button onClick={() => setTheme('highrise')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'highrise' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>LUXURY HOUSE</button>
               <button onClick={() => setTheme('vegas')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'vegas' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>NEON VEGAS</button>
               <button onClick={() => setTheme('hawaii')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'hawaii' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>HAWAII DRIFT</button>
               <button onClick={() => setTheme('chalkboard')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'chalkboard' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>CHALKBOARD</button>
            </div>

            <button 
              onClick={() => {
                const map = { 'LIVE GRAB': 'BENTO BOX', 'BENTO BOX': '4-PLEX', '4-PLEX': '9-SQUARE', '9-SQUARE': 'LIVE GRAB' };
                setGridLayout(map[gridLayout]);
              }}
              className="w-full py-2.5 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[10px] tracking-[0.2em] font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]"
            >
              [ LAYOUT: {gridLayout} ]
            </button>
            
            <button 
               onClick={() => setGlobalLang(prev => prev === 'en' ? 'ur' : 'en')}
               className="flex-1 py-2 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-[0.2em] font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]"
            >
               [ LANG: {globalLang.toUpperCase()} ]
            </button>
            
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex-1 py-2 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-widest font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]"
            >
              [ THEME ]
            </button>

            <button 
               onClick={() => setIsLocked(!isLocked)}
               className={`w-full py-2.5 mt-1 border tracking-[0.3em] font-black transition-all rounded shadow-[0_0_15px_rgba(0,0,0,0.8)] ${isLocked ? 'bg-red-600 text-white border-red-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-[#00ff00] text-black border-[#00ff00] hover:bg-white'}`}
            >
               {isLocked ? "WORKSPACE SECURED" : "DEPLOY O.S. LOCK"}
            </button>"""
content = content.replace(old_buttons, new_buttons)

# Also remove the remainder of the old Theme Pop-up Menu div that wasn't replaced
old_remainder = """               <button onClick={() => setTheme('monochrome')} className={`w-full py-2 rounded text-[10px] tracking-widest font-bold transition-colors ${theme === 'monochrome' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>KRONOS MONO</button>
               <button onClick={() => setTheme('highrise')} className={`w-full py-2 rounded text-[10px] tracking-widest font-bold transition-colors ${theme === 'highrise' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>LUXURY HOUSE</button>
               <button onClick={() => setTheme('vegas')} className={`w-full py-2 rounded text-[10px] tracking-widest font-bold transition-colors ${theme === 'vegas' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>NEON VEGAS</button>
               <button onClick={() => setTheme('hawaii')} className={`w-full py-2 rounded text-[10px] tracking-widest font-bold transition-colors ${theme === 'hawaii' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>HAWAII DRIFT</button>
               <button onClick={() => setTheme('chalkboard')} className={`w-full py-2 rounded text-[10px] tracking-widest font-bold transition-colors ${theme === 'chalkboard' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>CHALKBOARD</button>
            </div>"""
content = content.replace(old_remainder, "")


with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Batch injection syntax applied.")
