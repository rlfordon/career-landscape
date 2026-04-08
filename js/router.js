import { renderEntry } from './views/entry.js';
import { renderBrowse } from './views/browse.js';
import { renderCompare } from './views/compare.js';
import { renderBuilder } from './views/builder.js';
import { renderStarred } from './views/starred.js';
import { loadState, getStarredCount } from './state.js';
import { loadFromURL } from './export.js';

const app = document.getElementById('app');

const routes = [
  { pattern: /^#\/$|^$|^#$/,                       view: renderEntry },
  { pattern: /^#\/practice$/,                       view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm$/,                           view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/practice\/(.+)$/,                 view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm\/(.+)$/,                     view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/compare\/(.+)$/,                  view: renderCompare },
  { pattern: /^#\/builder$/,                        view: renderBuilder },
  { pattern: /^#\/builder\/(.+)$/,                  view: renderBuilder },
  { pattern: /^#\/starred$/,                        view: renderStarred },
];

function navigate() {
  const hash = window.location.hash || '#/';

  // Check for shareable link params on first load
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('starred')) {
    loadFromURL(urlParams);
    window.location.replace('#/starred');
    return;
  }

  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      app.innerHTML = '';
      const params = { ...(route.params || {}), segments: match.slice(1) };
      route.view(app, params);
      updateStarredNav();
      return;
    }
  }
  // Fallback
  window.location.hash = '#/';
}

function updateStarredNav() {
  const btn = document.getElementById('starred-nav-btn');
  const count = getStarredCount();
  btn.style.display = count > 0 ? 'block' : 'none';
  document.getElementById('starred-count').textContent = count;
  btn.onclick = () => window.location.hash = '#/starred';
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  navigate();
});
