// ==========================================
// 🔍 SMART SEARCH ENGINE
// Advanced Search with Categorization
// ==========================================

function activateSmartSearch() {
  const searchInput = document.getElementById('advanced-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (!query.trim()) return;

    const results = window.advancedFeatures?.smartSearch(query) || [];
    displaySearchResults(results);
  });
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results-advanced');
  if (!resultsContainer) return;

  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
    return;
  }

  resultsContainer.innerHTML = results.map(r => `
    <div class="search-result-item">
      <div class="result-category" style="background: ${getCategoryColor(r.category)}">
        ${r.category}
      </div>
      <div class="result-question">${r.question}</div>
      <div class="result-time">${new Date(r.timestamp).toLocaleDateString('ar-SA')}</div>
    </div>
  `).join('');
}

function getCategoryColor(category) {
  const colors = {
    'Frontend': '#FF6B6B',
    'Backend': '#4ECDC4',
    'Database': '#45B7D1',
    'DevOps': '#FFA07A',
    'Security': '#F7DC6F',
    'General': '#85C1E2'
  };
  return colors[category] || '#999';
}

// Activate on load
window.addEventListener('DOMContentLoaded', () => {
  activateSmartSearch();
  console.log('✅ Smart Search activated');
});
