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

  /* ──────────── Patient Vital Signs ECG / EKG Cardiac Telemetry Graph ──────────── */
  vitalsTrendChart () {
    return `<svg viewBox="0 0 760 250" width="100%" height="250" style="overflow:visible; border-radius:12px; background:#FFF5F5; box-shadow:inset 0 0 0 1px #FCA5A5;">
      <defs>
        <!-- Fine 1mm ECG Sub-Grid (Pink Lines) -->
        <pattern id="ecgMinorGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(239, 68, 68, 0.16)" stroke-width="0.75"/>
        </pattern>
        <!-- Major 5mm ECG Grid (Thicker Red Lines) -->
        <pattern id="ecgMajorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="url(#ecgMinorGrid)"/>
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(220, 38, 38, 0.36)" stroke-width="1.25"/>
        </pattern>
        <!-- Red Double Arrow Markers for R-R Interval -->
        <marker id="arrowLeft" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#DC2626"/>
        </marker>
        <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#DC2626"/>
        </marker>
      </defs>

      <!-- Authentic ECG Pink/Red Grid Paper Background -->
      <rect width="760" height="250" fill="url(#ecgMajorGrid)"/>

      <!-- Continuous P-QRS-T Cardiac ECG Telemetry Waveform -->
      <path d="
        M 0 140 h 16
        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 18

        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 18

        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 18

        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 18

        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 18

        c 4 -6, 12 -6, 16 0 h 8
        l 4 8 l 6 -88 l 6 100 l 4 -20 h 12
        c 8 -16, 20 -16, 28 0 h 20
      " fill="none" stroke="#111827" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- R-R Interval Measurement Marker Arrow (matching reference image) -->
      <line x1="56" y1="62" x2="186" y2="62" stroke="#DC2626" stroke-width="3.5" marker-start="url(#arrowLeft)" marker-end="url(#arrowRight)"/>

      <!-- R-R Interval Callout Box -->
      <g transform="translate(121, 14)">
        <rect x="-56" y="0" width="112" height="36" rx="5" fill="#0F172A" stroke="#334155" stroke-width="1"/>
        <text x="0" y="15" fill="#FFFFFF" font-size="10" font-weight="800" text-anchor="middle" font-family="Inter, sans-serif">R-R Interval</text>
        <text x="0" y="28" fill="#94A3B8" font-size="9" font-weight="600" text-anchor="middle" font-family="Inter, sans-serif">4 large squares (0.71s)</text>
      </g>

      <!-- Telemetry Live Parameter Badges (Top Left & Top Right) -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="160" height="24" rx="5" fill="#000000" opacity="0.85"/>
        <text x="10" y="16" fill="#00A896" font-size="10" font-weight="800" font-family="monospace">LEAD II · 25mm/s · 10mm/mV</text>
      </g>

      <!-- Bottom ECG Heart Rate Calculation Formula Bar -->
      <g transform="translate(0, 222)">
        <rect width="760" height="28" fill="#0F172A"/>
        <text x="16" y="18" fill="#F8FAFC" font-size="10" font-weight="700" font-family="Inter, sans-serif">
          Heart Rate Calculation: 300 ÷ (4 large squares in R-R interval) = <tspan fill="#4ADE80" font-weight="800">84 bpm</tspan> · <tspan fill="#38BDF8">Normal Sinus Rhythm</tspan>
        </text>
        <text x="744" y="18" fill="#94A3B8" font-size="9" font-weight="600" text-anchor="end" font-family="monospace">Telemetry Stream Active</text>
      </g>
    </svg>`;
  },
};
