with open('src/App.jsx', 'r') as f:
    text = f.read()

# Locate the West Wall absolute wrapper
old_z = 'className="absolute left-0 top-1/2 -translate-y-1/2 w-48 pl-4 z-40 flex flex-col pointer-events-none"'
new_z = 'className="absolute left-0 top-1/2 -translate-y-1/2 w-48 pl-4 z-[90] flex flex-col pointer-events-none"'

if old_z in text:
    text = text.replace(old_z, new_z)
    with open('src/App.jsx', 'w') as f:
        f.write(text)
    print("FIXED Z-INDEX")
else:
    print("COULD NOT FIND STRING")
