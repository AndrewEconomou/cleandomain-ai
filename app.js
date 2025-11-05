// CleanDomain v2 minimal JS
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById('themeToggle');
  if (toggle){
    toggle.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light');
      toggle.textContent = document.documentElement.classList.contains('light') ? 'Light' : 'Dark';
    });
  }

  // Demo registrar data
  const demo = [
    { name:'Namecheap', y1:68, renew:72, privacy:true, reliability:9.1, promo:'10% Off', updated:'3 hours ago' },
    { name:'Cloudflare', y1:70, renew:70, privacy:true, reliability:9.4, promo:'—', updated:'1 hour ago' },
    { name:'Porkbun', y1:69, renew:75, privacy:true, reliability:8.9, promo:'$1 Coupon', updated:'6 hours ago' }
  ];

  const tbody = document.getElementById('tableBody');
  if (tbody){
    demo.forEach(r => {
      const tr = document.createElement('tr');
      const total = r.y1 + 2*r.renew;
      tr.innerHTML = `
        <td>${r.name}</td>
        <td>$${r.y1.toFixed(0)}</td>
        <td>$${r.renew.toFixed(0)}</td>
        <td>$${total.toFixed(0)}</td>
        <td>${r.privacy ? '✅' : '—'}</td>
        <td>${r.reliability.toFixed(1)} / 10</td>
        <td>${r.promo}</td>
        <td>${r.updated}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Mini-engine
  window.runEngine = function(){
    const el = document.getElementById('engineInput');
    const out = document.getElementById('engineResult');
    const v = (el.value || '').trim().toLowerCase();
    if (!v){ out.innerHTML = '<p class="muted">Enter a domain to score.</p>'; return; }

    // Simple heuristic scoring (demo only)
    let score = 50;
    const reasons = [];

    // Length bonus (10–20 chars ideal)
    const len = v.length;
    if (len >= 8 && len <= 16){ score += 15; reasons.push('Optimal length'); }
    else if (len <= 24){ score += 6; reasons.push('Acceptable length'); }
    else { score -= 10; reasons.push('Too long'); }

    // TLD weighting
    if (v.endsWith('.ai')){ score += 15; reasons.push('.ai TLD (AI vertical)'); }
    else if (v.endsWith('.com')){ score += 10; reasons.push('.com TLD (universal)'); }
    else { score += 0; reasons.push('Neutral TLD'); }

    // Keyword quality
    const good = ['domain','clean','market','news','finance','crypto','forex','fx','best','iq'];
    const hits = good.filter(k => v.includes(k)).length;
    score += Math.min(hits*5, 15);
    if (hits>0) reasons.push(`Strong keyword(s): +${hits*5}`);

    // Penalties
    if (v.includes('--') || v.includes('_')){ score -= 12; reasons.push('Bad separators'); }
    if (v.includes('ai.ai')){ score -= 6; reasons.push('Repetition may confuse'); }

    // Clamp and label
    score = Math.max(0, Math.min(100, Math.round(score)));

    let badge = 'badge-ok'; let label = 'Healthy';
    if (score >= 80){ badge = 'badge-ok'; label = 'Excellent'; }
    else if (score >= 60){ badge = 'badge-warn'; label = 'Good (improvable)'; }
    else { badge = 'badge-bad'; label = 'Weak'; }

    out.innerHTML = `
      <div class="score-line">
        <span class="badge-score ${badge}">${score}/100 — ${label}</span>
      </div>
      <ul class="reasons">
        ${reasons.map(r=>`<li>${r}</li>`).join('')}
      </ul>
      <p class="muted small">Demo only — not a valuation. Full Bestimate™ uses multi‑factor models and market signals.</p>
    `;
  };

  // Fake search (demo)
  const form = document.getElementById('searchForm');
  const input = document.getElementById('domainInput');
  if (form){
    form.addEventListener('submit', ()=>{
      const q = (input.value||'').trim();
      if (!q) return;
      document.querySelector('.table-head h2').textContent = `Registrar Snapshot — Filter: “${q}”`;
    });
  }
})();