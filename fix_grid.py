import re

with open('src/App.jsx', 'r') as f:
    text = f.read()

# I am replacing the exact grid container start and the map function
old_grid = """              <div className="w-full h-full pointer-events-auto overflow-y-auto hide-scrollbar snap-y snap-mandatory scroll-smooth relative px-2">
                
                {/* SCREEN 1: PRIMARY GRID */}
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[70vh] items-center snap-center snap-always">
                  {(globalTools.length > 0 ? globalTools : ["AWAITING DEPLOYMENT"]).map((tool, i) => (
                    
                                        /* THE TILE CONTAINER */
                     <div key={i} 
                          className={`relative group p-[2px] transition-all duration-[800ms] cursor-pointer ${expandedTiles[tool] ? 'col-span-1 md:col-span-2 lg:col-span-3 aspect-[21/9] z-[100]' : 'hover:scale-[1.03] aspect-[5/4]'}`}
                          onClick={() => {"""

new_grid = """              <div className="w-full h-full pointer-events-auto overflow-y-auto hide-scrollbar snap-y snap-mandatory scroll-smooth relative px-2">
                
                {/* SCREEN 1: KRONOS BOX GRID */}
                <div className="w-full max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 min-h-[70vh] items-start snap-center snap-always">
                  {(globalTools.length > 0 ? globalTools : ["AWAITING DEPLOYMENT"]).map((tool, i) => {
                    // THE KRONOS BOX ALGORITHM: FUB acts as a dominant Hero Block. Others wrap automatically around it.
                    const isKronosBox = tool === "Follow Up Boss";
                    const gridClass = expandedTiles[tool] 
                      ? 'col-span-2 md:col-span-3 lg:col-span-4 aspect-[21/9] z-[100]' 
                      : (isKronosBox ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-[3/2] min-h-[400px]' : 'col-span-1 hover:scale-[1.03] aspect-[4/3] min-h-[160px]');
                    
                    return (
                                        /* THE TILE CONTAINER */
                     <div key={i} 
                          className={`relative group p-[2px] transition-all duration-[800ms] cursor-pointer ${gridClass}`}
                          onClick={() => {"""

# Also need to close the map function properly since we changed (tool, i) => ( to (tool, i) => { return (
old_grid_end = """                              <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(tool); }} title="Delete Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-red-500/20 rounded-md text-red-500 text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap z-50 pointer-events-auto"><span className="text-sm">✕</span> DELETE</button>
                           </div>
                        </div>
                     </div>
                  ))}
                </div>"""

new_grid_end = """                              <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(tool); }} title="Delete Tile" className="flex items-center gap-3 px-3 py-1.5 hover:bg-red-500/20 rounded-md text-red-500 text-[10px] sm:text-xs tracking-widest transition-colors font-bold whitespace-nowrap z-50 pointer-events-auto"><span className="text-sm">✕</span> DELETE</button>
                           </div>
                        </div>
                     </div>
                  );
                  })}
                </div>"""

if old_grid in text and old_grid_end in text:
    text = text.replace(old_grid, new_grid)
    text = text.replace(old_grid_end, new_grid_end)
    print("Injected Kronos Box Layout")
else:
    print("WARNING: Could not find grid logic blocks")

with open('src/App.jsx', 'w') as f:
    f.write(text)

