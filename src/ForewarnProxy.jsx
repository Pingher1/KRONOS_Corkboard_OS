import React, { useState, useEffect, useCallback } from 'react';

// ─── CONTACT VERIFY MODULE ───────────────────────────────────────
// Flow:
//   1. VA clicks tile → server auto-logs into ForewArn behind the scenes
//   2. "WAITING FOR CODE" screen appears → PJ gets SMS, tells VA the code
//   3. VA enters code → MFA completes → search fields appear
//   4. VA enters phone/name/address → runs search → results

const API = import.meta.env.VITE_FOREWARN_API || 'https://forewarn.therichardsonteamtx.com';

export default function ForewarnProxy({ onClose }) {
  // ── State ──
  // Steps: connecting → waiting_code → search → searching → results → error
  const [step, setStep] = useState('connecting');
  const [serverOnline, setServerOnline] = useState(null);

  // VA info (from KRONOS login)
  const [vaName] = useState(
    () => `${localStorage.getItem('kronosFirst') || ''} ${localStorage.getItem('kronosLast') || ''}`.trim() || 'Operator'
  );

  // Code entry
  const [verifyCode, setVerifyCode] = useState('');

  // Search fields
  const [clientName, setClientName] = useState('');
  const [clientZip, setClientZip] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // Results
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // ── Phone formatter ──
  const fmtPhone = (val) => {
    const d = val.replace(/\D/g, '');
    if (d.length >= 6) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6,10)}`;
    if (d.length >= 3) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return d;
  };

  // ── On mount: immediately start the login process ──
  useEffect(() => {
    const startLogin = async () => {
      try {
        // Check server health first
        const health = await fetch(`${API}/status`, { signal: AbortSignal.timeout(4000) });
        if (!health.ok) {
          setServerOnline(false);
          setErrorMsg('ForewArn server is offline');
          setStep('error');
          return;
        }
        setServerOnline(true);

        // Immediately trigger server login → SMS to PJ
        const r = await fetch(`${API}/start-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vaName: vaName.trim(),
            vaPin: '0000',
            clientPhone: '0000000000' // Placeholder — real search comes after code entry
          })
        });
        const d = await r.json();

        if (r.status === 403) {
          setErrorMsg('Access denied — contact PJ at (832) 867-2223');
          setStep('error');
          return;
        }
        if (r.status === 429) {
          setErrorMsg('System busy — try again in 30 seconds');
          setStep('error');
          return;
        }
        if (!r.ok) {
          setErrorMsg(d.error || 'Connection failed');
          setStep('error');
          return;
        }

        // Login initiated, SMS should be sending to PJ
        setStep('waiting_code');

      } catch (err) {
        setServerOnline(false);
        setErrorMsg('Cannot reach ForewArn server');
        setStep('error');
      }
    };

    startLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit the verification code ──
  const submitCode = async () => {
    if (!verifyCode.trim()) return;
    setStep('verifying');

    try {
      const r = await fetch(`${API}/submit-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode.trim() })
      });
      const d = await r.json();

      if (!r.ok) {
        setErrorMsg(d.error || 'Invalid code');
        setStep('error');
        return;
      }

      // MFA complete — show search fields
      setStep('search');

    } catch (err) {
      setErrorMsg('Failed to submit code');
      setStep('error');
    }
  };

  // ── Can search? ──
  const canSearch = clientPhone.trim() || (clientName.trim() && (clientZip.trim() || clientAddress.trim()));

  // ── Run the search ──
  const runSearch = async () => {
    setStep('searching');
    setErrorMsg('');

    try {
      const r = await fetch(`${API}/run-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.replace(/\D/g, ''),
          clientAddress: clientAddress.trim(),
          clientZip: clientZip.trim()
        })
      });
      const d = await r.json();

      if (!r.ok) {
        setErrorMsg(d.error || 'Search failed');
        setStep('error');
        return;
      }

      setResultData(d.result || d);
      setStep('results');

    } catch (err) {
      setErrorMsg('Search failed — server error');
      setStep('error');
    }
  };

  // ── Reset ──
  const resetSearch = () => {
    setClientName(''); setClientZip(''); setClientPhone(''); setClientAddress('');
    setResultData(null); setErrorMsg('');
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

          {/* ══ CONNECTING — auto login in progress ══ */}
          {step === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-14 gap-4">
              <div className="w-12 h-12 border-[3px] border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-300 text-sm font-semibold">Connecting to ForewArn...</p>
              <p className="text-slate-600 text-[11px] text-center">Logging in behind the scenes.<br/>A verification code will be sent to PJ.</p>
            </div>
          )}

          {/* ══ WAITING FOR CODE — VA enters the code PJ gives them ══ */}
          {step === 'waiting_code' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <div className="text-emerald-400 text-xs font-bold mb-2">✓ Connected as: {vaName}</div>
                <div className="w-14 h-14 mx-auto bg-blue-600/20 border-2 border-blue-500/50 rounded-full flex items-center justify-center text-2xl mb-3 animate-pulse">
                  📱
                </div>
                <div className="text-white text-base font-bold">WAITING FOR PASSCODE</div>
                <p className="text-slate-500 text-xs mt-1.5">
                  A code was sent to PJ's phone.<br/>
                  Ask PJ for the code, then enter it below.
                </p>
              </div>

              <input
                type="text"
                value={verifyCode}
                onChange={e => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="Enter passcode"
                maxLength={8}
                autoFocus
                className="w-full bg-[#1e293b] border-2 border-blue-500/40 rounded-xl px-4 py-4 text-white text-center text-2xl font-mono tracking-[0.5em] placeholder-slate-600 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-blue-400 transition-colors"
                onKeyDown={e => e.key === 'Enter' && verifyCode.trim() && submitCode()}
              />

              <button
                onClick={submitCode}
                disabled={!verifyCode.trim()}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${
                  verifyCode.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                SUBMIT CODE
              </button>

              <p className="text-slate-600 text-[10px] text-center mt-1">
                Waiting for PJ to respond with the verification code...
              </p>
            </div>
          )}

          {/* ══ VERIFYING CODE ══ */}
          {step === 'verifying' && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-10 h-10 border-[3px] border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm font-medium">Verifying code...</p>
            </div>
          )}

          {/* ══ SEARCH — code accepted, now enter who to look up ══ */}
          {step === 'search' && (
            <div className="flex flex-col gap-3">
              <div className="text-center mb-1">
                <div className="text-emerald-400 text-xs font-bold">✅ Verified — ForewArn is ready</div>
                <div className="text-[10px] text-slate-500 font-bold tracking-[2px] uppercase mt-2">Who are you looking up?</div>
              </div>

              {/* Phone — standalone search */}
              <input
                type="tel"
                value={clientPhone}
                onChange={e => setClientPhone(fmtPhone(e.target.value))}
                placeholder="Phone number"
                autoFocus
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

          {/* ══ SEARCHING ══ */}
          {step === 'searching' && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-10 h-10 border-[3px] border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm font-medium">Searching ForewArn...</p>
              <p className="text-slate-600 text-[11px]">Pulling records now</p>
            </div>
          )}

          {/* ══ ERROR ══ */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="bg-red-900/30 border border-red-800/50 rounded-xl px-5 py-4 text-center">
                <p className="text-red-400 text-sm font-bold">❌ {errorMsg}</p>
              </div>
              <button
                onClick={() => { setErrorMsg(''); setStep('waiting_code'); }}
                className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ══ RESULTS ══ */}
          {step === 'results' && (
            <div className="flex flex-col gap-3">
              <div className="text-center mb-2">
                <div className="text-emerald-400 text-lg font-bold">✅ Results Found</div>
              </div>

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
