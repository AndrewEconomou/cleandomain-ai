/* =======================================================
   CleanDomain.ai — Engine v2 (Stage 1 + 2)
   Deterministic, transparent domain-evaluation logic
   ======================================================= */

(function(){
  const METRICS = [
    { key:"extension_trust",label:"Extension Trust",weight:10 },
    { key:"brandability",label:"Brandability",weight:10 },
    { key:"length_efficiency",label:"Length Efficiency",weight:5 },
    { key:"keyword_value",label:"Keyword Value",weight:8 },
    { key:"vertical_demand",label:"Vertical Demand",weight:10 },
    { key:"liquidity",label:"Resale Liquidity",weight:6 },
    { key:"readability",label:"Readability",weight:5 },
    { key:"repetition_integrity",label:"Repetition Integrity",weight:5 },
    { key:"ethical_authenticity",label:"Ethical Authenticity",weight:4 },
    { key:"trend_momentum",label:"Trend Momentum",weight:8 },
    { key:"build_viability",label:"Build Viability",weight:7 },
    { key:"growth_potential",label:"Growth Potential",weight:6 },
    { key:"seo_authority",label:"SEO Authority",weight:6 },
    { key:"technical_cleanliness",label:"Technical Cleanliness",weight:4 },
    { key:"overall_resilience",label:"Overall Resilience",weight:10 },
  ];

  /* ---------- Helpers ---------- */
  const $ = id => document.getElementById(id);
  const avg = a => a.reduce((x,y)=>x+y,0)/a.length;
  const rnd = (n,d=1)=>Math.round(n*10**d)/10**d;
  const fmt = k=>k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());

  /* ---------- Core scoring ---------- */
  function scoreDomain(domain){
    domain = domain.toLowerCase().trim();
    const tld = domain.split('.').pop()||"";
    const name = domain.replace(/\.[^.]+$/,"");
    const len = name.length;
    const vowels = (name.match(/[aeiou]/g)||[]).length;
    const vowelRatio = vowels/Math.max(len,1);
    const hasHyphen = domain.includes("-");
    const hasNum = /\d/.test(domain);

    const s={};
    s.extension_trust = tld==="ai"?9.5:tld==="io"?8.5:tld==="com"?8:7;
    s.brandability = (vowelRatio>=0.35&&len<=10)?9:(vowelRatio>=0.25&&len<=14)?8:6.5;
    s.length_efficiency = len<=6?10:len<=10?9:len<=14?7:5;
    s.keyword_value = /ai|crypto|finance|trade|tech/.test(name)?9:/blog|news|site|hub/.test(name)?8:6;
    s.vertical_demand = /finance|money|invest|trade/.test(name)?9:/crypto|ai|tech/.test(name)?8.5:7;
    s.liquidity = (!hasHyphen&&!hasNum&&len<10)?8.5:6.5;
    s.readability = (!hasHyphen&&!hasNum&&vowelRatio>=0.25)?9:7;
    s.repetition_integrity = (name.match(/ai/g)||[]).length>1?6:9;
    s.ethical_authenticity = /(google|meta|amazon|apple|microsoft)/.test(name)?2:9.5;
    s.trend_momentum = /ai|crypto|chat|bot/.test(name)?9:/eco|green|finance/.test(name)?8:6.5;
    s.build_viability = /store|shop|blog|hub|app|site|platform/.test(name)?9:8;
    s.growth_potential = /ai|crypto|finance|invest|tech/.test(name)?9:7;
    s.seo_authority = name.split(/[^a-z0-9]+/).length<=2?9:7;
    s.technical_cleanliness = (!hasHyphen&&!hasNum&&/^[a-z0-9]+$/.test(name))?9.5:7;
    s.overall_resilience = Math.min(10,avg(Object.values(s))*0.95);

    const total = METRICS.reduce((a,m)=>a+s[m.key]*(m.weight/100),0);
    const final = rnd(total,1);

    return {domain,tld,len,score:final,subs:s};
  }

  /* ---------- Renderer ---------- */
  function renderResult(result){
    const box = $("scoreResult");
    if(!box) return;
    const {domain,score,subs} = result;

    const verdict = score>=9?"Excellent":score>=7.5?"Strong":score>=6?"Fair":"Developing";
    const top3 = Object.entries(subs).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const low2 = Object.entries(subs).sort((a,b)=>a[1]-b[1]).slice(0,2);

    let html = `
      <h3>Score: ${score}/10 — ${verdict}</h3>
      <p><strong>${domain}</strong> shows balanced strengths across ${top3.map(x=>fmt(x[0])).join(", ")}.</p>
      <table class="cd-table" style="margin-top:1rem;">
        <thead><tr><th>Metric</th><th>Score</th><th>Weight %</th></tr></thead>
        <tbody>
          ${METRICS.map(m=>{
            const v=subs[m.key]||0;
            return `<tr><td>${m.label}</td><td>${v.toFixed(1)}</td><td>${m.weight}</td></tr>`;
          }).join("")}
        </tbody>
      </table>
      <p style="margin-top:1rem;"><strong>Strengths:</strong> ${top3.map(([k,v])=>fmt(k)+" ("+v+")").join(", ")}<br>
      <strong>Weaknesses:</strong> ${low2.map(([k,v])=>fmt(k)+" ("+v+")").join(", ")}.</p>
    `;
    box.innerHTML = html;
  }

  /* ---------- Bind ---------- */
  function init(){
    const btn=$("scoreBtn");
    if(!btn||btn.dataset.bound)return;
    btn.dataset.bound="1";
    btn.addEventListener("click",()=>{
      const val=$("scoreInput").value.trim();
      if(!val){$("scoreResult").innerHTML="<em>Enter a domain first.</em>";return;}
      const result=scoreDomain(val);
      renderResult(result);
    });
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
