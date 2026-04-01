with open('src/App.jsx', 'r') as f:
    text = f.read()

old_theme_div = "scale-100' : 'opacity-0 invisible translate-y-4 scale-95 pointer-events-none'"
new_theme_div = "scale-100 pointer-events-auto' : 'opacity-0 invisible translate-y-4 scale-95 pointer-events-none'"
text = text.replace(old_theme_div, new_theme_div)

with open('src/App.jsx', 'w') as f:
    f.write(text)
