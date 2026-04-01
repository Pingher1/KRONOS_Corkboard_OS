with open('src/App.jsx', 'r') as f:
    text = f.read()

# Change the string occurrences
text = text.replace('"Global Database Search"', '"RealScout Global Integration"')
text = text.replace("Global Database Search file vault", "RealScout visual property engine")

with open('src/App.jsx', 'w') as f:
    f.write(text)
print("Updated to RealScout Integration")
