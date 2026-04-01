with open('src/App.jsx', 'r') as f:
    text = f.read()

# Make the title text slightly smaller and ensure it doesn't crash
old_title = "text-white font-black tracking-[0.2em] text-center text-[10px] sm:text-xs"
new_title = "text-white font-black tracking-[0.2em] text-center text-[9px] sm:text-[11px] leading-snug px-2"
text = text.replace(old_title, new_title)

# Change the bottom badge to a single line
old_badge = """<span className="text-[#00ff00]/40 text-[7px] tracking-[0.3em] font-bold text-center leading-tight">
                                 SYSTEM ACCESS<br/>GRANTED
                              </span>"""
new_badge = """<span className="text-[#00ff00]/40 text-[6px] sm:text-[7px] tracking-[0.3em] font-bold text-center whitespace-nowrap">
                                 SYSTEM ACCESS GRANTED
                              </span>"""
text = text.replace(old_badge, new_badge)

# Decrease vertical padding on bottom badge so it doesn't take up 30px
old_bottom_div = "absolute bottom-0 w-full border-t border-[#00ff00]/20 bg-[#00ff00]/5 py-2 flex items-center justify-center"
new_bottom_div = "absolute bottom-0 w-full border-t border-[#00ff00]/20 bg-[#00ff00]/5 py-1.5 flex items-center justify-center"
text = text.replace(old_bottom_div, new_bottom_div)

# Reduce the size of the lightning bolt to save space
old_svg = "className=\"w-6 h-6\""
new_svg = "className=\"w-5 h-5 mb-1\""
text = text.replace(old_svg, new_svg)

with open('src/App.jsx', 'w') as f:
    f.write(text)
