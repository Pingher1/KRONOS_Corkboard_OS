import React, { useState, useEffect, useCallback } from 'react';

// ─── CONTACT VERIFY MODULE ───────────────────────────────────────
// Real integration with KRONOS ForewArn Proxy Server
// VA enters: operator name/PIN → search input → gets verified contact info
// Criminal data is silently archived to vault (PJ-only)

const API = import.meta.env.VITE_FOREWARN_API || 'http://localhost:3003';

export default function ForewarnProxy({ onClose }) {
  // ── State ──
  const [step, setStep] = useState('search');        // search | loading | results | error
  const [serverOnline, setServerOnline] = useState(false);

  // Operator (auto-filled from localStorage)
  const [vaName, setVaName] = useState(
    () => `${localStorage.getItem('kronosFirst') || ''} ${localStorage.getItem('kronosLast') || ''}`.trim() || ''
  );
  const [vaPin, setVaPin] = useState(() => localStorage.getItem('kronosPin') || '');

  // Search fields
  const [clientName, setClientName] = useState('');
  const [clientZip, setClientZip] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // Results
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [pollTimer, setPollTimer] = useState(null);

  // ── Server health check ──
  const checkServer = useCallback(async () => {
    try {
      const r = await fetch(`${API}/status`);
      if (r.ok) setServerOnline(true);
      else setServerOnline(false);
    } catch {
      setServerOnline(false);
    }
  }, []);

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 15000);
    return () => clearInterval(interval);
  }, [checkServer]);

  // Cleanup poll on unmount
  useEffect(() => {
    return () => { if (pollTimer) clearInterval(pollTimer); };
  }, [pollTimer]);

  // ── Phone formatter ──
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length >= 6) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
    if (digits.length >= 3) return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    return digits;
  };

  // ── Can search? ──
  const canSearch = vaName.trim() && vaPin.trim() && (
    clientPhone.trim() || clientName.trim()
  );

  // ── Run check ──
  const runCheck = async () => {
    setStep('loading');
    setErrorMsg('');
    setResult(null);

    // Save VA creds for next time
    localStorage.setItem('kronosPin', vaPin);

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
          vaPin: vaPin.trim()
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

      if (d.status === 'waiting_for_code') {
        // Poll for result (MFA handled server-side via GHL)
        startPolling();
      } else if (d.status === 'result') {
        setResult(d.result);
        setStep('results');
      }
    } catch (err) {
      setErrorMsg('Server not reachable — is it running?');
      setStep('error');
    }
  };

  // ── Poll for result ──
  const startPolling = () => {
    let attempts = 0;
    const timer = setInterval(async () => {
      attempts++;
      if (attempts > 36) {
        clearInterval(timer);
        setErrorMsg('Timed out — try again');
        setStep('error');
        return;
      }
      try {
        const r = await fetch(`${API}/status`);
        const d = await r.json();
        if (d.lastResult) {
          clearInterval(timer);
          setResult(d.lastResult);
          setStep('results');
        }
      } catch {}
    }, 5000);
    setPollTimer(timer);
  };

  // ── Clear & reset ──
  const resetForm = () => {
    setClientName('');
    setClientZip('');
    setClientPhone('');
    setClientAddress('');
    setResult(null);
    setErrorMsg('');
    setStep('search');
  };

  // ═══════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl pointer-events-auto">
      <div className="w-full max-w-lg bg-[#0f1219] border border-slate-700/50 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col font-sans relative overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-gradient-to-r from-[#1e293b] to-[#0f172a]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <div className="text-white/90 font-bold text-sm tracking-wide">Contact Verify</div>
              <div className="text-slate-500 text-[10px] font-mono">Confirm identity before calling</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${
              serverOnline 
                ? 'bg-emerald-900/60 text-emerald-400' 
                : 'bg-red-900/60 text-red-400'
            }`}>
              ● {serverOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
            <button onClick={onClose} className="text-slate-500 hover:text-white text-xl transition-colors leading-none">✕</button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* SEARCH VIEW */}
          {step === 'search' && (
            <div className="flex flex-col gap-4">
              {/* Operator row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vaName}
                  onChange={e => setVaName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
                <input
                  type="password"
                  value={vaPin}
                  onChange={e => setVaPin(e.target.value)}
                  placeholder="PIN"
                  maxLength={4}
                  className="w-20 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm text-center placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              {/* Search fields */}
              <div className="mt-1">
                <div className="text-[10px] text-slate-500 font-bold tracking-[1.5px] uppercase mb-2">Who are you contacting?</div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Name (first and last)"
                    className="flex-1 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                  <input
                    type="text"
                    value={clientZip}
                    onChange={e => setClientZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="Zip"
                    maxLength={5}
                    className="w-24 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm text-center placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={e => setClientPhone(formatPhone(e.target.value))}
                  placeholder="Phone number"
                  className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 mb-2"
                />
                <input
                  type="text"
                  value={clientAddress}
                  onChange={e => setClientAddress(e.target.value)}
                  placeholder="Address (street, city)"
                  className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2.5 text-white/90 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
                <p className="text-[11px] text-slate-500 mt-2">Enter name + zip, phone, or address — whichever you have</p>
              </div>

              <button
                onClick={runCheck}
                disabled={!canSearch}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${
                  canSearch
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/30 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                VERIFY CONTACT
              </button>
            </div>
          )}

          {/* LOADING VIEW */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-10 h-10 border-3 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm font-medium tracking-wide">Verifying contact...</p>
              <p className="text-slate-600 text-xs">This may take a moment</p>
            </div>
          )}

          {/* ERROR VIEW */}
          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="bg-red-900/30 border border-red-800/50 rounded-xl px-6 py-4 text-center max-w-sm">
                <p className="text-red-400 text-sm font-bold mb-1">❌ {errorMsg}</p>
              </div>
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* RESULTS VIEW */}
          {step === 'results' && result && (
            <div className="flex flex-col gap-3">
              {/* Status header */}
              <div className="text-center mb-2">
                <div className="text-emerald-400 text-lg font-bold">✅ Contact Information Found</div>
              </div>

              {/* Result card */}
              <div className="bg-[#1e293b] border border-slate-600/40 rounded-xl overflow-hidden">
                {/* Name */}
                {(result.topLine || result.clientName) && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50">
                    <span className="text-slate-500 text-xs uppercase tracking-wider">Name</span>
                    <span className="text-white font-semibold text-sm">{result.topLine || result.clientName}</span>
                  </div>
                )}

                {/* Phones */}
                {result.phones && result.phones.length > 0 && result.phones.map((p, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50">
                    <span className="text-slate-500 text-xs uppercase tracking-wider">{i === 0 ? 'Phone' : ''}</span>
                    <span className="text-white font-semibold text-sm">{p}</span>
                  </div>
                ))}

                {/* Address */}
                {result.address && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50">
                    <span className="text-slate-500 text-xs uppercase tracking-wider">Address</span>
                    <span className="text-white font-semibold text-sm text-right max-w-[60%]">{result.address}</span>
                  </div>
                )}

                {/* Additional addresses */}
                {result.addresses && result.addresses.length > 1 && result.addresses.slice(1, 3).map((a, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-slate-700/50">
                    <span className="text-slate-500 text-xs"></span>
                    <span className="text-slate-400 text-xs text-right max-w-[60%]">{a}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p className="text-center text-slate-600 text-[10px] mt-1">
                Verified {new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit' })}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={resetForm}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  New Search
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-2 bg-[#0a0d12] border-t border-slate-800 flex justify-between items-center">
          <span className="text-[9px] text-slate-600 uppercase tracking-wider font-bold">KRONOS</span>
          <span className="text-[9px] text-slate-600 uppercase tracking-wider">Agent + Sales Toolkit</span>
        </div>
      </div>
    </div>
  );
}
