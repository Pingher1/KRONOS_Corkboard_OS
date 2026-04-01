import React, { useState } from 'react';

const TRT_Veil = () => {
  const [activeMenu, setActiveMenu] = useState('HOME');

  return (
    <div className="min-h-screen bg-[#F9F5F7] text-gray-900 font-sans overflow-x-hidden">
      
      {/* KRONOS NORTH-STAR NAVIGATION (INJECTED) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] z-[9999] flex items-center px-8 py-3 rounded-full transition-all duration-700 w-[90%] max-w-[1200px]">
        <div className="flex items-center gap-6 text-white text-xs font-bold tracking-widest">
           <span className="text-[#00ff00]">THE RICHARDSON TEAM TX</span>
           <div className="w-px h-4 bg-white/20"></div>
           <button className="hover:text-gray-300 transition-colors">BUY</button>
           <button className="hover:text-gray-300 transition-colors">SELL</button>
           <button className="hover:text-gray-300 transition-colors">RENT</button>
           <button className="hover:text-gray-300 transition-colors text-blue-400">INVESTOR</button>
           <button className="hover:text-gray-300 transition-colors text-red-400">FSBO</button>
        </div>
        <div className="ml-auto flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.2em] text-[#00ff00]/60 hidden md:block">NORTH-STAR</span>
            <button className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
                Sign In / Join
            </button>
        </div>
      </div>

      {/* THE HERO SECTION & ZERO-LINE TRANSFER GRADIENT */}
      <div className="relative w-full h-[80vh] min-h-[600px]">
        
        {/* Absolute Background Image Layer */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                // High-End Circular Driveway / Elevation Photo
                backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2600')" 
            }}
        ></div>

        {/* The Zero-Line Mask (Realtor.com Logic) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F5F7] via-[#F9F5F7]/40 to-black/30 pointer-events-none"></div>

        {/* Central Search Hero Block */}
        <div className="absolute inset-0 flex flex-col items-center pt-[20vh] px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-8 drop-shadow-lg max-w-4xl tracking-tight">
                The #1 Real Estate Matrix Professionals Trust*
            </h1>

            {/* HAR.com Style Button Array */}
            <div className="flex items-center gap-2 mb-6 overscroll-x-auto">
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full shadow-md">Buy</button>
                <button className="px-6 py-2 bg-black/40 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-black/60 transition-colors">Rent</button>
                <button className="px-6 py-2 bg-black/40 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-black/60 transition-colors">Sell</button>
                <button className="px-6 py-2 bg-black/40 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-black/60 transition-colors">Home Value</button>
            </div>

            {/* The Search Bar Matrix */}
            <div className="w-full max-w-3xl relative bg-white rounded-full p-2 flex items-center shadow-2xl">
                <input 
                    type="text" 
                    placeholder="Address, School, City, Zip or Neighborhood" 
                    className="flex-1 px-6 outline-none bg-transparent text-lg text-black placeholder-gray-500 rounded-l-full"
                />
                <button className="px-8 py-4 bg-red-600 hover:bg-red-700 transition-colors text-white font-bold rounded-full shrink-0 flex items-center gap-2 shadow-md">
                   <span>Search</span>
                   <span className="text-sm">🔍</span>
                </button>
            </div>
        </div>
      </div>

      {/* THE FLOATING LIQUID TILES (OVERLAPPING THE MASK) */}
      <div className="relative z-20 -mt-32 max-w-[1400px] mx-auto px-6 pb-20">
         <h2 className="text-2xl font-bold text-gray-900 mb-6 drop-shadow-md">Browse Action Grids in Houston, TX</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tile 1 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-black transform transition-transform hover:-translate-y-2">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" alt="New Listings" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">New listings</div>
                <div className="absolute top-6 right-6 bg-white px-3 py-1 text-xs font-bold rounded-full text-black">8,412</div>
            </div>

            {/* Tile 2 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-black transform transition-transform hover:-translate-y-2">
                <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" alt="Price Reduced" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">Price reduced</div>
                <div className="absolute top-6 right-6 bg-white px-3 py-1 text-xs font-bold rounded-full text-black">1,492</div>
            </div>

            {/* Tile 3 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-black transform transition-transform hover:-translate-y-2">
                <img src="https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" alt="Open Houses" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">Open houses</div>
                <div className="absolute top-6 right-6 bg-white px-3 py-1 text-xs font-bold rounded-full text-black">941</div>
            </div>

            {/* Tile 4 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-black transform transition-transform hover:-translate-y-2">
                <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" alt="Recently Sold" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">Recently sold</div>
                <div className="absolute top-6 right-6 bg-white px-3 py-1 text-xs font-bold rounded-full text-black">23,199</div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default TRT_Veil;
