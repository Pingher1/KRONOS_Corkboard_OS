with open('src/App.jsx', 'r') as f:
    content = f.read()

# Replace the text styling for the three West Wall top buttons (Layout, Lang, Theme)
old_btn1 = """className="w-full py-2.5 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[10px] tracking-[0.2em] font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""
new_btn1 = """className="w-full py-2.5 border-2 border-[#00ff00]/80 bg-[#00ff00]/5 hover:bg-[#00ff00]/30 rounded text-[10px] tracking-[0.2em] font-black text-white drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""

old_btn2 = """className="flex-1 py-2 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-[0.2em] font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""
new_btn2 = """className="flex-1 py-3 border-2 border-[#00ff00]/80 bg-[#00ff00]/5 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-[0.2em] font-black text-white drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""

old_btn3 = """className="flex-1 py-2 border-2 border-[#00ff00]/80 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-widest font-black text-[#00ff00] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""
new_btn3 = """className="flex-1 py-3 border-2 border-[#00ff00]/80 bg-[#00ff00]/5 hover:bg-[#00ff00]/30 rounded text-[9px] tracking-widest font-black text-white drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-colors shadow-[0_0_10px_rgba(0,255,0,0.1)]\""""

content = content.replace(old_btn1, new_btn1)
content = content.replace(old_btn2, new_btn2)
content = content.replace(old_btn3, new_btn3)

with open('src/App.jsx', 'w') as f:
    f.write(content)
