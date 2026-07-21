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

  /* ──────────── Patient Vital Signs Trend Graph (Medical Grid) ──────────── */
  vitalsTrendChart () {
    return `<svg viewBox="0 0 760 250" width="100%" height="250" style="overflow:visible; border-radius:12px; background:#F8FAFC; box-shadow:inset 0 0 0 1px #CBD5E1;">
      <defs>
        <!-- Fine Medical Grid Pattern (Sub-Lines) -->
        <pattern id="vitalsMinorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(2, 136, 209, 0.08)" stroke-width="0.75"/>
        </pattern>
        <!-- Major Medical Grid Pattern (Thicker Blue Lines) -->
        <pattern id="vitalsMajorGrid" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#vitalsMinorGrid)"/>
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(2, 136, 209, 0.20)" stroke-width="1.25"/>
        </pattern>

        <!-- Area Gradients for BP & Heart Rate -->
        <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0288D1" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0288D1" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#DC2626" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#DC2626" stop-opacity="0.0"/>
        </linearGradient>

        <!-- Interval Arrow Markers -->
        <marker id="intervalArrowLeft" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#DC2626"/>
        </marker>
        <marker id="intervalArrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#DC2626"/>
        </marker>
      </defs>

      <!-- Medical Chart Grid Paper Background -->
      <rect width="760" height="250" fill="url(#vitalsMajorGrid)"/>

      <!-- Horizontal Y-Grid Values -->
      <text x="18" y="44" font-size="10" fill="#64748B" font-weight="700">140</text>
      <line x1="45" y1="40" x2="740" y2="40" stroke="#CBD5E1" stroke-dasharray="4 4"/>

      <text x="18" y="84" font-size="10" fill="#64748B" font-weight="700">120</text>
      <line x1="45" y1="80" x2="740" y2="80" stroke="#CBD5E1" stroke-dasharray="4 4"/>

      <text x="18" y="124" font-size="10" fill="#64748B" font-weight="700">100</text>
      <line x1="45" y1="120" x2="740" y2="120" stroke="#CBD5E1" stroke-dasharray="4 4"/>

      <text x="24" y="164" font-size="10" fill="#64748B" font-weight="700">80</text>
      <line x1="45" y1="160" x2="740" y2="160" stroke="#CBD5E1" stroke-dasharray="4 4"/>

      <text x="24" y="204" font-size="10" fill="#64748B" font-weight="700">60</text>
      <line x1="45" y1="200" x2="740" y2="200" stroke="#94A3B8"/>

      <!-- X-Axis Checkpoint Times -->
      <text x="70" y="217" font-size="10" fill="#475569" font-weight="700">08:00 AM</text>
      <text x="220" y="217" font-size="10" fill="#475569" font-weight="700">12:00 PM</text>
      <text x="370" y="217" font-size="10" fill="#475569" font-weight="700">04:00 PM</text>
      <text x="520" y="217" font-size="10" fill="#475569" font-weight="700">08:00 PM</text>
      <text x="660" y="217" font-size="10" fill="#00A896" font-weight="800">10:30 PM (Latest)</text>

      <!-- 1. Oxygen SpO2 Saturation (Teal Line near top 98%) -->
      <path d="M 80 44 Q 230 42, 380 46 T 530 43 T 680 44" fill="none" stroke="#00A896" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="80" cy="44" r="3.5" fill="#00A896" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="230" cy="42" r="3.5" fill="#00A896" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="380" cy="46" r="3.5" fill="#00A896" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="530" cy="43" r="3.5" fill="#00A896" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="680" cy="44" r="4.5" fill="#00A896" stroke="#FFF" stroke-width="2"/>

      <!-- 2. BP Systolic Trend Area & Curve (Blue Line 120 -> 110) -->
      <path d="M 80 80 Q 230 75, 380 90 T 530 85 T 680 98 L 680 200 L 80 200 Z" fill="url(#bpGrad)"/>
      <path d="M 80 80 Q 230 75, 380 90 T 530 85 T 680 98" fill="none" stroke="#0288D1" stroke-width="3" stroke-linecap="round"/>
      
      <circle cx="80" cy="80" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="230" cy="75" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="380" cy="90" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="530" cy="85" r="4.5" fill="#0288D1" stroke="#FFF" stroke-width="2"/>
      <circle cx="680" cy="98" r="5.5" fill="#0288D1" stroke="#FFF" stroke-width="2.5"/>

      <!-- 3. Pulse / Heart Rate Trend (Red Dashed Line 78 -> 84 bpm) -->
      <path d="M 80 155 Q 230 150, 380 145 T 530 148 T 680 142 L 680 200 L 80 200 Z" fill="url(#prGrad)"/>
      <path d="M 80 155 Q 230 150, 380 145 T 530 148 T 680 142" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="5 3" stroke-linecap="round"/>
      
      <circle cx="80" cy="155" r="4" fill="#DC2626" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="230" cy="150" r="4" fill="#DC2626" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="380" cy="145" r="4" fill="#DC2626" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="530" cy="148" r="4" fill="#DC2626" stroke="#FFF" stroke-width="1.5"/>
      <circle cx="680" cy="142" r="5" fill="#DC2626" stroke="#FFF" stroke-width="2"/>

      <!-- Annotated Interval Box & Arrow (matching reference callout box style!) -->
      <line x1="530" y1="58" x2="680" y2="58" stroke="#DC2626" stroke-width="3" marker-start="url(#intervalArrowLeft)" marker-end="url(#intervalArrowRight)"/>
      
      <g transform="translate(605, 14)">
        <rect x="-65" y="0" width="130" height="36" rx="5" fill="#0F172A" stroke="#334155" stroke-width="1"/>
        <text x="0" y="14" fill="#FFFFFF" font-size="10" font-weight="800" text-anchor="middle" font-family="Inter, sans-serif">Interval Checkpoint</text>
        <text x="0" y="27" fill="#38BDF8" font-size="9" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">BP 110/70 · HR 84 bpm</text>
      </g>

      <!-- Bottom Clinical Status Bar -->
      <g transform="translate(0, 224)">
        <rect width="760" height="26" fill="#0F172A"/>
        <text x="16" y="17" fill="#F8FAFC" font-size="10" font-weight="700" font-family="Inter, sans-serif">
          Clinical Vital Status: <tspan fill="#4ADE80" font-weight="800">Normal Hemodynamics</tspan> · <tspan fill="#94A3B8">BP 110/70 mmHg | Pulse 84 bpm | SpO₂ 98% | Temp 36.7°C</tspan>
        </text>
        <text x="744" y="17" fill="#94A3B8" font-size="9" font-weight="600" text-anchor="end" font-family="monospace">Logged: 22:30</text>
      </g>
    </svg>`;
  },
};
