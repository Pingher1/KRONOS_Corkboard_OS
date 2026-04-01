with open('src/App.jsx', 'r') as f:
    text = f.read()

import re
match = re.search(r'\{\s*/\*\s*The Full-Screen Profile Jacket Overlay\s*\*/\s*\}.*?\{showEmployeeProfile && \((.*?)\)\}\s*\{\s*/\*\s*Main Application Container', text, re.DOTALL)
if match:
    print(match.group(0)[:1000]) # just peek
else:
    print("Not found")
