/* ============================================================
   St. Therese MedTech Solution — Native SVG Charts Renderer
   Clean, interactive SVG analytics matching reference UI
   ============================================================ */

const Charts = {

  /* ──────────── OPD Sparkline Chart ──────────── */
  opdSparkline () {
    return `<svg viewBox="0 0 240 60" width="100%" height="60" style="overflow:visible;">
      <defs>
        <linearGradient id="opdGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#16A34A" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#16A34A" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="M 0 50 C 40 45, 80 52, 120 38 C 160 24, 200 12, 240 5 L 240 60 L 0 60 Z" fill="url(#opdGrad)"/>
      <path d="M 0 50 C 40 45, 80 52, 120 38 C 160 24, 200 12, 240 5" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="120" cy="38" r="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="2.5"/>
    </svg>`;
  },

  /* ──────────── Bed Status Donut Ring ──────────── */
  bedStatusDonut (occupied = 166, available = 60) {
    const total = occupied + available;
    return `<div style="position:relative; width:120px; height:120px; margin:0 auto;">
      <svg viewBox="0 0 100 100" width="120" height="120">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" stroke-width="12"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#16A34A" stroke-width="12"
          stroke-dasharray="238.7" stroke-dashoffset="65" stroke-linecap="round" transform="rotate(-90 50 50)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#00BCD4" stroke-width="12"
          stroke-dasharray="238.7" stroke-dashoffset="180" stroke-linecap="round" transform="rotate(70 50 50)"/>
      </svg>
      <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <span style="font-size:1.1rem; font-weight:800; color:var(--text-dark); line-height:1.1">${total}</span>
        <span style="font-size:0.65rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Beds</span>
      </div>
    </div>`;
  },

  /* ──────────── Patient Admissions Trend Chart ──────────── */
  admissionsTrend () {
    return `<svg viewBox="0 0 680 220" width="100%" height="220" style="overflow:visible;">
      <defs>
        <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0288D1" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0288D1" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00A896" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="#00A896" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <line x1="40" y1="30" x2="660" y2="30" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="25" y="34" font-size="11" fill="#94A3B8">100</text>

      <line x1="40" y1="75" x2="660" y2="75" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="25" y="79" font-size="11" fill="#94A3B8">80</text>

      <line x1="40" y1="120" x2="660" y2="120" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="25" y="124" font-size="11" fill="#94A3B8">60</text>

      <line x1="40" y1="165" x2="660" y2="165" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="25" y="169" font-size="11" fill="#94A3B8">40</text>

      <line x1="40" y1="200" x2="660" y2="200" stroke="#CBD5E1"/>
      <text x="25" y="204" font-size="11" fill="#94A3B8">0</text>

      <text x="50" y="218" font-size="11" fill="#64748B" font-weight="600">Jan</text>
      <text x="125" y="218" font-size="11" fill="#64748B" font-weight="600">Feb</text>
      <text x="200" y="218" font-size="11" fill="#64748B" font-weight="600">Mar</text>
      <text x="275" y="218" font-size="11" fill="#64748B" font-weight="600">Apr</text>
      <text x="350" y="218" font-size="11" fill="#64748B" font-weight="600">May</text>
      <text x="425" y="218" font-size="11" fill="#64748B" font-weight="600">Jun</text>
      <text x="500" y="218" font-size="11" fill="#64748B" font-weight="600">Jul</text>
      <text x="575" y="218" font-size="11" fill="#64748B" font-weight="600">Aug</text>
      <text x="640" y="218" font-size="11" fill="#64748B" font-weight="600">Sep</text>

      <path d="M 50 170 Q 90 120, 125 125 T 200 135 T 275 140 T 350 125 T 425 130 T 500 110 T 575 110 T 640 60 L 640 200 L 50 200 Z" fill="url(#areaGrad2)"/>
      <path d="M 50 170 Q 90 120, 125 125 T 200 135 T 275 140 T 350 125 T 425 130 T 500 110 T 575 110 T 640 60" fill="none" stroke="#00A896" stroke-width="3"/>

      <path d="M 50 140 Q 90 110, 125 105 T 200 120 T 275 60 T 350 100 T 425 80 T 500 75 T 575 75 T 640 35 L 640 200 L 50 200 Z" fill="url(#areaGrad1)"/>
      <path d="M 50 140 Q 90 110, 125 105 T 200 120 T 275 60 T 350 100 T 425 80 T 500 75 T 575 75 T 640 35" fill="none" stroke="#0288D1" stroke-width="3"/>

      <circle cx="275" cy="60" r="5" fill="#0288D1" stroke="#FFF" stroke-width="2.5"/>
      <rect x="235" y="32" width="80" height="20" rx="4" fill="#0F172A"/>
      <text x="275" y="46" font-size="10" fill="#FFF" text-anchor="middle" font-weight="600">Apr 10, 2026</text>
    </svg>`;
  },

  /* ──────────── Billing Summary Donut ──────────── */
  billingDonut () {
    return `<div style="position:relative; width:130px; height:130px; margin:0 auto;">
      <svg viewBox="0 0 100 100" width="130" height="130">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#0288D1" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="70" transform="rotate(-90 50 50)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#00A896" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="150" transform="rotate(30 50 50)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="200" transform="rotate(160 50 50)"/>
      </svg>
      <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <span style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Summary</span>
      </div>
    </div>`;
  },

  /* ──────────── Patient Vital Signs Trend Graph ──────────── */
  vitalsTrendChart () {
    return `<svg viewBox="0 0 720 230" width="100%" height="230" style="overflow:visible;">
      <defs>
        <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0288D1" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#0288D1" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#DC2626" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#DC2626" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Y Grid Lines -->
      <line x1="40" y1="30" x2="700" y2="30" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="20" y="34" font-size="10" fill="#94A3B8">140</text>

      <line x1="40" y1="75" x2="700" y2="75" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="20" y="79" font-size="10" fill="#94A3B8">120</text>

      <line x1="40" y1="120" x2="700" y2="120" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="20" y="124" font-size="10" fill="#94A3B8">100</text>

      <line x1="40" y1="165" x2="700" y2="165" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <text x="20" y="169" font-size="10" fill="#94A3B8">80</text>

      <line x1="40" y1="200" x2="700" y2="200" stroke="#CBD5E1"/>
      <text x="20" y="204" font-size="10" fill="#94A3B8">60</text>

      <!-- Time Checkpoints -->
      <text x="60" y="220" font-size="11" fill="#64748B" font-weight="600">08:00 AM</text>
      <text x="210" y="220" font-size="11" fill="#64748B" font-weight="600">12:00 PM</text>
      <text x="360" y="220" font-size="11" fill="#64748B" font-weight="600">04:00 PM</text>
      <text x="510" y="220" font-size="11" fill="#64748B" font-weight="600">08:00 PM</text>
      <text x="660" y="220" font-size="11" fill="#64748B" font-weight="600">10:30 PM</text>

      <!-- BP Systolic Curve (Blue Line) -->
      <path d="M 60 75 Q 210 65, 360 85 T 510 70 T 660 75 L 660 200 L 60 200 Z" fill="url(#bpGrad)"/>
      <path d="M 60 75 Q 210 65, 360 85 T 510 70 T 660 75" fill="none" stroke="#0288D1" stroke-width="3.5" stroke-linecap="round"/>

      <!-- Pulse Rate Curve (Red Line) -->
      <path d="M 60 145 Q 210 135, 360 140 T 510 130 T 660 138 L 660 200 L 60 200 Z" fill="url(#prGrad)"/>
      <path d="M 60 145 Q 210 135, 360 140 T 510 130 T 660 138" fill="none" stroke="#DC2626" stroke-width="3" stroke-dasharray="6 3" stroke-linecap="round"/>

      <!-- Oxygen SpO2 Curve (Teal Line) -->
      <path d="M 60 35 Q 210 32, 360 38 T 510 33 T 660 35" fill="none" stroke="#00A896" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Data Nodes -->
      <circle cx="60" cy="75" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="210" cy="65" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="360" cy="85" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="510" cy="70" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="660" cy="75" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>

      <!-- Active Point Tooltip on latest vitals -->
      <circle cx="660" cy="75" r="6" fill="#0288D1" stroke="#FFF" stroke-width="3"/>
      <rect x="580" y="42" width="110" height="24" rx="5" fill="#0F172A"/>
      <text x="635" y="58" font-size="11" fill="#FFF" text-anchor="middle" font-weight="700">110/70 mmHg (84 bpm)</text>
    </svg>`;
  },
};
