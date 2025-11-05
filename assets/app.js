// ===============================
// CleanDomain.ai — App Controller
// ===============================

// Theme toggle (Dark/Light)
const toggle = document.getElementById('themeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    toggle.textContent = document.body.classList.contains('light')
      ? 'Light'
      : 'Dark';
  });
}

// Demo table population placeholder
document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('tableBody');
  if (!table) return;

  const demoRows = [
    ['Namecheap', '$59.98', '$79.98', '$219.94', 'Free', 'A+', 'Fair', 'Today'],
    ['Porkbun', '$72.00', '$72.00', '$216.00', 'Free', 'A', 'Honest', 'Today'],
    ['GoDaddy', '$45.00', '$125.00', '$295.00', 'Paid', 'B', 'Teaser', 'Today'],
  ];

  demoRows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
});
