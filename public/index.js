 // Redirect to login if no token found
 if (!localStorage.getItem('token')) {
  window.location.href = '/login.html';
}
const BASE_URL = '';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

async function handleAnalyze() {
  const text = document.getElementById('textInput').value;
  if (!text.trim()) return alert('Please enter some text.');

  try {
    const res = await fetch(`${BASE_URL}/api/texts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content: text })
    });

    if (!res.ok) throw new Error('Unauthorized or failed');

    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    await loadHistory();
  } catch (error) {
    console.error('Analysis error:', error);
    alert('Analysis failed. Please login again.');
    logout(); // force logout if token expired
  }
}

async function loadHistory() {
  try {
    const res = await fetch(`${BASE_URL}/api/texts`, {
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error('Unauthorized or failed');

    const data = await res.json();
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';

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
    alert('Session expired or error loading data.');
    logout();
  }
}

async function viewDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/texts/${id}`, {
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error('Unauthorized');

    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('View details error:', error);
    alert('Could not load details.');
  }
}

async function deleteAnalysis(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/texts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error('Unauthorized');

    await loadHistory();
  } catch (error) {
    console.error('Delete error:', error);
    alert('Could not delete analysis.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyze-btn').addEventListener('click', handleAnalyze);
  document.getElementById('loadHistory-btn').addEventListener('click', loadHistory);
  document.getElementById('logout-btn').addEventListener('click', logout);
  loadHistory();
});
