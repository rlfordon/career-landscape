let state = { starred: [], customProfiles: [], lastView: '#/' };

export function loadState() {
  try {
    const saved = localStorage.getItem('career-landscape-state');
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch (e) { /* ignore corrupt state */ }
}

function saveState() {
  localStorage.setItem('career-landscape-state', JSON.stringify(state));
}

export function getStarredCount() {
  return state.starred.length;
}

export function getState() { return state; }
