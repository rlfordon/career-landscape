import { PROFILES, VARIABLES, PROFILE_COLORS, VERDICT_STYLES } from '../data.js';
import { createRadarChart, renderLegend } from '../radar.js';
import { getStarredIds, removeStar, getCustomProfile } from '../state.js';

export function renderStarred(container) {
  const starredIds = getStarredIds();

  container.innerHTML = '';

  // Breadcrumbs
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.innerHTML = `
    <a href="#/" class="breadcrumb-link">Explorer</a>
    <span class="breadcrumb-sep"> › </span>
    <span class="breadcrumb-current">Starred Profiles</span>
  `;
  container.appendChild(nav);

  const title = document.createElement('h1');
  title.className = 'browse-title';
  title.textContent = 'My Comparison';
  container.appendChild(title);

  if (starredIds.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'starred-empty';
    empty.innerHTML = `
      <p>No profiles starred yet.</p>
      <p>Browse profiles and click "Save to My Comparison" to add them here.</p>
      <a href="#/" class="builder-cancel" style="display:inline-block;margin-top:16px;text-decoration:none">Start Exploring</a>
    `;
    container.appendChild(empty);
    return;
  }

  // Assign colors
  const colorMap = {};
  starredIds.forEach((id, i) => {
    if (id.startsWith('custom-')) colorMap[id] = '#059669';
    else colorMap[id] = PROFILE_COLORS[i % PROFILE_COLORS.length];
  });

  // Chip bar with remove buttons
  const chipBar = document.createElement('div');
  chipBar.className = 'chip-bar';
  container.appendChild(chipBar);

  function renderChips() {
    chipBar.innerHTML = '';
    getStarredIds().forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const chip = document.createElement('span');
      chip.className = 'chip chip-active starred-chip';
      chip.style.borderColor = colorMap[id];
      chip.style.background = colorMap[id] + '15';
      chip.style.color = colorMap[id];

      const label = document.createElement('span');
      label.textContent = profile.name;
      chip.appendChild(label);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'chip-remove';
      removeBtn.textContent = '×';
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        removeStar(id);
        renderStarred(container); // Re-render
      };
      chip.appendChild(removeBtn);

      chipBar.appendChild(chip);
    });
  }

  // Radar chart
  const radarContainer = document.createElement('div');
  radarContainer.className = 'starred-radar';
  container.appendChild(radarContainer);

  const chart = createRadarChart({ size: 480 });
  radarContainer.appendChild(chart.svg);

  // Note
  const note = document.createElement('div');
  note.className = 'radar-note';
  note.textContent = 'Larger shape = more protected from AI displacement';
  radarContainer.appendChild(note);

  // Legend
  const legendContainer = document.createElement('div');
  radarContainer.appendChild(legendContainer);

  let highlightedId = null;

  function renderChart() {
    const currentIds = getStarredIds();
    const chartData = currentIds.map(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return null;
      const ratings = VARIABLES.map(v => profile.junior[v.key]);
      return { id, ratings, color: colorMap[id] || '#888' };
    }).filter(Boolean);

    chart.update(chartData);

    legendContainer.innerHTML = '';
    renderLegend(legendContainer, chartData.map(d => {
      const p = PROFILES[d.id] || getCustomProfile(d.id);
      return { id: d.id, name: p?.name || d.id, color: d.color };
    }), (id) => {
      if (highlightedId === id) {
        highlightedId = null;
        chart.clearHighlight();
      } else {
        highlightedId = id;
        chart.highlight(id);
      }
    });
  }

  // Summary table
  const tableContainer = document.createElement('div');
  tableContainer.className = 'starred-table-wrap';
  container.appendChild(tableContainer);

  function renderTable() {
    const currentIds = getStarredIds();
    const headers = VARIABLES.map(v => `<th title="${v.label}">${v.shortLabel}</th>`).join('');

    const rows = currentIds.map(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return '';
      const data = profile.junior;
      const verdict = VERDICT_STYLES[data.verdictType];
      const cells = VARIABLES.map(v => `<td>${data[v.key]}</td>`).join('');
      return `
        <tr>
          <td class="table-profile-name">
            <span class="legend-swatch" style="background:${colorMap[id]}"></span>
            ${profile.name}
          </td>
          ${cells}
          <td><span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${data.verdict}</span></td>
        </tr>
      `;
    }).join('');

    tableContainer.innerHTML = `
      <table class="starred-table">
        <thead>
          <tr>
            <th>Profile</th>
            ${headers}
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr class="table-legend-row">
            <td colspan="${VARIABLES.length + 2}">
              ${VARIABLES.map(v => `<span class="table-legend-item"><strong>${v.shortLabel}</strong> = ${v.label}</span>`).join(' · ')}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  // Export bar
  const exportBar = document.createElement('div');
  exportBar.className = 'export-bar';
  exportBar.innerHTML = `
    <button id="export-png" class="export-btn">Download Chart as PNG</button>
    <button id="export-link" class="export-btn export-btn-secondary">Copy Shareable Link</button>
  `;
  container.appendChild(exportBar);

  // Wire up export buttons (implementations in Task 10)
  document.getElementById('export-png').onclick = async () => {
    const { exportPNG } = await import('../export.js');
    exportPNG(radarContainer);
  };

  document.getElementById('export-link').onclick = async () => {
    const { copyShareableLink } = await import('../export.js');
    const btn = document.getElementById('export-link');
    copyShareableLink();
    btn.textContent = 'Link Copied!';
    setTimeout(() => { btn.textContent = 'Copy Shareable Link'; }, 2000);
  };

  // Render everything
  renderChips();
  renderChart();
  renderTable();
}
