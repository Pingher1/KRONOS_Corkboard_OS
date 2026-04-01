import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# I want to find the bottom right TRT watermark or just append the new button inside the main container.
# Currently the TRT watermark is probably near the end of the return statement or main container.
# Let's just look for the main generic wrapper end:
# We have a `<div className="relative w-full h-full flex overflow-hidden">` as the main wrapper.

# I will find the end of the East Wall or just add it before the {showModal && ... } block.
# Let's do a safe string replacement. I remember the East Wall ends, and then comes the modals.

old_watermark = '<div className="absolute bottom-6 right-6 text-2xl font-black tracking-[0.5em] text-[#00ff00]/10 pointer-events-none select-none z-0">TRT</div>'

new_comms_button = """{/* BOTTOM RIGHT SOUTH-EAST COMMS TRIGGER */}
      <button 
        onClick={() => {
          // In Phase 2 this will trigger the Property Pro VA Communicator popup
          // For now we will just log or trigger a placeholder alert
          setActiveAppPopup("PROPERTY PRO V.A. COMMUNICATOR");
        }}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full border-2 border-[#00ff00]/50 bg-black/80 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-[#00ff00] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] transition-all duration-300 group z-[9999]"
      >
        {/* If the TRT logo is in public/assets/trt-logo.png, it will load here. Otherwise falls back to text */}
        <div className="text-[10px] font-black tracking-widest text-[#00ff00] group-hover:text-white transition-colors text-center leading-tight">
           T R T<br/><span className="text-[6px] text-[#00ff00]/60">COMMS</span>
        </div>
      </button>"""

if old_watermark in text:
    text = text.replace(old_watermark, new_comms_button)
else:
    # Just forcefully place it before the `showUserProfile` block if old watermark isn't found
    text = text.replace('{showUserProfile && (', new_comms_button + '\n      {showUserProfile && (')

with open('src/App.jsx', 'w') as f:
    f.write(text)
print("INJECTED TRT COMMS BUTTON")
