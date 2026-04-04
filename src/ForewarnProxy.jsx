import React, { useState, useEffect, useCallback } from 'react';

// ─── CONTACT VERIFY MODULE ───────────────────────────────────────
// Flow: VA enters name+phone → whitelist check → enters search info
// → server logs into ForewArn, navigates to results → pops up ForewArn
// VA sees ForewArn directly. We just get them past the login.

const API = import.meta.env.VITE_FOREWARN_API || 'http://localhost:3003';

export default function ForewarnProxy({ onClose }) {
  // ── State ──
  const [step, setStep] = useState('auth');          // auth | search | loading | popup | error
  const [serverOnline, setServerOnline] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  // VA auth (from KRONOS login)
  const [vaName, setVaName] = useState(
    () => `${localStorage.getItem('kronosFirst') || ''} ${localStorage.getItem('kronosLast') || ''}`.trim() || ''
  );
  const [vaPhone, setVaPhone] = useState(() => localStorage.getItem('kronosPhone') || '');

  // Search fields — ONE box, server routes to correct ForewArn page
  const [clientName, setClientName] = useState('');
  const [clientZip, setClientZip] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // Results
  const [resultUrl, setResultUrl] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // ── Server health ──
  const checkServer = useCallback(async () => {
    try {
      const r = await fetch(`${API}/status`, { signal: AbortSignal.timeout(3000) });
      if (r.ok) setServerOnline(true);
      else setServerOnline(false);
    } catch {
      setServerOnline(false);
    }
  }, []);

  useEffect(() => { checkServer(); }, [checkServer]);

  // ── Phone formatter ──
  const fmtPhone = (val) => {
    const d = val.replace(/\D/g, '');
    if (d.length >= 6) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6,10)}`;
    if (d.length >= 3) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return d;
  };

  // ── Check VA authorization ──
  const verifyVA = async () => {
    if (!vaName.trim() || !vaPhone.trim()) return;
    
    try {
      // Check whitelist by trying a lightweight request
      const r = await fetch(`${API}/whitelist`);
      const d = await r.json();
      const match = d.vas?.find(v => 
        v.name.toLowerCase() === vaName.trim().toLowerCase()
      );
      if (match) {
        setIsApproved(true);
        setStep('search');
        localStorage.setItem('fwApproved', 'true');
      } else {
        setErrorMsg('Not in system — contact PJ at (832) 867-2223');
        setStep('error');
      }
    } catch {
      setErrorMsg('Server offline — try again later');
      setStep('error');
    }
  };

  // ── Auto-approve if previously verified ──
  useEffect(() => {
    if (localStorage.getItem('fwApproved') === 'true' && vaName && vaPhone) {
      setIsApproved(true);
      setStep('search');
    }
  }, [vaName, vaPhone]);

  // ── Can search? ──
  const canSearch = clientPhone.trim() || (clientName.trim() && (clientZip.trim() || clientAddress.trim()));

  // ── Run the search ──
  const runSearch = async () => {
    setStep('loading');
    setErrorMsg('');

    try {
      const r = await fetch(`${API}/start-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.replace(/\D/g, ''),
          clientAddress: clientAddress.trim(),
          clientZip: clientZip.trim(),
          vaName: vaName.trim(),
          vaPin: vaPhone.replace(/\D/g, '').slice(-4) // last 4 of phone as PIN
        })
      });
      const d = await r.json();

      if (r.status === 403) {
        setErrorMsg('Access denied — contact PJ');
        setStep('error');
        return;
      }
      if (r.status === 429) {
        setErrorMsg('System busy — try again in a moment');
        setStep('error');
        return;
      }
      if (!r.ok) {
        setErrorMsg(d.error || 'Something went wrong');
        setStep('error');
        return;
      }

      // Server is handling login + search
      if (d.status === 'waiting_for_code') {
        // MFA in progress - poll for completion
        pollForResult();
      } else if (d.status === 'result') {
        setResultData(d.result);
        setStep('popup');
      } else if (d.url) {
        // Server returned a ForewArn URL — open it
        setResultUrl(d.url);
        setStep('popup');
      }
    } catch (err) {
      setErrorMsg('Server not reachable');
      setStep('error');
    }
  };

  // ── Poll for MFA completion ──
  const pollForResult = () => {
    let attempts = 0;
    const timer = setInterval(async () => {
      attempts++;
      if (attempts > 40) { // ~3.5 min
        clearInterval(timer);
        setErrorMsg('Timed out waiting for verification');
        setStep('error');
        return;
      }
      try {
        const r = await fetch(`${API}/status`);
        const d = await r.json();
        if (d.lastResult) {
          clearInterval(timer);
          setResultData(d.lastResult);
          setStep('popup');
        }
      } catch {}
    }, 5000);
  };

  // ── Clear ──
  const resetSearch = () => {
    setClientName('');
    setClientZip('');
    setClientPhone('');
    setClientAddress('');
    setResultData(null);
    setResultUrl('');
    setErrorMsg('');
    setStep('search');
  };

  // ═══════════════════ RENDER ═══════════════════

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl pointer-events-auto">
      <div className="w-full max-w-md bg-[#0f1219] border border-slate-700/50 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col font-sans relative overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-gradient-to-r from-[#1a1f2e] to-[#0f172a]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <div className="text-white/90 font-bold text-sm tracking-wide">Contact Verify</div>
              <div className="text-slate-500 text-[10px] font-mono">ForewArn Integration</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {serverOnline !== null && (
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                serverOnline ? 'bg-emerald-900/60 text-emerald-400' : 'bg-red-900/60 text-red-400'
              }`}>
                ● {serverOnline ? 'LIVE' : 'OFF'}
              </span>
            )}
            <button onClick={onClose} className="text-slate-500 hover:text-white text-lg transition-colors">✕</button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* ══ STEP 1: VA AUTH ══ */}
          {step === 'auth' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <div className="text-[10px] text-slate-500 font-bold tracking-[2px] uppercase">Employee Verification</div>
                <p className="text-slate-600 text-[11px] mt-1">Enter your name and phone number</p>
              </div>

              <input
                type="text"
                value={vaName}
                onChange={e => setVaName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-4 py-3 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
              />
              <input
                type="tel"
                value={vaPhone}
                onChange={e => setVaPhone(fmtPhone(e.target.value))}
                placeholder="Your phone number"
                className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-4 py-3 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
              />
              <button
                onClick={verifyVA}
                disabled={!vaName.trim() || !vaPhone.trim()}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${
                  vaName.trim() && vaPhone.trim()
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600 shadow-lg cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                VERIFY ME
              </button>
            </div>
          )}

          {/* ══ STEP 2: SEARCH ══ */}
          {step === 'search' && (
            <div className="flex flex-col gap-3">
              <div className="text-center mb-1">
                <div className="text-emerald-400 text-xs font-bold">✓ Verified: {vaName}</div>
                <div className="text-[10px] text-slate-500 font-bold tracking-[2px] uppercase mt-2">Who are you looking up?</div>
              </div>

              {/* Phone — standalone search */}
              <input
                type="tel"
                value={clientPhone}
                onChange={e => setClientPhone(fmtPhone(e.target.value))}
                placeholder="Phone number"
                className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-4 py-3 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
              />

              <div className="flex items-center gap-3 my-0.5 opacity-30">
                <hr className="flex-1 border-slate-600"/><span className="text-[10px] text-slate-500 font-bold tracking-widest">OR</span><hr className="flex-1 border-slate-600"/>
              </div>

              {/* Name + Zip/Address */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Full name"
                  className="flex-1 bg-[#1e293b] border border-slate-600/50 rounded-lg px-4 py-3 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
                />
                <input
                  type="text"
                  value={clientZip}
                  onChange={e => setClientZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="Zip"
                  maxLength={5}
                  className="w-20 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-3 text-white/90 text-sm text-center placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
                />
              </div>
              <input
                type="text"
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                placeholder="Address (street, city)"
                className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-4 py-3 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
              />

              <p className="text-[10px] text-slate-600 mt-0.5">Phone alone works. Or name + zip. Or name + address.</p>

              <button
                onClick={runSearch}
                disabled={!canSearch}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all mt-1 ${
                  canSearch
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                SEARCH FOREWARN
              </button>
            </div>
          )}

          {/* ══ LOADING ══ */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-10 h-10 border-[3px] border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm font-medium">Logging into ForewArn...</p>
              <p className="text-slate-600 text-[11px]">This may take 15-30 seconds</p>
            </div>
          )}

          {/* ══ ERROR ══ */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="bg-red-900/30 border border-red-800/50 rounded-xl px-5 py-4 text-center">
                <p className="text-red-400 text-sm font-bold">❌ {errorMsg}</p>
              </div>
              <button
                onClick={() => setStep(isApproved ? 'search' : 'auth')}
                className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ══ RESULTS / POPUP ══ */}
          {step === 'popup' && (
            <div className="flex flex-col gap-3">
              <div className="text-center mb-2">
                <div className="text-emerald-400 text-lg font-bold">✅ Results Found</div>
              </div>

              {/* If we got result data, show quick summary */}
              {resultData && (
                <div className="bg-[#1e293b] border border-slate-600/40 rounded-xl overflow-hidden mb-2">
                  {resultData.topLine && (
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50">
                      <span className="text-slate-500 text-xs uppercase">Name</span>
                      <span className="text-white font-semibold text-sm">{resultData.topLine}</span>
                    </div>
                  )}
                  {resultData.phones?.length > 0 && resultData.phones.map((p, i) => (
                    <div key={i} className="flex justify-between items-center px-4 py-2.5 border-b border-slate-700/50">
                      <span className="text-slate-500 text-xs uppercase">{i === 0 ? 'Phone' : ''}</span>
                      <span className="text-white text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Open ForewArn in new tab for full details */}
              {resultUrl && (
                <button
                  onClick={() => window.open(resultUrl, '_blank', 'width=1024,height=768')}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm tracking-wider hover:from-red-500 hover:to-red-600 transition-all shadow-lg"
                >
                  📄 OPEN FULL FOREWARN REPORT
                </button>
              )}

              <div className="flex gap-2 mt-1">
                <button
                  onClick={resetSearch}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
                >
                  New Search
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-2 bg-[#0a0d12] border-t border-slate-800 flex justify-between items-center">
          <span className="text-[9px] text-slate-600 uppercase tracking-wider font-bold">KRONOS INT-002</span>
          <span className="text-[9px] text-slate-600 uppercase tracking-wider">ForewArn Proxy</span>
        </div>
      </div>
    </div>
  );
}
