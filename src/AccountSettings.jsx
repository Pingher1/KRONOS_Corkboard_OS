import React, { useState, useEffect } from 'react';

// ─── ACCOUNT DATA & SETTINGS ──────────────────────────────
// FBI-style Personnel Jacket / Dossier design
// Click photo to upload, all fields persist to localStorage PER USER

// Get active user namespace — each user's data is isolated
function getUserPrefix() {
  const email = localStorage.getItem('kronosEmail') || 'default';
  return `kronos_${email.split('@')[0].toLowerCase()}_`;
}

// Helper to load/save from localStorage with per-user namespacing
function usePersistedField(key, fallback = '') {
  const prefix = getUserPrefix();
  const fullKey = prefix + key;
  const [val, setVal] = useState(() => localStorage.getItem(fullKey) || localStorage.getItem(key) || fallback);
  useEffect(() => { localStorage.setItem(fullKey, val); }, [fullKey, val]);
  return [val, setVal];
}

const FIELD = ({ label, value, onChange, placeholder, type = 'text', disabled = false, wide = false }) => (
  <div className={`flex flex-col gap-1.5 ${wide ? 'sm:col-span-2' : ''}`}>
    <label className="text-sm text-amber-950/80 font-black tracking-[0.15em] uppercase font-mono">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || label}
      disabled={disabled}
      className={`w-full bg-transparent border-b-2 border-amber-900/30 px-1 py-2.5 text-amber-950 text-xl font-mono placeholder-amber-800/25 focus:outline-none focus:border-amber-700/60 transition-colors ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    />
  </div>
);

export default function AccountSettings({ onClose, theme = 'monochrome', onLogout }) {
  // ── Personal ──
  const [firstName, setFirstName] = usePersistedField('kronosFirst');
  const [lastName, setLastName] = usePersistedField('kronosLast');
  const [phone, setPhone] = usePersistedField('kronosPhone');
  const [email, setEmail] = usePersistedField('kronosEmail');
  const [dob, setDob] = usePersistedField('kronosDob');
  const [street, setStreet] = usePersistedField('kronosStreet');
  const [city, setCity] = usePersistedField('kronosCity');
  const [state, setState] = usePersistedField('kronosState');
  const [zip, setZip] = usePersistedField('kronosZip');

  // ── Social Media ──
  const [facebook, setFacebook] = usePersistedField('kronosFacebook');
  const [instagram, setInstagram] = usePersistedField('kronosInstagram');
  const [linkedin, setLinkedin] = usePersistedField('kronosLinkedin');
  const [twitter, setTwitter] = usePersistedField('kronosTwitter');
  const [tiktok, setTiktok] = usePersistedField('kronosTiktok');
  const [youtube, setYoutube] = usePersistedField('kronosYoutube');

  // ── Professional ──
  const [licenseNumber, setLicenseNumber] = usePersistedField('kronosLicense');
  const [brokerage, setBrokerage] = usePersistedField('kronosBrokerage');
  const [mlsId, setMlsId] = usePersistedField('kronosMlsId');
  const [nrdsId, setNrdsId] = usePersistedField('kronosNrdsId');
  const [jobTitle, setJobTitle] = usePersistedField('kronosTitle');

  // ── Auto-Fill Profile ──
  const [middleName, setMiddleName] = usePersistedField('kronosMiddle');
  const [preferredName, setPreferredName] = usePersistedField('kronosPreferred');
  const [ssn4, setSsn4] = usePersistedField('kronosSsn4');
  const [emergName, setEmergName] = usePersistedField('kronosEmergName');
  const [emergPhone, setEmergPhone] = usePersistedField('kronosEmergPhone');
  const [emergRelation, setEmergRelation] = usePersistedField('kronosEmergRelation');

  // ── Security ──
  const [recoveryEmail] = usePersistedField('recoveryEmail');
  const [socialUrl] = usePersistedField('socialUrl');
  const [passcode, setPasscode] = usePersistedField('kronosPasscode');
  const [newPasscode, setNewPasscode] = useState('');

  // ── Photo ──
  const [photo, setPhoto] = usePersistedField('kronosPhoto');

  // ── Tab State ──
  const [activeTab, setActiveTab] = useState('personal');
  const [showSaved, setShowSaved] = useState(false);

  const flashSaved = () => { setShowSaved(true); setTimeout(() => setShowSaved(false), 2000); };

  const fmtPhone = (val) => {
    const d = val.replace(/\D/g, '');
    if (d.length >= 6) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6,10)}`;
    if (d.length >= 3) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return d;
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhoto(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: 'personal', label: 'PERSONAL', icon: '📋' },
    { id: 'social', label: 'SOCIAL', icon: '📱' },
    { id: 'professional', label: 'CREDENTIALS', icon: '🏛️' },
    { id: 'autofill', label: 'AUTO-FILL', icon: '⚡' },
    { id: 'security', label: 'SECURITY', icon: '🔒' },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 pointer-events-auto bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl h-[92vh] flex flex-col rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #d4c5a9 0%, #c9b896 30%, #d1c4a5 60%, #cbb98a 100%)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.1)'
        }}
      >
        {/* ── Manila Folder Tab ── */}
        <div className="absolute -top-0 left-8 w-52 h-9 rounded-t-lg z-10"
          style={{ background: 'linear-gradient(180deg, #c9b896, #bfad80)', borderTop: '2px solid #a89060', borderLeft: '2px solid #a89060', borderRight: '2px solid #a89060' }}
        >
          <span className="text-sm font-bold tracking-[0.3em] text-amber-900/80 uppercase flex items-center justify-center h-full font-mono">PERSONNEL FILE</span>
        </div>

        {/* ── Close Button (Red Stamp Style) ── */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-red-700/80 text-white font-bold text-sm flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg border border-red-900/40"
          style={{ fontFamily: 'monospace' }}
        >✕</button>

        {/* ── Header: Photo + Identity Card ── */}
        <div className="flex-none pt-8 px-5 pb-4 border-b-2 border-amber-900/20" style={{ borderBottomStyle: 'dashed' }}>
          <div className="flex gap-5">
            
            {/* Photo with paperclip */}
            <div className="relative flex-shrink-0">
              {/* Paperclip SVG */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-3xl opacity-60 drop-shadow-sm" style={{ filter: 'brightness(0.6) sepia(0.5)' }}>📎</div>
              
              <label className="cursor-pointer block group">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <div className="w-28 h-36 bg-white/80 border-2 border-amber-900/30 rounded-sm overflow-hidden shadow-[3px_4px_8px_rgba(0,0,0,0.2)] relative transform rotate-[1deg] hover:rotate-0 transition-transform">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-gray-100 to-gray-200">
                      <span className="text-3xl opacity-30">👤</span>
                      <span className="text-[7px] text-gray-400 font-bold tracking-wider uppercase">Click to add photo</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                    <span className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">📷</span>
                  </div>
                </div>
              </label>
            </div>

            {/* Identity Summary */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="text-sm text-amber-900/60 font-mono tracking-[0.3em] uppercase mb-1">Subject Name</div>
                <div className="text-3xl font-black tracking-wider text-amber-950 uppercase font-mono leading-tight">
                  {firstName || '—'} {lastName || '—'}
                </div>
                <div className="text-sm text-amber-800/70 font-mono font-bold mt-1">{jobTitle || 'TITLE UNASSIGNED'} • {brokerage || 'NO AFFILIATION'}</div>
              </div>
              <div className="flex gap-6 mt-2">
                <div>
                  <div className="text-xs text-amber-900/60 font-mono tracking-widest uppercase">Phone</div>
                  <div className="text-base text-amber-950 font-mono font-bold">{phone || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-amber-900/60 font-mono tracking-widest uppercase">Email</div>
                  <div className="text-base text-amber-950 font-mono font-bold truncate max-w-[250px]">{email || '—'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-red-700/90 text-white px-3 py-1 rounded-sm font-bold tracking-wider font-mono">CLASSIFIED</span>
                <span className="text-xs bg-amber-800/30 text-amber-900 px-3 py-1 rounded-sm font-bold tracking-wider font-mono">KRONOS CLEARANCE</span>
                {showSaved && <span className="text-[10px] text-emerald-700 font-bold tracking-wider animate-pulse font-mono">✓ SAVED</span>}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab Bar (File Folder Tabs) ── */}
        <div className="flex-none flex overflow-x-auto px-4 pt-2 gap-0.5" style={{ background: 'linear-gradient(180deg, #c4b48c, #cbb98e)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t-md text-sm font-bold tracking-wider whitespace-nowrap transition-all font-mono border-t border-l border-r ${
                activeTab === tab.id
                  ? 'bg-[#f5eed8] text-amber-900 border-amber-900/25 shadow-sm -mb-[1px] z-10'
                  : 'bg-amber-800/10 text-amber-900/50 border-transparent hover:bg-amber-800/15 hover:text-amber-900/70'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Body (Paper Style) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5" style={{ background: 'linear-gradient(to bottom, #f5eed8, #f0e8ce)', backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #d4c5a9 28px)' }}>

          {/* ═══ PERSONAL ═══ */}
          {activeTab === 'personal' && (
            <>
              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black">SECTION 1 — PRIMARY IDENTITY</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                <FIELD label="First Name" value={firstName} onChange={setFirstName} />
                <FIELD label="Last Name" value={lastName} onChange={setLastName} />
                <FIELD label="Middle Name" value={middleName} onChange={setMiddleName} />
                <FIELD label="Preferred Name" value={preferredName} onChange={setPreferredName} />
                <FIELD label="Phone Number" value={phone} onChange={v => setPhone(fmtPhone(v))} type="tel" />
                <FIELD label="Email Address" value={email} onChange={setEmail} type="email" />
                <FIELD label="Date of Birth" value={dob} onChange={setDob} type="date" />
              </div>

              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black border-t border-amber-900/10 pt-4">SECTION 2 — HOME ADDRESS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <FIELD label="Street Address" value={street} onChange={setStreet} placeholder="123 Main St" wide />
                <FIELD label="City" value={city} onChange={setCity} />
                <div className="flex gap-3">
                  <div className="w-16"><FIELD label="State" value={state} onChange={v => setState(v.toUpperCase().slice(0,2))} placeholder="TX" /></div>
                  <div className="flex-1"><FIELD label="ZIP Code" value={zip} onChange={v => setZip(v.replace(/\D/g, '').slice(0,5))} /></div>
                </div>
              </div>
            </>
          )}

          {/* ═══ SOCIAL MEDIA ═══ */}
          {activeTab === 'social' && (
            <>
              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black">SECTION 3 — SOCIAL MEDIA ACCOUNTS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <FIELD label="📘 Facebook URL" value={facebook} onChange={setFacebook} placeholder="facebook.com/username" />
                <FIELD label="📸 Instagram" value={instagram} onChange={setInstagram} placeholder="@handle" />
                <FIELD label="💼 LinkedIn URL" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/username" />
                <FIELD label="🐦 Twitter / X" value={twitter} onChange={setTwitter} placeholder="@handle" />
                <FIELD label="🎵 TikTok" value={tiktok} onChange={setTiktok} placeholder="@handle" />
                <FIELD label="📺 YouTube" value={youtube} onChange={setYoutube} placeholder="youtube.com/@channel" />
              </div>
            </>
          )}

          {/* ═══ PROFESSIONAL ═══ */}
          {activeTab === 'professional' && (
            <>
              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black">SECTION 4 — CREDENTIALS & LICENSING</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <FIELD label="Job Title" value={jobTitle} onChange={setJobTitle} placeholder="Virtual Assistant" />
                <FIELD label="Brokerage / Company" value={brokerage} onChange={setBrokerage} placeholder="The Richardson Team" />
                <FIELD label="Real Estate License #" value={licenseNumber} onChange={setLicenseNumber} placeholder="Optional" />
                <FIELD label="MLS ID" value={mlsId} onChange={setMlsId} placeholder="Optional" />
                <FIELD label="NRDS ID" value={nrdsId} onChange={setNrdsId} placeholder="Optional" />
              </div>
            </>
          )}

          {/* ═══ AUTO-FILL ═══ */}
          {activeTab === 'autofill' && (
            <>
              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black">SECTION 5 — AUTO-FILL DATA (WEB FORMS)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                <FIELD label="Last 4 of SSN" value={ssn4} onChange={v => setSsn4(v.replace(/\D/g, '').slice(0,4))} placeholder="••••" />
              </div>

              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black border-t border-amber-900/10 pt-4">EMERGENCY CONTACT</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <FIELD label="Contact Name" value={emergName} onChange={setEmergName} />
                <FIELD label="Phone" value={emergPhone} onChange={v => setEmergPhone(fmtPhone(v))} type="tel" />
                <FIELD label="Relationship" value={emergRelation} onChange={setEmergRelation} placeholder="Spouse, Parent, etc." />
              </div>

              <div className="mt-5 p-3 rounded-sm border border-amber-900/15 bg-amber-100/40 text-center">
                <p className="text-sm font-bold tracking-wider text-amber-800/70 font-mono">⚡ ALL DATA ON THIS PAGE AUTO-FILLS WEB FORMS ACROSS KRONOS TOOLS</p>
              </div>
            </>
          )}

          {/* ═══ SECURITY ═══ */}
          {activeTab === 'security' && (
            <>
              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black">SECTION 6 — PASSCODE MANAGEMENT</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                <FIELD label="Current Passcode" value={passcode} onChange={() => {}} disabled type="password" />
                <FIELD label="New Passcode" value={newPasscode} onChange={setNewPasscode} type="password" placeholder="Min 4 characters" />
              </div>
              <button
                onClick={() => {
                  if (newPasscode.trim().length >= 4) {
                    setPasscode(newPasscode); setNewPasscode(''); flashSaved();
                  }
                }}
                disabled={newPasscode.trim().length < 4}
                className={`w-full py-3 rounded-sm text-sm font-bold tracking-wider font-mono transition-all mb-6 ${
                  newPasscode.trim().length >= 4
                    ? 'bg-amber-800 text-white hover:bg-amber-700 cursor-pointer shadow-md'
                    : 'bg-amber-900/10 text-amber-900/30 cursor-not-allowed'
                }`}
              >UPDATE PASSCODE</button>

              <div className="text-base text-amber-950/70 font-mono tracking-[0.2em] uppercase mb-5 font-black border-t border-amber-900/10 pt-4">RECOVERY CREDENTIALS (LOCKED)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                <FIELD label="Recovery Email" value={recoveryEmail} onChange={() => {}} disabled placeholder="Set during onboarding" />
                <FIELD label="Social Auth URL" value={socialUrl} onChange={() => {}} disabled placeholder="Set during onboarding" />
              </div>

              <div className="mt-4 p-3 rounded-sm border border-red-800/20 bg-red-100/30 text-center mb-6">
                <p className="text-sm font-bold tracking-wider text-red-800/70 font-mono">⚠ RECOVERY CREDENTIALS LOCKED — SET DURING PHASE 4 ONBOARDING</p>
              </div>

              <button
                onClick={() => { if (onLogout) onLogout(); onClose(); }}
                className="w-full py-3 bg-red-700/80 text-white font-black tracking-[0.2em] text-sm rounded-sm hover:bg-red-700 transition-all shadow-lg font-mono"
              >
                ⏻ LOG OUT — TERMINATE SESSION
              </button>
            </>
          )}
        </div>

        {/* ── Footer (Stamp Style) ── */}
        <div className="flex-none px-5 py-2.5 flex justify-between items-center border-t-2 border-amber-900/20" style={{ borderTopStyle: 'dashed', background: 'linear-gradient(to right, #c9b896, #d1c4a5)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-900/60 font-mono tracking-[0.2em] uppercase font-bold">KRONOS EMPLOYEE VAULT</span>
            <span className="text-[9px] text-amber-900/40 font-mono">• FILE #{(firstName || 'X').charAt(0)}{(lastName || 'X').charAt(0)}-{Date.now().toString().slice(-4)}</span>
          </div>
          <button
            onClick={flashSaved}
            className="px-6 py-2.5 rounded-sm text-sm font-bold tracking-wider font-mono bg-amber-800 text-white hover:bg-amber-700 transition-all shadow-md"
          >
            💾 SAVE FILE
          </button>
        </div>
      </div>
    </div>
  );
}
