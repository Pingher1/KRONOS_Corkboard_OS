import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# Locate the background styling block
old_theme_css = """  const getBackgroundStyle = () => {
    switch(theme) {
      case 'vegas': return "bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center";
      case 'hawaii': return "bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center";
      case 'chalkboard': return "bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]";
      case 'highrise': return "bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750')] bg-cover bg-center";
      case 'daylight': return "bg-[#f0f4f8]";
      case 'monochrome':
      default: return "bg-[#020504] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#001100] to-black";
    }
  };"""

new_theme_css = """  const getBackgroundStyle = () => {
    switch(theme) {
      case 'vegas': return "bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center";
      case 'hawaii': return "bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center";
      case 'corkboard': return "bg-[url('/corkboard.jpg')] bg-cover bg-center";
      case 'highrise': return "bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750')] bg-cover bg-center";
      case 'daylight': return "bg-[#f0f4f8]";
      case 'kronos':
      case 'monochrome':
      default: return "bg-[#020504] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#001100] to-black";
    }
  };"""

# I need to update the Theme string in the selector menu too
# from 'chalkboard' to 'corkboard'
old_selector_chalk = """<button onClick={() => setTheme('chalkboard')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'chalkboard' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>CHALKBOARD</button>"""
new_selector_chalk = """<button onClick={() => setTheme('corkboard')} className={`w-full py-2 rounded text-[10px] tracking-widest font-black transition-colors ${theme === 'corkboard' ? 'bg-[#00ff00] text-black' : 'text-[#00ff00] hover:bg-[#00ff00]/20'}`}>CORKBOARD</button>"""

if old_theme_css in text:
    text = text.replace(old_theme_css, new_theme_css)
else:
    print("WARNING: Could not find theme css")

if old_selector_chalk in text:
    text = text.replace(old_selector_chalk, new_selector_chalk)
else:
    print("WARNING: Could not find selector chalkboard")

with open('src/App.jsx', 'w') as f:
    f.write(text)

