// Auth and API Configuration
const BASE_URL = ''; // Set your API base URL here

// Redirect to login if no token found
if (!localStorage.getItem('token')) {
  window.location.href = '/login.html';
}

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
}

// DOM Elements
const textInput = document.getElementById('textInput');
const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('history-list');
const analyzeBtn = document.getElementById('analyze-btn');
const loadHistoryBtn = document.getElementById('loadHistory-btn');
const logoutBtn = document.getElementById('logout-btn');

// Event Listeners
analyzeBtn.addEventListener('click', handleAnalyze);
loadHistoryBtn.addEventListener('click', loadHistory);
logoutBtn.addEventListener('click', logout);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
});

// Core Functions
async function handleAnalyze() {
  const text = textInput.value.trim();
  if (!text) {
    showAlert('Please enter some text to analyze.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/texts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content: text })
    });

    if (!response.ok) {
      throw new Error(response.status === 401 ? 'Unauthorized' : 'Analysis failed');
    }

    const data = await response.json();
    displayResult(data);
    await loadHistory();
  } catch (error) {
    handleApiError(error);
  }
}

async function loadHistory() {
  try {
    const response = await fetch(`${BASE_URL}/api/texts`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to load history');
    }

    const data = await response.json();
    renderHistoryList(data);
  } catch (error) {
    handleApiError(error);
  }
}

async function viewDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/texts/${id}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error('Failed to load details');

    const data = await response.json();
    displayResult(data);
  } catch (error) {
    handleApiError(error);
  }
}

async function deleteAnalysis(id) {
  if (!confirm('Are you sure you want to delete this analysis?')) return;

  try {
    const response = await fetch(`${BASE_URL}/api/texts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error('Failed to delete');

    showAlert('Analysis deleted successfully', 'success');
    await loadHistory();
  } catch (error) {
    handleApiError(error);
  }
}

// UI Functions
function displayResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
  resultDisplay.scrollIntoView({ behavior: 'smooth' });
}

function renderHistoryList(items) {
  historyList.innerHTML = items.length > 0 
    ? items.map(item => `
        <div class="history-item" data-id="${item.id}">
          <div>
            <strong>ID:</strong> ${item.id}<br>
            <small>${new Date(item.createdAt || Date.now()).toLocaleString()}</small>
          </div>
          <div class="history-item-actions">
            <button  class="btn secondary view-details-btn">View</button>
            <button class="btn danger delete-btn">Delete</button>
          </div>
        </div>
      `).join('')
    : '<p>No saved analyses found</p>';

  // Attach event listeners (after DOM is updated)
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".history-item").dataset.id;
      viewDetails(id);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".history-item").dataset.id;
      deleteAnalysis(id);
    });
  });
}


function showAlert(message, type = 'error') {
  alert(message); // Replace with a nicer notification system if desired
}

function handleApiError(error) {
  console.error('API Error:', error);
  
  if (error.message === 'Unauthorized') {
    showAlert('Your session has expired. Please login again.');
    logout();
  } else {
    showAlert(error.message || 'An error occurred');
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}
function clearText() {
  textInput.value = '';
  resultDisplay.textContent = '';
  textInput.focus(); // Optional: puts cursor back in textarea
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyze-btn').addEventListener('click', handleAnalyze);
  document.getElementById('clear-btn').addEventListener('click', clearText);
  document.getElementById('loadHistory-btn').addEventListener('click', loadHistory);
  document.getElementById('logout-btn').addEventListener('click', logout);
  loadHistory();
});