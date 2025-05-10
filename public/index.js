const BASE_URL = '';

async function handleAnalyze() {
  const text = document.getElementById('textInput').value;
  if (!text.trim()) return alert('Please enter some text.');
  
  try {
    const res = await fetch(`${BASE_URL}/api/texts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text })
    });
    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    await loadHistory();
  } catch (error) {
    console.error('Analysis error:', error);
    alert('Analysis failed. Please try again.');
  }
}

async function loadHistory() {
  try {
    const res = await fetch(`${BASE_URL}/api/texts`);
    const data = await res.json();
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      
      // Create buttons properly with event listeners
      const viewBtn = document.createElement('button');
      viewBtn.textContent = 'View';
      viewBtn.addEventListener('click', () => viewDetails(item.id));
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteAnalysis(item.id));
      
      div.innerHTML = `<strong>ID:</strong> ${item.id}<br/>`;
      div.appendChild(viewBtn);
      div.appendChild(deleteBtn);
      
      list.appendChild(div);
    });
  } catch (error) {
    console.error('Load history error:', error);
  }
}

async function viewDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/texts/${id}`);
    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('View details error:', error);
  }
}

async function deleteAnalysis(id) {
  try {
    await fetch(`${BASE_URL}/api/texts/${id}`, { method: 'DELETE' });
    await loadHistory();
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// Proper event listeners with correct capitalization
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyzeBtn').addEventListener('click', handleAnalyze);
  document.getElementById('loadHistoryBtn').addEventListener('click', loadHistory);
  
  // Load history on page load
  loadHistory();
});