/* engine.js — CleanDomain.ai Scoring Engine v1.0 (Production Table)
   - Transparent weighted scoring
   - TLD guidance (.ai, .com, .io) + sensible defaults for others
   - Works with #scoreBtn/#scoreInput and the existing "Score" button for #engineInput
*/

(function () {
  // ===== Metric configuration =====
  const METRICS = [
    { key: 'brandability',         label: 'Brandability',              weight: 20 },
    { key: 'keywordValue',         label: 'Keyword Value',             weight: 12 },
    { key: 'length',               label: 'Length',                    weight: 
