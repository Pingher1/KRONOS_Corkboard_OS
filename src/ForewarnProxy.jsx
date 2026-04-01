import React, { useState, useEffect } from 'react';

export default function ForewarnProxy({ onClose }) {
  const [step, setStep] = useState('login_req');
  const [searchType, setSearchType] = useState('phone'); // phone or name
  const [formData, setFormData] = useState({ phone: '', firstName: '', lastName: '', city: '', state: '' });
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer;
    if (step === 'verify_code' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const renderLoginReq = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-white text-black h-full rounded-b-3xl">
      <div className="mb-10 text-center flex flex-col items-center">
         <div className="w-16 h-16 bg-red-600 rounded-b-full rounded-se-full mb-4 shadow-xl border-4 border-red-800"></div>
         <h1 className="text-3xl font-bold tracking-widest text-slate-800">FOREWARN<span className="text-[10px] align-top">®</span></h1>
         <p className="text-sm text-slate-500 tracking-wider mt-1">a red violet company</p>
      </div>
      <p className="text-sm text-center font-bold text-slate-600 mb-6 max-w-sm">
         [ KRONOS PROXY ]<br/><br/>
         Authentication is routed through the central command IT terminal.
      </p>
      <button 
         onClick={() => setStep('verify_code')}
         className="w-full max-w-xs py-4 bg-[#23648c] hover:bg-[#1a4a68] text-white font-bold rounded shadow-md transition-all"
      >
         REQUEST MASTER LOGIN
      </button>
    </div>
  );

  const renderVerifyCode = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-white text-black h-full rounded-b-3xl">
      <div className="mb-8 text-center flex flex-col items-center">
         <div className="w-12 h-12 bg-red-600 rounded-b-full rounded-se-full mb-4 shadow-xl border-2 border-red-800"></div>
         <h1 className="text-xl font-bold tracking-widest text-slate-800">FOREWARN AUTH</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg max-w-sm text-center mb-6">
         <p className="text-blue-800 text-sm font-bold mb-2">IT HAS BEEN NOTIFIED</p>
         <p className="text-slate-600 text-xs leading-relaxed">
            The authorization code has been dispatched via SMS to the IT Administrator. 
            Once received, input the master code below.
         </p>
      </div>

      <div className="w-full max-w-xs relative mb-6">
         <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">MFA Code</span>
         <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-slate-300 rounded p-3 text-2xl tracking-[0.3em] text-center text-slate-800 font-mono focus:outline-none focus:border-[#23648c]"
            placeholder="000000"
         />
      </div>
      
      {countdown > 0 ? (
         <p className="text-xs text-red-500 font-bold mb-4 tracking-wider">CODE WINDOW EXPIRES IN {countdown}S</p>
      ) : (
         <p className="text-xs text-red-600 font-black mb-4 tracking-wider uppercase">TIMEOUT. REQUEST NEW CODE.</p>
      )}

      <button 
         onClick={() => setStep('search_mode')}
         disabled={countdown === 0}
         className={`w-full max-w-xs py-4 font-bold rounded shadow-md transition-all ${countdown === 0 ? 'bg-slate-300 text-slate-500' : 'bg-[#23648c] hover:bg-[#1a4a68] text-white'}`}
      >
         SUBMIT
      </button>
      
      {countdown === 0 && (
         <button onClick={() => setCountdown(30)} className="mt-4 text-[#23648c] text-xs font-bold uppercase tracking-wider">Resend IT Request</button>
      )}
    </div>
  );

  const renderSearchMode = () => (
    <div className="flex flex-col p-8 bg-white text-black h-full rounded-b-3xl">
      <div className="border-b border-red-600 pb-2 mb-8 flex justify-between items-end">
         <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-600 rounded-b-full rounded-se-full"></div>
            <strong className="text-slate-800 tracking-wider uppercase text-sm">Forewarn</strong>
         </div>
         <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex gap-4">
            <button className="hover:text-slate-800">Recent Searches</button>
            <strong className="text-slate-800 border-b-2 border-red-600 pb-2">Search</strong>
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
         <h2 className="text-2xl text-slate-800 font-light mb-8">Be safe. Quickly verify someone's identity.</h2>
         
         <div className="w-full max-w-xl border border-slate-200 rounded-lg shadow-sm bg-white p-8">
            <div className="flex flex-col gap-4">
               <div className="flex flex-col mb-2 text-center">
                 <strong className="text-slate-800 tracking-widest text-sm mb-1">ENTER KNOWN IDENTIFIERS</strong>
                 <p className="text-xs text-slate-400 font-bold mb-4 uppercase">Phone number overrides other inputs</p>
               </div>
               
               <input 
                  type="text" 
                  placeholder="Phone Number (e.g. 832-867-2223)" 
                  className="w-full border border-slate-300 bg-slate-50 rounded p-3 text-center text-slate-800 font-bold tracking-widest focus:bg-white focus:outline-none focus:border-[#23648c] shadow-inner"
               />
               
               <div className="flex items-center gap-4 my-2 opacity-30">
                  <hr className="flex-1 border-slate-400"/><span className="text-xs font-bold tracking-widest">OR</span><hr className="flex-1 border-slate-400"/>
               </div>
               
               <div className="flex gap-4">
                  <input type="text" placeholder="First Name" className="flex-1 border border-slate-300 rounded p-3 text-slate-800 focus:outline-none focus:border-[#23648c]" />
                  <input type="text" placeholder="Last Name" className="flex-1 border border-slate-300 rounded p-3 text-slate-800 focus:outline-none focus:border-[#23648c]" />
               </div>
               <div className="flex gap-4">
                  <input type="text" placeholder="City" className="flex-1 border border-slate-300 rounded p-3 text-slate-800 focus:outline-none focus:border-[#23648c]" />
                  <select className="flex-1 border border-slate-300 rounded p-3 text-slate-500 focus:outline-none focus:border-[#23648c]">
                     <option>State</option><option>TX</option><option>LA</option>
                  </select>
               </div>
               <div className="flex justify-center gap-6 mt-8">
                  <button onClick={() => setStep('results_loading')} className="px-12 py-3 bg-[#23648c] text-white font-bold tracking-widest text-sm rounded shadow-md hover:bg-[#1a4a68] transition-colors">
                     SEARCH DATABASE
                  </button>
                  <button className="px-8 py-3 text-[#23648c] font-bold tracking-widest text-sm uppercase hover:bg-slate-50 rounded transition-colors">
                     CLEAR
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderResultsLoading = () => {
     setTimeout(() => setStep('results_list'), 2000);
     return (
        <div className="flex flex-col items-center justify-center p-8 bg-white text-black h-full rounded-b-3xl">
           <div className="w-12 h-12 border-4 border-slate-200 border-t-[#23648c] rounded-full animate-spin mb-4"></div>
           <p className="text-slate-500 tracking-widest font-bold uppercase text-sm">Extracting identity vectors...</p>
        </div>
     );
  };

  const renderResultsList = () => (
     <div className="flex flex-col p-8 bg-slate-50 text-black h-full rounded-b-3xl overflow-y-auto">
        <div className="max-w-xl mx-auto w-full">
           <div className="flex justify-between items-center mb-6">
              <button onClick={() => setStep('search_mode')} className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100">←</button>
              <div className="px-6 py-2 rounded-full border border-slate-300 bg-white font-mono text-sm tracking-widest text-slate-600">832-867-2223</div>
           </div>
           
           <p className="text-center text-slate-500 text-sm mb-4">Found 1 results</p>
           
           <div 
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow group flex justify-between items-center"
              onClick={() => setStep('profile_detail')}
           >
              <div>
                 <h3 className="text-slate-800 font-bold mb-1 tracking-wide group-hover:text-[#23648c] transition-colors">PHILLIP JEREMY RICHARDSON <span className="text-slate-400 font-normal ml-2">Age (52)</span></h3>
                 <p className="text-slate-500 text-sm">14231 FM 1464 RD APT 15305, SUGAR LAND, TX 77498</p>
              </div>
              <span className="text-slate-300 text-2xl group-hover:text-[#23648c] transition-colors align-middle">›</span>
           </div>
        </div>
     </div>
  );

  const renderProfileDetail = () => (
     <div className="flex flex-col p-8 bg-slate-50 text-black h-full rounded-b-3xl overflow-y-auto relative">
        <div className="max-w-xl mx-auto w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-12">
           <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-start mb-4">
                 <button onClick={() => setStep('results_list')} className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100">←</button>
                 <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100">⤴</button>
              </div>
              
              <h2 className="text-2xl text-slate-800 font-light mb-1">PHILLIP JEREMY RICHARDSON <span className="float-right text-slate-400">Age 52</span></h2>
              <p className="text-slate-500">14231 FM 1464 RD APT 15305<br/>SUGAR LAND, TX 77498</p>
           </div>
           
           <div className="p-6 bg-slate-50 flex flex-col gap-3">
              {/* SANITIZATION NOTICE */}
              <div className="mb-4 bg-green-50 border border-green-200 p-3 rounded text-center shadow-inner">
                 <strong className="text-green-800 text-[10px] tracking-[0.2em] block mb-1">DATA SANITIZED: KRONOS PROXY</strong>
                 <p className="text-green-600 text-xs">Criminal & Court records have been concealed from the client window and silently archived to the Master Sql Vault.</p>
              </div>

              {/* Data Blocks */}
              <div className="flex rounded overflow-hidden shadow-sm border border-slate-200 hover:translate-x-1 transition-transform cursor-pointer">
                 <div className="flex-1 bg-white p-4 flex items-center gap-4">
                    <span className="text-2xl text-[#23648c]">📞</span>
                    <strong className="text-[#23648c] tracking-wide text-sm font-semibold">Phone Records</strong>
                 </div>
                 <div className="w-32 bg-[#23648c] text-white flex items-center justify-center text-sm tracking-wider">
                    12 found
                 </div>
              </div>

              <div className="flex rounded overflow-hidden shadow-sm border border-slate-200 hover:translate-x-1 transition-transform cursor-pointer">
                 <div className="flex-1 bg-white p-4 flex items-center gap-4">
                    <span className="text-2xl text-[#23648c]">🏠</span>
                    <strong className="text-[#23648c] tracking-wide text-sm font-semibold">Address History</strong>
                 </div>
                 <div className="w-32 bg-[#23648c] text-white flex items-center justify-center text-sm tracking-wider">
                    30 found
                 </div>
              </div>

              <div className="flex rounded overflow-hidden shadow-sm border border-slate-200 hover:translate-x-1 transition-transform cursor-pointer">
                 <div className="flex-1 bg-white p-4 flex items-center gap-4">
                    <span className="text-2xl text-[#23648c]">🚗</span>
                    <strong className="text-[#23648c] tracking-wide text-sm font-semibold">Vehicle Records</strong>
                 </div>
                 <div className="w-32 bg-[#23648c] text-white flex items-center justify-center text-sm tracking-wider">
                    19 found
                 </div>
              </div>

              <div className="flex rounded overflow-hidden shadow-sm border border-slate-200 hover:translate-x-1 transition-transform cursor-pointer">
                 <div className="flex-1 bg-white p-4 flex items-center gap-4">
                    <span className="text-2xl text-[#23648c]">📄</span>
                    <strong className="text-[#23648c] tracking-wide text-sm font-semibold">Property Records</strong>
                 </div>
                 <div className="w-32 bg-[#23648c] text-white flex items-center justify-center text-sm tracking-wider">
                    2 found
                 </div>
              </div>
           </div>
        </div>
     </div>
  );

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl pointer-events-auto">
      <div className="w-full max-w-4xl h-[90vh] bg-[#f8fafc] border border-slate-300 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col font-sans relative overflow-hidden">
         {/* KRONOS PROXY HEADER OVERLAY */}
         <div className="bg-[#020504] px-6 py-2 border-b-4 border-red-600 flex justify-between items-center z-50 shadow-md">
            <div className="flex items-center gap-4">
               <span className="text-red-500 font-bold tracking-[0.3em] text-[10px] animate-pulse">● LIVE PROXY</span>
               <span className="text-[#00ff00]/60 font-mono tracking-widest text-xs">FOREWARN_TUNNEL_ACTIVE</span>
            </div>
            <button onClick={onClose} className="text-red-500 hover:text-white font-black text-xl px-2 transition-colors">✕</button>
         </div>

         <div className="flex-1 overflow-hidden">
            {step === 'login_req' && renderLoginReq()}
            {step === 'verify_code' && renderVerifyCode()}
            {step === 'search_mode' && renderSearchMode()}
            {step === 'results_loading' && renderResultsLoading()}
            {step === 'results_list' && renderResultsList()}
            {step === 'profile_detail' && renderProfileDetail()}
         </div>
      </div>
    </div>
  );
}
