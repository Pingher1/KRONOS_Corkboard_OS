with open('src/App.jsx', 'r') as f:
    content = f.read()

old_menu = """{/* The Tiny North-East Corner Floating Bubble Menu (Outside Frame) */}
                        <div className="absolute -top-3 -right-3 z-[100] group/menu pointer-events-auto">"""
new_menu = """{/* The Tiny North-East Corner Floating Bubble Menu (Outside Frame) */}
                        <div className={`absolute -top-3 -right-3 z-[100] group/menu pointer-events-auto ${isLocked ? 'hidden' : 'block'}`}>"""

content = content.replace(old_menu, new_menu)

with open('src/App.jsx', 'w') as f:
    f.write(content)
