import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# Replace KRONOS MONO background logic with HOMES PRO VA LOGIC
old_bg = """          backgroundImage: theme === 'monochrome' ? "none" : """
new_bg = """          backgroundImage: theme === 'monochrome' ? "url('/homesprova.jpg')" : """

# Also update the text on the dropdown button from KRONOS MONO to HOMES PRO VA
old_btn = """<button onClick={() => setTheme('monochrome')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors shrink-0 ${theme === 'monochrome' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>KRONOS MONO</button>"""
new_btn = """<button onClick={() => setTheme('monochrome')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors shrink-0 ${theme === 'monochrome' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>HOMES PRO VA</button>"""

if old_bg in text:
    text = text.replace(old_bg, new_bg)
if old_btn in text:
    text = text.replace(old_btn, new_btn)

with open('src/App.jsx', 'w') as f:
    f.write(text)
