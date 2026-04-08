const STORAGE_KEY = 'career-landscape-state';

let state = {
  starred: [],           // Array of profile IDs (string)
  customProfiles: {},    // Object keyed by custom ID: { id, name, junior: { ...ratings }, senior: null }
  lastView: '#/',        // Last hash for resume
};

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// ── Starred ──

export function getStarredCount() {
  return state.starred.length;
}

export function getStarredIds() {
  return [...state.starred];
}

export function isStarred(profileId) {
  return state.starred.includes(profileId);
}

export function toggleStar(profileId) {
  const idx = state.starred.indexOf(profileId);
  if (idx >= 0) {
    state.starred.splice(idx, 1);
  } else {
    state.starred.push(profileId);
  }
  saveState();
  updateStarredNav();
}

export function removeStar(profileId) {
  const idx = state.starred.indexOf(profileId);
  if (idx >= 0) {
    state.starred.splice(idx, 1);
    saveState();
    updateStarredNav();
  }
}

// ── Custom Profiles ──

export function getCustomProfiles() {
  return { ...state.customProfiles };
}

export function getCustomProfile(id) {
  return state.customProfiles[id] || null;
}

export function saveCustomProfile(profile) {
  state.customProfiles[profile.id] = profile;
  // Auto-star custom profiles
  if (!state.starred.includes(profile.id)) {
    state.starred.push(profile.id);
  }
  saveState();
  updateStarredNav();
}

export function deleteCustomProfile(id) {
  delete state.customProfiles[id];
  removeStar(id);
}

// ── Last View ──

export function setLastView(hash) {
  state.lastView = hash;
  saveState();
}

export function getLastView() {
  return state.lastView;
}

// ── Bulk operations (for shareable links) ──

export function setStarredIds(ids) {
  state.starred = [...ids];
  saveState();
  updateStarredNav();
}

export function setCustomProfiles(profiles) {
  state.customProfiles = { ...profiles };
  saveState();
}

// ── Nav update helper ──

function updateStarredNav() {
  const btn = document.getElementById('starred-nav-btn');
  if (!btn) return;
  const count = getStarredCount();
  btn.style.display = count > 0 ? 'block' : 'none';
  const countEl = document.getElementById('starred-count');
  if (countEl) countEl.textContent = count;
}

export function getState() { return state; }
