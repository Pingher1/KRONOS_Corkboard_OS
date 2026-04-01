import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# 1. Add state
text = text.replace('const [showCalendar, setShowCalendar] = useState(false);',
                    'const [showCalendar, setShowCalendar] = useState(false);\n  const [showFubSearch, setShowFubSearch] = useState(false);')

# 2. Modify East Wall loop
old_east_click = """                 if (i === 3) setShowCalendar(true); // Index 3 is Calendar
                 else if (i === 7) setTheme(theme === 'daylight' ? 'monochrome' : 'daylight'); // Index 7 is Theme Toggle
                 else {
                   setActiveAppPopup("""
new_east_click = """                 if (i === 3) setShowCalendar(true); // Index 3 is Calendar
                 else if (i === 7) setTheme(theme === 'daylight' ? 'monochrome' : 'daylight'); // Index 7 is Theme Toggle
                 else if (i === 6) { setShowFubSearch(!showFubSearch); setActiveAppPopup(null); }
                 else {
                   setActiveAppPopup("""

if old_east_click in text:
    text = text.replace(old_east_click, new_east_click)
    print("Replaced onClick")
else:
    print("WARNING: Could not find onClick")

# 3. Add the Spotlight search UI rendering before the social calendar rendering or main wrappers
# Find where the East Wall icons loop ends
old_east_end = """              </button>
            ))}
         </div>

      </div>"""

new_east_end = """              </button>
            ))}
            
            {/* FUB SLIDE-OUT SEARCH (Mac Spotlight Style) */}
            {showFubSearch && (
              <div className="absolute right-full mr-4 top-[70%] transform -translate-y-1/2 w-[350px] bg-[#020504]/95 border border-[#00ff00]/50 rounded-lg shadow-[0_0_40px_rgba(0,255,0,0.2)] backdrop-blur-md p-3 flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 z-[9999]">
                <span className="text-[#00ff00] text-xl">🔍</span>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Mac-style FUB Client Search..." 
                  className="w-full bg-transparent text-[#00ff00] placeholder-[#00ff00]/30 outline-none font-mono tracking-widest text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                       alert(`EXECUTING FOLLOW UP BOSS API QUERY FOR: ${e.target.value}`);
                    }
                  }}
                />
              </div>
            )}
         </div>

      </div>"""

if old_east_end in text:
    text = text.replace(old_east_end, new_east_end)
    print("Replaced East Wall end block")
else:
    print("WARNING: Could not find east wall end block")

with open('src/App.jsx', 'w') as f:
    f.write(text)

